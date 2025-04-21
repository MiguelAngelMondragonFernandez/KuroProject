import React, { useState, useContext } from 'react'
import axios from '../utils/httpgateway';
import { LanguageContext } from '../components/LanguageContext';
import { showAlert } from '../utils/alerts';

const AddUser = ({ onClose, onAddUser,fetchChats }) => {
    const [groupName, setGroupName] = useState("");
    const [loading, setLoading] = useState(false);
    const [emails, setEmails] = useState([""]);
    const { translations } = useContext(LanguageContext);

    const handleAddEmailField = () => {
        setEmails([...emails, '']);
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

    const fetchEmailIds = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userEmail = user.email;
            const ids = await Promise.all(
                emails
                    .filter(email => email.trim() !== userEmail)
                    .map(async (email) => {
                        const response = await axios.doGet(`users/getByEmail/${email.trim()}/`);
                        return response.data.id;
                    })
            );
            ids.push(user.id);
            return ids.join(',');
        } catch (error) {
            console.error('Error al obtener los IDs de los correos:', error);
            throw error;
        }
    };

    const handleCreateGroup = async () => {
        const userId = JSON.parse(localStorage.getItem('user'));
        const userEmail = userId.email;

        if (emails.some(email => email.trim() === '')) {
            showAlert('error', 'Por favor, completa todos los campos de correo.', 'Campos incompletos');
            return;
        }

        if (emails.length > 1 && groupName.trim() === '') {
            showAlert('error', 'Error',translations.nameGroupObligated);
            return;
        }

        if (emails.includes(userEmail)) {
            showAlert('error', translations.friendsEmailMyself, 'Error');
            return;
        }

        setLoading(true);

        try {
            showAlert('loading', `${translations.wait}`,`${translations.chatCreating} `);
            const emailIds = await fetchEmailIds();
            const response = await axios.doPost('conversaciones/create/', {
                participantes: emailIds,
                alias_grupo: emails.length > 1 ? groupName : '',
            });

            showAlert('success', translations.chatCreate, translations.chatCreate );
            onAddUser(response.data);
            setEmails(['']);
            setGroupName('');
            onClose();
            fetchChats();
        } catch (error) {
            console.error("Error", error);
            showAlert('error', translations.chatCreateError, 'Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5">
            <h2 className="text-lg font-bold mb-4">{translations.addFriend}</h2>
            {emails.length > 1 && (
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">{translations.nameGroup}</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder={translations.inputGroup}
                    />
                </div>
            )}
            {emails.map((email, index) => (
                <div key={index} className="mb-3 flex items-center">
                    <input
                        type="email"
                        className="w-full p-2 border rounded"
                        value={email}
                        onChange={(e) => handleEmailChange(index, e.target.value)}
                        placeholder={`${translations.friendsEmail} ${index + 1}`}
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
                className="bg-green-500 w-full text-white px-4 py-2 rounded mb-3"
                onClick={handleAddEmailField}
            >
                + {translations.addAnother}
            </button>
            <div className="flex justify-end">
                <button
                    className="bg-gray-500 w-full text-white px-4 py-2 rounded mr-2"
                    onClick={onClose}
                    disabled={loading}
                >
                    {translations.cancelacion}
                </button>
                <button
                    className="bg-blue-500 w-full text-white px-4 py-2 rounded"
                    onClick={handleCreateGroup}
                    disabled={loading}
                >
                    {loading ? translations.wait : translations.save}
                </button>
            </div>
        </div>
    );
};

export default AddUser;
