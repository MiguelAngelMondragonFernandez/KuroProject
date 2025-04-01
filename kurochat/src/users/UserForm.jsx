import React, { useState } from 'react';
import axios from '../utils/httpgateway.js';

function UserForm() {
    const [formData, setFormData] = useState({
        nombre: '',
        apP: '',
        apM: '',
        email: '',
        password: '',
        fotoPerfil: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado');
        console.log(formData);

        axios
            .doPost('users/api/', formData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <form id="container" method="POST" onSubmit={handleSubmit}>
                <label>
                    <p>Nombre:</p>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                </label>
                <label>
                    <p>apP:</p>
                    <input type="text" name="apP" value={formData.apP} onChange={handleChange} />
                </label>
                <label>
                    <p>apM:</p>
                    <input type="text" name="apM" value={formData.apM} onChange={handleChange} />
                </label>
                <label>
                    <p>email:</p>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                    <p>password:</p>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <label>
                    <p>url foto de perfil:</p>
                    <input type="text" name="fotoPerfil" value={formData.fotoPerfil} onChange={handleChange} />
                </label>
                <input type="submit" value="Agregar usuario" />
            </form>
        </>
    );
}

export default UserForm;