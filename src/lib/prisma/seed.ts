import { Rol } from "./models";

async function run() {
    await Rol.seed();
}

run().catch((error) => {
    console.error('Error ejecutando el seeder:', error);
});