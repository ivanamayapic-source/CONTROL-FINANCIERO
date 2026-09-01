# Mi Control Financiero

Plataforma de gestión financiera personal.

## Arquitectura

- **Frontend/Backend:** Next.js (App Router) + TypeScript
- **Estilos:** Tailwind CSS
- **Base de Datos:** PostgreSQL alojado en **Supabase**
- **ORM:** Prisma
- **Autenticación:** NextAuth.js
- **Despliegue:** Vercel

## Instrucciones de Instalación Local (Desarrollo)

1. Clona el repositorio:
   ```bash
   git clone <tu-repositorio>
   cd mi-control-financiero
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Copia el archivo de ejemplo: `cp .env.example .env`
   - Completa el archivo `.env` con tus credenciales de **Supabase DEV**.
   - *Nota: Asegúrate de tener `DATABASE_URL` (puerto 6543, pooler) y `DIRECT_URL` (puerto 5432).*

4. Sincroniza la base de datos (Migraciones):
   ```bash
   npx prisma db push
   # O si usas migraciones versionadas:
   # npx prisma migrate dev --name init
   ```

5. Genera el cliente de Prisma:
   ```bash
   npx prisma generate
   ```

6. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

7. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Despliegue en Vercel (Producción)

1. Conecta tu repositorio de GitHub a un nuevo proyecto en Vercel.
2. En la configuración del proyecto en Vercel (Environment Variables), agrega:
   - `DATABASE_URL` (Credenciales de **Supabase PROD**, puerto 6543)
   - `DIRECT_URL` (Credenciales de **Supabase PROD**, puerto 5432)
   - `NEXTAUTH_SECRET` (Un secreto seguro, único para producción)
   - `NEXTAUTH_URL` (La URL pública de tu dominio en Vercel)
3. Vercel ejecutará automáticamente `npm run build` (que incluye `prisma generate` de manera predeterminada en el script si está configurado en package.json).
4. Asegúrate de ejecutar tus migraciones en producción (`npx prisma migrate deploy`) como parte de tu pipeline de CI/CD.
