# 🍕 Quiosco Next - Sistema de Gestión de Órdenes

Un moderno sistema de gestión de órdenes para negocios de comida/bebidas construido con **Next.js 16**, **React 19**, **Prisma ORM** y **PostgreSQL**. Incluye panel administrativo completo para gestionar productos, categorías y órdenes.

## 🚀 Características

- ✅ **Panel Administrativo** - Gestión completa de productos y órdenes
- 🛒 **Carrito de Compras** - Sistema de compra interactivo con estado global en Zustand
- 🏪 **Catálogo de Productos** - Visualización por categorías
- 📦 **Gestión de Órdenes** - Control de estado de órdenes (pendiente/completada)
- 🖼️ **Carga de Imágenes** - Integración con Cloudinary
- 📱 **Diseño Responsivo** - Tailwind CSS para estilos modernos
- ⚡ **TypeScript** - Tipado estático para mayor seguridad
- 🔐 **Validación con Zod** - Schemas de validación para datos

## 🛠️ Stack Tecnológico

| Área               | Tecnología              |
| ------------------ | ----------------------- |
| **Framework**      | Next.js 16              |
| **Renderizado**    | React 19                |
| **Estilos**        | Tailwind CSS 4          |
| **Base de Datos**  | PostgreSQL + Prisma ORM |
| **Estado Global**  | Zustand                 |
| **Validación**     | Zod                     |
| **Imágenes**       | Next Cloudinary         |
| **Notificaciones** | React Toastify          |
| **Iconos**         | Heroicons               |
| **Datos**          | SWR (caching)           |
| **Tipado**         | TypeScript 5            |

## 📁 Estructura del Proyecto

```
├── app/                          # App Router de Next.js
│   ├── order/                    # Área de compra
│   ├── orders/                   # Historial de órdenes
│   ├── admin/                    # Panel administrativo
│   │   ├── products/             # Gestión de productos
│   │   └── orders/               # Gestión de órdenes
│   └── page.tsx                  # Home
├── components/                   # Componentes React
│   ├── admin/                    # Componentes administrativos
│   ├── order/                    # Componentes de compra
│   ├── products/                 # Componentes de productos
│   └── ui/                       # Componentes UI reutilizables
├── actions/                      # Server Actions de Next.js
├── prisma/                       # Esquema y migraciones
│   ├── schema.prisma             # Modelo de datos
│   ├── data/                     # Seeds iniciales
│   └── migrations/               # Historial de cambios BD
├── src/
│   ├── db.ts                     # Conexión a BD
│   ├── store.ts                  # Store global con Zustand
│   ├── schema/                   # Schemas de validación
│   ├── types/                    # Tipos TypeScript
│   └── utils/                    # Utilidades
└── public/                       # Archivos estáticos
```

## 🗄️ Modelos de Datos

### Category

- `id` - Identificador único
- `name` - Nombre de la categoría
- `slug` - URL-friendly identifier
- `products` - Relación con productos

### Product

- `id` - Identificador único
- `name` - Nombre del producto
- `price` - Precio unitario
- `image` - URL de la imagen
- `categoryId` - Referencia a categoría
- `orderProducts` - Órdenes que contienen este producto

### Order

- `id` - Identificador único
- `name` - Nombre del cliente
- `total` - Total de la orden
- `date` - Fecha de creación
- `status` - Estado (pendiente/completada)
- `orderReadyAt` - Fecha de completación
- `orderProducts` - Productos en la orden

### OrderProducts

- `id` - Identificador único
- `orderId` - Referencia a orden
- `productId` - Referencia a producto
- `quantity` - Cantidad de items

## 🚀 Guía de Inicio

### Requisitos

- **Node.js** 18+
- **PostgreSQL** en ejecución
- **pnpm** como gestor de paquetes

### Instalación

1. **Clonar y instalar**

```bash
cd quiosco-next
pnpm install
```

2. **Configurar variables de entorno**

```bash
# Crear archivo .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/quiosco"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="tu-cloudinary-cloud"
```

3. **Configurar base de datos**

```bash
# Generar cliente Prisma
pnpm prisma generate

# Ejecutar migraciones
pnpm prisma migrate dev

# Cargar datos iniciales (opcional)
pnpm tsx src/seed.ts
```

4. **Ejecutar en desarrollo**

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Comandos Disponibles

```bash
pnpm dev          # Iniciar servidor de desarrollo
pnpm build        # Compilar para producción
pnpm start        # Ejecutar en producción
pnpm lint         # Ejecutar ESLint
```

## 📚 Rutas Principales

| Ruta                        | Descripción                      |
| --------------------------- | -------------------------------- |
| `/`                         | Página principal                 |
| `/order/[category]`         | Catálogo por categoría           |
| `/orders`                   | Historial de órdenes del usuario |
| `/admin/products`           | Gestor de productos              |
| `/admin/products/new`       | Crear nuevo producto             |
| `/admin/products/[id]/edit` | Editar producto                  |
| `/admin/orders`             | Gestor de órdenes                |

## 🔧 Configuración

### Tailwind CSS

Configurado con la versión 4 usando `@tailwindcss/postcss` para máximo rendimiento.

### Prisma

- Generador de cliente personalizado en `src/generated/prisma`
- Adapter para PostgreSQL con Neon
- Migraciones automáticas

### ESLint

Configuración moderna con Next.js best practices.

## 📖 Próximas Mejoras

- [ ] Autenticación de usuarios
- [ ] Sistema de pagos integrado
- [ ] Reportes de ventas
- [ ] Notificaciones en tiempo real
- [ ] Filtros avanzados en administración
- [ ] Dashboard con estadísticas
