import React, { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { ColorPicker } from 'primereact/colorpicker';
import { LanguageContext } from './LanguageContext';
import { useTheme } from '../utils/ThemeContext';
import axios from "../utils/httpgateway"
import { showAlert } from '../utils/alerts'
import { useNavigate } from 'react-router-dom';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

function Settings({ setState, userData, getUser }) {
    const languages = [
        { name: "Español", code: "es", flag: "https://flagcdn.com/w40/es.png" },
        { name: "Inglés", code: "en", flag: "https://flagcdn.com/w40/gb.png" },
    ];
    const { config, translations, changeLanguage, updateConfig } = useContext(LanguageContext);
    const { themeColor, changeThemeColor } = useTheme();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [isConfig, setIsConfig] = useState(false);
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [latsName, setLastName] = useState('');

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const toggleConfig = () => {
        setIsConfig(!isConfig);
    };
    const updateConfiguracion = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const { id: USUARIO_ID } = user;
            const idConfig = JSON.parse(localStorage.getItem('config')).id;
            const configToSave = { ...config, usuario: USUARIO_ID, id: idConfig };
            const response = await axios.doPut(`configuracionesaplicacion/api/${idConfig}/`, configToSave);
            const updatedConfig = { ...configToSave, id: response.data.id };
            updateConfig(updatedConfig);
            localStorage.setItem('config', JSON.stringify(updatedConfig));
            showAlert('success', 'Configuración guardada', '¡Éxito!');
        } catch (err) {
            console.error('Error al guardar la configuración:', err);
        }
    };
    const handleUpdateUser = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.access_token;
            const updatedData = {
                email: user.email,
                name,
                first_name: firstName,
                last_name: latsName,
            };
            const response = await axios.doPut(`users/updateUser/`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            showAlert('success', 'Datos actualizados', 'Tu perfil ha sido actualizado exitosamente');
            setIsEditing(false);
            const updatedUser = { ...user, ...updatedData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            getUser();
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            showAlert('error', 'Error', 'No se pudo actualizar el perfil');
        }
    };

    const handleColorChange = (e) => {
        const newColor = '#' + e.value;
        changeThemeColor(newColor);
        updateConfig({ colorPricipal: newColor });
    };

    const handleLanguageChange = (e) => {
        const newLanguage = e.value.code;
        changeLanguage(newLanguage);
    };

    const handleLougout = async () => {
        showAlert('loading', 'Cerrando sesión', 'Por favor, espera...');
        localStorage.clear();
        setTimeout(() => {
            navigate('/login');
            showAlert('success', 'Sesión cerrada', '¡Éxito!');
        }, 2000)
    }

    const languageTemplate = (option) => {
        if (!option || !option.flag) return null;
        return (
            <div className="flex items-center gap-2">
                <img src={option.flag} alt={option.name} className="w-3 h-3 rounded-sm" />
                <span>{option.name}</span>
            </div>
        );
    };
    console.log(userData)
    useEffect(() => {
        if (userData) {
            setName(userData.name || '');
            setFirstName(userData.first_name || '');
            setLastName(userData.last_name || '');
        }
    }, [userData]);
    return (
        <>
            <div className='flex flex-column h-screen border-[var(--text-color)] border-right-1' style={{ background: "var(--theme-color)", color: "Var(--text-color)" }}>
                <div className="flex flex-col items-center border-[var(--text-color)] border-bottom-1 p-2">
                    <i className='pi pi-arrow-left' style={{ fontSize: '18px' }} onClick={() => setState("listChats")} />
                    <span className='mt-2 text-3xl font-bold'>{translations.settings}</span>
                </div>
                <div className="flex w-full  border-[var(--text-color)] border-bottom-1 ">
                    <div className='flex flex-column'>
                        <div id='Profile' className={`${isEditing ? 'hidden' : ''} pb-3 pl-4 `} >
                            <div className='flex mb-2 mt-3 w-full'>
                                <span className='text-sm'>{translations.profile}</span>
                            </div>
                            <div className='flex flex-column w-full align-items-center justify-content-center'>
                                <img className='border-circle w-6rem h-6rem ' src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt="" srcset="" />

                                <div className="flex w-full text-center align-items-center justify-content-center">
                                    <span className='ml-3 text-sm font-normal'>{userData.email}</span>
                                </div>
                                <div className='flex text-center'>
                                    <span className='ml-2 text-lg font-semibold'>{userData.name} {userData.first_name} {userData.last_name}</span>
                                    <i className='pi pi-pencil  mt-2' style={{ fontSize: '15px' }} onClick={toggleEdit} />
                                </div>

                            </div>
                        </div>
                        {isEditing && (
                            <div id='editProfile' className={`${isEditing ? '' : 'hidden'} pb-3 pl-4 `}>
                                <div className='flex mb-2 mt-3 w-full'>
                                    <i className='pi pi-user-edit ' style={{ fontSize: '15px' }} />
                                    <span className='ml-3 text-sm'>{translations.editProfile}</span>
                                </div>
                                <div className='flex mt-5 mb-3 '>
                                    <FloatLabel>
                                        <InputText id="name" style={{ background: 'transparent' }}
                                            className='border-1 '
                                            value={name}
                                            onChange={(e) => setName(e.target.value)} />
                                        <label htmlFor="name" style={{ color: "Var(--text-color)" }}>{translations.name}</label>
                                    </FloatLabel>
                                </div>
                                <div className='flex mt-5 mb-3'>
                                    <FloatLabel>
                                        <InputText id="first_name" style={{ background: 'transparent' }}
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                        <label htmlFor="first_name" style={{ color: "Var(--text-color)" }}>{translations.first_name}</label>
                                    </FloatLabel>
                                </div>
                                <div className='flex mt-5 mb-3'>
                                    <FloatLabel>
                                        <InputText id="last_name" style={{ background: 'transparent' }}
                                            value={latsName}
                                            onChange={(e) => setLastName(e.target.value)} />
                                        <label htmlFor="last_name" style={{ color: "Var(--text-color)" }}>{translations.last_name}</label>
                                    </FloatLabel>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        icon="pi pi-save"
                                        label={translations.save}
                                        className='w-full'
                                        onClick={handleUpdateUser}
                                        style={{ color: "Var(--text-color)", background: 'transparent' }}
                                    />
                                    <Button
                                        icon="pi pi-times"
                                        label={translations.cancelacion}
                                        className='w-full'
                                        style={{ color: "Var(--text-color)", background: 'transparent' }}
                                        onClick={toggleEdit}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-column pl-4 pr-4 pb-3 border-bottom-1 border-[var(--text-color)]">
                    <div className='flex flex-column mb-2 mt-3'>
                        <div>
                            <div className="flex" onClick={toggleConfig}>
                                <span className=" text-sm">{translations.configuration}</span>
                            </div>
                        </div>
                        <div className='flex pl-2 mt-3'>
                            <i className='pi pi-globe' style={{ fontSize: '15px' }} />
                            <span className="ml-3 text-base ">{translations.changeLanguage}</span>
                        </div>
                        <div className='flex mt-1 pl-2'>
                            <Dropdown
                                value={languages.find((l) => l.code === config.idioma)}
                                options={languages}
                                onChange={handleLanguageChange}
                                optionLabel="name"
                                placeholder="Seleccione un idioma"
                                itemTemplate={languageTemplate}
                                valueTemplate={languageTemplate}
                                className="w-full"
                                pt={{
                                    root: { className: "bg-blue-500 text-black rounded-lg px-2 shadow-md" },
                                    panel: { className: "bg-blue-200 border border-gray-300 rounded-lg shadow-lg" },
                                    input: { className: "w-full" },
                                    item: ({ context }) => ({
                                        className: context.selected ? "bg-blue-600 text-white" : "hover:bg-blue-100",
                                    }),
                                }}
                            />
                        </div>

                        <div className='flex pl-2 mt-4'>
                            <i className="pi pi-palette" style={{ fontSize: '15px' }} />
                            <span className="ml-3 text-base">{translations.changeColor}</span>
                        </div>
                        <ColorPicker
                            id="color"
                            value={themeColor.replace('#', '')}
                            onChange={handleColorChange}
                            className='w-full '
                            pt={{
                                root: {
                                    className: "border-0"
                                },
                                input: {
                                    className: "w-full mt-1",
                                    style: {
                                        border: `2px solid var(--text-color)`,
                                        borderRadius: '6px',
                                        padding: '4px',
                                        transition: 'all 0.3s ease'
                                    }
                                },
                            }}
                        />
                        <Button
                            icon="pi pi-save"
                            label={translations.save}
                            className='w-full mt-3 '
                            onClick={updateConfiguracion}
                            style={{ color: "Var(--text-color)", background: 'transparent' }}
                        />
                    </div>
                </div>
                <div className="flex align-items-center p-3" onClick={handleLougout}>
                    <i className='pi pi-sign-out' style={{ fontSize: '20px' }} />
                    <span className="ml-3">{translations.logOut}</span>
                </div>
            </div>
        </>
    )
}


export default Settings;