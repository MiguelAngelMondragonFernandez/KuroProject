import React, { useState, useContext, useEffect } from "react";
import { Button } from "primereact/button";
import Swal from "sweetalert2";
import { Image } from 'primereact/image';
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import '../../admin.css'
import axios, { logout, getUser } from "../../utils/httpgateway";

const ProfileAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const user = getUser();
  const name = user?.name || "";
  const firstName = user?.first_name || "";
  const lastName = user?.last_name || "";
  const email = user?.email || "";
  const url_photo = user?.url_photo || "";
  const [file, setFile] = React.useState(null)
  const [formData, setFormData] = useState({
    name: name,
    first_name: firstName,
    last_name: lastName,
    email: email,
    url_photo: url_photo,
  });

  const navigate = useNavigate();


  const handleSubmit = async (updatedData) => {
    try {
      let uploadData = { path: updatedData.url_photo };
      if (file) {
        const uploadResponse = await axios.doPostFormData(file)
          .then(response => response.data)
          .catch(error => {
            console.error("Error al subir la imagen:", error);
            return null;
          });
        if (uploadResponse) {
          uploadData = uploadResponse;
        }
      }
  
      const updatedProfile = {
        ...updatedData,
        url_photo: uploadData.path,
      };
  
      await axios.doPut(`users/updateUser/${getUser().id}/`, updatedProfile);
  
      const user = getUser();
      const updatedUser = { ...user, ...updatedProfile };
      localStorage.setItem("user", JSON.stringify(updatedUser));
  
      Swal.fire({
        title: "¡Actualizado!",
        text: "Tu perfil ha sido actualizado exitosamente.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
  
      setFormData(updatedProfile);
      setShowModal(false);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al actualizar el perfil. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
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
        logout();
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  })

  return (
    <div className="p-5">
      <h1 className="text-center text-3xl font-bold mb-5 text-color-custom">Perfil del Administrador</h1>
      <div className="flex flex-column align-items-center gap-5">
        <div className="flex flex-column align-items-center">
          <div className="circle-container-admin">
            <Image src={url_photo} zoomSrc={url_photo} alt="Image" className="circle-admin" preview />
          </div>
          <h2 className="text-2xl font-semibold mt-3 text-color-custom">{`${formData.name} ${formData.first_name} ${formData.last_name}`}</h2>
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
        handleSubmit={handleSubmit}
        setFile={setFile} 
      />
    </div>
  );
};

export default ProfileAdmin;