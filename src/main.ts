// src/main.ts
import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications/notifications.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(NotificationsModule);
    app.setGlobalPrefix('api');

    // Middleware temporal para debug
    app.use((req: any, res: any, next: any) => {
        if (req.headers['authorization']) {
            console.log('🔑 Token recibido:', req.headers['authorization'].substring(0, 50) + '...');
        } else {
            console.log('❌ No token received');
        }
        next();
    });

    // Activamos validación automática para DTOs
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
    }));

    const port = process.env.PORT || 3000;

    // ✅ AGREGAR AQUÍ - Esperar a que la DB esté lista
    console.log('⏳ Waiting for database to be ready...');
    await new Promise(resolve => setTimeout(resolve, 10000)); // 10 segundos
    console.log('🚀 Starting application...');

    await app.listen(port, '0.0.0.0');
    console.log(`🚀 Notifications service is running on http://localhost:${port}`);
}

bootstrap();