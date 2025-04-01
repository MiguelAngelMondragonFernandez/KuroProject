import React, { useState } from 'react'
import axios from '../utils/httpgateway';

const AddUser = ({ onClose, onAddUser}) =>{
    const [email, setEmail] = useState("")
    const [groupName, setGroupName] = useState("");
    const [loading, setLoading] = useState(false);
    const [emails, setEmails] = useState([""]);

    const handleAddEmailField = () => {
        setEmails([...emails, '']); // Agrega un nuevo campo de correo
    };

    const handleEmailChange = (index, value) => {
        const updatedEmails = [...emails];
        updatedEmails[index] = value;
        setEmails(updatedEmails);
    };

    const handleRemoveEmailField = (index) => {
        const updatedEmails = emails.filter((_, i) => i !== index);
        setEmails(updatedEmails);
    };

    const handleCreateGroup = async () => {
        if (emails.some(email => email.trim() === '') || groupName.trim() === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const userId = JSON.parse(localStorage.getItem('user')).id; // ID del usuario actual
        if (emails.includes(userId)) {
            alert('No puedes incluirte a ti mismo en la lista de correos.');
            return;
        }

        setLoading(true);

        try {
            // Realiza un POST al backend para crear la conversación o grupo
            const response = await axios.doPost('conversaciones/createGroup', {
                emails,
                groupName,
                creatorId: userId,
            });

            alert('Grupo creado exitosamente.');
            onAddUser(response.data); // Opcional: Notifica al componente padre
            setEmails(['']);
            setGroupName('');
            onClose();
        } catch (error) {
            console.error('Error al crear el grupo:', error);
            alert('Hubo un error al crear el grupo.');
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="p-5">
            <h2 className="text-lg font-bold mb-4">Agregar Usuario</h2>
            <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Nombre del Grupo</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Ingresa el nombre del grupo"
                />
            </div>
            {emails.map((email, index) => (
                <div key={index} className="mb-3 flex items-center">
                    <input
                        type="email"
                        className="w-full p-2 border rounded"
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
                    {loading ? 'Creando...' : 'Crear Grupo'}
                </button>
            </div>
        </div>
  )
}

export default AddUser
