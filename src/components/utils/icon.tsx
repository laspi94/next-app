import { DynamicIcon, IconName } from 'lucide-react/dynamic';

type IconProps = {
    iconName: string,
    color?: string,
    size?: number,
    className?: string
}
export function Icon({ iconName = 'message-circle-question', color = 'white', size = 48, className }: IconProps) {

    const icon = iconName as IconName;

    return (
        <DynamicIcon name={icon} color={color} size={size} className={className} />)
};