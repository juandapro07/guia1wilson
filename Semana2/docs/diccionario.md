# Actividad A4: Diccionario de Datos BSON (Contrato del Modelo v1)

Este diccionario define el esquema y contrato de datos BSON para las colecciones `emprendedores`, `iniciativas` y `asesorias` de la **Unidad de Emprendimiento del SENA**.

---

## 1. Colección `emprendedores`

| Ruta del Campo | Tipo BSON | Presencia | Regla / Dominio | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | String | Requerido | Formato `EMP-xxx` (Ej: `EMP-001`). Único. | Identificador único del emprendedor. |
| `dataset` | String | Requerido | Cadena fija `"S02_UE_V1"`. | Identificador del conjunto de datos del laboratorio[cite: 4]. |
| `alias` | String | Requerido | Texto corto (3 a 50 caracteres). | Alias o nombre ficticio del emprendedor[cite: 4]. |
| `estado` | String | Requerido | Enum: `"activo"` \| `"inactivo"`. | Estado operativo del emprendedor[cite: 4]. |

---

## 2. Colección `iniciativas`

| Ruta del Campo | Tipo BSON | Presencia | Regla / Dominio | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | String | Requerido | Formato `INI-xxx` (Ej: `INI-001`). Único. | Identificador único de la iniciativa[cite: 4]. |
| `dataset` | String | Requerido | Cadena fija `"S02_UE_V1"`. | Identificador del conjunto de laboratorio[cite: 4]. |
| `responsable_id` | String | Requerido | Debe existir en `emprendedores._id`. | ID del emprendedor responsable de la iniciativa[cite: 4]. |
| `nombre` | String | Requerido | Texto (3 a 100 caracteres). | Nombre de la iniciativa o proyecto[cite: 4]. |
| `sector` | String | Requerido | Ej: `"tecnologia"`, `"alimentos"`, `"economia_circular"`. | Sector económico de la iniciativa[cite: 3, 4]. |
| `etapa` | String | Requerido | Enum: `"idea"` \| `"validacion"` \| `"puesta_en_marcha"`. | Etapa didáctica de la iniciativa[cite: 3, 4]. |
| `estado` | String | Requerido | Enum: `"activa"` \| `"archivada"`. | Estado actual de la iniciativa[cite: 3, 4]. |
| `perfil` | Object | Requerido | Subdocumento 1:1. | Detalle de la propuesta y atributos[cite: 4]. |
| `perfil.propuesta_valor` | String | Requerido | Texto descriptivo (10 a 250 caracteres). | Descripción de la propuesta de valor[cite: 4]. |
| `perfil.atributos` | Object | Requerido | Objeto con llaves/valores flexibles por sector. | Atributos específicos según el sector[cite: 3, 4]. |

---

## 3. Colección `asesorias`

| Ruta del Campo | Tipo BSON | Presencia | Regla / Dominio | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | String | Requerido | Formato `ASE-xxx` (Ej: `ASE-001`). Único. | Identificador único de la asesoría[cite: 4]. |
| `dataset` | String | Requerido | Cadena fija `"S02_UE_V1"`. | Identificador del conjunto de laboratorio[cite: 4]. |
| `iniciativa_id` | String | Requerido | Debe existir en `iniciativas._id`. | ID de la iniciativa que recibe la asesoría[cite: 4]. |
| `asesor_codigo` | String | Requerido | Enum: `"ASESOR-01"` \| `"ASESOR-02"` \| `"ASESOR-03"`. | Código del asesor asignado[cite: 4]. |
| `estado` | String | Requerido | Enum: `"programada"` \| `"realizada"` \| `"cancelada"`. | Estado de la sesión de asesoría[cite: 3, 4]. |
| `modalidad` | String | Requerido | Enum: `"virtual"` \| `"presencial"`. | Modalidad en la que se atiende[cite: 3, 4]. |
| `fecha_programada` | Date | Requerido | Tipo ISODate en UTC. | Fecha y hora en que fue agendada[cite: 3, 4]. |
| `fecha_realizacion` | Date \| Null | Requerido | Date si `estado == "realizada"`; `null` si no. | Fecha y hora exacta de realización[cite: 3, 4]. |
| `temas` | Array [String] | Requerido | Mínimo 1, máximo 5 elementos (1-80 chars c/u). | Temas tratados en la sesión[cite: 4]. |
| `iniciativa_snapshot` | Object \| Null | Requerido | Subdocumento histórico si `realizada`; `null` si no. | Foto histórica de la iniciativa[cite: 4]. |
| `iniciativa_snapshot.nombre` | String | Condicional | Nombre de la iniciativa al realizar la asesoría. | Copia desnormalizada histórica[cite: 4]. |
| `iniciativa_snapshot.sector` | String | Condicional | Sector de la iniciativa al realizar la asesoría. | Copia desnormalizada para reporte Q06[cite: 4]. |
| `iniciativa_snapshot.capturado_en`| Date | Condicional | Coincide con la `fecha_realizacion`. | Estampa de tiempo del congelamiento[cite: 4]. |