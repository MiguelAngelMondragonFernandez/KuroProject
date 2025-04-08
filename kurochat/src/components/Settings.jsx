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
import FileInput from './FileInput'

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
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [odlPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const pathImg = userData?.url_photo || "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png";

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const toggleConfig = () => {
        setIsConfig(!isConfig);
    };

    const toggleChangePassword = () => {
        setIsChangePassword(!isChangePassword);
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

            let photoUrl = userData.url_photo; // Por defecto usamos la actual
            // Si hay un nuevo archivo, lo subimos
            const uploadResponse = await axios.doPostFormData(file).then(response => response.data).catch(error => {
                console.error('Error al subir la imagen:', error); return null;
            })
            photoUrl = uploadResponse?.path || "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png";
            const updatedData = {
                email: user.email,
                name,
                first_name: firstName,
                last_name: latsName,
                url_photo: photoUrl,
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
    const [file, setFile] = React.useState(null)

    const asignarArchivo = (file) => {
        setFile(file)
    }
    return (
        <>
            <div className='flex flex-column h-screen border-[var(--text-color)] border-right-1' style={{ background: "var(--theme-color)", color: "Var(--text-color)" }}>
                <div className='flex flex-col items-center border-[var(--text-color)] border-bottom-1 p-2'>
                    <i
                        className='pi pi-arrow-left col-3'
                        style={{ fontSize: '18px' }}
                        onClick={() => setState("listChats")}
                    />
                    <span className='flex align-items-center justify-content-center text-3xl font-bold'>
                        {translations.settings}
                    </span>
                </div>
                <div className='flex-1 overflow-y-auto '>
                <div className="flex w-full  border-[var(--text-color)] border-bottom-1 ">
                    <div className='flex flex-column'>
                        <div id='Profile' className={`${isEditing ? 'hidden' : ''} pb-3 pl-4 `} >
                            <div className='flex mb-2 mt-3 w-full'>
                                <span className='text-sm'>{translations.profile}</span>
                            </div>
                            <div className='flex flex-column w-full align-items-center justify-content-center'>
                                <img className='border-circle w-6rem h-6rem ' src={pathImg} alt="" srcset="" />

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
                                <div className='mb-2 mt-3 w-full'>
                                    <i className='pi pi-user-edit ' style={{ fontSize: '15px' }} />
                                    <span className='ml-3 text-sm'>{translations.editProfile}</span>
                                </div>
                                <div className="flex pl-5 pb-7">
                                    <FileInput File={asignarArchivo} defaultImage={pathImg} className="w-6rem h-6rem " />
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
                    <div className="flex flex-column mb-2 mt-3 cursor-pointer">
                        <div className="flex" onClick={toggleConfig}>
                            <i
                                className="pi pi-cog"
                                style={{ fontSize: "15px" }}
                            />
                            <span className="ml-3  text-sm">{translations.configuration}</span>
                        </div>
                        <div className={`${isConfig ? "" : "hidden"} pb-3 `}>
                            <div className="flex pl-2 mt-3">
                                <i className="pi pi-globe" style={{ fontSize: "15px" }} />
                                <span className="ml-3 text-base ">
                                    {translations.changeLanguage}
                                </span>
                            </div>
                            <div className="flex mt-1 pl-2">
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
                                        root: {
                                            className:
                                                "bg-transparent text-black rounded-lg px-2 shadow-lg",
                                        },
                                        panel: {
                                            className:
                                                "bg-black text-black border border-gray-300 rounded-lg shadow-lg",
                                        },
                                        input: { className: "w-full" },
                                        item: ({ context }) => ({
                                            className: context.selected
                                                ? "bg-transparent text-white"
                                                : "hover:bg-white-100",
                                        }),
                                    }}
                                />
                            </div>

                            <div className="flex pl-2 mt-4">
                                <i className="pi pi-palette" style={{ fontSize: "15px" }} />
                                <span className="ml-3 text-base">
                                    {translations.changeColor}
                                </span>
                            </div>
                            <ColorPicker
                                id="color"
                                value={themeColor.replace("#", "")}
                                onChange={handleColorChange}
                                className="w-full "
                                pt={{
                                    root: {
                                        className: "border-0",
                                    },
                                    input: {
                                        className: "w-full mt-1",
                                        style: {
                                            border: `2px solid var(--text-color)`,
                                            borderRadius: "6px",
                                            padding: "4px",
                                            transition: "all 0.3s ease",
                                        },
                                    },
                                }}
                            />
                            <div className="flex gap-2 mt-5">
                                <Button
                                    icon="pi pi-save"
                                    label={translations.save}
                                    className="w-full "
                                    onClick={updateConfiguracion}
                                    style={{
                                        color: "Var(--text-color)",
                                        background: "transparent",
                                    }}
                                />
                                <Button
                                    icon="pi pi-times"
                                    label={translations.cancelacion}
                                    className="w-full"
                                    style={{
                                        color: "Var(--text-color)",
                                        background: "transparent",
                                    }}
                                    onClick={toggleConfig}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-column pl-4 pr-4 pb-3 border-bottom-1 border-[var(--text-color)]">
                    <div className="">
                        <div className="flex mb-2 mt-3 w-full cursor-pointer" onClick={toggleChangePassword}>
                            <i
                                className="pi pi-lock "
                                style={{ fontSize: "15px" }}
                            />
                            <span className="ml-3 text-sm">
                                {translations.changePassword}
                            </span>
                        </div>
                    </div>
                    {isChangePassword && (
                        <div

                            className={`${isChangePassword ? "" : "hidden"} pb-3 pl-4 `}
                        >
                            <div className="flex mt-5 mb-3 ">
                                <FloatLabel>
                                    <InputText
                                        id="name"
                                        style={{ background: "transparent" }}
                                        className="border-1 "
                                        value={name}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                    <label
                                        htmlFor="name"
                                        style={{ color: "Var(--text-color)" }}
                                    >
                                        {translations.oldPassword}
                                    </label>
                                </FloatLabel>
                            </div>
                            <div className="flex mt-5 mb-3">
                                <FloatLabel>
                                    <InputText
                                        id="first_name"
                                        style={{ background: "transparent" }}
                                        value={firstName}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <label
                                        htmlFor="first_name"
                                        style={{ color: "Var(--text-color)" }}
                                    >
                                        {translations.newPassword}
                                    </label>
                                </FloatLabel>
                            </div>
                            <div className="flex mt-5 mb-3">
                                <FloatLabel>
                                    <InputText
                                        id="last_name"
                                        style={{ background: "transparent" }}
                                        value={latsName}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <label
                                        htmlFor="last_name"
                                        style={{ color: "Var(--text-color)" }}
                                    >
                                        {translations.confirmPassword}
                                    </label>
                                </FloatLabel>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    icon="pi pi-save"
                                    label={translations.save}
                                    className="w-full"
                                    onClick={handleUpdateUser}
                                    style={{
                                        color: "Var(--text-color)",
                                        background: "transparent",
                                    }}
                                />
                                <Button
                                    icon="pi pi-times"
                                    label={translations.cancelacion}
                                    className="w-full"
                                    style={{
                                        color: "Var(--text-color)",
                                        background: "transparent",
                                    }}
                                    onClick={toggleChangePassword}
                                />
                            </div>
                        </div>
                    )}
                </div>
                </div>
                <div className="flex align-items-center pt-4 pl-4 pb-4 mt-auto cursor-pointer" onClick={handleLougout}>
                    <i className='pi pi-sign-out' style={{ fontSize: '20px' }} />
                    <span className="ml-3">{translations.logOut}</span>
                </div>
            </div>
        </>
    )
}


export default Settings;