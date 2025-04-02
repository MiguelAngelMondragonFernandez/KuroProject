import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from '../utils/httpgateway'
import React from "react";
import { showAlert } from "../utils/alerts";
import { useNavigate } from "react-router-dom";

function Login() {
    const [isMounted, setIsMounted] = React.useState(false);
    const [typeInput, setTypeInput] = React.useState("password");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [validForm, setValidForm] = React.useState(true);
    const [validEmail, setValidEmail] = React.useState(false);
    const [validPassword, setValidPassword] = React.useState(false);
    const navigate = useNavigate();


    const validateEmail = (email) => {
        const regex = /^[a-zñA-ZÑ0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,4}$/;
        setValidEmail(!regex.test(email));
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z]).{6,}$/;
        setValidPassword(!regex.test(password));
    };


    const SetLogin = async (e) => {
        e.preventDefault();
        showAlert('loading', 'Iniciando sesión', '¡Espera un momento!')
        const data = {
            email: email,
            password: password
        }
        await axios.doPost('users/login/', data)
        .then(response => {
            const {user} = response.data;  
            localStorage.setItem('user', JSON.stringify(user));        
            showAlert('success', 'Inicio de sesión exitoso', '¡Bienvenido!')
            setTimeout(() => {
                navigate('/chats')
            }, 2000);
        }).catch((error) => {
            showAlert('error', 'Error al iniciar sesión', '¡Error!')
        });
    };

    React.useEffect(() => {
        if (isMounted) {
            validateEmail(email);
            validatePassword(password);
            setValidForm(() => validEmail || validPassword);
        }
    }, [email, password]);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);


    return (
        <div className="flex flex-col justify-content-center align-items-center h-screen p-5 text-white">
            <div className="shadow-lg rounded-lg p-6 w-5 max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

                <div className="mb-4">
                    <label>Correo Electrónico:</label>
                    <InputText
                        className={`w-full p-2 border rounded ${validEmail && "p-invalid"}`}
                        placeholder="Escribe tu dirección de correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {validEmail && (
                        <small className="text-red-400">El correo electrónico no es válido</small>
                    )}
                </div>

                <div className="mb-4">
                    <label>Contraseña:</label>
                    <div className="field w-full">
                        <InputText
                            id="password"
                            className={`col-11 p-2 border rounded pr-10 ${validPassword && "p-invalid"}`}
                            type={typeInput}
                            placeholder="Escribe tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            onClick={() => setTypeInput(typeInput === "password" ? "text" : "password")}
                            icon={typeInput === "password" ? "pi pi-eye" : "pi pi-eye-slash"}
                        />
                    </div>
                    {validPassword && (
                        <small className="text-red-400">Debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número</small>
                    )}
                </div>

                <Button
                    label="Login"
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    onClick={SetLogin}
                    disabled={validForm}
                />
            </div>
        </div>
    );
}

export default Login;
