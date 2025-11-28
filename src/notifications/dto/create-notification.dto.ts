// src/notifications/dto/create-notification.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
    @IsString()
    @IsNotEmpty()
    message: string = '';

    @IsString()
    @IsNotEmpty()
    channel: string = '';

    @IsString()
    @IsNotEmpty()
    userId: string = '';
}
