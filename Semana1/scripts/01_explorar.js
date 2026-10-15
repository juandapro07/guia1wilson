// Actividad A4: Script de exploración y consultas en MongoDB (01_explorar.js)

// 1. Usar o crear la base de datos del proyecto
use innovación_db;

// 2. Limpiar la colección si ya existe para evitar duplicados en las pruebas
db.iniciativas.drop();

// 3. Insertar datos de prueba para verificar las consultas
db.iniciativas.insertMany([
  {
    codigo: "INI-001",
    titulo: "Plataforma AgroTech",
    sector: "Agroindustria",
    estado: "Abierta",
    emprendedor_id: "EMP-101",
    postulaciones: [
      { usuario: "USR-01", fecha: "2026-10-01", mensaje: "Interesado en participar" }
    ],
    evaluaciones: [
      { evaluador: "EVAL-01", puntaje: 90, comentario: "Buena propuesta" }
    ],
    historial: [
      { estado: "Borrador", fecha: "2026-09-15" },
      { estado: "Abierta", fecha: "2026-09-20" }
    ]
  },
  {
    codigo: "INI-002",
    titulo: "IA para Diagnóstico Médico",
    sector: "Tecnología",
    estado: "Abierta",
    emprendedor_id: "EMP-102",
    postulaciones: [],
    evaluaciones: [
      { evaluador: "EVAL-02", puntaje: 95, comentario: "Excelente innovación" }
    ],
    historial: [
      { estado: "Abierta", fecha: "2026-09-25" }
    ]
  },
  {
    codigo: "INI-003",
    titulo: "Empaques Biodegradables",
    sector: "Medio Ambiente",
    estado: "Cerrada",
    emprendedor_id: "EMP-101",
    postulaciones: [],
    evaluaciones: [],
    historial: []
  }
]);

print("=== 1. Detalle de una iniciativa (Q01) ===");
printjson(db.iniciativas.findOne({ codigo: "INI-001" }));

print("=== 2. Buscar iniciativas por sector 'Tecnología' y estado 'Abierta' (Q03) ===");
printjson(db.iniciativas.find({ sector: "Tecnología", estado: "Abierta" }).toArray());

print("=== 3. Reporte consolidado de iniciativas por sector (Q06) ===");
printjson(
  db.iniciativas.aggregate([
    {
      $group: {
        _id: "$sector",
        total_iniciativas: { $sum: 1 }
      }
    }
  ]).toArray()
);