# Actividad A2: Matriz Comparativa de Modelos NoSQL

En esta matriz analizamos las principales familias de bases de datos NoSQL, comparando sus características, fortalezas y casos de uso en el mundo real.

| Modelo NoSQL | Formato de almacenamiento / Estructura | Caso de uso ideal | Ventaja principal | Riesgo o desventaja principal |
| :--- | :--- | :--- | :--- | :--- |
| **Documental** *(ej. MongoDB)* | Documentos JSON/BSON con campos flexibles y anidados. | Sistemas de gestión de contenido, e-commerce, perfiles de usuario. | Alta flexibilidad de esquema y consultas muy completas sobre datos anidados. | Riesgo de duplicar datos (desnormalización) si no se diseña bien el modelo. |
| **Clave-Valor** *(ej. Redis)* | Parejas simples de datos (una Clave única asociada a un Valor). | Caché de sesiones, carritos de compra, conteo en tiempo real. | Velocidad de lectura/escritura ultra rápida (tiempos de respuesta en milisegundos). | Consultas muy limitadas; solo se puede buscar eficientemente por la clave exacta. |
| **Columna Ancha** *(ej. Cassandra)* | Tablas organizadas por familias de columnas dinámicas. | Análisis de Big Data, métricas IoT, registros masivos de eventos (logs). | Escalabilidad horizontal masiva y escritura extremadamente rápida sin punto único de falla. | Consultas complejas o filtros flexibles son muy difíciles de implementar. |
| **Grafos** *(ej. Neo4j)* | Nodos (entidades) y Relaciones (bordes/conexiones) con propiedades. | Redes sociales, sistemas de recomendación, detección de fraudes. | Mapea y navega relaciones complejas de forma muy rápida y natural. | Poco eficiente para procesar grandes volúmenes de transacciones simples o agregaciones masivas. |

---

### Análisis de Decisión Tecnológica

**¿Por qué el modelo Documental (MongoDB) es la opción mas adecuada para el proyecto "Plataforma de Innovación Abierta"?**

1. **Estructura flexible de datos:** Las iniciativas de innovación no tienen siempre la misma información; algunas incluyen prototipos, documentos, métricas o etiquetas. MongoDB permite guardar documentos JSON con esquemas dinámicos sin romper la base de datos.
2. **Embebimiento natural:** Permite guardar la información de la iniciativa junto con sus comentarios, fases y postulaciones en un solo documento, evitando hacer cruces (`JOINs`) pesados que vuelven lenta la aplicación.
3. **Escalabilidad y rapidez de desarrollo:** Facilita iterar rápido en la fase de desarrollo e integrar el backend (Node.js/Python) directamente con datos en formato JSON/BSON.