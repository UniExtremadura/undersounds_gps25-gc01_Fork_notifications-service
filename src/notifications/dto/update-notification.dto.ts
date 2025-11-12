// src/notifications/dto/update-notification.dto.ts
import { Prisma } from '@prisma/client';
import { IsBoolean, IsOptional, IsString } from 'class-validator';


export class UpdateNotificationDto implements Prisma.NotificationUpdateInput {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    message?: string;

    @IsOptional()
    @IsString()
    channel?: string;

    @IsOptional()
    @IsString()
    userId?: string;

    @IsOptional()
    @IsBoolean()
    read?: boolean;
}
