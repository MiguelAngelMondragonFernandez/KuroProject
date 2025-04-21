import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import FileInput from "../FileInput";
import "../../admin.css";

const EditUser = ({
  showModal,
  setShowModal,
  formData,
  handleInputChange,
  handleSubmit,
  setFile,
  file,
}) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (showModal) {
      setErrors({});
    }
  }, [showModal]);

  const validateName = (name) => /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(name);
  const validateFirstName = (firstName) => /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(firstName);
  const validateLastName = (lastName) => /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(lastName);
  const validateEmail = (email) =>
    /^[a-zñA-ZÑ0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,4}$/.test(email);

  const handleFormSubmit = () => {
    const newErrors = {};
  
    if (!validateName(formData.name)) newErrors.name = "Nombre inválido";
    if (!validateFirstName(formData.first_name)) newErrors.first_name = "Apellido Paterno inválido";
    if (!validateLastName(formData.last_name)) newErrors.last_name = "Apellido Materno inválido";
    if (!validateEmail(formData.email)) newErrors.email = "Correo inválido";
    if (!file && !formData.url_photo) newErrors.file = "La imagen es requerida";
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      handleSubmit(); 
    }
  };

  const handleInputAndValidation = (e, field, validateFunc, errorMsg) => {
    handleInputChange(e);
    const value = e.target.value;
    setErrors((prev) => ({
      ...prev,
      [field]: validateFunc(value) ? null : errorMsg,
    }));
  };

  return (
    <Dialog
      header="Editar Usuario"
      visible={showModal}
      onHide={() => setShowModal(false)}
      style={{ width: "35vw", borderRadius: "10px" }}
    >
      <div className="p-fluid flex flex-column gap-4 p-2">
        <div>
          <label htmlFor="name" className="font-semibold label-spacing">
            Nombre(s):
          </label>
          <InputText
            id="name"
            placeholder="Ingrese su nombre"
            className="input-full"
            value={formData.name}
            onChange={(e) =>
              handleInputAndValidation(e, "name", validateName, "Nombre inválido")
            }
          />
          {errors.name && <small className="text-red-500">{errors.name}</small>}
        </div>

        <div>
          <label htmlFor="first_name" className="font-semibold label-spacing">
            Apellido Paterno:
          </label>
          <InputText
            id="first_name"
            placeholder="Ingrese su apellido paterno"
            className="input-full"
            value={formData.first_name}
            onChange={(e) =>
              handleInputAndValidation(e, "first_name", validateFirstName, "Apellido Paterno inválido")
            }
          />
          {errors.first_name && <small className="text-red-500">{errors.first_name}</small>}
        </div>

        <div>
          <label htmlFor="last_name" className="font-semibold label-spacing">
            Apellido Materno:
          </label>
          <InputText
            id="last_name"
            placeholder="Ingrese su apellido materno"
            className="input-full"
            value={formData.last_name}
            onChange={(e) =>
              handleInputAndValidation(e, "last_name", validateLastName, "Apellido Materno inválido")
            }
          />
          {errors.last_name && <small className="text-red-500">{errors.last_name}</small>}
        </div>

        <div>
          <label htmlFor="email" className="font-semibold label-spacing">
            Correo Electrónico:
          </label>
          <InputText
            id="email"
            placeholder="Ingrese su correo electrónico"
            className="input-full"
            value={formData.email}
            onChange={(e) =>
              handleInputAndValidation(e, "email", validateEmail, "Correo inválido")
            }
          />
          {errors.email && <small className="text-red-500">{errors.email}</small>}
        </div>

        <div>
          <label htmlFor="url_photo" className="font-semibold label-spacing">
            Foto de Perfil:
          </label>
          <FileInput
            File={(file) => {
              setFile(file);
              setErrors((prev) => ({
                ...prev,
                file: file ? null : "La imagen es requerida",
              }));
            }}
          />
          {errors.file && <small className="text-red-500">{errors.file}</small>}
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

export default EditUser;
