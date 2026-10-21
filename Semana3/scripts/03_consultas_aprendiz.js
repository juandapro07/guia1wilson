// ============================================================================
// Script: 03_consultas_aprendiz.js
// Propósito: Implementar las 10 consultas reproducibles (C01 - C10) E03
// Base de datos: emprendimiento_sena_lab
// ============================================================================

const ds = "S03_UE_V1";
const I = db.s03_iniciativas;
const A = db.s03_asesorias;

print("====================================================================");
print("C01 - Q01: Iniciativas activas de tecnología en puesta en marcha");
print("====================================================================");
printjson(I.find(
  { dataset: ds, estado: "activa", sector: "tecnologia", etapa: "puesta_en_marcha" },
  { _id: 1, nombre: 1, etapa: 1 }
).sort({ nombre: 1, _id: 1 }).toArray());

print("\n====================================================================");
print("C02 - Q02 parcial: Iniciativas activas con atributo plataforma = web");
print("====================================================================");
printjson(I.find(
  { dataset: ds, estado: "activa", "perfil.atributos.plataforma": "web" },
  { _id: 1, nombre: 1, "perfil.atributos.plataforma": 1 }
).sort({ _id: 1 }).toArray());

print("\n====================================================================");
print("C03 - Q03: Iniciativas activas del responsable EMP-001");
print("====================================================================");
printjson(I.find(
  { dataset: ds, estado: "activa", responsable_id: "EMP-001" },
  { _id: 1, nombre: 1, responsable_id: 1 }
).sort({ _id: 1 }).toArray());

print("\n====================================================================");
print("C04 - Q04: Asesorías programadas virtuales en octubre 2026 UTC");
print("====================================================================");
printjson(A.find(
  {
    dataset: ds,
    estado: "programada",
    modalidad: "virtual",
    fecha_programada: {
      $gte: ISODate("2026-10-01T00:00:00Z"),
      $lt: ISODate("2026-11-01T00:00:00Z")
    }
  },
  { _id: 1, iniciativa_id: 1, fecha_programada: 1, modalidad: 1 }
).sort({ fecha_programada: 1, _id: 1 }).toArray());

print("\n====================================================================");
print("C05 - Q05: Historial de la iniciativa INI-001");
print("====================================================================");
printjson(A.find(
  { dataset: ds, iniciativa_id: "INI-001" },
  { _id: 1, estado: 1, fecha_programada: 1 }
).sort({ fecha_programada: 1, _id: 1 }).toArray());

print("\n====================================================================");
print("C06 - Arreglo: Asesorías realizadas con tema 'propuesta de valor'");
print("====================================================================");
printjson(A.find(
  { dataset: ds, estado: "realizada", temas: "propuesta de valor" },
  { _id: 1, temas: 1 }
).sort({ _id: 1 }).toArray());

print("\n====================================================================");
print("C07 - Null: Evaluación de contacto_alterno (null o ausente vs null explícito)");
print("====================================================================");
print("--- Caso A: contacto_alterno == null (incluye null y ausentes) ---");
printjson(I.find(
  { dataset: ds, _id: { $in: ["INI-001", "INI-002", "INI-003"] }, contacto_alterno: null },
  { _id: 1, contacto_alterno: 1 }
).sort({ _id: 1 }).toArray());

print("--- Caso B: contacto_alterno es null explícito ---");
printjson(I.find(
  { dataset: ds, _id: { $in: ["INI-001", "INI-002", "INI-003"] }, contacto_alterno: { $eq: null, $exists: true } },
  { _id: 1, contacto_alterno: 1 }
).sort({ _id: 1 }).toArray());

print("\n====================================================================");
print("C08 - Existencia: contacto_alterno ausente ($exists: false)");
print("====================================================================");
printjson(I.find(
  { dataset: ds, _id: { $in: ["INI-001", "INI-002", "INI-003"] }, contacto_alterno: { $exists: false } },
  { _id: 1, contacto_alterno: 1 }
).sort({ _id: 1 }).toArray());

print("\n====================================================================");
print("C09 - $elemMatch: Diagnóstico en mercado con puntaje >= 80");
print("====================================================================");
printjson(I.find(
  {
    dataset: ds,
    diagnosticos: { $elemMatch: { area: "mercado", puntaje: { $gte: 80 } } }
  },
  { _id: 1, diagnosticos: 1 }
).sort({ _id: 1 }).toArray());

print("\n====================================================================");
print("C10 - Paginación: Iniciativas activas (Página 2 con skip vs continuación)");
print("====================================================================");
const orden = { sector: 1, _id: 1 };
const alcance = { dataset: ds, estado: "activa" };

print("--- P1 (3 primeros) ---");
const p1 = I.find(alcance, { _id: 1, nombre: 1, sector: 1 })
  .collation({ locale: "simple" }).sort(orden).limit(3).toArray();
printjson(p1);

print("--- P2 con skip(3) ---");
const p2Skip = I.find(alcance, { _id: 1, nombre: 1, sector: 1 })
  .collation({ locale: "simple" }).sort(orden).skip(3).limit(3).toArray();
printjson(p2Skip);

const ultimo = p1[p1.length - 1];
print("--- P2 con continuación (seek) ---");
const p2Seek = I.find({
  ...alcance,
  $or: [
    { sector: { $gt: ultimo.sector } },
    { sector: ultimo.sector, _id: { $gt: ultimo._id } }
  ]
}, { _id: 1, nombre: 1, sector: 1 }).collation({ locale: "simple" }).sort(orden).limit(3).toArray();
printjson(p2Seek);