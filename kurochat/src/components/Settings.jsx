import React, { useContext, useState, useRef, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { ColorPicker } from 'primereact/colorpicker';
import { LanguageContext } from './LanguageContext';
import { useTheme } from '../utils/ThemeContext';
import axios from "../utils/httpgateway"

function Settings() {
    const USUARIO_ID = 1; 

    const languages = [
        { name: "Español", code: "es", flag: "https://flagcdn.com/w40/es.png" },
        { name: "Inglés", code: "en", flag: "https://flagcdn.com/w40/gb.png" },
    ];
    const { translations, language, changeLanguage } = useContext(LanguageContext);
    const [loading, setLoading] = useState(false);
    const { themeColor, textColor, changeThemeColor } = useTheme();
    const toast = useRef(null);

    const getConfiguracion = async () => {
        // metodo pendiente porque el get id me lo bloquea por el CORS, pero funciona sin problema esta parte
        try {
            setLoading(true);
            
            const token = localStorage.getItem('token');
            
            const response = await axios.doGet(`configuracionesaplicacion/api/${USUARIO_ID}`);
            const configData = response.data[0];
            console.log(configData)
            
            if (configData) {
                changeThemeColor(configData.colorPricipal);
                changeLanguage(configData.idioma);
                setLoading(false);
            } else {
                console.error('No se encontró la configuración del usuario');
                setLoading(false);
            }
        } catch (err) {
            console.error('Error al obtener la configuración:', err);
            setLoading(false);
        }
    }

    const showSuccessToast = (message) => {
        if (toast.current) {
            toast.current.show({ 
                severity: 'success', 
                summary: 'Éxito', 
                detail: message, 
                life: 3000 
            });
        }
    };

    const showErrorToast = (message) => {
        if (toast.current) {
            toast.current.show({ 
                severity: 'error', 
                summary: 'Error', 
                detail: message, 
                life: 3000 
            });
        }
    };

    const saveConfiguracion = async (configData) => {
        try {
            setLoading(true);
            
            const configToSave = {
                colorPricipal: themeColor,
                tema: 'light',
                idioma: language,
                usuario: USUARIO_ID,
                ...configData
            };
            
            const token = localStorage.getItem('token');
            
            await axios.doPut(`configuracionesaplicacion/api/${USUARIO_ID}`, configToSave)
            
            showSuccessToast('Configuración guardada con éxito');
            setLoading(false);
        } catch (err) {
            console.error('Error al guardar la configuración:', err);
            showErrorToast('Error al guardar la configuración');
            setLoading(false);
        }
    };

   

    const languageTemplate = (option) => {
        if (!option || !option.flag) return null;
        return (
            <div className="flex items-center gap-2">
                <img src={option.flag} alt={option.name} className="w-5 h-5" />
                <span>{option.name}</span>
            </div>
        );
    };

    const handleColorChange = (e) => {
        const newColor = '#' + e.value;
        changeThemeColor(newColor);
        saveConfiguracion({ colorPricipal: newColor });
    };

    const handleLanguageChange = (e) => {
        const newLanguage = e.value.code;
        changeLanguage(newLanguage);
        saveConfiguracion({ idioma: newLanguage });
    };

    return (
        <>
            <div className='flex flex-column border-[var(--text-color)] border-1' style={{background:"var(--theme-color)" ,color:"Var(--text-color)"}}>
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
                                value={languages.find((l) => l.code === language)}
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
                        <i className="pi pi-palette" style={{ fontSize: '2rem' }} />
                        <span className="ml-3">{translations.changeColor}</span>
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
                <div className="flex align-items-center p-3">
                    <i className='pi pi-sign-out' style={{ fontSize: '1.5rem' }} />
                    <span className="ml-3">{translations.logOut}</span>
                </div>
            </div>
        </>
    );
}

export default Settings;