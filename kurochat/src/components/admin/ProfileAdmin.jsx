import React, { useState } from "react";
import { Button } from "primereact/button";
import Swal from "sweetalert2";
import Leveling from '../../assets/img/solo.png';
import { Image } from 'primereact/image';
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import '../../admin.css'

const ProfileAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "Miguel",
    apellido_p: "Moreno",
    apellido_m: "García",
    email: "miguel.moreno@example.com",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = () => {
    setShowModal(false);
    Swal.fire({
      title: "Procesando...",
      text: "Por favor espera...",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      Swal.fire({
        title: "¡Actualizado!",
        text: "Tu perfil ha sido actualizado exitosamente.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        setShowModal(false);
      });
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login"); 
      }
    });
  };

  return (
    <div className="p-5">
      <h1 className="text-center text-3xl font-bold mb-5">Perfil del Administrador</h1>
      <div className="flex flex-column align-items-center gap-5">
        <div className="flex flex-column align-items-center">
          <div className="circle-container-admin">
            <Image src={Leveling} zoomSrc={Leveling} alt="Image" className="circle-admin" preview />
          </div>
          <h2 className="text-2xl font-semibold mt-3">{`${formData.nombre} ${formData.apellido_p} ${formData.apellido_m}`}</h2>
          <p className="text-gray-600 mt-2 text-xl">{formData.email}</p>
        </div>
        <div className="flex justify-content-center gap-4">
          <Button
            label="Editar Perfil"
            icon="pi pi-pencil"
            className="p-button-rounded p-button-info"
            onClick={() => setShowModal(true)}
          />
          <Button
            label="Cerrar Sesión"
            icon="pi pi-sign-out"
            className="p-button-rounded p-button-danger"
            onClick={handleLogout}
          />
        </div>
      </div>

      <EditProfile
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProfileAdmin;