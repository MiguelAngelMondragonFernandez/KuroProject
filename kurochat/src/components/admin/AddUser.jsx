import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import FileInput from "../FileInput";
import "../../admin.css";

const initialValues = {
  name: "",
  first_name: "",
  last_name: "",
  email: "",
};

const AddUser = ({
  showModal,
  setShowModal,
  formData,
  setFormData,
  handleInputChange,
  password,
  setPassword,
  password1,
  setPassword1,
  setFile,
  file,
  handleSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (showModal) {
      setFormData(initialValues);
      setPassword("");
      setPassword1("");
      setFile(null);
      setErrors({});
    }
  }, [showModal, setFormData, setPassword, setPassword1, setFile]);

  const validateName = (name) => /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(name);
  const validateFirstName = (firstName) => /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(firstName);
  const validateLastName = (lastName) => /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(lastName);
  const validateEmail = (email) =>
    /^[a-zñA-ZÑ0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,4}$/.test(email);
  const validatePassword = (password) => /^(?=.*[a-z]).{8,}$/.test(password);
  const validateConfirmPassword = (pass, confirmPass) => pass === confirmPass;

  const handleFormSubmit = () => {
    const newErrors = {};

    if (!validateName(formData.name)) newErrors.name = "Nombre inválido";
    if (!validateFirstName(formData.first_name)) newErrors.first_name = "Apellido Paterno inválido";
    if (!validateLastName(formData.last_name)) newErrors.last_name = "Apellido Materno inválido";
    if (!validateEmail(formData.email)) newErrors.email = "Correo inválido";
    if (!file) newErrors.file = "La imagen es requerida";
    if (!validatePassword(password))
      newErrors.password = "Debe tener al menos 8 caracteres y una minúscula";
    if (!validateConfirmPassword(password, password1))
      newErrors.password1 = "Las contraseñas no coinciden";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    handleSubmit();
  };


  return (
    <Dialog
      header="Agregar Usuario"
      visible={showModal}
      onHide={() => setShowModal(false)}
      style={{ width: "35vw", borderRadius: "10px" }}
    >
      <div className="p-fluid flex flex-column gap-4 p-2">
        <div>
          <label htmlFor="name" className="font-semibold label-spacing">Nombre(s):</label>
          <InputText
            id="name"
            placeholder="Ingrese su nombre"
            className="input-full"
            value={formData.name}
            onChange={(e) => {
              handleInputChange(e);
              const value = e.target.value;
              setErrors((prevErrors) => ({
                ...prevErrors,
                name: validateName(value) ? null : "Nombre inválido",
              }));
            }}
            required
          />
          {errors.name && <small className="text-red-500">{errors.name}</small>}
        </div>

        <div>
          <label htmlFor="first_name" className="font-semibold label-spacing">Apellido Paterno:</label>
          <InputText
            id="first_name"
            placeholder="Ingrese su apellido paterno"
            className="input-full"
            value={formData.first_name}
            onChange={(e) => {
              handleInputChange(e);
              const value = e.target.value;
              setErrors((prevErrors) => ({
                ...prevErrors,
                first_name: validateFirstName(value) ? null : "Apellido Paterno inválido",
              }));
            }}
            required
          />
          {errors.first_name && <small className="text-red-500">{errors.first_name}</small>}
        </div>

        <div>
          <label htmlFor="last_name" className="font-semibold label-spacing">Apellido Materno:</label>
          <InputText
            id="last_name"
            placeholder="Ingrese su apellido materno"
            className="input-full"
            value={formData.last_name}
            onChange={(e) => {
              handleInputChange(e);
              const value = e.target.value;
              setErrors((prevErrors) => ({
                ...prevErrors,
                last_name: validateLastName(value) ? null : "Apellido Materno inválido",
              }));
            }}
            required
          />
          {errors.last_name && <small className="text-red-500">{errors.last_name}</small>}
        </div>

        <div>
          <label htmlFor="email" className="font-semibold label-spacing">Correo Electrónico:</label>
          <InputText
            id="email"
            keyfilter="email"
            placeholder="Ingrese su correo electrónico"
            className="input-full"
            value={formData.email}
            onChange={(e) => {
              handleInputChange(e);
              const value = e.target.value;
              setErrors((prevErrors) => ({
                ...prevErrors,
                email: validateEmail(value) ? null : "Correo inválido",
              }));
            }}
            required
          />
          {errors.email && <small className="text-red-500">{errors.email}</small>}
        </div>

        <div>
          <label htmlFor="url_photo" className="font-semibold label-spacing">Foto de Perfil:</label>
          <FileInput
            File={(file) => {
              setFile(file);
              setErrors((prevErrors) => ({
                ...prevErrors,
                file: file ? null : "La imagen es requerida", 
              }));
            }}
          />
          {errors.file && <small className="text-red-500">{errors.file}</small>}
        </div>

        <div>
          <label htmlFor="password" className="font-semibold label-spacing">Contraseña:</label>
          <div className="p-inputgroup">
            <InputText
              id="password"
              placeholder="Ingrese su contraseña"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  password: validatePassword(value) ? null : "Debe tener al menos 8 caracteres y una minúscula",
                  password1: validateConfirmPassword(value, password1) ? null : "Las contraseñas no coinciden",
                }));
              }}
              className="input-full"
              required
            />
            <Button
              icon={showPassword ? "pi pi-eye-slash" : "pi pi-eye"}
              onClick={() => setShowPassword(!showPassword)}
              className="p-button-secondary"
            />
          </div>
          {errors.password && <small className="text-red-500">{errors.password}</small>}
        </div>

        <div>
          <label htmlFor="password1" className="font-semibold label-spacing">Confirmar Contraseña:</label>
          <div className="p-inputgroup">
            <InputText
              id="password1"
              placeholder="Confirme su contraseña"
              type={showConfirmPassword ? "text" : "password"}
              value={password1}
              onChange={(e) => {
                const value = e.target.value;
                setPassword1(value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  password1: validateConfirmPassword(password, value) ? null : "Las contraseñas no coinciden",
                }));
              }}
              className="input-full"
              required
            />
            <Button
              icon={showConfirmPassword ? "pi pi-eye-slash" : "pi pi-eye"}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="p-button-secondary"
            />
          </div>
          {errors.password1 && <small className="text-red-500">{errors.password1}</small>}
        </div>

        <div className="flex justify-center gap-4 mt-3">
          <Button
            label="Cancelar"
            className="p-button-danger p-button-rounded custom-btn"
            onClick={() => setShowModal(false)}
          />
          <Button
            label="Guardar"
            className="p-button-success p-button-rounded custom-btn"
            onClick={handleFormSubmit}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default AddUser;
