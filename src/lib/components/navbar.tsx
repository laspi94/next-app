import { Notification } from './notification';
import { User } from './user';

export function Navbar() {

    return (
        <nav key={'navbar-key'} className="app-header navbar navbar-expand bg-primary-subtle" data-bs-theme="dark">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a type='button' className="nav-link" data-lte-toggle="sidebar">
                            <i className="bi bi-list text-white"></i>
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    {/** Notificaciones */}
                    <Notification />

                    {/** User  */}
                    <User />
                </ul>
            </div>
        </nav>
    )
}
