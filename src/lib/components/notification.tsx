export const Notification = () => {


    return (
        <li className="nav-item dropdown " style={{ marginRight: '25px' }}>
            <a className="nav-link" data-bs-toggle="dropdown" href="#">
                <i className="bi bi-bell-fill text-white"></i>
                <span className="navbar-badge badge text-bg-warning">15</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end bg-primary-subtle">
                <span className="dropdown-item dropdown-header">15 Notifications</span>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                    <i className="bi bi-envelope me-2"></i> 4 new messages
                    <span className="float-end text-secondary fs-7">3 mins</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                    <i className="bi bi-people-fill me-2"></i> 8 friend requests
                    <span className="float-end text-secondary fs-7">12 hours</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                    <i className="bi bi-file-earmark-fill me-2"></i> 3 new reports
                    <span className="float-end text-secondary fs-7">2 days</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item dropdown-footer"> See All Notifications </a>
            </div>
        </li>
    )
}
