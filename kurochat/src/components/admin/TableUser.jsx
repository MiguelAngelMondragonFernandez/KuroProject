import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import '../../admin.css'

const TableUser = ({ users, statusBodyTemplate, openEditModal }) => {
  return (
    <DataTable value={users} paginator rows={5} className="w-full custom-table">
      <Column field="id" header="#" />
      <Column field="imagen" header="Imágen" />
      <Column field="name" header="Nombre Completo" />
      <Column field="email" header="Correo Electrónico" />
      <Column field="status" header="Estado" body={statusBodyTemplate} />
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