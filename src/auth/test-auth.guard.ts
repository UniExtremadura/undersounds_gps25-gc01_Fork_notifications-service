// test-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class TestAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        console.log('🧪 TestGuard - Headers:', request.headers);
        console.log('🧪 TestGuard - Authorization:', request.headers['authorization']);
        return true; // Siempre permite acceso
    }
}