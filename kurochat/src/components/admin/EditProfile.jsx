import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import '../../admin.css'

const EditProfile = ({ showModal, setShowModal, formData, handleInputChange, handleSubmit }) => {
  return (
    <Dialog
      header="Editar Perfil"
      visible={showModal}
      onHide={() => setShowModal(false)}
      style={{ width: "35vw", borderRadius: "10px" }}
    >
      <div className="p-fluid flex flex-column gap-4 mt-3">
        <div>
          <label htmlFor="nombre" className="font-semibold mb-2">
            Nombre(s):
          </label>
          <InputText
            id="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="apellido_p" className="font-semibold mb-2">
            Apellido Paterno:
          </label>
          <InputText
            id="apellido_p"
            value={formData.apellido_p}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="apellido_m" className="font-semibold mb-2">
            Apellido Materno:
          </label>
          <InputText
            id="apellido_m"
            value={formData.apellido_m}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="font-semibold mb-2">
            Correo Electrónico:
          </label>
          <InputText
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <div className="flex justify-content-center gap-4 mt-3">
          <Button
            label="Cancelar"
            className="p-button-danger p-button-rounded"
            onClick={() => setShowModal(false)}
          />
          <Button
            label="Guardar"
            className="p-button-success p-button-rounded"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default EditProfile;