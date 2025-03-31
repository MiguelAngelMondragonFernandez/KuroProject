import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import axios from '../utils/httpgateway'
import React from 'react'

function Register() {

    const [showPassword, setShowPassword] = React.useState('password')
    const [showConfirmPassword, setShowConfirmPassword] = React.useState('password')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [apP, setApP] = React.useState('')
    const [apM, setApM] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [urlPhoto, setUrlPhoto] = React.useState('')


    const SetRegister = async (e) => {
        e.preventDefault()
        const Register = {
            "name": name,
            "first_name": apP,
            "last_name": apM,
            "email": email,
            "password": password === confirmPassword ? password : null,
            "url_photo": urlPhoto
        }
        await axios.doPost('users/register/', Register)
            .then(response => {
                console.log(response)
            }
            )
            .catch(error => console.error(error))
    }

    const inputStyle = "w-full"
    return (
        <>
            <div className="flex justify-content-center align-items-center h-screen">
                <form onSubmit={SetRegister} className="field">
                    <div className="field">
                        <p>Nombre de usuario:</p>
                        <InputText onChange={e => setName(e.target.value)} className={inputStyle} />
                    </div>
                    <div className="field">
                        <p>Primer Apellido:</p>
                        <InputText onChange={e => setApP(e.target.value)} className={inputStyle} />
                    </div>
                    <div className="field">
                        <p>Segundo Apellido:</p>
                        <InputText onChange={e => setApM(e.target.value)} className={inputStyle} />
                    </div>
                    <div className="field">
                        <p>Correo Electrónico:</p>
                        <InputText onChange={e => setEmail(e.target.value)} className={inputStyle} />
                    </div>
                    <div className="field">
                        <div className="grid">
                            <p>Contraseña:</p>
                            <InputText onChange={e => setPassword(e.target.value)} type={showPassword} className='col-11' />
                            <Button onClick={() => { showPassword === 'password' ? setShowPassword('text') : setShowPassword('password') }} className='col-1' icon={showPassword === 'password' ? "pi pi-eye" : 'pi pi-eye-slash'} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="grid">
                            <p>Confirmación de Contraseña:</p>
                            <InputText onChange={e => setConfirmPassword(e.target.value)} type={showConfirmPassword} className='col-11' />
                            <Button onClick={() => { showConfirmPassword === 'password' ? setShowConfirmPassword('text') : setShowConfirmPassword('password') }} className='col-1' icon={showConfirmPassword === 'password' ? "pi pi-eye" : 'pi pi-eye-slash'} />
                        </div>
                    </div>
                    <div className="field">
                        <p>Foto de perfil:</p>
                        <input type='text' onChange={e => setUrlPhoto(e.target.value)} />
                    </div>
                    <Button label="Registrarse" className="" />
                </form>
            </div>
        </>
    )
}

export default Register