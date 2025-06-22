# Auth Actions

Este archivo contiene las acciones relacionadas con la autenticación de usuarios.

## Funciones Disponibles

### `checkUser(dispatch, cedula)`
Verifica si un usuario existe en el sistema y lo autentica.

### `createUser(dispatch, form)`
Crea un nuevo usuario en el sistema.

### `logout(dispatch)`
**NUEVA FUNCIÓN** - Cierra la sesión del usuario actual.

## Función de Logout

La función `logout` realiza las siguientes acciones:

1. **Limpia el localStorage**: Elimina el token JWT y los datos del usuario
2. **Resetea el estado**: Vuelve el estado de la aplicación al estado inicial
3. **Redirige al login**: Navega automáticamente a la página de login

### Uso Básico

```tsx
import { logout } from "../context/actions/auth";
import { useContext } from "../context/useContenxt";
import { useNavigate } from "react-router-dom";

const MyComponent = () => {
  const { dispatch } = useContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatch);
    navigate("/login");
  };

  return (
    <button onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
};
```

### Uso con el Componente LogoutButton

```tsx
import { LogoutButton } from "../components/LogoutButton";

const MyComponent = () => {
  return (
    <div>
      <h1>Mi Página</h1>
      <LogoutButton variant="contained" size="large" />
    </div>
  );
};
```

### Uso en Sidebar

Los componentes `SidebarLayout` y `SidebarExample` ya incluyen la funcionalidad de logout integrada.

## Estado Inicial después del Logout

Después de ejecutar `logout()`, el estado de la aplicación se resetea a:

```tsx
{
  isLoading: false,
  isLoadingAppointments: false,
  error: {
    message: "",
  },
  data: {
    accessToken: "",
    user: {
      id: "",
      name: "",
      type: "",
      roles: [],
    },
    appointments: [],
  },
}
```

## localStorage Limpiado

La función elimina automáticamente:
- `jwt_token` - Token de autenticación
- `user_data` - Datos del usuario

## Integración con React Router

La función está diseñada para trabajar con React Router. Después del logout, se recomienda redirigir al usuario a la página de login:

```tsx
const handleLogout = () => {
  logout(dispatch);
  navigate("/login");
};
``` 