# Actividad A3: Decisiones de Diseño de Modelado NoSQL v1

En este documento se argumentan y justifican las tres decisiones principales de arquitectura de datos para la **Unidad de Emprendimiento del SENA**.

---

## 1. Decisión 1: Separación de Historial de Asesorías (Colección Independiente vs. Arreglo Embebido)

- **Necesidad del Negocio:** Una iniciativa puede acumular decenas de asesorías durante varios años de acompañamiento. Se requiere consultar agendas por fechas y modalidades (Q04) e historiales por iniciativa (Q05).
- **Alternativas Consideradas:**
  1. *Opción A (Embeber):* Guardar todas las asesorías en un arreglo `iniciativas.asesorias[]`.
  2. *Opción B (Referenciar - Elegida):* Crear una colección independiente `asesorias` con la clave `iniciativa_id`.
- **Elección Justificada:** **Opción B (Colección independiente)**[cite: 4].
- **Costo Aceptado:** Se requiere realizar una consulta adicional o usar `$lookup` cuando se quiere ver la iniciativa con sus asesorías[cite: 4].
- **Condición para Revisar:** Evita el antipatrón de arreglos sin límite (*unbounded arrays*) y no arriesga superar el límite BSON de 16 MB a lo largo de los años[cite: 4]. Facilitará además la gestión individual de estados de agenda[cite: 4].

---

## 2. Decisión 2: Perfil y Atributos Sectoriales (Subdocumento Embebido 1:1)

- **Necesidad del Negocio:** Cada sector (alimentos, software, agro) tiene características y atributos específicos. La propuesta de valor y los atributos siempre se leen junto con la información general de la iniciativa (Q02)[cite: 4].
- **Alternativas Consideradas:**
  1. *Opción A (Embeber 1:1 - Elegida):* Incluir un objeto `perfil` con `propuesta_valor` y `atributos` flexibles dentro de `iniciativas`.
  2. *Opción B (Referenciar):* Crear una colección `perfiles_negocio` vinculada por ID.
- **Elección Justificada:** **Opción A (Subdocumento embebido)**[cite: 4].
- **Costo Aceptado:** Incrementa ligeramente el tamaño base del documento de la iniciativa.
- **Condición para Revisar:** Maximiza el rendimiento de lectura de I/O en la consulta de detalle (Q02) en una sola operación de lectura sin hacer cruces[cite: 4]. Los atributos son de tamaño acotado[cite: 4].

---

## 3. Decisión 3: Captura de Snapshot Histórico (`iniciativa_snapshot`)

- **Necesidad del Negocio:** Una iniciativa puede cambiar de nombre o de sector con el tiempo. Un reporte mensual de asesorías realizadas (Q06) debe reflejar el sector que tenía la iniciativa **al momento de recibir la asesoría**, sin alterar la historia si hoy cambia de sector[cite: 4].
- **Alternativas Consideradas:**
  1. *Opción A (Consulta Dinámica):* Consultar siempre el sector actual de la iniciativa mediante `iniciativa_id`.
  2. *Opción B (Snapshot Histórico - Elegida):* Capturar un objeto `iniciativa_snapshot` con `nombre`, `sector` y `capturado_en` en la asesoría al marcarla como `realizada` (W03).
- **Elección Justificada:** **Opción B (Snapshot Histórico)**[cite: 4].
- **Costo Aceptado:** Duplicación controlada y desnormalización de datos (`nombre` y `sector`)[cite: 4].
- **Condición para Revisar:** Garantiza la integridad analítica y la fidelidad de los reportes históricos (Q06) frente a reestructuraciones de las iniciativas[cite: 4].