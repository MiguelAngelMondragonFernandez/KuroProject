import React, { useState, useContext } from 'react'
import axios from '../utils/httpgateway';
import { LanguageContext } from '../components/LanguageContext';
import { showAlert } from '../utils/alerts';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import FileUploader from './FileInput';
import { useEffect } from 'react';
const AddUser = ({ onClose, onAddUser, fetchChats, friends }) => {
    const [email, setEmail] = useState("")
    const [groupName, setGroupName] = useState("");
    const [loading, setLoading] = useState(false);
    const [emails, setEmails] = useState([""]);
    const [validEmails, setValidEmails] = useState([false]);
    const [validGroupName, setValidGroupName] = useState(false);
    const [file, setFile] = useState(null);
    const { translations } = useContext(LanguageContext);


    const asignarFile = (file) => {
        setFile(file);
    }
    


    const validateEmail = (email, index) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = emailRegex.test(email.trim());
        const updatedValidEmails = [...validEmails];
        updatedValidEmails[index] = !isValid;
        setValidEmails(updatedValidEmails);
    };

    const validateGroupName = (name) => {
        setValidGroupName(name.trim() === "");
    };

    const handleAddEmailField = () => {
        setEmails([...emails, '']);
        setValidEmails([...validEmails, false]);
    };

    const handleEmailChange = (index, value) => {
        const updatedEmails = [...emails];
        updatedEmails[index] = value;
        setEmails(updatedEmails);
        validateEmail(value, index);
    };

    const handleGroupNameChange = (value) => {
        setGroupName(value);
        validateGroupName(value);
    };

    const handleRemoveEmailField = (index) => {
        const updatedEmails = emails.filter((_, i) => i !== index);
        const updatedValidEmails = validEmails.filter((_, i) => i !== index);
        setEmails(updatedEmails);
        setValidEmails(updatedValidEmails);
    };

    const fetchEmailIds = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user.email;
            const ids = [];
            const invalidEmails = []; 

            for (const email of emails) {
                if (email.trim() === userEmail) continue; 
                try {
                    const response = await axios.doGet(`users/getByEmail/${email.trim()}/`);
                    console.log(response);
                    
                    ids.push(response.data.id);
                } catch (error) {
                    console.error(`No se encontró el usuario con el correo: ${email}`);
                    invalidEmails.push(email); 
                }
            }
            ids.push(user.id);
            if (invalidEmails.length > 0) {
                throw new Error(`No se encontraron los siguientes correos: ${invalidEmails.join(', ')}`);
            }
            return ids.join(',');
        } catch (error) {
            console.error('Error al obtener los IDs de los correos:', error);
            throw error;
        }
    };

    const handleCreateGroup = async () => {
        const userId = JSON.parse(localStorage.getItem('user'));
        const userEmail = userId.email;
        var url_group = 'default_group.png';
        if (file) {
        await axios.doPostFormData(file)
            .then(response => {
                const { path } = response.data;
                url_group = path;
            }).catch((error) => {
                showAlert('error', 'Error al crear el grupo', 'Hubo un problema al crear el grupo. Verifique bien los datos.');
            });
        }


        if (validEmails.some(isInvalid => isInvalid) || validGroupName) {
            showAlert('error', 'Formulario inválido', 'Por favor, corrige los errores antes de continuar.');
            return;
        }

        const emailSet = new Set(emails.map(email => email.trim()));
        if (emailSet.size !== emails.length) {
            showAlert('error', 'Formulario inválido', 'No puedes agregar el mismo correo más de una vez.');
            return;
        }

        const updatedValidEmails = emails.map(email => email.trim() === "");
        setValidEmails(updatedValidEmails);

        if (emails.length > 1) {
            setValidGroupName(groupName.trim() === "");
        }


        setLoading(true);

        try {
            showAlert('loading', `${translations.wait}`,`${translations.chatCreating} `);
            const emailIds = await fetchEmailIds();
            const newChatParticipants = emailIds.split(',').map(id => id.trim());


            /**console.log("Ids", emailIds);
            console.log("Datos enviados al backend:", {
                participantes: emailIds,
                alias_grupo: emails.length > 1 ? groupName : '',
            });*/
            
            const response = await axios.doPost('conversaciones/create/', {
                participantes: emailIds,
                alias_grupo: emails.length > 1 ? groupName : '',
                url_photo: url_group,
            });

            showAlert('success', 'Chat creado', 'El chat se creó exitosamente.');
            onAddUser(response.data);
            if (fetchChats) {
                fetchChats();

            }
            setEmails(['']);
            setGroupName('');
            onClose();
            fetchChats();
        } catch (error) {
            if (error.message) {
                console.log(error.message);
                
                showAlert('error', 'Error al crear el chat', 'No existe un usuario con ese correo');
            } else {
                showAlert('error', 'Error al crear el chat', 'Hubo un problema al crear el chat. Verifique bien los datos.');
            }

        } finally {
            setLoading(false);
        }
    };

    return (<div className="p-5 surface-card border-round shadow-2">
        <h2 className="text-2xl font-semibold mb-4 text-primary">{emails.length > 1 ? 'Crear Grupo' : 'Agregar Usuario'}</h2>
        {
            emails.length > 1 &&(
        <div className="field">
                    <h3>Foto del grupo:</h3>
                    <FileUploader File={asignarFile} />
                    </div>
                    )
        }
    
        {emails.length > 1 && (
            <div className="mb-4">
                <label className="block text-sm font-medium text-900 mb-2">Nombre del Grupo</label>
                <InputText
                    value={groupName}
                    onChange={(e) => handleGroupNameChange(e.target.value)}
                    placeholder="Ingresa el nombre del grupo"
                    className={`w-full ${validGroupName ? 'p-invalid' : ''}`}
                />
                {validGroupName && (
                    <small className="text-red-500">El nombre del grupo es obligatorio</small>
                )}
            </div>
        )}
    
        {emails.map((email, index) => (
            <div key={index} className="mb-3">
                <div className="flex align-items-center gap-2">
                    <InputText
                        type="email"
                        value={email}
                        onChange={(e) => handleEmailChange(index, e.target.value)}
                        placeholder={`Correo electrónico ${index + 1}`}
                        className={`flex-1 ${validEmails[index] ? 'p-invalid' : ''}`}
                    />
                    {index > 0 && (
                        <Button
                            icon="pi pi-trash"
                            severity="danger"
                            className="p-button-sm"
                            onClick={() => handleRemoveEmailField(index)}
                            tooltip="Eliminar correo"
                            tooltipOptions={{ position: 'top' }}
                        />
                    )}
                </div>
                {validEmails[index] && (
                    <small className="text-red-500 block mt-1">El correo electrónico no es válido</small>
                )}
            </div>
        ))}
    
        <div className="mb-4">
            <Button
                icon="pi pi-plus"
                label="Agregar otro correo"
                severity="success"
                className="w-full"
                onClick={handleAddEmailField}
            />
        </div>
    
        <Divider />
    
        <div className="flex justify-content-end gap-2">
            <Button
                label="Cancelar"
                severity="secondary"
                onClick={onClose}
                disabled={loading}
            />
            <Button
                label={loading ? 'Creando...' : 'Crear Chat'}
                icon={loading ? 'pi pi-spin pi-spinner' : 'pi pi-check'}
                severity="primary"
                onClick={handleCreateGroup}
                disabled={loading}
            />
        </div>
    </div>
    )
}
export default AddUser
