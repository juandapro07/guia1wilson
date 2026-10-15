# Actividad A3: Diagrama y Definición del Modelo Documental v1

En este documento se describe la estructura del modelo documental v1 para la **Unidad de Emprendimiento del SENA**, especificando entidades, cardinalidades y representaciones de relaciones.

---

## 1. Diagrama Entidad-Relación / Documental (Mermaid)

```mermaid
erDiagram
    EMPRENDEDORES ||--o{ INICIATIVAS : "1:N (responsable_id)"
    INICIATIVAS ||--o{ ASESORIAS : "1:N (iniciativa_id)"
    INICIATIVAS ||--|| PERFIL : "1:1 (Embebido)"
    ASESORIAS ||--o| INICIATIVA_SNAPSHOT : "1:1 (Embebido Historico)"

    EMPRENDEDORES {
        string _id PK
        string dataset
        string alias
        string estado
    }

    INICIATIVAS {
        string _id PK
        string dataset
        string responsable_id FK
        string nombre
        string sector
        string etapa
        string estado
        object perfil
    }

    PERFIL {
        string propuesta_valor
        object atributos
    }

    ASESORIAS {
        string _id PK
        string dataset
        string iniciativa_id FK
        string asesor_codigo
        string estado
        string modalidad
        date fecha_programada
        date fecha_realizacion
        array temas
        object iniciativa_snapshot
    }

    INICIATIVA_SNAPSHOT {
        string nombre
        string sector
        date capturado_en
    }