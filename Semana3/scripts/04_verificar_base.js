// ============================================================================
// Script: 04_verificar_base.js
// Propósito: Verificar estado base e integridad referencial S03
// Base de datos: emprendimiento_sena_lab
// ============================================================================

const ds = "S03_UE_V1";

print("=== 1. Verificación de Conteos Base S03 ===");
const cantEmp = db.s03_emprendedores.countDocuments({ dataset: ds });
const cantIni = db.s03_iniciativas.countDocuments({ dataset: ds });
const cantAse = db.s03_asesorias.countDocuments({ dataset: ds });

print(`- Emprendedores (esperados 10): ${cantEmp}`);
print(`- Iniciativas (esperadas 15): ${cantIni}`);
print(`- Asesorías (esperadas 30): ${cantAse}`);

print("\n=== 2. Verificación de Integridad Referencial ===");

// A. Iniciativas -> Emprendedores
const iniciativas = db.s03_iniciativas.find({ dataset: ds }).toArray();
let huerfanasEmp = 0;
iniciativas.forEach(ini => {
  const emp = db.s03_emprendedores.findOne({ _id: ini.responsable_id });
  if (!emp) huerfanasEmp++;
});
print(`- Iniciativas con responsable inexistente: ${huerfanasEmp}`);

// B. Asesorías -> Iniciativas
const asesorias = db.s03_asesorias.find({ dataset: ds }).toArray();
let huerfanasIni = 0;
asesorias.forEach(ase => {
  const ini = db.s03_iniciativas.findOne({ _id: ase.iniciativa_id });
  if (!ini) huerfanasIni++;
});
print(`- Asesorías con iniciativa inexistente: ${huerfanasIni}`);

print("\n=== Verificación Base Finalizada ===");