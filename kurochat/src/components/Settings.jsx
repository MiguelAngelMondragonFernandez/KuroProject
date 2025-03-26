import React, {useContext}  from 'react'
import { Dropdown } from 'primereact/dropdown';
import { LanguageContext } from './LanguageContext';

function Settings() {
    const languages = [
        { name: "Español", code: "es", flag: "https://flagcdn.com/w40/es.png" },
        { name: "Inglés", code: "en", flag: "https://flagcdn.com/w40/gb.png" },
    ];
    const { translations, language, changeLanguage } = useContext(LanguageContext);

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
            <div className='flex flex-column'>
                <div className="flex h-2rem align-items-center">
                    <i className='pi pi-user'style={{ fontSize: '1.5rem' }}/>
                    <span className='ml-3'>{translations.profile}</span>
                </div>
                <div className="flex h-10rem align-items-center">
                    <div className='flex flex-column'>
                        <div className='flex'>
                            <i className='pi pi-globe' style={{fontSize: '2rem'}}/>
                            <span className="ml-3">{translations.changeLanguage}</span>
                        </div>
                        <div className='flex mt-3'>
                            <Dropdown 
                                value={languages.find((l) => l.code === language)} 
                                options={languages}
                                onChange={(e)=> changeLanguage(e.value.code)}
                                optionLabel="name"
                                placeholder="Seleccione un idioma"
                                itemTemplate={languageTemplate}
                                valueTemplate={languageTemplate}
                                className="w-full"
                                pt={{
                                    root: { className: "bg-blue-500 text-white rounded-lg px-2 shadow-md" },
                                    panel: { className: "bg-white border border-gray-300 rounded-lg shadow-lg" },
                                    item: ({ context }) => ({
                                    className: context.selected ? "bg-blue-600 text-white" : "hover:bg-blue-100",
                                    }),
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex h-10rem align-items-center">
                    <i className='pi pi-palette' style={{fontSize: '2rem'}}/>
                    <span className="ml-3">{translations.changeColor}</span>
                </div>
                <div className="flex h-2rem align-items-center">
                    <i className='pi pi-sign-out' style={{fontSize: '1.5rem'}}/>
                    <span className="ml-3">{translations.logOut}</span>
                </div>
            </div> 
        </>
    )
}

export default Settings;