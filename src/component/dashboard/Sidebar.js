import React from "react";
import { Link } from "react-router-dom";
import "../style/Sidebar.css";
import {
  AiOutlineDashboard,
  AiOutlineLogout,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { Button } from "@mui/material";

const Sidebar = () => {
  const sidemenus = [
    {
      menu_name: "Dashboard",
      menu_icon: AiOutlineDashboard,
      path: "/dashboard",
      active: true,
    },
    {
      menu_name: "Products",
      menu_icon: AiOutlineShoppingCart,
      path: "/products",
    },
    {
      menu_name: "Sales",
      menu_icon: AiOutlineShoppingCart,
      path: "/sales",
    },
    {
      menu_name: "Customers",
      menu_icon: BsPeople,
      path: "/customers",
    },
  ];
  const handleLogout = () => {
    localStorage.clear("response");
    window.location.reload();
  };
  return (
    <>
      <div className="sidebar">
        <div className="brand">Admin DashBoard</div>
        <div className="links">
          <ul>
            {sidemenus.map((value) => (
              <li
                key={value.menu_name}
                className={value.active ? "active" : ""}
              >
                <Link to={value.path}>
                  <value.menu_icon />
                  {value.menu_name}
                </Link>
              </li>
            ))}
            <li>
              {" "}
              <Button
                style={{
                  backgroundColor: "dodgerblue",
                  color: "white",
                  listStyleType: "disc",
                  margin: "0rem 3rem",
                }}
                startIcon={<AiOutlineLogout />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
