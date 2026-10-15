# Actividad A1: Diagnóstico Teórico (DGN-01)

1. **Tabla, fila y clave primaria**:
   - Una **tabla** es como una planilla donde guardamos todo, por ejemplo la tabla de `iniciativas`.
   - Una **fila** es un registro particular dentro de esa planilla, como la iniciativa de "EcoEmpaque".
   - La **clave primaria** es el código único que no se repite para identificar ese registro, por ejemplo `INI-001`.

2. **Clave foránea y desreferenciación rota**:
   - Una **clave foránea** es el campo que usas para conectar una tabla con otra.
   - Si una iniciativa apunta a un `emprendedor_id` que no existe en la base de datos, queda un dato "huérfano" o sin dueño, rompiendo la relación entre las tablas.

3. **Consulta SQL**:
   - `SELECT codigo FROM iniciativas WHERE sector = 'tecnologia';`
   - Lo que hace es traer únicamente la lista de códigos de las iniciativas que sean del sector tecnología.
   - **No cambia ni borra nada**, es solo para consultar datos.

4. **Lista vs. Diccionario en Python**:
   - La **lista** es una secuencia ordenada de datos `[]`.
   - El **diccionario** guarda la información en parejas de clave y valor `{}`.
   - Para **una sola iniciativa** uso un diccionario (para tener sus datos agrupados) y para **varias iniciativas** uso una lista llena de diccionarios.

5. **`false` vs `"false"` en JSON**:
   - No son lo mismo. `false` (sin comillas) es un valor lógico/booleano verdadero o falso. `"false"` (con comillas) es simplemente un texto.

6. **Campo ausente vs `null` vs `""`**:
   - **Campo ausente**: La propiedad ni siquiera se puso en la estructura.
   - **`null`**: La propiedad sí existe, pero se le asignó que está vacía o sin valor.
   - **`""`**: Es un texto que existe pero no tiene letras dentro (longitud cero).

7. **Función que retorna datos vs que imprime**:
   - La función con `return` me entrega el resultado para que yo lo guarde en una variable o lo use en otra parte del programa. La que solo usa `print()` muestra el texto en pantalla y ese dato se pierde para el código.

8. **Revisión ante falla de lectura JSON**:
   - Revisaría primero la sintaxis del archivo: que las comillas sean dobles `""`, que los booleanos estén en minúscula (`true`/`false`) y que no haya comas de más al final de las listas u objetos.

9. **Formato `2026-10-06T13:00:00Z`**:
   - Es una fecha y hora estándar completa con su zona horaria (UTC). Evita confusiones sobre si el primer número es el día o el mes, y evita problemas con la hora local de cada país.

10. **Fuga de contraseña en Git**:
    - Lo primero es cambiar o invalidar esa contraseña inmediatamente en el servicio. No sirve con solo borrarla del archivo y hacer otro commit, porque queda guardada en el historial de Git.