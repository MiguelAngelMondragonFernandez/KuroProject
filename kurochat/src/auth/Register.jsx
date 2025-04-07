import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import axios from '../utils/httpgateway'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { showAlert } from '../utils/alerts'
import FileInput from '../components/FileInput'
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
    const navigate = useNavigate()

    const [file, setFile] = React.useState(null)

    const asignarArchivo = (file) => {       
        setFile(file)
    }


    const SetRegister = async (e) => {
        e.preventDefault()
        
        try {
            const uploadResponse = await axios.doPostFormData(file).then(response => response.data).catch(error => {
                console.error('Error al subir la imagen:', error); return null;});
            const uploadData = uploadResponse ? uploadResponse : '../assets/defaul.png';
            const Register = {
            name,
            first_name: apP,
            last_name: apM,
            email,
            password: password === confirmPassword ? password : null,
            url_photo: uploadData.path 
            };

            await axios.doPost('users/register/', Register);
            showAlert('success', 'Registro exitoso', '¡Bienvenido!');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            console.error('Error:', error);
            showAlert('error', 'Error al registrar', '¡Error!');
        }
    }

    const inputStyle = "w-full"
    return (
        <>
            <div className="flex justify-content-center align-items-center h-screen" style={{ backgroundColor: '#F2E1C2' }}>
                <div onSubmit={SetRegister} className="field flex flex-column gap-3 bg-gray-800 p-5 border-round shadow-2">
                    <div className="field">
                        <FileInput File={asignarArchivo} />
                    </div>
                    <div className="grid">
                        <div className="field col-6">
                            <p>Nombre de usuario:</p>
                            <InputText onChange={e => setName(e.target.value)} className={inputStyle} />
                        </div>
                        <div className="field col-6">
                            <p>Primer Apellido:</p>
                            <InputText onChange={e => setApP(e.target.value)} className={inputStyle} />
                        </div>
                    </div>
                    <div className="grid">
                        <div className="field col-6">
                            <p>Segundo Apellido:</p>
                            <InputText onChange={e => setApM(e.target.value)} className={inputStyle} />
                        </div>
                        <div className="field col-6">
                            <p>Correo Electrónico:</p>
                            <InputText onChange={e => setEmail(e.target.value)} className={inputStyle} />
                        </div>
                    </div>
                    <div className="grid">
                        <div className="field col-6">
                            <div className="grid">
                                <p>Contraseña:</p>
                                <InputText onChange={e => setPassword(e.target.value)} type={showPassword} className='col-11' />
                                <Button onClick={() => { showPassword === 'password' ? setShowPassword('text') : setShowPassword('password') }} className='col-1' icon={showPassword === 'password' ? "pi pi-eye" : 'pi pi-eye-slash'} style={{ background: 'transparent', borderColor: 'transparent', color: 'white' }} />
                            </div>
                        </div>
                        <div className="field col-6">
                            <div className="grid">
                                <p>Confirmación de Contraseña:</p>
                                <InputText onChange={e => setConfirmPassword(e.target.value)} type={showConfirmPassword} className='col-11' />
                                <Button onClick={(e) => { showConfirmPassword === 'password' ? setShowConfirmPassword('text') : setShowConfirmPassword('password') }} className='col-1' icon={showConfirmPassword === 'password' ? "pi pi-eye" : 'pi pi-eye-slash'} style={{ background: 'transparent', borderColor: 'transparent', color: 'white' }} />
                            </div>
                        </div>
                    </div>
                    <Button label="Registrarse" onClick={SetRegister} className="" />
                </div>
            </div>
        </>
    )
}

export default Register