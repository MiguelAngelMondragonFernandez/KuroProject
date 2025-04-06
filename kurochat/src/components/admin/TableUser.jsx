import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import '../../admin.css'

const TableUser = ({ users, openEditModal, toggleStatus }) => {

  const imageBodyTemplate = (rowData) => {
    return (
      <Image
        src={rowData.url_photo}
        alt="Foto de usuario"
        width="90"
        height="auto"
        className="rounded-full"
      />
    );
  };

  const nameBodyTemplate = (rowData) => {
    return `${rowData.first_name} ${rowData.last_name}`;
  };

  const statusBodyTemplate = (rowData) => {
    const isHabilitado = rowData.is_active;
    const buttonClass = isHabilitado ? 'p-button-success' : 'p-button-danger';
    const buttonLabel = isHabilitado ? 'Habilitado' : 'Deshabilitado';
    
    return (
      <Button
        label={buttonLabel}
        className={`p-button-rounded ${buttonClass}`}
        onClick={() => toggleStatus(rowData.id, !isHabilitado)}
      />
    );
  };

  return (
    <DataTable value={users} paginator rows={5} className="w-full custom-table">
      <Column field="id" header="#" />
      <Column body={imageBodyTemplate} header="Imágen" />
      <Column body={nameBodyTemplate} header="Nombre Completo" />
      <Column field="email" header="Correo Electrónico" />
      <Column header="Estado" body={statusBodyTemplate} />
      <Column
        header="Acción"
        body={(rowData) => (
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-info"
            onClick={() => openEditModal(rowData)}
          />
        )}
      />
    </DataTable>
  );
};

export default TableUser;