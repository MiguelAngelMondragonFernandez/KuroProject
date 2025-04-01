import React, { useContext } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { ColorPicker } from 'primereact/colorpicker';
import { LanguageContext } from './LanguageContext';
import { useTheme } from '../utils/ThemeContext';

function Settings() {
    const languages = [
        { name: "Español", code: "es", flag: "https://flagcdn.com/w40/es.png" },
        { name: "Inglés", code: "en", flag: "https://flagcdn.com/w40/gb.png" },
    ];
    const { translations, language, changeLanguage } = useContext(LanguageContext);
    const { themeColor, textColor, changeThemeColor } = useTheme();

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
        changeThemeColor(e.value);
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
                                onChange={(e) => changeLanguage(e.value.code)}
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
                <div className="flex align-items-center p-3">
                    <i className='pi pi-sign-out' style={{ fontSize: '1.5rem' }} />
                    <span className="ml-3">{translations.logOut}</span>
                </div>
            </div>
        </>
    );
}

export default Settings;