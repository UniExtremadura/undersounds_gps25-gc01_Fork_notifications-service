import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            //audience: 'notifications-service',
            issuer: 'http://keycloak:8080/realms/undersounds',
            algorithms: ['RS256'],
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: 'http://keycloak:8080/realms/undersounds/protocol/openid-connect/certs',
            }),
        });

        // DEBUG: Verificar configuración
        console.log('🔐 JWT Strategy Config:');
        console.log('   - Issuer:', 'http://keycloak:8080/realms/undersounds');
        console.log('   - Audience:', 'notifications-service');
        console.log('   - JWKS URI:', 'http://keycloak:8080/realms/undersounds/protocol/openid-connect/certs');
    }

    async validate(payload: any) {
        console.log('✅ JWT VALIDATED - User:', payload.preferred_username);
        console.log('   - Audience in token:', payload.aud);
        console.log('   - Issuer in token:', payload.iss);
        console.log('🎯 Token Audience:', payload.aud);
        console.log('🎯 Token Issuer:', payload.iss);
        console.log('🎯 Full payload:', JSON.stringify(payload, null, 2));
        return {
            userId: payload.sub,
            username: payload.preferred_username,
            email: payload.email,
            roles: payload.realm_access?.roles || []
        };
    }
}