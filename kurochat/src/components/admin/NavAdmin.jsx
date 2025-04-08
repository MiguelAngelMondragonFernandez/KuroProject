import React from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import LogoKuro from "../../assets/img/KuroLogo.png";
import "../../admin.css";
import { getUser } from "../../utils/httpgateway";

function NavAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  const firstName = user?.first_name.split(" ")[0] || "";
  const userNav = user?.name?.split(" ")[0] || "";
  const userNameNav = `${userNav} ${firstName}`;

  const items = [
    {
      label: "Usuarios",
      icon: "pi pi-users",
      command: () => {
        navigate("/admin");
      },
      className: location.pathname === "/admin" 
        ? "nav-item-selected" 
        : "nav-item"
    },
  ];

  const start = (
    <div className="flex items-center justify-center space-x-3 cursor-pointer" onClick={() => navigate("/admin")}>
      <img alt="logo" src={LogoKuro} width="50" height="40" />
      <span className="font-serif text-2xl font-bold text-center flex-1">KuroChat</span>
    </div>
  );

  const end = (
    <Button
      label={userNameNav}
      icon="pi pi-user"
      className={`profile-button ${
        location.pathname === "/admin/perfil" ? "profile-button-selected" : ""
      }`}
      onClick={() => navigate("/admin/perfil")}
    />
  );

  return (
    <div>
      <Menubar
        model={items}
        start={start}
        end={end}
        className="menubar-custom fixed top-0 left-0 w-full z-10 bg-black text-white"
      />

      <main className="flex-grow flex flex-col items-center justify-center mt-7 mb-5">
        <section className="w-full h-auto px-4">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default NavAdmin;
