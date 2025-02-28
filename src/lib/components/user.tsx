import { permanentRedirect } from 'next/navigation';
import { Icon } from './icon'
import { useUser } from '../hooks/useUser';

export const User = () => {

    const { user } = useUser();

    function logout() {
        fetch("/api/auth/logout", { method: "POST" }).then(() => {
            permanentRedirect("/");
        });
    }

    return (
        <li className="nav-item dropdown" style={{ marginRight: '50px' }}>
            <button type='button' className="nav-link" data-bs-toggle="dropdown">
                <span className="text-white">{user?.email}</span>
                <Icon icon='bi bi-caret-down-fill' />
            </button>
            <div className="dropdown-menu dropdown-menu-md bg-primary-subtle">
                <div className='p-1'>
                    <a className="dropdown-item" id="datos-usuario">
                        <Icon icon='bi bi-person-vcard-fill' />
                        Mis datos
                    </a>
                </div>
                <div>
                    <hr className="dropdown-divider" />
                </div>
                <div className='p-1'>
                    <a className="dropdown-item" onClick={() => logout()}>
                        <Icon icon='bi bi-box-arrow-right' />
                        Cerrar sesión
                    </a>
                </div>
            </div>
        </li>
    )
}
