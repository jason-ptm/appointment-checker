# Componente Sidebar

Este componente proporciona una barra lateral responsiva basada en Material-UI que se adapta automáticamente a dispositivos móviles y de escritorio.

## Características

- **Responsivo**: Se adapta automáticamente a diferentes tamaños de pantalla
- **Navegación móvil**: En dispositivos móviles, el sidebar se convierte en un drawer temporal
- **Navegación de escritorio**: En pantallas más grandes, el sidebar es permanente
- **Personalizable**: Permite configurar elementos de navegación, título y contenido
- **Accesible**: Incluye atributos ARIA apropiados
- **Estado activo**: Resalta el elemento de navegación actual
- **Wrapper reutilizable**: Funciona como contenedor para múltiples vistas

## Componentes Disponibles

### 1. Sidebar (Componente Base)
Componente base que proporciona la funcionalidad del sidebar.

### 2. SidebarLayout (Recomendado)
Wrapper principal que incluye navegación predefinida y manejo de rutas activas.

### 3. SidebarExample (Legacy)
Componente de ejemplo con navegación básica (mantenido por compatibilidad).

## Uso Recomendado - SidebarLayout

```tsx
import { SidebarLayout } from './components/SidebarLayout';

const MyPage = () => {
  return (
    <SidebarLayout title="Mi Aplicación">
      <div>
        <h1>Contenido de mi página</h1>
        <p>Este contenido se mostrará dentro del sidebar.</p>
      </div>
    </SidebarLayout>
  );
};
```

## Navegación Incluida

El `SidebarLayout` incluye automáticamente los siguientes elementos de navegación:

- **Dashboard** - Página principal con estadísticas
- **Citas** - Gestión de citas médicas
- **Notificaciones** - Sistema de notificaciones
- **Perfil** - Información del usuario
- **Configuración** - Configuraciones de la aplicación
- **Cerrar Sesión** - Función de logout

## Uso Básico - Sidebar (Componente Base)

```tsx
import { Sidebar } from './components/Sidebar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

const MyComponent = () => {
  const sidebarItems = [
    {
      text: 'Citas',
      icon: <CalendarTodayIcon />,
      onClick: () => console.log('Navegar a citas'),
      active: true // Elemento activo
    },
    {
      text: 'Perfil',
      icon: <PersonIcon />,
      onClick: () => console.log('Navegar a perfil'),
      active: false
    }
  ];

  return (
    <Sidebar 
      title="Mi Aplicación" 
      items={sidebarItems}
    >
      <div>
        <h1>Contenido Principal</h1>
        <p>Este es el contenido de tu aplicación.</p>
      </div>
    </Sidebar>
  );
};
```

## Props

### SidebarProps

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `title` | `string` | No | Título que se muestra en la barra superior (por defecto: "Appointment Checker") |
| `items` | `SidebarItem[]` | No | Array de elementos de navegación |
| `children` | `React.ReactNode` | Sí | Contenido principal de la aplicación |
| `window` | `() => Window` | No | Función para obtener la ventana (usado para SSR) |

### SidebarItem

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `text` | `string` | Sí | Texto que se muestra en el elemento |
| `icon` | `React.ReactNode` | Sí | Icono del elemento |
| `onClick` | `() => void` | No | Función que se ejecuta al hacer clic |
| `active` | `boolean` | No | Indica si el elemento está activo (resaltado) |

### SidebarLayoutProps

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `title` | `string` | No | Título personalizado (por defecto: "Appointment Checker") |
| `children` | `React.ReactNode` | Sí | Contenido de la página |

## Ejemplo con React Router

```tsx
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const AppWithSidebar = () => {
  const navigate = useNavigate();

  const sidebarItems = [
    {
      text: 'Citas',
      icon: <CalendarTodayIcon />,
      onClick: () => navigate('/appointments')
    },
    {
      text: 'Perfil',
      icon: <PersonIcon />,
      onClick: () => navigate('/profile')
    },
    {
      text: 'Configuración',
      icon: <SettingsIcon />,
      onClick: () => navigate('/settings')
    },
    {
      text: 'Cerrar Sesión',
      icon: <LogoutIcon />,
      onClick: () => {
        // Lógica de cierre de sesión
        navigate('/login');
      }
    }
  ];

  return (
    <Sidebar 
      title="Appointment Checker" 
      items={sidebarItems}
    >
      {/* Tu contenido aquí */}
    </Sidebar>
  );
};
```

## Integración con Rutas

Para integrar el sidebar con tu sistema de rutas actual:

```tsx
// En tu archivo de rutas
import { Dashboard } from '../pages/dashboard';
import { AppointmentListWithSidebar } from '../pages/appointment/AppointmentListWithSidebar';
import { Notifications } from '../pages/notifications';

<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>

<Route
  path="/appointments"
  element={
    <PrivateRoute>
      <AppointmentListWithSidebar />
    </PrivateRoute>
  }
/>

<Route
  path="/notifications"
  element={
    <PrivateRoute>
      <Notifications />
    </PrivateRoute>
  }
/>
```

## Páginas de Ejemplo Incluidas

### Dashboard
- Estadísticas generales
- Citas recientes
- Acciones rápidas

### Notifications
- Lista de notificaciones
- Estados de lectura
- Tipos de notificación (success, warning, error, info)

### AppointmentListWithSidebar
- Tabla de citas con paginación
- Estados de citas
- Integración completa con el contexto de la aplicación

## Personalización

El componente utiliza Material-UI, por lo que puedes personalizar los estilos usando el sistema de temas de MUI o sobrescribiendo los estilos directamente en las props `sx`.

### Personalizar Colores del Tema Activo

```tsx
// En tu tema de MUI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
  },
});
```

## Migración desde SidebarExample

Si estás usando `SidebarExample`, puedes migrar fácilmente a `SidebarLayout`:

```tsx
// Antes
import { SidebarExample } from './components/SidebarExample';

<SidebarExample>
  <div>Contenido</div>
</SidebarExample>

// Después
import { SidebarLayout } from './components/SidebarLayout';

<SidebarLayout title="Mi Título">
  <div>Contenido</div>
</SidebarLayout>
``` 