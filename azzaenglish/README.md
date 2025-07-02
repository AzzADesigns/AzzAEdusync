# AzzaEdusync

¡Bienvenido a **AzzaEdusync**!

Una plataforma web moderna y minimalista para organizar tu aprendizaje, tareas y recordatorios de manera eficiente y visual. Todo tu progreso se guarda localmente, ¡así que nunca pierdes nada mientras no borres la caché de tu navegador!

---

## 🚀 Funcionalidades principales

### 📅 Calendario interactivo
- Visualiza un calendario mensual con todos los días del mes.
- Navega entre meses y años (el año avanza/retrocede automáticamente).
- El calendario inicia siempre en el mes y año actuales.
- Personaliza el título de cada día y accede a detalles con un solo clic.

### 📝 Notas diarias avanzadas
- Editor enriquecido: **negrita**, _cursiva_, <u>subrayado</u>, resaltado en varios colores y limpieza de estilos.
- Área de notas con scroll propio, borde blanco y placeholder amigable.
- Exporta tus notas a PDF con formato limpio y fiel a la vista web.
- Todo se guarda automáticamente en tu navegador (localStorage).

### ✅ Tareas y Links
- Lista de tareas para cada día: marca como hecho, edita, elimina y agrega nuevas tareas.
- El estado de "hecho" persiste entre sesiones.
- El texto de las tareas hace wrap y nunca causa scroll horizontal.
- Links asociados a cada día, con edición y eliminación sencilla.

### ⏰ Recordatorios inteligentes
- Sección de recordatorios generales y por carpeta/materia.
- Cada recordatorio puede tener texto, fecha de caducidad y materia.
- Modal de detalles al hacer clic en un recordatorio.
- Recordatorio por defecto en "General" advirtiendo sobre el uso de localStorage.
- Persistencia total en localStorage.

### 📁 Carpetas/Materias
- Crea, renombra y elimina carpetas (materias) para organizar tu información.
- Cada carpeta tiene su propio conjunto de recordatorios y datos.

### 💎 Experiencia de usuario
- Interfaz moderna, oscura, minimalista y **totalmente responsiva**.
- Scroll personalizado y elegante en notas y tareas.
- Cierre rápido de modales con la tecla Escape.
- Mensajes y placeholders amigables.
- Diseño adaptativo: en móviles, tareas y links se muestran encima de las notas.

### 💾 Persistencia y advertencias
- **Todos los datos se guardan en localStorage**.
- ⚠️ _No borres la caché del navegador para no perder tu progreso._

---

## 🛠️ Utilidades técnicas
- **Hooks personalizados** para gestión de estado y persistencia.
- **Componentes reutilizables** para modales, inputs, tabs, columnas, etc.
- **Exportación a PDF** con react-to-print.
- **Soporte para SSR/Next.js** con manejo seguro de localStorage.

---

## 📸 Capturas de pantalla

> _Agrega aquí tus capturas de pantalla para mostrar la interfaz y las funcionalidades principales._

---

## 📦 Instalación y uso

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la app:
   ```bash
   npm run dev
   ```
4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📝 Licencia

Este proyecto es de uso personal y educativo. Si quieres contribuir o tienes sugerencias, ¡no dudes en abrir un issue o un pull request!

---

**¡Disfruta organizando tu aprendizaje con AzzaEdusync!** 