const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/** Seeders */
const { roles } = require('./seeders/roles');
const { formularios } = require('./seeders/forms');

const load = async () => {
    try {

        /** Formularios */
        for (const form of formularios) {
            await prisma.form.upsert({
                where: { key: form.key },
                update: {
                    nombre: form.nombre,
                    modulo: form.modulo,
                    icono: form.icono,
                    orden: form.orden,
                    ruta: form.ruta,
                    parent_key: form.parent_key,
                    es_menu: form.es_menu,
                    es_abm: form.es_abm
                },
                create: form
            });
        }

        console.log('Formularios cargados');

        for (const rol of roles) {
            await prisma.roles.upsert({
                where: { id: rol.id },
                update: {
                    name: rol.name
                },
                create: rol
            });
        }

        console.log('Roles cargados');

    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
}

load();