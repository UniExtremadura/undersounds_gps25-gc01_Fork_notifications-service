import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        ConfigModule.forRoot({})
    ],
    providers: [JwtStrategy],
    exports: [
        JwtStrategy,
        ConfigModule,
        PassportModule
    ],
})
export class AuthModule {    constructor() {
    console.log('🔄 AuthModule loaded with JwtStrategy');
}}