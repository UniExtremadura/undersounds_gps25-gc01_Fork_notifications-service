// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.notification.create({
        data: {
            message: 'Prueba de notificación 2',
            channel: 'email',
            userId: '2',
        },
    });
    await prisma.notification.create({
        data: {
            message: 'Prueba de notificación',
            channel: 'email',
            userId: '1',
        },
    });
    console.log('Datos insertados!');
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());