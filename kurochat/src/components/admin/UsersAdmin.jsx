import React, { useState, useRef } from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Image } from 'primereact/image';
import Swal from 'sweetalert2';
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import TableUser from "./TableUser";
import Leveling from '../../assets/img/solo.png';
import '../../admin.css'

const StatusButton = ({ status, onClick }) => {
  const isHabilitado = status === 'Habilitado';
  const buttonClass = isHabilitado ? 'p-button-success' : 'p-button-danger';
  const buttonLabel = isHabilitado ? 'Habilitado' : 'Deshabilitado';

  return (
    <Button
      label={buttonLabel}
      className={`p-button-rounded ${buttonClass}`}
      onClick={onClick}
    />
  );
};

function Users() {
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido_p: "",
    apellido_m: "",
    email: "",
    foto: null,
    password: "",
    password1: "",
  });
  const toast = useRef(null);
  const [users, setUsers] = useState([
    {
      id: 1, imagen: <div className="circle-container">
        <Image src={Leveling} zoomSrc={Leveling} alt="Image" className="circle-image" preview />
      </div>, name: "Juan Pérez", email: "juan.perez@example.com", status: "Habilitado"
    },
    {
      id: 2, imagen: <div className="circle-container">
        <Image src={Leveling} zoomSrc={Leveling} alt="Image" className="circle-image" preview />
      </div>, name: "María López", email: "maria.lopez@example.com", status: "Deshabilitado"
    },
    {
      id: 3, imagen: <div className="circle-container">
        <Image src={Leveling} zoomSrc={Leveling} alt="Image" className="circle-image" preview />
      </div>, name: "Carlos Gómez", email: "carlos.gomez@example.com", status: "Habilitado"
    },
    {
      id: 4, imagen: <div className="circle-container">
        <Image src={Leveling} zoomSrc={Leveling} alt="Image" className="circle-image" preview />
      </div>, name: "Juan Pérez", email: "juan.perez@example.com", status: "Habilitado"
    },
    {
      id: 5, imagen: <div className="circle-container">
        <Image src={Leveling} zoomSrc={Leveling} alt="Image" className="circle-image" preview />
      </div>, name: "María López", email: "maria.lopez@example.com", status: "Deshabilitado"
    },
    {
      id: 6, imagen: <div className="circle-container">
        <Image src={Leveling} zoomSrc={Leveling} alt="Image" className="circle-image" preview />
      </div>, name: "Carlos Gómez", email: "carlos.gomez@example.com", status: "Habilitado"
    },
    {
      id: 7, imagen: <div className="circle-container">
        <Image src={Leveling} zoomSrc={Leveling} alt="Image" className="circle-image" preview />
      </div>, name: "Juan Pérez", email: "juan.perez@example.com", status: "Habilitado"
    },
    {
      id: 8, imagen: <div className="circle-container">
        <Image src={Leveling} zoomSrc={Leveling} alt="Image" className="circle-image" preview />
      </div>, name: "María López", email: "maria.lopez@example.com", status: "Deshabilitado"
    },
    {
      id: 9, imagen: <div className="circle-container">
        <Image src={Leveling} zoomSrc={Leveling} alt="Image" className="circle-image" preview />
      </div>, name: "Carlos Gómez", email: "carlos.gomez@example.com", status: "Habilitado"
    },
    {
      id: 10, imagen: <div className="circle-container">
        <Image src={Leveling} zoomSrc={Leveling} alt="Image" className="circle-image" preview />
      </div>, name: "Juan Pérez", email: "juan.perez@example.com", status: "Habilitado"
    },
    {
      id: 11, imagen: <div className="circle-container">
        <Image src={Leveling} zoomSrc={Leveling} alt="Image" className="circle-image" preview />
      </div>, name: "María López", email: "maria.lopez@example.com", status: "Deshabilitado"
    },
    {
      id: 12, imagen: <div className="circle-container">
        <Image src={Leveling} zoomSrc={Leveling} alt="Image" className="circle-image" preview />
      </div>, name: "Carlos Gómez", email: "carlos.gomez@example.com", status: "Habilitado"
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const toggleStatus = async (userId) => {
    const user = users.find(user => user.id === userId);
    const newStatus = user.status === 'Habilitado' ? 'Deshabilitado' : 'Habilitado';

    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres cambiar el estado a ${newStatus}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'No, cancelar',
      customClass: {
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Simulación de una petición a un API
        Swal.fire({
          title: 'Procesando...',
          text: 'Por favor espera...',
          icon: 'info',
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 2000, // Simula un tiempo de espera
          didOpen: () => {
            Swal.showLoading(); // Muestra un spinner de carga
          }
        });

        setTimeout(() => {
          // Simulación de éxito o error
          const isSuccess = Math.random() > 0.2; // 80% éxito, 20% error

          if (isSuccess) {
            setUsers(users.map(user =>
              user.id === userId ? { ...user, status: newStatus } : user
            ));

            Swal.fire({
              title: '¡Cambiado!',
              text: `El estado ha sido cambiado a ${newStatus}.`,
              icon: 'success',
              timer: 2000, // Se cierra automáticamente después de 2s
              showConfirmButton: false,
              customClass: { confirmButton: 'swal-confirm-button' }
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al cambiar el estado. Inténtalo de nuevo.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              customClass: { confirmButton: 'swal-error-button' }
            });
          }
        }, 2000);
      }
    });
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <StatusButton
        status={rowData.status}
        onClick={() => toggleStatus(rowData.id)}
      />
    );
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

  const handleEditSubmit = () => {
    setShowEditModal(false);
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
    });

    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% éxito, 20% error

      if (isSuccess) {
        Swal.fire({
          title: "¡Actualizado!",
          text: "El usuario ha sido actualizado exitosamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al actualizar el usuario. Inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }, 2000);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      nombre: user.name,
      apellido_p: "",
      apellido_m: "",
      email: user.email,
      foto: null,
    });
    setShowEditModal(true);
  };

  return (
    <>
      <div className="px-5">
        <h1 className="text-3xl text-left font-poppins font-bold text-black">Usuarios</h1>
        <div className="flex justify-content-between align-items-center mb-4">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Buscar" className="custom-input-text" />
          </IconField>
          <Button label="Agregar Usuario" icon="pi pi-plus" onClick={() => setShowModal(true)} className="p-button-success p-button-rounded" />
        </div>

        <div className="flex flex-column align-items-center">
          <TableUser
            users={filteredUsers}
            statusBodyTemplate={statusBodyTemplate}
            openEditModal={openEditModal}
          />
        </div>
      </div>

      <AddUser
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        password={password}
        setPassword={setPassword}
        password1={password1}
        setPassword1={setPassword1}
        onUpload={() => toast.current.show({ severity: "info", summary: "Success", detail: "File Uploaded" })}
        toast={toast}
      />

      <EditUser
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleEditSubmit}
        onUpload={() => toast.current.show({ severity: "info", summary: "Success", detail: "File Uploaded" })}
        toast={toast}
      />
    </>
  );
}

export default Users;