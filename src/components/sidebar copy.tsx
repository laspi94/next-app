'use client'

// import { Icon } from "./icon";
import Image from "next/image";
import logo from "../../../public/img/logo.png";
import { useMenu } from "../lib/hooks/useMenu";

export const Sidebar = () => {

  const { menu } = useMenu();

  return (
    <aside key={'aside-key'} className="app-sidebar bg-primary-subtle shadow" data-bs-theme="dark">
      <div className="sidebar-brand">
        <a href="/" className="brand-link" >
          <Image src={logo} alt="logo" width={75} height={75} />
          <span className="brand-text fw-light">Top Detailing</span>
        </a>
      </div>
      <div className="sidebar-wrapper">
        <nav className="mt-2">
          <ul className="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu" data-accordion="false">
            {menu.map((item, i) => {
              if (item.submenus) {
                return <li key={i} className="nav-item">
                  <a href="#" onClick={() => { }} className="nav-link">
                    <i className={`nav-icon ${item.icon}`}></i>
                    <p>
                      {item.name}
                      <i className="nav-arrow bi bi-chevron-right"></i>
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    {item.submenus.map((submenu, i) =>
                      <li key={i + 200} className="nav-item" style={{ marginLeft: '1em' }}>
                        <a href={submenu.route} className="nav-link">
                          <i className={`nav-icon ${submenu.icon}`}></i>
                          <p>{submenu.name}</p>
                        </a>
                      </li>
                    )}
                  </ul>
                </li>
              } else {
                if (item.route) {
                  return <li key={i} className="nav-item">
                    <a href={item.route} className="nav-link">
                      {/* <Icon icon={item.icon} /> */}
                      <p>{item.name}</p>
                    </a>
                  </li>
                }
              }
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
