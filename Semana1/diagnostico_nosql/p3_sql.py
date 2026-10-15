import sqlite3

# Creamos la base de datos en memoria para el ejercicio
conexion = sqlite3.connect(":memory:")
conexion.executescript("""
CREATE TABLE emprendedores(id INTEGER PRIMARY KEY, alias TEXT);
CREATE TABLE iniciativas(id INTEGER PRIMARY KEY, emprendedor_id INTEGER, estado TEXT);

INSERT INTO emprendedores VALUES(1, 'Emprendedor A'), (2, 'Emprendedor B'), (3, 'Emprendedor C');
INSERT INTO iniciativas VALUES(101, 1, 'activa'), (102, 2, 'archivada'), (103, 1, 'activa');
""")

# Consulta relacionando las dos tablas
consulta = """
SELECT i.id, e.alias 
FROM iniciativas i 
JOIN emprendedores e ON i.emprendedor_id = e.id 
WHERE i.estado = 'activa' 
ORDER BY i.id ASC;
"""

# Ejecutamos e imprimimos el resultado
if consulta:
    resultados = conexion.execute(consulta).fetchall()
    print("Iniciativas activas y sus emprendedores:")
    for fila in resultados:
        print(fila)

conexion.close()

# Explicación:
# Usamos INNER JOIN para unir 'iniciativas' y 'emprendedores' mediante la clave 'emprendedor_id'
# que se relaciona con el 'id' del emprendedor.