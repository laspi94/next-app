
interface IconProps {
    icon: string
}

export function Icon({ icon = 'bi bi-circle' }: IconProps) {
    return (
        <>
            <i className={`nav-icon ${icon}`}></i>
        </>);
}