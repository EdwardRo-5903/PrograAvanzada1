# PrograAvanzada1

Habit Tracker
Un sistema de seguimiento de hábitos desarrollado con Node.js, Express y MongoDB.

Características
✅ Permite a los usuarios registrar y rastrear sus hábitos diarios.
✅ API RESTful para gestionar hábitos.
✅ Base de datos MongoDB para almacenar información.
✅ Uso de variables de entorno con dotenv.

📂 Instalación
1️⃣ Clona el repositorio

bash
Copiar
Editar
git clone https://github.com/tu-usuario/habit-tracker.git
cd habit-tracker

2️⃣ Instala dependencias
bash
Copiar
Editar
npm install

3️⃣ Configura el archivo .env
Crea un archivo .env en la raíz del proyecto y agrega:
ini
Copiar
Editar
MONGO_URI=mongodb://127.0.0.1:27017/habitTrackerDB
PORT=5000

4️⃣ Inicia el servidor
bash
Copiar
Editar
node server.js
O con nodemon (si lo tienes instalado):
bash
Copiar
Editar
npm run dev

Rutas de la API
Método	Ruta	Descripción
GET	/api/habits	Obtiene todos los hábitos
POST	/api/habits	Crea un nuevo hábito
PUT	/api/habits/:id	Actualiza un hábito existente
DELETE	/api/habits/:id	Elimina un hábito

Tecnologías utilizadas
🟢 Node.js – Entorno de ejecución de JavaScript
🟣 Express.js – Framework para construir la API
🟡 MongoDB & Mongoose – Base de datos NoSQL y ORM
🟠 Dotenv – Para manejar variables de entorno

📌 Notas
Asegúrate de que MongoDB esté corriendo en tu PC antes de iniciar el servidor.
Si deseas usar MongoDB Atlas, cambia MONGO_URI en .env con la cadena de conexión de tu clúster.
Puedes probar la API con Postman o curl.

👨‍💻 Autor
Desarrollado por EdwardDev
