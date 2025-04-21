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
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Settings({ setState, userData, getUser }) {
    const { config, translations, changeLanguage, updateConfig } = useContext(LanguageContext);
    const languages = [
        { name: translations.spanish, code: "es", flag: "https://flagcdn.com/w40/es.png" },
        { name: translations.english, code: "en", flag: "https://flagcdn.com/w40/gb.png" },
    ];    
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
    const [file, setFile] = React.useState(null)
    const pathImg = userData.url_photo || "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png";

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            const token = user.access_token;
            const configToSave = { ...config, usuario: USUARIO_ID, id: idConfig };
            const response = await axios.doPut(
                `configuracionesaplicacion/api/${idConfig}/`,
                configToSave,
                {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  }
              );
            const updatedConfig = { ...configToSave, id: response.data.id };
            updateConfig(updatedConfig);
            localStorage.setItem('config', JSON.stringify(updatedConfig));
            showAlert('success',`${translations.cofigData}`, `${translations.dataUser}`);
        } catch (err) {
            console.error("Error:", err);
            showAlert('error', `${translations.cofigDataError}`,'Error');
        }
    };
    const profileSchema = Yup.object().shape({
        name: Yup.string()
            .required(`${translations.nameObligated}`)
            .matches(
                /^[A-Z][a-z]+((\s[A-Z][a-z]+)?)$/,
                `${translations.mayusLetterName}`
            )
            .min(2, `${translations.minLengthName}`)
            .max(50, `${translations.maxLengthName}`),
        firstName: Yup.string()
            .required(`${translations.firstNameObligated}`)
            .matches(
                /^[A-Z][a-z]+$/,
                `${translations.mayusLetterFirstName}`
            )
            .min(2, `${translations.minLengthFirstName}`)
            .max(50, `${translations.maxLengthFirstName}`),
        lastName: Yup.string()
            .required(`${translations.lastNameObligated}`)
            .matches(
                /^[A-Z][a-z]+$/,
                `${translations.mayusLetterLastName}`    
            )
            .min(2, `${translations.minLengthLastName}`)
            .max(50, `${translations.maxLengthLastName}`)
    });
    

    const handleUpdateUser = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.access_token;

            var photoUrl = userData.url_photo; // Por defecto usamos la actual

            if (file) {
                const uploadResponse = await axios.doPostFormData(file).then(response => response.data).catch(error => {
                    console.error('Error', error); return null;
                })
                photoUrl = uploadResponse?.path || "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png";
            }

            // Usamos los valores del formulario proporcionados por Formik
            const updatedData = {
                email: user.email,
                name: values.name,
                first_name: values.firstName,
                last_name: values.lastName,
                url_photo: photoUrl,
            };

            const response = await axios.doPut(`users/updateUser/${userData.id}/`, updatedData);

            showAlert('success', `${translations.infoUser}`, `${translations.dataUser}`);
            setIsEditing(false);
            const updatedUser = { ...user, ...updatedData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            getUser();
            setFile(null);
        } catch (error) {
            console.error("Error: ", error);
            showAlert('error', `${translations.dataUserError}`,'Error', );
        }
    };

    const passwordSchema = Yup.object().shape({
        newPassword: Yup.string()
            .required(`${translations.passwordObligated}`)
            .min(8,`${translations.minLengthPass}`)
            .matches(/[a-z]/, `${translations.lowercaseLetterPassword}`)
            .matches(/[A-Z]/, `${translations.mayusLetterPassword}`)
            .matches(/\d/, `${translations.numberPassword}`)
            .matches(/[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]/,  `${translations.specialCharacterPassword}`),
        confirmPassword: Yup.string()
            .required(`${translations.confirmPassword}`)
            .oneOf([Yup.ref('newPassword'), null], `${translations.comparePassword}`),
    });

    const changePassword = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.access_token;
            const email = user.email;

            if (newPassword !== confirmPassword) {
                showAlert('error',  `${translations.comparePassword}`,'Error');
                return;
            }
            const updatedData = {
                email: email,
                password: newPassword
            };

            const response = await axios.doPut(`users/updatePassword/`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            showAlert('success', `${translations.Password}`,`${translations.dataPassword}`);
            setIsChangePassword(false);
        } catch (error) {
            console.error("Error: ", error);
            showAlert('error',  `${translations.dataPasswordError}`,"Error");
        }
    }

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
        showAlert('loading', `${translations.loading}`,`${translations.waitLogOut}`);
        localStorage.clear();
        setTimeout(() => {
            navigate('/login');
            showAlert('success', `${translations.thanks}`,`${translations.sessionLogOut}`,  );
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

    useEffect(() => {
        if (userData) {
            setName(userData.name || '');
            setFirstName(userData.first_name || '');
            setLastName(userData.last_name || '');
        }
    }, [userData]);

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
                                    <img className='border-circle w-6rem h-6rem ' src={pathImg} alt="" srcSet="" />

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

                                    <Formik
                                        initialValues={{
                                            name: userData.name || '',
                                            firstName: userData.first_name || '',
                                            lastName: userData.last_name || ''
                                        }}
                                        validationSchema={profileSchema}
                                        onSubmit={handleUpdateUser}
                                    >
                                        {({ errors, touched }) => (
                                            <Form>
                                                <div className="flex flex-column mb-5">
                                                    <FloatLabel className="w-full">
                                                        <Field
                                                            as={InputText}
                                                            id="name"
                                                            name="name"
                                                            style={{ background: 'transparent' }}
                                                            className={`border-1 w-full ${errors.name && touched.name ? 'p-invalid' : ''}`}
                                                        />
                                                        <label htmlFor="name" style={{ color: "var(--text-color)" }}>{translations.name}</label>
                                                    </FloatLabel>
                                                    <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                                                </div>

                                                <div className="flex flex-column mb-5">
                                                    <FloatLabel className="w-full">
                                                        <Field
                                                            as={InputText}
                                                            id="firstName"
                                                            name="firstName"
                                                            style={{ background: 'transparent' }}
                                                            className={`w-full ${errors.firstName && touched.firstName ? 'p-invalid' : ''}`}
                                                        />
                                                        <label htmlFor="firstName" style={{ color: "var(--text-color)" }}>{translations.first_name}</label>
                                                    </FloatLabel>
                                                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
                                                </div>

                                                <div className="flex flex-column mb-4">
                                                    <FloatLabel className="w-full">
                                                        <Field
                                                            as={InputText}
                                                            id="lastName"
                                                            name="lastName"
                                                            style={{ background: 'transparent' }}
                                                            className={`w-full ${errors.lastName && touched.lastName ? 'p-invalid' : ''}`}
                                                        />
                                                        <label htmlFor="lastName" style={{ color: "var(--text-color)" }}>{translations.last_name}</label>
                                                    </FloatLabel>
                                                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
                                                </div>

                                                <div className="flex gap-2 mt-3">
                                                    <Button
                                                        icon="pi pi-save"
                                                        label={translations.save}
                                                        className='w-full'
                                                        type="submit"
                                                        style={{ color: "Var(--text-color)", background: 'transparent' }}
                                                    />
                                                    <Button
                                                        icon="pi pi-times"
                                                        label={translations.cancelacion}
                                                        className='w-full'
                                                        style={{ color: "Var(--text-color)", background: 'transparent' }}
                                                        onClick={toggleEdit}
                                                        type="button"
                                                    />
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
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
                            <Formik
                                initialValues={{
                                    newPassword: '',
                                    confirmPassword: '',
                                }}
                                validationSchema={passwordSchema}
                                onSubmit={(values) => {
                                    setNewPassword(values.newPassword);
                                    setConfirmPassword(values.confirmPassword);
                                    changePassword();
                                }}
                            >
                                {({ handleSubmit }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <div className="flex mt-5 mb-3 relative">
                                            <FloatLabel className="w-full">
                                                <Field
                                                    as={InputText}
                                                    type={showNewPassword ? "text" : "password"}
                                                    id="newPassword"
                                                    name="newPassword"
                                                    style={{
                                                        background: "transparent",
                                                        paddingRight: "2.5rem" // espacio para el ojito
                                                    }}
                                                    className="w-full"
                                                />
                                                <label htmlFor="newPassword" style={{ color: "var(--text-color)" }}>
                                                    {translations.newPassword}
                                                </label>
                                                <i
                                                    className={`pi ${showNewPassword ? 'pi-eye-slash' : 'pi-eye'} cursor-pointer`}
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    style={{
                                                        fontSize: '1.2rem',
                                                        color: 'var(--text-color)',
                                                        position: 'absolute',
                                                        top: '50%',
                                                        right: '0.75rem',
                                                        transform: 'translateY(-50%)'
                                                    }}
                                                />
                                            </FloatLabel>
                                        </div>

                                        <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
                                        <div className="flex mt-5 mb-3 relative">

                                            <FloatLabel className="w-full">
                                                <Field
                                                    as={InputText}
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    className="w-full"
                                                    style={{
                                                        background: "transparent",
                                                        paddingRight: "2.5rem"
                                                    }}

                                                />
                                                <label htmlFor="confirmPassword" style={{ color: "Var(--text-color)" }}>
                                                    {translations.confirmPassword}
                                                </label>
                                                <i
                                                    className={`pi ${showConfirmPassword ? 'pi-eye-slash' : 'pi-eye'} absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer`}
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    style={{
                                                        fontSize: '1.2rem',
                                                        color: 'var(--text-color)',
                                                        position: 'absolute',
                                                        top: '50%',
                                                        right: '0.75rem',
                                                        transform: 'translateY(-50%)'
                                                    }}
                                                />
                                            </FloatLabel>                                        </div>
                                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />

                                        <div className="flex gap-2 mt-4">
                                            <Button
                                                icon="pi pi-save"
                                                label={translations.save}
                                                className="w-full"
                                                type="submit"
                                                onClick={changePassword}
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
                                    </Form>
                                )}
                            </Formik>
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