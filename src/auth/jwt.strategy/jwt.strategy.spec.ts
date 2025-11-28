import { Test } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtStrategy', () => {
    let jwtStrategy: JwtStrategy;
    let configService: ConfigService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                JwtStrategy,
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('test-secret-key'),
                    },
                },
            ],
        }).compile();

        jwtStrategy = moduleRef.get<JwtStrategy>(JwtStrategy);
        configService = moduleRef.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
        expect(jwtStrategy).toBeDefined();
    });

    it('should validate payload correctly', async () => {
        const payload = {
            sub: '12345',
            preferred_username: 'testuser',
            email: 'test@example.com',
            realm_access: { roles: ['admin', 'user'] },
        };

        const user = await jwtStrategy.validate(payload);

        expect(user).toEqual({
            userId: '12345',
            username: 'testuser',
            email: 'test@example.com',
            roles: ['admin', 'user'],
        });
    });

    it('should handle payload with no roles', async () => {
        const payload = {
            sub: '12345',
            preferred_username: 'testuser',
            email: 'test@example.com',
        };

        const user = await jwtStrategy.validate(payload);

        expect(user).toEqual({
            userId: '12345',
            username: 'testuser',
            email: 'test@example.com',
            roles: [],
        });
    });

    it('should throw UnauthorizedException when payload is missing sub', async () => {
        const payload = {
            preferred_username: 'testuser',
            email: 'test@example.com',
        };

        await expect(jwtStrategy.validate(payload as any)).rejects.toThrow(
            UnauthorizedException,
        );
    });

    it('should throw UnauthorizedException when payload is missing email', async () => {
        const payload = {
            sub: '12345',
            preferred_username: 'testuser',
        };

        await expect(jwtStrategy.validate(payload as any)).rejects.toThrow(
            UnauthorizedException,
        );
    });

    it('should use fallback secret when JWT_SECRET is not provided', async () => {
        // Mock ConfigService para retornar null
        jest.spyOn(configService, 'get').mockReturnValue(null);

        // Recrear JwtStrategy con el mock
        const strategyWithFallback = new JwtStrategy(configService);

        expect(strategyWithFallback).toBeDefined();
    });
});