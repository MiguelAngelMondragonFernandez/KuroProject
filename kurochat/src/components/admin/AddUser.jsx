import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import FileInput from "../FileInput"; // Importar el componente FileInput
import "../../admin.css";

const AddUser = ({
  showModal,
  setShowModal,
  formData,
  handleInputChange,
  handleSubmit,
  password,
  setPassword,
  password1,
  setPassword1,
  setFile, // Nuevo prop para manejar el archivo
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Dialog
      header="Agregar Usuario"
      visible={showModal}
      onHide={() => setShowModal(false)}
      style={{ width: "35vw", borderRadius: "10px" }}
    >
      <div className="p-fluid flex flex-column gap-4 p-2">
        <div>
          <label htmlFor="first_name" className="font-semibold label-spacing">
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
          <label htmlFor="last_name" className="font-semibold label-spacing">
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
          <FileInput File={setFile} />
        </div>
        <div>
          <label htmlFor="password" className="font-semibold label-spacing">
            Contraseña:
          </label>
          <div className="p-inputgroup">
            <InputText
              id="password"
              placeholder="Ingrese su contraseña"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-full"
            />
            <Button
              icon={showPassword ? "pi pi-eye-slash" : "pi pi-eye"}
              onClick={() => setShowPassword(!showPassword)}
              className="p-button-secondary"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password1" className="font-semibold label-spacing">
            Confirmar Contraseña:
          </label>
          <div className="p-inputgroup">
            <InputText
              id="password1"
              placeholder="Confirme su contraseña"
              type={showConfirmPassword ? "text" : "password"}
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              className="input-full"
            />
            <Button
              icon={showConfirmPassword ? "pi pi-eye-slash" : "pi pi-eye"}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="p-button-secondary"
            />
          </div>
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

export default AddUser;