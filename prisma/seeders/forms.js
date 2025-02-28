const event = new Date();

// Restar 4 horas
event.setHours(event.getHours() - 4);

// Convertir a formato ISO 8601
const formattedEvent = event.toISOString();

// Datos del formulario
const formularios = [
    {
        key: 'dashboard',
        name: 'Dashboard',
        module: 'Principal',
        icon: 'bi bi-speedometer2',
        order: 1,
        route: '/dashboard',
        parent_key: null,
        is_menu: true,
        is_crud: false,
        created_at: formattedEvent
    },
    {
        key: 'gestion',
        name: 'Gestión',
        module: 'Gestion',
        icon: 'bi bi-file-earmark-richtext',
        order: 2,
        route: null,
        parent_key: null,
        is_menu: true,
        is_crud: false,
        created_at: formattedEvent
    },
    {
        key: 'presupuestos',
        name: 'Presupuestos',
        module: 'Gestion',
        icon: 'bi bi-coin',
        order: 1,
        route: '/gestion/presupuesto',
        parent_key: 'gestion',
        is_menu: true,
        is_crud: false,
        created_at: formattedEvent
    },
    {
        key: 'orderes_trabajo',
        name: 'Ordenes de trabajo',
        module: 'Gestion',
        icon: 'bi bi-tools',
        order: 1,
        route: '/gestion/order-trabajo',
        parent_key: 'gestion',
        is_menu: true,
        is_crud: false,
        created_at: formattedEvent
    },
    {
        key: 'parametros',
        name: 'Parámetros',
        module: 'Parámetros',
        icon: 'bi bi-sliders',
        order: 3,
        route: null,
        parent_key: null,
        is_menu: true,
        is_crud: false,
        created_at: formattedEvent
    },
    {
        key: 'clientes',
        name: 'Clientes',
        module: 'Parámetros',
        icon: 'bi bi-people-fill',
        order: 1,
        route: '/parametro/cliente',
        parent_key: 'parametros',
        is_menu: true,
        is_crud: true,
        created_at: formattedEvent
    },
    {
        key: 'servicios',
        name: 'Servicios',
        module: 'Parámetros',
        icon: 'bi bi-tools',
        order: 1,
        route: '/parametro/servicio',
        parent_key: 'parametros',
        is_menu: true,
        is_crud: true,
        created_at: formattedEvent
    },
    {
        key: 'estados',
        name: 'Estados',
        module: 'Parámetros',
        icon: 'bi bi-arrow-clockwise',
        order: 1,
        route: '/parametro/estado',
        parent_key: 'parametros',
        is_menu: true,
        is_crud: true,
        created_at: formattedEvent
    },
    {
        key: 'reportes',
        name: 'Reportes',
        module: 'Reporte',
        icon: 'bi bi-clipboard-data',
        order: 4,
        route: null,
        parent_key: null,
        is_menu: true,
        is_crud: true,
        created_at: formattedEvent
    },
    {
        key: 'existencia',
        name: 'Existencias',
        module: 'Reporte',
        icon: 'bi bi-list-ul',
        order: 1,
        route: '/reporte/existencia',
        parent_key: 'reportes',
        is_menu: true,
        is_crud: true,
        created_at: formattedEvent
    },
    {
        key: 'roles',
        name: 'Roles',
        module: 'Seguridad',
        icon: 'bi bi-people',
        order: 1,
        route: '/seguridad/roles',
        parent_key: 'seguridad',
        is_menu: true,
        is_crud: true,
        created_at: formattedEvent
    },
    {
        key: 'usuarios',
        name: 'Usuarios',
        module: 'Seguridad',
        icon: 'bi bi-person',
        order: 2,
        route: '/seguridad/usuario',
        parent_key: 'seguridad',
        is_menu: true,
        is_crud: true,
        created_at: formattedEvent
    },
    {
        key: 'formularios',
        name: 'Formularios',
        module: 'Seguridad',
        icon: 'bi bi-card-list',
        order: 3,
        route: '/seguridad/formulario',
        parent_key: 'seguridad',
        is_menu: true,
        is_crud: true,
        created_at: formattedEvent
    },
    {
        key: 'permisos_exclusivos',
        name: 'Permisos',
        module: 'Seguridad',
        icon: 'bi bi-card-checklist',
        order: 4,
        route: '/seguridad/permiso/exclusivo',
        parent_key: 'seguridad',
        is_menu: true,
        is_crud: true,
        created_at: formattedEvent
    }
];

module.exports = {
    formularios
};
