# Actividad A3: Especificación de Consultas y Reglas de Negocio

En este documento definimos las consultas principales (Q01 a Q06) que requerirá el sistema de la **Plataforma de Innovación Abierta**, justificando si es mejor **embeber** o **referenciar** la información en MongoDB.

---

## 1. Mapeo de Consultas Operativas (Q01 - Q06)

### **Q01: Consultar el detalle de una iniciativa con sus postulaciones recientes**
- **Descripción:** Mostrar la información general de una iniciativa junto con las últimas postulaciones recibidas.
- **Estrategia sugerida:** **Embeber** (o híbrido con límite).
- **Justificación:** Las postulaciones forman parte del ciclo de vida de la iniciativa y se leen frecuentemente al revisar el detalle de la misma. Embeber las últimas postulaciones evita consultas adicionales a la base de datos.

### **Q02: Listar los datos básicos del emprendedor que creó una iniciativa**
- **Descripción:** Obtener el nombre, correo y perfil del emprendedor responsable de una iniciativa.
- **Estrategia sugerida:** **Referenciar** (`emprendedor_id`).
- **Justificación:** Un emprendedor puede crear múltiples iniciativas. Además, sus datos de contacto o perfil pueden cambiar con el tiempo. Referenciar evita duplicar el perfil del usuario en cada iniciativa.

### **Q03: Buscar iniciativas por sector y estado**
- **Descripción:** Filtrar iniciativas (por ejemplo, sector "Tecnología" y estado "Abierta").
- **Estrategia sugerida:** **Atributos embebidos en el documento principal**.
- **Justificación:** Al estar los campos `sector` y `estado` dentro del documento de la iniciativa, MongoDB puede responder la consulta de forma directa utilizando un índice compuesto `(sector, estado)`.

### **Q04: Registrar una nueva evaluación asignada a una iniciativa**
- **Descripción:** Un evaluador asigna una calificación y observaciones a una iniciativa.
- **Estrategia sugerida:** **Embeber en un arreglo de evaluaciones**.
- **Justificación:** Las evaluaciones están totalmente ligadas a esa iniciativa específica y su volumen es acotado (rara vez una iniciativa tendrá miles de evaluaciones), por lo que un arreglo embebido es idóneo.

### **Q05: Consultar el historial completo de cambios de estado de una iniciativa**
- **Descripción:** Ver la trazabilidad de fechas y estados por los que ha pasado la iniciativa (ej. Borrador -> Publicada -> Evaluada).
- **Estrategia sugerida:** **Embeber arreglo de historial**.
- **Justificación:** Es un registro de auditoría pequeño que solo pertenece a esa iniciativa. Guardarlo como un arreglo de objetos `[{ estado, fecha, usuario }]` en el mismo documento es muy eficiente.

### **Q06: Generar un reporte consolidado de métricas por sector**
- **Descripción:** Contar total de iniciativas, porcentaje de aprobadas y promedio de calificación por sector.
- **Estrategia sugerida:** **Framework de Agregación de MongoDB (`aggregate`)**.
- **Justificación:** Requiere procesar, agrupar (`$group`) y calcular promedios (`$avg`) sobre el conjunto de datos de iniciativas.

---

## 2. Reglas de Decisión: ¿Cuándo Embeber y cuándo Referenciar?

1. **Embeber (Documentos Anidados / Arreglos):**
   - Cuando la relación es de **1 a Pocos** (ej. una iniciativa y sus 3 fases).
   - Cuando los datos secundarios no tienen sentido sin el documento principal (dependencia fuerte).
   - Criterio de desempeño: Para leer todo el bloque de datos en **una sola operación de I/O** a la base de datos.

2. **Referenciar (Mediante IDs):**
   - Cuando la relación es de **1 a Muchos** o **Muchos a Muchos** con crecimiento desmedido (ej. un usuario y miles de logs o interacciones).
   - Cuando la entidad referenciada cambia constantemente y se comparte entre múltiples documentos (evita inconsistencias por duplicidad).
   - Criterio de desempeño: Para mantener el tamaño del documento por debajo del límite de 16 MB de MongoDB y evitar actualizar múltiples copias del mismo dato.
   