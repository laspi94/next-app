
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '../ui/breadcrumb';
import {
    SidebarInset,
    SidebarTrigger,
    useSidebar
} from "../ui/sidebar";
import { Separator } from '../ui/separator';
import { Icon } from '../utils';
import { ReactElement } from 'react';
import { usePathname } from 'next/navigation';
import { HeaderBreadcrumb } from './breadcrumb';

type PageProps = {
    children: ReactElement;
};

export function Page({ children }: PageProps) {

    const { open } = useSidebar();
    const path = usePathname();

    console.log(path);

    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" children={
                        <Icon iconName={open ? 'panel-right-open' : 'panel-right-close'} size={100} />
                    } />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <HeaderBreadcrumb />
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
            </div>
        </SidebarInset>
    )
}
