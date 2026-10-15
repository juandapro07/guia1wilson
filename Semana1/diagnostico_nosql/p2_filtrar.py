iniciativas = [
    {"codigo": "INI-001", "sector": "tecnologia", "pendiente": True},
    {"codigo": "INI-002", "sector": "alimentos", "pendiente": True},
    {"codigo": "INI-003", "sector": "tecnologia", "pendiente": False},
    {"codigo": "INI-004", "sector": "tecnologia"}  # Le falta el campo 'pendiente'
]

def seleccionar_pendientes(registros, sector):
    codigos = []
    for reg in registros:
        # Usamos .get() para evitar errores si la clave 'pendiente' no existe.
        # Comprobamos que el sector coincida y que 'pendiente' sea exactamente True.
        if reg.get("sector") == sector and reg.get("pendiente") is True:
            codigos.append(reg["codigo"])
    return codigos

# Pruebas de funcionamiento
print("Prueba 1 (con resultados):", seleccionar_pendientes(iniciativas, "tecnologia"))
print("Prueba 2 (sin resultados):", seleccionar_pendientes(iniciativas, "alimentos_nuevo"))

# Explicación del tratamiento del campo ausente:
# Si el campo 'pendiente' no está en el diccionario, reg.get("pendiente") devuelve None.
# Como evaluamos `is True`, los campos ausentes, falsos o cadenas no entran en el filtro.