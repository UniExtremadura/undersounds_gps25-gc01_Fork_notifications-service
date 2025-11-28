// jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any) {
        console.log('🔐 JwtAuthGuard - Error:', err);
        console.log('🔐 JwtAuthGuard - User:', user);
        console.log('🔐 JwtAuthGuard - Info:', info);

        if (err || !user) {
            console.log('❌ JWT Validation FAILED');
            return false;
        }
        return user;
    }
}