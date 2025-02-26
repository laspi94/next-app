import Image from "next/image";
import logo from "../../../public/img/logo.png";
import { redirect } from "next/navigation";
import { useRef } from "react";

export const Sidebar = () => {

  const offcanvasRef = useRef<HTMLDivElement | null>(null);

  function logout() {
    const backdrop = document.querySelector(".offcanvas-backdrop");

    fetch("/api/auth/logout", { method: "POST" }).then(() => {
      if (backdrop) {
        backdrop.remove();
      }

      redirect("/login");
    });
  }

  return (
    <>
      <a className="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
        Link with href
      </a>
      <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        Button with data-bs-target
      </button>

      <div className="offcanvas offcanvas-start bg-dark text-white" tabIndex={-1} id="offcanvasExample" ref={offcanvasRef} aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-header">

          <div className="row">
            <div className="col">
              <Image src={logo} alt="logo" width={75} height={75} />
            </div>
            <div className="col mt-3">
              <h3>HaporeLabs</h3>
            </div>
          </div>

        </div>
        <div className="offcanvas-body">
          <div>
            Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
          </div>
          <div className="dropdown mt-3">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
              Dropdown button
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>

          <button className="btn btn-primary btn-sm" onClick={() => logout()}></button>
        </div>
      </div>
    </>
  );
};
