# Actividad A2: Especificación de Patrones de Acceso (Lectura y Escritura)

En este documento se precisan los patrones de acceso para la **Unidad de Emprendimiento del SENA**, definiendo las lecturas principales (Q01–Q06) y las operaciones de escritura/modificación (W01–W04).

---
    
## 1. Operaciones de Lectura (Consultas Q01 - Q06)

| ID | Propósito del Negocio | Datos de Entrada / Filtros | Campos de Salida y Orden | Frecuencia Estimada | Colección Principal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Q01** | Consultar iniciativas activas por sector y etapa. | `sector` (ej. tecnologia), `etapa` (ej. validacion), `estado: "activa"`. | `_id`, `nombre`, `etapa`. Ordenado por `nombre: 1`. | Alta (Diaria) | `iniciativas` |
| **Q02** | Obtener detalle completo de una iniciativa. | `_id` de la iniciativa (ej. "INI-001"). | Propuesta de valor, atributos sectoriales, `responsable_id`. | Alta (Diaria) | `iniciativas` |
| **Q03** | Consultar iniciativas de un emprendedor responsable. | `responsable_id` (ej. "EMP-001"), `estado` (activa/archivada). | `_id`, `nombre`, `estado`. Ordenado por `_id: 1`. | Media (Semanal) | `iniciativas` |
| **Q04** | Consultar asesorías programadas por rango de fecha y modalidad. | Rango `fecha_programada` (`inicio <= fecha < fin`), `modalidad`, `estado: "programada"`. | `_id`, `iniciativa_id`, `asesor_codigo`, `fecha_programada`. Ordenado por `fecha_programada: 1`. | Alta (Diaria) | `asesorias` |
| **Q05** | Obtener historial completo de asesorías de una iniciativa. | `iniciativa_id` (ej. "INI-001"). | `_id`, `fecha_realizacion`, `temas`, `asesor_codigo`, `estado`. Ordenado por `fecha_programada: -1`. | Media (Semanal) | `asesorias` |
| **Q06** | Generar reporte consolidado de asesorías realizadas por sector histórico y mes. | Mes/Año de realización (`fecha_realizacion`), `estado: "realizada"`. | Conteo de asesorías agrupadas por `iniciativa_snapshot.sector`. | Baja (Mensual) | `asesorias` |

---

## 2. Operaciones de Escritura y Modificación (W01 - W04)

### **W01: Crear una nueva iniciativa**
- **Acción:** Registrar un nuevo documento en la colección `iniciativas`.
- **Condición de Coherencia:** Validar que el `responsable_id` existe previamente en la colección `emprendedores` y se encuentra con `estado: "activo"`.

### **W02: Programar una nueva asesoría**
- **Acción:** Insertar un documento en la colección `asesorias` con `estado: "programada"`, `fecha_realizacion: null` e `iniciativa_snapshot: null`.
- **Condición de Coherencia:** Validar que la iniciativa exista y esté `activa`, y que el asesor no tenga otra asesoría agendada en el mismo rango horario.

### **W03: Marcar asesoría como realizada y capturar snapshot**
- **Acción:** Actualizar el documento de la asesoría cambiando `estado: "realizada"`, registrando `fecha_realizacion` y capturando en `iniciativa_snapshot` el nombre y sector **vigentes** de la iniciativa en ese instante.
- **Condición de Coherencia:** Operación atómica de actualización para congelar la información histórica al momento de la sesión.

### **W04: Archivar una iniciativa y gestionar sesiones pendientes**
- **Acción:** Modificar el estado de la iniciativa a `archivada`.
- **Condición de Coherencia:** Las asesorías pasadas (`realizadas`) se conservan intactas para auditoría. Las asesorías `programadas` pendientes deben ser reprogramadas o canceladas de forma explícita.