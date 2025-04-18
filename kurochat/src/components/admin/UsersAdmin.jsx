import React, { useState, useRef, useContext, useEffect } from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Swal from 'sweetalert2';
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import TableUser from "./TableUser";
import '../../admin.css'
import axios, { getToken, logout } from "../../utils/httpgateway";

function UsersAdmin() {
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [file, setFile] = React.useState(null)
  const [formData, setFormData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    url_photo: "",
    email: "",
    password: "",
    password1: "",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      logout();
    } else {
      axios
        .doGet("users/api/")
        .then((response) => {
          setUsers(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al cargar usuarios:", error);
          Swal.fire("Error", "No se pudieron cargar los usuarios", "error");
          setLoading(false);
        });
    }
  }, [getToken()]);

  if (loading) {
    return <p className="loading-text">Cargando usuarios...</p>;
  }

  const toggleStatus = async (userId, newStatus) => {
    const statusText = newStatus ? "habilitar" : "deshabilitar";

    const result = await Swal.fire({
      title: `¿Estás seguro?`,
      text: `¿Deseas ${statusText} este usuario?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Sí, ${statusText}`,
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button',
      },
    });

    if (result.isConfirmed) {
      try {
        await axios.doPatch(`users/changestatus/${userId}/`, { is_active: newStatus });
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, is_active: newStatus } : user
          )
        );
        Swal.fire(
          "¡Éxito!",
          `El estado del usuario ha sido cambiado a ${newStatus ? "Habilitado" : "Deshabilitado"}.`,
          "success"
        );
      } catch (error) {
        console.error("Error al cambiar el estado del usuario:", error);
        Swal.fire(
          "Error",
          "No se pudo cambiar el estado del usuario. Inténtalo de nuevo.",
          "error"
        );
      }
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = () => {
    setShowModal(false);
    Swal.fire({
      title: 'Procesando...',
      text: 'Por favor espera...',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% éxito, 20% error

      if (isSuccess) {
        Swal.fire({
          title: '¡Guardado!',
          text: 'El usuario ha sido guardado exitosamente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al guardar el usuario. Inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }, 2000);
  };

  const openEditModal = (user) => {
    console.log("Editar usuario:", user);
    setSelectedUser(user);
    setFormData({
      id: user.id,
      name: user.name,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      url_photo: user.url_photo,
      password: user.password,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      let uploadData = { path: formData.url_photo }; 
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
  
      const updatedUser = {
        name: formData.name,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        url_photo: uploadData.path,
        password: formData.password,
      };
  
      await axios.doPut(`users/updateUser/${selectedUser.id}/`, updatedUser);
  
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, ...updatedUser } : user
        )
      );
  
      Swal.fire({
        title: "¡Actualizado!",
        text: "El usuario ha sido actualizado exitosamente.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
  
      setShowEditModal(false);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al actualizar el usuario. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      setShowEditModal(false);
    }
  };

  const handleAddSubmit = async () => {
    try {
      if (!formData.name || !formData.first_name || !formData.last_name || !formData.email || !password || !password1) {
        Swal.fire({
          title: "Error",
          text: "Todos los campos son obligatorios.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      if (password !== password1) {
        Swal.fire({
          title: "Error",
          text: "Las contraseñas no coinciden.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      let uploadData = { path: "../assets/default.png" }; // Valor por defecto
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

      const newUser = {
        name: formData.name,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: password,
        url_photo: uploadData.path,
      };

      const response = await axios.doPost("users/api/", newUser);

      setUsers((prevUsers) => [...prevUsers, response.data]);

      Swal.fire({
        title: "¡Usuario Creado!",
        text: "El usuario ha sido agregado exitosamente.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      setShowModal(false);
      setFormData({
        name: "",
        first_name: "",
        last_name: "",
        email: "",
        url_photo: "",
      });
      setPassword("");
      setPassword1("");
      setFile(null);
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al agregar el usuario. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      setShowModal(false);
    }
  };

  const filteredUsers = Array.isArray(users)
  ? users.filter((user) => {
      const fullName = `${user.name} ${user.first_name} ${user.last_name}`.toLowerCase();
      const email = user.email.toLowerCase();
      const search = searchValue.toLowerCase();
      return fullName.includes(search) || email.includes(search);
    })
  : [];

  return (
    <>
      <div className="px-5">
        <h1 className="text-3xl text-left font-poppins font-bold text-color-custom">Usuarios</h1>
        <div className="flex justify-content-between align-items-center mb-4">
          <div className="p-input-icon-left search-container">
            <i className="pi pi-search search-icon" style={{ color: 'white' }}></i>
            <InputText
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Buscar"
              className="custom-input-text"
            />
          </div>
          <Button
            label="Agregar Usuario"
            icon="pi pi-plus"
            onClick={() => setShowModal(true)}
            className="p-button-success p-button-rounded"
          />
        </div>

        <div className="flex flex-column align-items-center">
          <TableUser
            users={filteredUsers}
            openEditModal={openEditModal}
            toggleStatus={toggleStatus}
          />
        </div>
      </div>

      <AddUser
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleAddSubmit}
        password={password}
        setPassword={setPassword}
        password1={password1}
        setPassword1={setPassword1}
        setFile={setFile}
      />

      <EditUser
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleEditSubmit}
        setFile={setFile} 
      />
    </>
  );
}

export default UsersAdmin;