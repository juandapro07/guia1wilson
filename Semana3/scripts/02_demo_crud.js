// ============================================================================
// Script: 02_demo_crud.js
// Propósito: Demostración de operaciones CRUD seguras en Semana 3
// Base de datos: emprendimiento_sena_lab
// ============================================================================

const ds = "S03_UE_V1";
const I = db.s03_iniciativas;

print("=== 1. Inserción con insertOne (TMP-101) ===");

// Verificar que responsable existe
const resp = db.s03_emprendedores.findOne({ _id: "EMP-001" });
if (!resp) {
  throw new Error("El responsable EMP-001 no existe.");
}

// Inserción individual
I.insertOne({
  _id: "TMP-101",
  dataset: ds,
  temporal: true,
  responsable_id: "EMP-001",
  nombre: "Prototipo Digital Demo",
  sector: "tecnologia",
  etapa: "idea",
  estado: "activa",
  perfil: {
    propuesta_valor: "Agenda para comercios",
    atributos: { plataforma: "web", entrega: "saas" }
  },
  intentos_contacto: 0
});

print("Insertado TMP-101 correctamente.");

print("\n=== 2. Actualización con updateOne ($set e$inc) ===");
var f = { dataset: ds, temporal: true, _id: "TMP-101" };

print("Estado previo:");
printjson(I.find(f, { _id: 1, "perfil.atributos": 1, intentos_contacto: 1 }).toArray());

// Modificación
const resUpdate = I.updateOne(f, {
  $set: { "perfil.atributos.entrega": "asistida" },
  $inc: { intentos_contacto: 1 }
});

print(`Matched: ${resUpdate.matchedCount}, Modified: ${resUpdate.modifiedCount}`);

print("Estado posterior:");
printjson(I.find(f, { _id: 1, "perfil.atributos": 1, intentos_contacto: 1 }).toArray());

print("\n=== 3. Inserción en Lote (TMP-102 y TMP-103) ===");
I.insertMany([
  {
    _id: "TMP-102",
    dataset: ds,
    temporal: true,
    responsable_id: "EMP-002",
    nombre: "Eco Panel",
    sector: "economia_circular",
    etapa: "idea",
    estado: "activa",
    intentos_contacto: 0
  },
  {
    _id: "TMP-103",
    dataset: ds,
    temporal: true,
    responsable_id: "EMP-003",
    nombre: "Snack Saludable",
    sector: "alimentos",
    etapa: "idea",
    estado: "activa",
    intentos_contacto: 0
  }
]);
print("Insertados TMP-102 y TMP-103.");

print("\n=== 4. Eliminación Segura (deleteMany sobre temporales) ===");
var borrar = { dataset: ds, temporal: true, _id: { $in: ["TMP-101", "TMP-102", "TMP-103"] } };

print(`Cantidad a eliminar: ${I.countDocuments(borrar)}`);
const resDelete = I.deleteMany(borrar);
print(`deletedCount: ${resDelete.deletedCount}`);
print(`Cantidad restante de temporales: ${I.countDocuments(borrar)}`);

print("\n=== Demostración CRUD Finalizada Limpiamente ===");