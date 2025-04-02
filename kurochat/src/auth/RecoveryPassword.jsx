import React from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import axios from '../utils/httpgateway'
import { showAlert } from '../utils/alerts'

function RecoveryPassword() {

const [mail, setMail] = React.useState('')
const sendMail = async() => {
    console.log(mail);
    
    if(mail) {
        showAlert('loading', 'Enviando correo de recuperación...', 0)
        await axios.doPost('users/recovery/', { email: mail })
        .then((response) => {
            console.log(response)
            if(response.status === 200) {
                showAlert('success', 'Correo enviado', 'Revisa tu bandeja de entrada para restablecer tu contraseña.')
            } else {
                showAlert('error', 'Error al enviar el correo', 'Por favor, verifica tu correo electrónico.')
            }
        })
        .catch((error) => {
            console.error(error)
        })
    }

}
    return (
        <>
            <div className="flex">
                <div className="card flex justify-content-center align-items-center flex-column gap-3">
                    <h2 className="text-900">Recuperar contraseña</h2>
                    <p className="text-900">Por favor, ingresa tu correo electrónico para recuperar tu contraseña.</p>
                    <InputText placeholder="Correo electrónico" onChange={(e)=>setMail(e.target.value)} type="email" className="w-full md:w-20rem" />
                    <Button label="Enviar" onClick={sendMail} icon="pi pi-check" className="w-full md:w-20rem" />
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

export default RecoveryPassword