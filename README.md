# E-commerce Dashboard Analytic

## Descripción

El **E-commerce Dashboard Analytic** es una plataforma diseñada para administrar un comercio electrónico, brindando control total a los administradores sobre usuarios, productos, pedidos y clientes. Este sistema ofrece un panel de administración interactivo y seguro que incluye validaciones avanzadas, animaciones fluidas y componentes reutilizables para una experiencia de usuario optimizada.

## Características

- **Control de Acceso del Administrador**: Los administradores pueden aprobar o denegar solicitudes de usuarios registrados para otorgarles acceso al sistema.
- **Prisma ORM con PostgreSQL**: Conexión eficiente con la base de datos utilizando Prisma para la gestión de usuarios, productos, pedidos y clientes.
- **Animaciones con Framer Motion**: Transiciones y animaciones fluidas para mejorar la experiencia de usuario durante la navegación.
- **Componentes Reutilizables con ShadCN**: Implementación de un sistema de componentes personalizables y reutilizables para mantener la coherencia del diseño.
- **Manejo de Imágenes con UploadThing**: Integración con UploadThing para gestionar la carga y visualización de imágenes de productos y usuarios.
- **Next Safe Actions**: Seguridad en las acciones del servidor para validar solicitudes y prevenir vulnerabilidades.
- **React Hook Form y Zod**: Formularios robustos con validaciones personalizadas utilizando `react-hook-form` y `Zod`.
- **Validaciones con Zod**: Uso de resolvers de `react-hook-form` para validar datos de forma avanzada con Zod.
- **Diseño Responsive**: Adaptación a dispositivos móviles, tablets y pantallas grandes.

## Instalación

Sigue los pasos a continuación para instalar y configurar el proyecto en tu entorno local:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/TuUsuario/ecommerce-dashboard-analytic.git
   ```

2. **Navega al directorio del proyecto**

   ```bash
   git clone https://github.com/TuUsuario/ecommerce-dashboard-analytic.git
   ```

3. **Instala las dependencias**

   ```bash
   npm install
   ```

4. **Configura las variables de entorno copiando el archivo de ejemplo `.env.example` a `.env` **

   ```bash
   cp .env.example .env
   ```

5. **Ejecuta las migraciones para preparar la base de datos**

```bash
   npx prisma migrate dev
```

6. **Iniciar el servidor de de desarrollo**

```bash
   npm run dev
```

## Vista previa del proyecto

### Login

![Vista de login](/docs/login.png)

### Overview

![Vista de login](/docs/overview.png)

### Products

![Vista de login](/docs/product.png)

### Team<>

![Vista de login](/docs/team.png)

## Pruebas Unitarias

Las pruebas unitarias están diseñadas para garantizar el correcto funcionamiento de los endpoints de la API. Para ejecutarlas, utiliza el siguiente comando:

```bash
npm run test
```

## Licencia

Este proyecto está licenciado bajo la Licencia [MIT](URL_DE_LICENCIA).
