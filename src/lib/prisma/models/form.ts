import prisma from "../prisma";
import { menu } from '../../types/form';
import { form } from "@prisma/client";
import { formatBigIntToString } from "@/lib/helpers";

type newForm = {
    key: string,
    name: string,
    module: string,
    icon: string,
    order: number,
    route: string,
    parent_key: string,
    is_menu: boolean,
    is_crud: boolean
}

export class Forms {

    static async formatForm<T>(form: form): Promise<T> {

        const formularioFormated = {
            ...form,
            id: formatBigIntToString(form.id)
        };

        return formularioFormated as T;
    }

    static async create({ key, name, module, icon, order, route, parent_key, is_menu, is_crud }: newForm) {
        return await prisma.form.create({
            data: { key, name, module, icon, order, route, parent_key, is_menu, is_crud },
        });
    }

    static async findById(id: number) {
        return await prisma.form.findUnique({
            where: { id },
        });
    }

    static async all(): Promise<form[]> {
        const forms: form[] = await prisma.form.findMany({
            where: { is_menu: true },
            orderBy: { order: 'asc' }
        });

        let listForms: form[] = [];
        for (let index = 0; index < forms.length; index++) {
            const formsFormated = await this.formatForm(forms[index])
            listForms = [...listForms, formsFormated as form];
        }

        return listForms;
    }

    static async update(id: number, data: { name?: string; password?: string; rol?: number }) {
        return await prisma.form.update({
            where: { id },
            data,
        });
    }

    static async delete(id: number) {
        return await prisma.form.delete({
            where: { id },
        });
    }
}