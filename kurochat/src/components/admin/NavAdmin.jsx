import React from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import LogoKuro from '../../assets/img/KuroLogo.png';
import Users from "./UsersAdmin";
import ProfileAdmin from "./ProfileAdmin";
import '../../admin.css'

function NavAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      label: 'Usuarios',
      icon: 'pi pi-users',
      command: () => {
        navigate("/Admin");
      },
      className: "text-white font-normal hover:text-black hover:font-bold hover:bg-black hover:bg-opacity-10"
    },
  ];

  const start = (
    <NavLink to="/Admin" className={`flex items-center gap-2 text-white`}>
      <img alt="logo" src={LogoKuro} width="50" height="40" />
      <span className="font-serif text-2xl font-bold text-center flex align-items-center justify-content-center">KuroChat</span>
    </NavLink>
  );

  const end = (
    <Button
      label="Miguel Moreno"
      icon="pi pi-user"
      className="p-button-rounded p-button-text"
      onClick={() => navigate("/Perfil")}
    />
  );

  return (
    <div className="w-screen h-auto">
      <Menubar model={items} start={start} end={end} className="menubar-custom flex justify-between"
        pt={{
          label: { className: "text-white font-normal " },
          icon: { className: "text-white font-normal " },
        }}
      />

      <main className="flex-grow flex flex-col items-center justify-center">
        <section className="w-full h-full p-2">
          {location.pathname === "/Perfil" ? <ProfileAdmin /> : <Users />}
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default NavAdmin;
