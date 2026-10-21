# Actividad A4: Políticas de Integridad Referencial y Eliminación

Este documento establece los acuerdos y responsabilidades para garantizar la consistencia de los datos en MongoDB para la **Unidad de Emprendimiento del SENA**.

---

## 1. Responsabilidades de Integridad Referencial (Capa de Aplicación)

Debido a que MongoDB no impone claves foráneas automáticas entre colecciones, la integridad se valida en la capa de servicios/aplicación:

| Operación | Política de Validación | Responsable |
| :--- | :--- | :--- |
| **Crear Iniciativa (W01)** | Validar que `responsable_id` exista en `emprendedores` y su estado sea `"activo"`. | Servicio de Iniciativas |
| **Programar Asesoría (W02)** | Validar que `iniciativa_id` exista en `iniciativas` y su estado sea `"activa"`. Validar disponibilidad del asesor. | Servicio de Asesorías |
| **Realizar Asesoría (W03)** | Capturar de forma atómica en `iniciativa_snapshot` el sector y nombre vigentes de la iniciativa. | Servicio de Asesorías |

---

## 2. Política de Archivo y Eliminación

1. **Emprendedores con Iniciativas:**
   - **Prohibido el borrado físico.** Se debe cambiar el estado a `"inactivo"`.

2. **Iniciativas con Historial de Asesorías:**
   - **Prohibido el borrado físico.** Para retirar una iniciativa se actualiza su estado a `"archivada"`.
   - Las asesorías pasadas (`realizadas`) permanecen intactas en la colección `asesorias` para auditoría y reportes históricos (Q06).
   - Las asesorías `programadas` pendientes asociadas a la iniciativa archivada deben cancelarse o reasignarse explícitamente (W04).

---

## 3. Manejo de Concurrencia y Solicitudes Simultáneas

- **Garantía en Laboratorio:** Ejecución secuencial verificada mediante scripts de prueba.
- **Estrategia para Producción:** Se requerirá el uso de transacciones ACID multi-documento (`session.withTransaction()`) o bloqueos optimistas para evitar doble agendamiento de un mismo asesor en una misma franja horaria.