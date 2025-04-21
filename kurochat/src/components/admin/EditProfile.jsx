import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import FileInput from "../FileInput";
import "../../admin.css";

const EditProfile = ({ showModal, setShowModal, formData, handleSubmit, setFile }) => {
  const [localFormData, setLocalFormData] = useState({ ...formData });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (showModal) {
      setLocalFormData({ ...formData });
      setErrors({});
    }
  }, [showModal, formData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLocalFormData((prev) => ({ ...prev, [id]: value }));
    switch (id) {
      case "name":
        setErrors((prev) => ({
          ...prev,
          name: /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(value) ? null : "Nombre inválido",
        }));
        break;
      case "first_name":
        setErrors((prev) => ({
          ...prev,
          first_name: /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(value) ? null : "Apellido Paterno inválido",
        }));
        break;
      case "last_name":
        setErrors((prev) => ({
          ...prev,
          last_name: /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(value) ? null : "Apellido Materno inválido",
        }));
        break;
      case "email":
        setErrors((prev) => ({
          ...prev,
          email: /^[a-zñA-ZÑ0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,4}$/.test(value)
            ? null
            : "Correo inválido",
        }));
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(localFormData.name)) {newErrors.name = "Nombre inválido";}
    if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(localFormData.first_name)) {newErrors.first_name = "Apellido Paterno inválido";}
    if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/.test(localFormData.last_name)) {newErrors.last_name = "Apellido Materno inválido";}
    if (!/^[a-zñA-ZÑ0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,4}$/.test(localFormData.email)) {newErrors.email = "Correo inválido";}
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      handleSubmit(localFormData);
      setShowModal(false);
    }
  };

  return (
    <Dialog
      header="Editar Perfil"
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
            value={localFormData.name}
            onChange={handleInputChange}
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
            value={localFormData.first_name}
            onChange={handleInputChange}
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
            value={localFormData.last_name}
            onChange={handleInputChange}
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
            value={localFormData.email}
            onChange={handleInputChange}
          />
          {errors.email && <small className="text-red-500">{errors.email}</small>}
        </div>

        <div>
          <label htmlFor="url_photo" className="font-semibold label-spacing">
            Foto de Perfil:
          </label>
          <FileInput File={setFile} />
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
            onClick={handleSave}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default EditProfile;
