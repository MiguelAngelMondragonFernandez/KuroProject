import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import '../../admin.css'

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
}) => {
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
            id="first_name"
            placeholder="Ingrese su nombre"
            className="input-full"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="last_name" className="font-semibold label-spacing">
            Apellidos:
          </label>
          <InputText
            id="last_name"
            placeholder="Ingrese su apellidos"
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
            URL de Foto de Perfil:
          </label>
          <InputText
            id="url_photo"
            placeholder="Ingrese su url de foto de perfil"
            className="input-full"
            value={formData.url_photo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="font-semibold label-spacing">
            Contraseña:
          </label>
          <Password
            id="password"
            placeholder="Ingrese su nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleMask
            className="input-full"
          />
        </div>
        <div>
          <label htmlFor="password1" className="font-semibold label-spacing">
            Confirmar Contraseña:
          </label>
          <Password
            id="password1"
            placeholder="Ingrese nuevamente la contraseña"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            toggleMask
            className="input-full"
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

export default AddUser;