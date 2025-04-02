import React from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import axios from '../utils/httpgateway'
import { showAlert } from '../utils/alerts'
import { useNavigate, useParams } from 'react-router-dom'

function ResetPassword() {
const navigate = useNavigate()
const [password, setPassword] = React.useState('')

const [email, setEmail] = React.useState('')

const [token, setToken] = React.useState(useParams().token)


const resetPassword = async() => {
    console.log(password);
    console.log(token);
    
    await axios.doPost('users/reset/'+token+'/', {password})
    .then(
        (response) => {
            console.log(response)
            if(response.status === 200) {
                showAlert('success', 'Contraseña restablecida', 'Tu contraseña ha sido restablecida con éxito.')
                navigate('/login')
            } else {
                showAlert('error', 'Error al restablecer la contraseña', 'Por favor, verifica tu correo electrónico.')
            }
        })
    .catch((error) => { 
        console.error(error)
        showAlert('error', 'Error al restablecer la contraseña', 'Por favor, verifica tu correo electrónico.')
    }
    )
}

  return (
    <>
    <div className="flex">
        <div className="card flex justify-content-center align-items-center flex-column gap-3">
            <h2 className="text-900">Restablecer contraseña</h2>
            <p className="text-900">Por favor, ingresa tu nueva contraseña.</p>
            <InputText placeholder="Nueva contraseña" onChange={e=>setPassword(e.target.value)} type="password" className="w-full md:w-20rem" />
            <Button label="Restablecer" onClick={resetPassword} icon="pi pi-check" className="w-full md:w-20rem" />
            <p className="text-900">Recibirás un correo electrónico con instrucciones para restablecer tu contraseña.</p>
            <p className="text-900">Si no recibes el correo, verifica tu carpeta de spam o intenta nuevamente.</p>
            <p className="text-900">Si tienes problemas, contacta a soporte técnico.</p>
            <p className="text-900">¿Ya tienes una cuenta? <a href="/login" className="text-blue-500">Iniciar sesión</a></p>
            <p className="text-900">¿No tienes una cuenta? <a href="/register" className="text-blue-500">Crear cuenta</a></p>
        </div>
    </div>
    </>
  )
}

export default ResetPassword