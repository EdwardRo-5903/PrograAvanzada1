# Habit Tracker

Este proyecto es una aplicación de seguimiento de hábitos que permite a los usuarios crear, leer, actualizar y eliminar hábitos. La aplicación está dividida en dos partes: un backend construido con Express y Mongoose, y un frontend desarrollado con React y Redux.

## Estructura del Proyecto

```
habit-tracker
├── backend
│   ├── models
│   │   └── Habit.js
│   ├── routes
│   │   └── habits.js
│   ├── server.js
│   └── package.json
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── actions
│   │   │   └── habitActions.js
│   │   ├── components
│   │   │   └── HabitComponent.js
│   │   ├── reducers
│   │   │   ├── habitReducer.js
│   │   │   └── rootReducer.js
│   │   ├── store
│   │   │   └── store.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles
│   │       └── App.css
│   └── package.json
└── README.md
```

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega a la carpeta del backend y ejecuta:
   ```
   cd backend
   npm install
   ```

3. Navega a la carpeta del frontend y ejecuta:
   ```
   cd frontend
   npm install
   ```

## Uso

1. Inicia el servidor backend:
   ```
   cd backend
   npm start
   ```

2. Inicia la aplicación frontend:
   ```
   cd frontend
   npm start
   ```

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.