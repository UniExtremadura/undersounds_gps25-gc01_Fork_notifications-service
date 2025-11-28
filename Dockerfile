# -------------------------
# Etapa 1: Build
# -------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .
RUN npm run build

# -------------------------
# Etapa 2: Producción
# -------------------------
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

# ✅ COPIAR node_modules/.prisma COMPLETO
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/main.js"]