import React, { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { ColorPicker } from 'primereact/colorpicker';
import { LanguageContext } from './LanguageContext';
import { useTheme } from '../utils/ThemeContext';
import axios from "../utils/httpgateway"
import { showAlert } from '../utils/alerts'
import { useNavigate } from 'react-router-dom';

function Settings({setState}) {
    const languages = [
        { name: "Español", code: "es", flag: "https://flagcdn.com/w40/es.png" },
        { name: "Inglés", code: "en", flag: "https://flagcdn.com/w40/gb.png" },
    ];
    const { config, translations, changeLanguage, updateConfig } = useContext(LanguageContext);
    const { themeColor, changeThemeColor } = useTheme();
    const navigate = useNavigate();

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
                <img src={option.flag} alt={option.name} className="w-5 h-5" />
                <span>{option.name}</span>
            </div>
        );
    };

    

    return (
        <>
            <div className='flex flex-column h-screen border-[var(--text-color)] border-1' style={{background:"var(--theme-color)" ,color:"Var(--text-color)"}}>
                <div className="flex align-items-center border-[var(--text-color)] border-bottom-1 p-3">
                    <span className='ml-3'>{translations.settings}</span>
                    <i 
                        className='pi pi-angle-left' 
                        style={{ fontSize: '1.5rem' }} 
                        onClick={() => setState("listChats")}
                    />
                </div>
                <div className="flex align-items-center border-[var(--text-color)] border-bottom-1 p-3">
                    <i className='pi pi-user' style={{ fontSize: '1.5rem' }} />
                    <span className='ml-3'>{translations.profile}</span>
                </div>
                <div className="flex align-items-center border-[var(--text-color)] border-bottom-1 p-3">
                    <div className='flex flex-column'>
                        <div className='flex'>
                            <i className='pi pi-globe' style={{ fontSize: '2rem' }} />
                            <span className="ml-3">{translations.changeLanguage}</span>
                        </div>
                        <div className='flex mt-3'>
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
                                    panel: { className: "bg-white border border-gray-300 rounded-lg shadow-lg" },
                                    input: { className: "w-full" },
                                    item: ({ context }) => ({
                                        className: context.selected ? "bg-blue-600 text-white" : "hover:bg-blue-100",
                                    }),
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex flex-column border-[var(--text-color)] border-bottom-1 p-3'>
                    <div className='flex'>
                        <i className="pi pi-palette" 
                            style={{ fontSize: '2rem' }} 
                        />
                        <span className="ml-3">Cambiar de color</span>
                    </div>
                    <div className="w-full h-16 flex flex-grow items-center gap-2">
                        <ColorPicker
                            id="color"
                            value={themeColor.replace('#', '')}
                            onChange={handleColorChange}
                            pt={{
                                root: {
                                    className: "border-0"
                                },
                                input: {
                                    className: "w-full mt-2",
                                    style: {
                                        border: `2px solid var(--text-color)`,
                                        borderRadius: '6px',
                                        padding: '4px',
                                        transition: 'all 0.3s ease'
                                    }},
                            }}
                        />
                    </div>
                </div>
                <div className="flex align-items-center p-3" onClick={handleLougout}>
                    <i className='pi pi-sign-out' style={{ fontSize: '1.5rem' }} />
                    <span className="ml-3">{translations.logOut}</span>
                </div>
                <div className='flex align-items-center p-3' onClick={updateConfiguracion}>
                    <i className='pi pi-save' style={{ fontSize: '1.5rem' }} />
                    <span className="ml-3">{translations.save}</span>
                </div>
            </div>
        </>
    )
} 


export default Settings;