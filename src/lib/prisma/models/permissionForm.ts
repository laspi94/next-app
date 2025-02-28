import prisma from "../prisma";
import { permission_form, users } from "@prisma/client";
import { formatBigIntToString } from "@/lib/utils";

type newForm = {
    key: string,
    nombre: string,
    modulo: string,
    icono: string,
    orden: number,
    ruta: string,
    parent_key: string,
    es_menu: boolean,
    es_abm: boolean
}

export class PermissionForm {

    static async formatPermisoFormulario<T>(permissionForm: permission_form): Promise<T> {

        const permissionFormFormated = {
            ...permissionForm,
            id: formatBigIntToString(permissionForm.id)
        };

        return permissionFormFormated as T;
    }
    static async findById(id: number) {
        return await prisma.permission_form.findUnique({
            where: { id },
        });
    }

    static async all(): Promise<permission_form[]> {
        const permissionForm: permission_form[] = await prisma.permission_form.findMany();

        let listPermisoFormulario: permission_form[] = [];
        for (let index = 0; index < permissionForm.length; index++) {
            const permissionFormFormated = await this.formatPermisoFormulario(permissionForm[index])
            listPermisoFormulario = [...listPermisoFormulario, permissionFormFormated as permission_form];
        }

        return listPermisoFormulario;
    }

    static async delete(id: number) {
        return await prisma.permission_form.delete({
            where: { id },
        });
    }

    static async findOne(user: users, formularioKey: string) {
        return await prisma.permission_form.findFirst({
            where: {
                id_rol: user.id_rol,
                form_key: formularioKey,
                read: true
            }
        })
    };
}