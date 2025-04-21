import React, { useState } from 'react'
import axios from '../utils/httpgateway';
import { showAlert } from '../utils/alerts';

const AddUser = ({ onClose, onAddUser, fetchChats, friends }) => {
    const [email, setEmail] = useState("")
    const [groupName, setGroupName] = useState("");
    const [loading, setLoading] = useState(false);
    const [emails, setEmails] = useState([""]);
    const [validEmails, setValidEmails] = useState([false]);
    const [validGroupName, setValidGroupName] = useState(false);
    


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
            const emailIds = await fetchEmailIds();
            const newChatParticipants = emailIds.split(',').map(id => id.trim());

            const existingChat = friends.find(friend => {
                const existingParticipants = friend.participantes.map(id => id.trim());
                return (
                    existingParticipants.length === newChatParticipants.length &&
                    existingParticipants.every(id => newChatParticipants.includes(id))
                );
            });

            if (emails.length === 1 && existingChat) {
                showAlert('error', 'Chat existente', 'Ya tienes un chat con este usuario.');
                setLoading(false);
                return;
            }
            /**console.log("Ids", emailIds);
            console.log("Datos enviados al backend:", {
                participantes: emailIds,
                alias_grupo: emails.length > 1 ? groupName : '',
            });*/
            const response = await axios.doPost('conversaciones/create/', {
                participantes: emailIds,
                alias_grupo: emails.length > 1 ? groupName : '',
            });

            showAlert('success', 'Chat creado', 'El chat se creó exitosamente.');
            onAddUser(response.data);
            if (fetchChats) {
                fetchChats();

            }
            setEmails(['']);
            setGroupName('');
            onClose();
        } catch (error) {
            if (error.message) {
                showAlert('error', 'Error al crear el chat', 'No existe un usuario con ese correo');
            } else {
                showAlert('error', 'Error al crear el chat', 'Hubo un problema al crear el chat. Verifique bien los datos.');
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5">
            <h2 className="text-lg font-bold mb-4">Agregar Usuario</h2>
            {emails.length > 1 && (
                <div className="mb-3 ">
                    <label className="block text-sm font-medium mb-1">Nombre del Grupo</label>
                    <input
                        type="text"
                        className={`w-full p-2 border rounded ${validGroupName ? "border-red-500" : ""}`}
                        value={groupName}
                        onChange={(e) => handleGroupNameChange(e.target.value)}
                        placeholder="Ingresa el nombre del grupo"
                    />
                    {validGroupName && <small className="text-red-500 ">El nombre del grupo es obligatorio</small>}
                </div>
            )}
            {emails.map((email, index) => (
                <div key={index} className="mb-3">
                    <div className="flex items-center">
                        <input
                            type="email"
                            className={`w-full p-2 border rounded ${validEmails[index] ? "border-red-500" : ""}`}
                            value={email}
                            onChange={(e) => handleEmailChange(index, e.target.value)}
                            placeholder={`Correo electrónico ${index + 1}`}
                        />
                        {index > 0 && (
                            <button
                                className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                                onClick={() => handleRemoveEmailField(index)}
                            >
                                -
                            </button>
                        )}
                    </div>
                    {validEmails[index] && (
                        <small className="text-red-500 block mt-1">El correo electrónico no es válido</small>
                    )}
                </div>
            ))}
            <button
                className="bg-green-500 text-white px-4 py-2 rounded mb-3"
                onClick={handleAddEmailField}
            >
                + Agregar otro correo
            </button>
            <div className="flex justify-end">
                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancelar
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleCreateGroup}
                    disabled={loading}
                >
                    {loading ? 'Creando...' : 'Crear Chat'}
                </button>
            </div>
        </div>
    )
}

export default AddUser
