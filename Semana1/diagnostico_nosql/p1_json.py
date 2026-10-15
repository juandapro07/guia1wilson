import json

# 1. Texto original con los errores de sintaxis
# 'True' tiene la T mayúscula y hay una coma de más después de "Validar mercado"
texto_original = '{"codigo":"INI-001", "activa":True, "intereses":["Validar mercado",]}'

# 2. Corregimos los errores para que sea un JSON válido
# 'true' va en minúscula y le quitamos la coma sobrante a la lista
texto_corregido = '{"codigo":"INI-001", "activa":true, "intereses":["Validar mercado"]}'

# Cargamos el JSON corregido a un diccionario de Python
datos = json.loads(texto_corregido)

# 3. Imprimimos el código, el estado activa y sus tipos de datos
print("Código:", datos["codigo"], "| Tipo:", type(datos["codigo"]))
print("Activa:", datos["activa"], "| Tipo:", type(datos["activa"]))

# 4. Explicación breve:
# Se cambió 'True' por 'true' porque en JSON los booleanos van en minúscula.
# Se eliminó la coma al final de la lista porque JSON no permite comas flotantes.