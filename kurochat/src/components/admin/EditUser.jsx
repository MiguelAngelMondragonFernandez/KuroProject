import React, { useState } from "react";
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
}) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (file) => {
    setFile(file);
    setFileName(file.name);
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
            value={formData.first_name}
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
            value={formData.last_name}
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
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="url_photo" className="font-semibold label-spacing">
            Foto de Perfil:
          </label>
          <FileInput File={handleFileChange} />
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
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default EditUser;