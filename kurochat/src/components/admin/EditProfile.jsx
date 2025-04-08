import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import FileInput from "../FileInput";
import "../../admin.css";

const EditProfile = ({ showModal, setShowModal, formData, handleSubmit, setFile }) => {
  const [localFormData, setLocalFormData] = useState({ ...formData });

  useEffect(() => {
    if (showModal) {
      setLocalFormData({ ...formData });
    }
  }, [showModal, formData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLocalFormData({ ...localFormData, [id]: value });
  };

  const handleSave = () => {
    handleSubmit(localFormData); 
    setShowModal(false);
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
        </div>
        <div>
          <label htmlFor="email" className="font-semibold label-spacing">
            Correo Electrónico:
          </label>
          <InputText
            id="email"
            keyfilter="email"
            placeholder="Ingrese su correo electrónico"
            className="input-full"
            value={localFormData.email}
            onChange={handleInputChange}
          />
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