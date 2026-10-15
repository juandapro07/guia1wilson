// 02_cargar_semilla.js - Carga de Semilla Reproducible (Semana 2)
db = db.getSiblingDB("emprendimiento_sena_lab");

print("=== Iniciando carga de semilla en 'emprendimiento_sena_lab' ===");

// 1. Limpiar colecciones del conjunto de datos
db.emprendedores.deleteMany({ dataset: "S02_UE_V1" });
db.iniciativas.deleteMany({ dataset: "S02_UE_V1" });
db.asesorias.deleteMany({ dataset: "S02_UE_V1" });

// 2. Insertar Emprendedores (10 registros)
const emprendedoresData = [];
for (let i = 1; i <= 10; i++) {
  const num = i < 10 ? `00${i}` : `0${i}`;
  emprendedoresData.push({
    _id: `EMP-${num}`,
    dataset: "S02_UE_V1",
    alias: `Emprendedor Ficticio ${num}`,
    estado: "activo"
  });
}
db.emprendedores.insertMany(emprendedoresData);

// 3. Insertar Iniciativas (15 registros)
const sectores = ["tecnologia", "alimentos", "economia_circular"];
const etapas = ["idea", "validacion", "puesta_en_marcha"];
const iniciativasData = [];

for (let i = 1; i <= 15; i++) {
  const num = i < 10 ? `00${i}` : `0${i}`;
  const empNum = ((i - 1) % 10) + 1;
  const empId = empNum < 10 ? `EMP-00${empNum}` : `EMP-0${empNum}`;
  const sector = sectores[(i - 1) % sectores.length];
  const etapa = etapas[(i - 1) % etapas.length];

  iniciativasData.push({
    _id: `INI-${num}`,
    dataset: "S02_UE_V1",
    responsable_id: empId,
    nombre: `Iniciativa de Innovacion ${num}`,
    sector: sector,
    etapa: etapa,
    estado: "activa",
    perfil: {
      propuesta_valor: `Propuesta de valor enfocada en ${sector} para resolver necesidades locales.`,
      atributos: {
        impacto: "alto",
        canal: sector === "tecnologia" ? "digital" : "presencial"
      }
    }
  });
}
db.iniciativas.insertMany(iniciativasData);

// 4. Insertar Asesorias (30 registros: 15 realizadas, 10 programadas, 5 canceladas)
const asesores = ["ASESOR-01", "ASESOR-02", "ASESOR-03"];
const modalidades = ["virtual", "presencial"];
const asesoriasData = [];

for (let i = 1; i <= 30; i++) {
  const num = i < 10 ? `00${i}` : `0${i}`;
  const iniNum = ((i - 1) % 15) + 1;
  const iniId = iniNum < 10 ? `INI-00${iniNum}` : `INI-0${iniNum}`;
  const iniSector = sectores[(iniNum - 1) % sectores.length];
  
  let estado = "programada";
  let fechaReal = null;
  let snapshot = null;

  if (i <= 15) {
    estado = "realizada";
    fechaReal = new Date(`2026-09-${(i % 28) + 1}T10:00:00Z`);
    snapshot = {
      nombre: `Iniciativa de Innovacion ${iniNum}`,
      sector: iniSector,
      capturado_en: fechaReal
    };
  } else if (i > 25) {
    estado = "cancelada";
  }

  asesoriasData.push({
    _id: `ASE-${num}`,
    dataset: "S02_UE_V1",
    iniciativa_id: iniId,
    asesor_codigo: asesores[(i - 1) % asesores.length],
    estado: estado,
    modalidad: modalidades[i % modalidades.length],
    fecha_programada: new Date(`2026-09-${(i % 28) + 1}T09:00:00Z`),
    fecha_realizacion: fechaReal,
    temas: ["propuesta de valor", "modelo de negocio"],
    iniciativa_snapshot: snapshot
  });
}
db.asesorias.insertMany(asesoriasData);

print("=== Carga completada exitosamente ===");
print(`- Emprendedores insertados: ${db.emprendedores.countDocuments({ dataset: "S02_UE_V1" })}`);
print(`- Iniciativas insertadas: ${db.iniciativas.countDocuments({ dataset: "S02_UE_V1" })}`);
print(`- Asesorias insertadas: ${db.asesorias.countDocuments({ dataset: "S02_UE_V1" })}`);