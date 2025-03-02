
import { usePathname } from 'next/navigation';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '../ui/breadcrumb';
import Link from 'next/link';
import React from 'react';

const generateBreadcrumbSegments = (path: string) => {
    const segments = path.split("/").filter(Boolean); // Divide y elimina vacíos

    return segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/"); // Construye la URL acumulativa
        const formattedSegment = segment.charAt(0).toUpperCase() + segment.slice(1); // Capitaliza

        return { name: formattedSegment, href };
    });
};

export function HeaderBreadcrumb() {

    const path = usePathname();
    const segments = generateBreadcrumbSegments(path);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {segments.map((segment, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem key={segment.href} >
                            {index !== segments.length - 1 ? (
                                <BreadcrumbLink asChild key={segment.name}>
                                    <Link href={segment.href}>{segment.name}</Link>
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage key={segment.name}>{segment.name}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>

                        {index + 1 < segments.length && <BreadcrumbSeparator className="hidden md:block" />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
