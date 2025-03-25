import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import '../../admin.css'

const EditUser = ({
  showModal,
  setShowModal,
  formData,
  handleInputChange,
  handleSubmit,
  onUpload,
  toast,
}) => {
  return (
    <Dialog
      header="Editar Usuario"
      visible={showModal}
      onHide={() => setShowModal(false)}
      style={{ width: "35vw", borderRadius: "10px" }}
    >
      <div className="p-fluid flex flex-column gap-4 p-2">
        <div>
          <label htmlFor="nombre" className="font-semibold label-spacing">
            Nombre(s):
          </label>
          <InputText
            id="nombre"
            placeholder="Ingrese su nombre"
            className="input-full"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="apellido_p" className="font-semibold label-spacing">
            Apellido Paterno:
          </label>
          <InputText
            id="apellido_p"
            placeholder="Ingrese su apellido paterno"
            className="input-full"
            value={formData.apellido_p}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="apellido_m" className="font-semibold label-spacing">
            Apellido Materno:
          </label>
          <InputText
            id="apellido_m"
            placeholder="Ingrese su apellido materno"
            className="input-full"
            value={formData.apellido_m}
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
          <label htmlFor="foto" className="font-semibold label-spacing">
            Foto de Perfil:
          </label>
          <Toast ref={toast}></Toast>
          <FileUpload
            mode="basic"
            name="demo[]"
            accept="image/*"
            maxFileSize={1000000}
            onUpload={onUpload}
            className="file-upload-custom p-button-success"
          />
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