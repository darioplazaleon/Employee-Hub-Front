# Proyecto Frontend con React y Next.js

Este proyecto es una aplicación frontend desarrollada con React y Next.js. La aplicación está diseñada para interactuar
con un proyecto backend separado, proporcionando una interfaz de usuario para diversas funcionalidades.

## Funcionalidades

- **Autenticación de Usuarios**: Los usuarios pueden iniciar sesión y registrarse.
- **Gestión de Usuarios**: Los administradores pueden ver, crear, editar y eliminar usuarios.
- **Gestión de Posiciones**: Los administradores pueden gestionar las posiciones disponibles.
- **Gestión de Vacaciones**: Los usuarios pueden solicitar vacaciones y ver el estado de sus solicitudes.
- **Configuración de Usuario**: Los usuarios pueden cambiar su contraseña y actualizar su perfil.

## Estructura del Proyecto

- **src/middleware.ts**: Middleware para la gestión de rutas y permisos de usuario.
- **pages/**: Contiene las páginas de la aplicación.
- **components/**: Componentes reutilizables de la interfaz de usuario.
- **lib/**: Funciones auxiliares y utilidades.

## Requisitos

- Node.js
- npm o yarn

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    ```
2. Instala las dependencias:
    ```bash
    cd tu-repositorio
    npm install
    # o
    yarn install
    ```

## Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

## Configuración

Asegúrate de configurar las variables de entorno necesarias en un archivo .env o .env.local.

```yaml
API_BASE_URL=http://localhost:8080
JWT_SECRET=secret # Clave secreta para la generación de tokens JWT,
                  # usa la misma que en el proyecto backend
```

## Proyecto Backend

Este proyecto frontend está diseñado para funcionar junto con un [proyecto backend](https://github.com/darioplazaleon/Employee-Hub) separado. Asegúrate de tener el
backend en funcionamiento y configurado correctamente para que la aplicación frontend pueda interactuar con él.  
