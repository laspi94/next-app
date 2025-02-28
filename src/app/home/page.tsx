'use client'

import { Breadcrumb } from "@/lib/components"
import { MainLayout } from "@/lib/components/layouts/"

export default function HomePage() {


    return (
        <MainLayout breadcrumb={<Breadcrumb />}>
            <>
                Home
            </>
        </MainLayout>
    )
}
