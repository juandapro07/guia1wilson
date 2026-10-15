// 03_verificar.js - Verificación de Integridad y Consultas (Semana 2)
db = db.getSiblingDB("emprendimiento_sena_lab");

print("=== Verificación de Conteos ===");
print(`Emprendedores (esperados 10): ${db.emprendedores.countDocuments({ dataset: "S02_UE_V1" })}`);
print(`Iniciativas (esperadas 15): ${db.iniciativas.countDocuments({ dataset: "S02_UE_V1" })}`);
print(`Asesorias (esperadas 30): ${db.asesorias.countDocuments({ dataset: "S02_UE_V1" })}`);

print("\n=== Verificación de Referencias Huérfanas ===");
const iniciativas = db.iniciativas.find({ dataset: "S02_UE_V1" }).toArray();
let huerfanasEmp = 0;
iniciativas.forEach(ini => {
  const emp = db.emprendedores.findOne({ _id: ini.responsable_id });
  if (!emp) huerfanasEmp++;
});
print(`Iniciativas con responsable inexistente: ${huerfanasEmp}`);

const asesorias = db.asesorias.find({ dataset: "S02_UE_V1" }).toArray();
let huerfanasIni = 0;
asesorias.forEach(ase => {
  const ini = db.iniciativas.findOne({ _id: ase.iniciativa_id });
  if (!ini) huerfanasIni++;
});
print(`Asesorías con iniciativa inexistente: ${huerfanasIni}`);

print("\n=== Ejemplo de Salida Q06 (Agregación por Sector Histórico) ===");
const q06 = db.asesorias.aggregate([
  { $match: { estado: "realizada", dataset: "S02_UE_V1" } },
  { $group: { _id: "$iniciativa_snapshot.sector", total_asesorias: { $sum: 1 } } }
]).toArray();
printjson(q06);