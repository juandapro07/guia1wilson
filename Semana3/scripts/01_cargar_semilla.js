// ============================================================================
// Script: 01_cargar_semilla.js
// Propósito: Cargar la semilla reproducible S03_UE_V1 (Semana 3 NoSQL)
// Base de datos: emprendimiento_sena_lab
// ============================================================================

const ds = "S03_UE_V1";

// 1. Limpieza de dataset previo de la semana 3 (sin tocar colecciones de E02)
db.s03_emprendedores.deleteMany({ dataset: ds });
db.s03_iniciativas.deleteMany({ dataset: ds });
db.s03_asesorias.deleteMany({ dataset: ds });

print("=== Limpieza previa completada ===");

// 2. Insertar Emprendedores (10)
const emprendedores = [];
for (let i = 1; i <= 10; i++) {
  const num = String(i).padStart(3, '0');
  emprendedores.push({
    _id: `EMP-${num}`,
    dataset: ds,
    nombre: `Emprendedor ${i}`,
    documento: `100000000${i}`,
    correo: `emprendedor${i}@sena.edu.co`,
    telefono: `300000000${i}`,
    perfil: {
      bio: `Perfil del emprendedor ${i}`,
      ciudad: "Medellín"
    },
    estado: "activo",
    creado_en: new Date(`2026-09-01T08:00:00Z`)
  });
}
db.s03_emprendedores.insertMany(emprendedores);

// 3. Insertar Iniciativas (15) con Ampliación v1.1
const sectores = ["alimentos", "tecnologia", "economia_circular"];
  const iniciativas = [];
for (let i = 1; i <= 15; i++) {
  const num = String(i).padStart(3, '0');
  const empNum = String(((i - 1) % 10) + 1).padStart(3, '0');
  const sec = sectores[i % sectores.length];
  
  const ini = {
    _id: `INI-${num}`,
    dataset: ds,
    responsable_id: `EMP-${empNum}`,
    nombre: `Iniciativa de Innovacion ${num}`,
    sector: sec,
    etapa: i <= 5 ? "puesta_en_marcha" : (i <= 10 ? "idea" : "consolidacion"),
    estado: i <= 10 ? "activa" : "archivada",
    intentos_contacto: 0,
    perfil: {
      propuesta_valor: `Propuesta de valor para la iniciativa ${num}`,
      atributos: {
        plataforma: i % 2 === 0 ? "web" : "movil",
        entrega: "saas"
      }
    },
    creado_en: new Date(`2026-09-05T09:00:00Z`)
  };

  // Datos específicos v1.1 para pruebas de null/ausente/elemMatch (Sección 4.3 de la guía)
  if (i === 1) {
    ini.contacto_alterno = null;
    ini.diagnosticos = [
      { area: "mercado", puntaje: 40 },
      { area: "costos", puntaje: 90 }
    ];
  } else if (i === 2) {
    // contacto_alterno AUSENTE
    ini.diagnosticos = [
      { area: "mercado", puntaje: 85 },
      { area: "costos", puntaje: 50 }
    ];
  } else if (i === 3) {
    ini.contacto_alterno = "canal-demo-03";
  }

  iniciativas.push(ini);
}
db.s03_iniciativas.insertMany(iniciativas);

// 4. Insertar Asesorías (30)
const modalidades = ["presencial", "virtual"];
const asesores = ["AS-01", "AS-02", "AS-03"];
const asesorias = [];

for (let i = 1; i <= 30; i++) {
  const num = String(i).padStart(3, '0');
  const iniNum = String(((i - 1) % 15) + 1).padStart(3, '0');
  const iniSector = sectores[((i - 1) % 15) % sectores.length];

  let estado = "programada";
  let fechaReal = null;
  let snapshot = null;

  if (i <= 15) {
    estado = "realizada";
    fechaReal = new Date(`2026-09-${String((i % 28) + 1).padStart(2, '0')}T10:00:00Z`);
    snapshot = {
      nombre: `Iniciativa de Innovacion ${iniNum}`,
      sector: iniSector,
      capturado_en: fechaReal
    };
  } else if (i > 25) {
    estado = "cancelada";
  }

  asesorias.push({
    _id: `ASE-${num}`,
    dataset: ds,
    iniciativa_id: `INI-${iniNum}`,
    asesor_codigo: asesores[(i - 1) % asesores.length],
    estado: estado,
    modalidad: modalidades[i % modalidades.length],
    fecha_programada: new Date(`2026-10-${String((i % 28) + 1).padStart(2, '0')}T09:00:00Z`),
    fecha_realizacion: fechaReal,
    temas: ["propuesta de valor", "modelo de negocio"],
    iniciativa_snapshot: snapshot
  });
}
db.s03_asesorias.insertMany(asesorias);

print("=== Carga S03 completada exitosamente ===");
print(`- Emprendedores: ${db.s03_emprendedores.countDocuments({ dataset: ds })}`);
print(`- Iniciativas: ${db.s03_iniciativas.countDocuments({ dataset: ds })}`);
print(`- Asesorias: ${db.s03_asesorias.countDocuments({ dataset: ds })}`);