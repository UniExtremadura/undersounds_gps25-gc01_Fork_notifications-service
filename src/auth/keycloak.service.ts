import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class KeycloakService {

    async getServiceToken(): Promise<string> {
        // Leer variables de entorno
        const baseUrl = process.env.AUTH_BASE_URL;
        const realm = process.env.AUTH_REALM;
        const clientId = process.env.CLIENT_ID;
        const clientSecret = process.env.CLIENT_SECRET;

        // Validación estricta
        if (!baseUrl || !realm || !clientId || !clientSecret) {
            throw new Error(
                'Missing Keycloak environment variables: AUTH_BASE_URL, AUTH_REALM, CLIENT_ID, CLIENT_SECRET',
            );
        }

        // Construir URL del token
        const url = `${baseUrl}/realms/${realm}/protocol/openid-connect/token`;

        // Preparar datos para client credentials
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);

        try {
            const { data } = await axios.post(url, params);
            return data.access_token;
        } catch (err) {
            if (err instanceof Error) {
                // err es un Error estándar de JS
                console.error('Error fetching Keycloak token:', err.message);
            } else {
                // err puede ser cualquier cosa (objeto, string, etc.)
                console.error('Error fetching Keycloak token:', err);
            }
            throw new Error('Failed to obtain Keycloak service token');
        }
    }
}
