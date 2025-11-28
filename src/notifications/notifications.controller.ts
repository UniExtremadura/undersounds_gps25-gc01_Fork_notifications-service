import {
    Controller, Get, Post, Body, Param, Put, Delete, UseGuards
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { RequireRole } from '../auth/roles/role.decorator';

@Controller('notifications')
@UseGuards(JwtAuthGuard) //RolesGuard)     // Todos los endpoints requieren autenticación
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    // -----------------------
    //   ENDPOINTS INTERNOS
    // -----------------------
    // Solo accesible para otros microservicios
    @Post()
    @RequireRole('internal-service')
    create(@Body() createNotificationDto: CreateNotificationDto) {
        return this.notificationsService.create(createNotificationDto);
    }

    @Get()
    @RequireRole('internal-service')
    findAll() {
        return this.notificationsService.findAll();
    }

    @Get(':id')
    @RequireRole('internal-service')
    findOne(@Param('id') id: string) {
        return this.notificationsService.findOne(id);
    }

    @Put('user/:userId')
    @RequireRole('internal-service')
    update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
        return this.notificationsService.update(id, updateNotificationDto);
    }

    @Delete('user/:userId')
    @RequireRole('internal-service')
    remove(@Param('id') id: string) {
        return this.notificationsService.remove(id);
    }

    // -----------------------
    //     ENDPOINTS DE USER
    // -----------------------
    // Estos pueden usarlos usuarios artistas
    @Get('user/:userId')
    @RequireRole('artist')
    findByUser(@Param('userId') userId: string) {
        return this.notificationsService.findByUserId(userId);
    }

    @Get('user/:userId/unread')
    @RequireRole('artist')
    findUnread(@Param('userId') userId: string) {
        return this.notificationsService.findUnreadByUser(userId);
    }
    @Get('test')
    @UseGuards(JwtAuthGuard) // Solo JWT, sin RolesGuard
    testAuth() {
        return {
            message: '✅ Authentication works!',
            timestamp: new Date().toISOString()
        };
    }
}
