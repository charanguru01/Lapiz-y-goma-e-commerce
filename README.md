# Lapiz-y-goma-e-commerce
Aplicación web funcional para la gestión de artículos escolares con JS avanzado y seguridad XSS.
# 🛒 LAPIZ&GOMA - E-commerce Escolar

### 📝 Descripción de la Problemática
Actualmente, las librerías locales carecen de sistemas dinámicos que permitan a los usuarios gestionar sus compras de forma fluida. Este proyecto resuelve la necesidad de un catálogo interactivo que maneje stock simulado, cálculo automático de totales y validaciones de seguridad para proteger los datos del cliente.

### 🛠️ Tecnologías Utilizadas
*   **HTML5 Semantic:** Estructura accesible y clara.
*   **CSS3 (Custom Properties & Grid):** Diseño responsivo inspirado en la estética de Lápiz López.
*   **JavaScript Vanilla (ES6+):** Lógica modular, manejo de arreglos y objetos.

### 🚀 Conceptos Aplicados
*   **Gestión de Estado:** Uso de un arreglo global (`cart`) para sincronizar la lógica de negocio con la interfaz.
*   **Manipulación Dinámica del DOM:** Uso de `createElement` y `DocumentFragment` para renderizado eficiente.
*   **Funciones Reutilizables:** Modularización de procesos (render, add, remove, validate).

### 🔒 Seguridad y Buenas Prácticas
*   **Prevención de XSS:** Se evitó el uso de `innerHTML` en datos sensibles, utilizando `textContent` para sanitizar la salida al usuario.
*   **Validación Robusta:** Implementación de Expresiones Regulares (Regex) para validar correos electrónicos y campos obligatorios.

---
