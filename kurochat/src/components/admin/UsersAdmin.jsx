import React, { useState, useRef, useContext, useEffect } from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Swal from 'sweetalert2';
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import TableUser from "./TableUser";
import '../../admin.css'
import { AuthContext } from "../../auth/AuthContext";
import axios from "../../utils/httpgateway";

function UsersAdmin() {
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    url_photo: "",
    email: "",
    password: "",
    password1: "",
  });
  const { token, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      logout();
    } else {
      axios
        .doGet("users/api/")
        .then((response) => {
          setUsers(response.data); 
          console.log("Usuarios cargados:", response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al cargar usuarios:", error);
          Swal.fire("Error", "No se pudieron cargar los usuarios", "error");
          setLoading(false); 
        });
    }
  }, [token]);

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  const toggleStatus = async (userId, newStatus) => {
    try {
      await axios.doPut(`users/api/${userId}/`, { is_active: newStatus });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, is_active: newStatus } : user
        )
      );
      Swal.fire(
        "¡Éxito!",
        `El estado del usuario ha sido cambiado a ${
          newStatus ? "Habilitado" : "Deshabilitado"
        }.`,
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
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      url_photo: user.url_photo,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      console.log("Datos del formulario:", formData);
      await axios.doPut(`users/api/${selectedUser.id}/`, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        url_photo: formData.url_photo, 
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id
            ? { ...user, ...formData }
            : user
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
      if (!formData.first_name || !formData.last_name || !formData.email || !password || !password1) {
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
  
      const response = await axios.doPost("users/api/", {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: password,
        url_photo: formData.url_photo || "", 
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
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
        first_name: "",
        last_name: "",
        email: "",
        url_photo: "",
      });
      setPassword("");
      setPassword1("");
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

  return (
    <>
      <div className="px-5">
        <h1 className="text-3xl text-left font-poppins font-bold text-color-custom">Usuarios</h1>
        <div className="flex justify-content-between align-items-center mb-4">
          <div className="p-input-icon-left search-container">
            <i className="pi pi-search search-icon "></i>
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
            users={users}
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
      />

      <EditUser
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleEditSubmit}
      />
    </>
  );
}

export default UsersAdmin;