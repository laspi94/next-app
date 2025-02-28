
import { Forms } from '../prisma/models/form';

/**
 * formularios
 * 
 * @returns formularios: @/lib/prisma/models/formulario
 */

export async function getFormularios() {

    const formularios = await Forms.all();

    return formularios;
}

