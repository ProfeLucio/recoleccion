# Seminario de Actualizacion Tecnologica I

## Proyecto integrador: plataforma de recoleccion de residuos

Este repositorio contiene el desarrollo academico y tecnico de una plataforma web para apoyar la gestion y consulta de rutas, vehiculos, horarios y novedades del servicio de recoleccion de residuos.

El problema surge porque la ciudadania no conoce con claridad los dias y horas en que pasa el carro recolector. Esto provoca que las personas saquen los residuos en horarios inadecuados o los depositen en lugares no autorizados.

El proyecto sera desarrollado por todo el curso como una empresa academica organizada en celulas verticales y equipos horizontales. Seminario I construira la base web y administrativa. Seminario II podra retomar la API para desarrollar una aplicacion movil orientada a la ciudadania.

## Objetivo

Construir y publicar un producto web basico pero tecnicamente completo que permita organizar la informacion del servicio de recoleccion y ofrecer consultas confiables por zona, barrio, ruta y horario.

## Alcance de Seminario I

### Funcionalidades

- Gestion de zonas, barrios y puntos de referencia.
- Gestion de vehiculos y conductores.
- Gestion de rutas y recorridos.
- Programacion de dias y horarios.
- Registro del inicio de una ruta.
- Registro de novedades: retrasos, cambios y cancelaciones.
- Consulta estimada del paso por una zona.
- Usuarios administrativos y operadores.
- API REST y base de datos persistente.
- Interfaz web responsive.
- Ambientes de desarrollo, pruebas y produccion.

### Fuera del alcance

- GPS en tiempo real.
- Notificaciones push.
- Aplicacion movil.
- Optimizacion avanzada de rutas.
- Integraciones externas complejas.
- Predicciones con inteligencia artificial que no puedan validarse.

## Organizacion del curso

### Celulas verticales

Las celulas desarrollan modulos funcionales. Cada integrante debe participar en varias fases: analisis, diseno, desarrollo, pruebas, documentacion e integracion. Nadie queda limitado a una sola etapa.

Posibles celulas:

- Zonas, barrios y puntos.
- Vehiculos y conductores.
- Rutas y horarios.
- Novedades y seguimiento.
- Consulta y reportes.

### Equipos horizontales

Los equipos horizontales establecen lineamientos comunes para todo el producto:

- Arquitectura y backend.
- Datos y API.
- UX/UI y sistema de componentes.
- Calidad y testing.
- DevOps, Git y despliegue.
- Documentacion e IA aplicada.

Cada estudiante tendra un rol principal, pero tambien una responsabilidad transversal y debera comprender el flujo completo.

## Roles

Los roles se asignaran despues de un proceso de perfilamiento individual. Se tendran en cuenta conocimientos, intereses, habilidades y capacidad de aprendizaje, evitando que la conformacion dependa solamente de grupos de amigos.

Roles posibles:

- Lider funcional.
- Analista.
- Desarrollador frontend.
- Desarrollador backend.
- Responsable de datos.
- Disenador UX/UI.
- Responsable de testing.
- Responsable de documentacion.
- Responsable de DevOps y despliegue.
- Responsable de integracion y calidad tecnica.

El Product Owner y arquitecto general del proyecto sera el docente. Los lideres funcionales deberan reunirse periodicamente con el Product Owner para validar alcance y decisiones.

## Flujo de trabajo GitHub

1. Toda actividad se registra como una Issue.
2. Cada Issue indica objetivo, responsable, criterio de aceptacion y evidencia.
3. El trabajo se realiza en ramas.
4. Las modificaciones se integran mediante Pull Request.
5. Ningun cambio llega a main sin revision.
6. Los equipos horizontales revisan las decisiones que afectan a todo el sistema.
7. Las decisiones importantes se documentan en docs.
8. Cada entrega se identifica con una etiqueta o release.
9. Los commits deben ser pequenos, frecuentes y comprensibles.
10. El tablero GitHub Project se utiliza para visualizar el avance.

## Estructura sugerida del repositorio

```
recoleccion/
├── frontend/
├── backend/
├── docs/
│   ├── problema-y-validacion.md
│   ├── alcance-y-historias.md
│   ├── arquitectura.md
│   ├── modelo-datos.md
│   ├── api.md
│   ├── ux-ui.md
│   ├── testing.md
│   └── bitacora-ia.md
├── README.md
└── .github/
    ├── ISSUE_TEMPLATE/
    └── PULL_REQUEST_TEMPLATE.md
```

## Evaluacion

La evaluacion es acumulativa y se consolida en tres reportes:

| Reporte | Porcentaje | Resultado esperado |
|---|---:|---|
| Entrega 1 | 30% | Problema validado, alcance, roles, UX/UI y arquitectura inicial |
| Entrega 2 | 30% | Backend, base de datos, API, frontend integrado y avance funcional |
| Entrega 3 | 40% | Producto publicado, testing, documentacion y defensa tecnica |

Cada reporte puede contener varias actividades. En cada corte habra una actividad integradora de mayor peso que funciona como evidencia tipo parcial. Esta actividad podra repetirse cuando exista una situacion de fuerza mayor debidamente justificada.

Al finalizar cada corte se consolida la calificacion. Las actividades ordinarias pendientes de un corte no se trasladan automaticamente al siguiente.

## Plan de aula: 14 semanas

| Semana | Fecha | Seccion y actividades principales |
|---|---|---|
| 1 | 1 sep | Presentacion del curso, proyecto, metodologia, herramientas, evaluacion y reglas |
| 2 | 8 sep | Problema de recoleccion, actores, usuarios y contexto |
| 3 | 15 sep | Validacion del problema, entrevistas, observacion y trabajo de campo |
| Especial | 26 sep | Sesion especial de discusion general, hallazgos y acuerdos del proyecto |
| 4 | 22 sep | Sintesis de hallazgos, propuesta de valor, alcance, celulas y perfiles |
| 5 | 29 sep | Identidad visual, wireframes, arquitectura inicial y Entrega 1 |
| 6 | 6 oct | UX/UI, framework CSS, responsive y sistema de componentes |
| 7 | 13 oct | Arquitectura, modelo de datos, backend y API REST |
| 8 | 20 oct | Frontend conectado, formularios, validaciones y flujo funcional |
| 9 | 27 oct | Git, ramas, Pull Requests, integracion y Entrega 2 |
| 10 | 3 nov | Despliegue, variables de entorno y ambientes |
| 11 | 10 nov | Integracion de celulas, revision transversal y pruebas iniciales |
| 12 | 17 nov | Testing, documentacion, IA aplicada y correccion de errores |
| 13 | 24 nov | Revision prefinal, estabilizacion, demo y preparacion de defensa |
| 14 | 1 dic | Entrega 3, demostracion y sustentacion tecnica |

## Actividades del estudiante: 13 semanas

Durante el trabajo independiente los estudiantes desarrollaran:

1. Organizacion inicial, accesos y herramientas.
2. Investigacion del problema y del contexto.
3. Preparacion y realizacion del trabajo de campo.
4. Entrevistas, observacion y sistematizacion de evidencias.
5. Trabajo vertical de cada celula.
6. Trabajo horizontal de arquitectura, UX/UI, datos, testing y DevOps.
7. Trabajo individual de acuerdo con el rol asignado.
8. Definicion de historias, tareas y criterios de aceptacion.
9. Desarrollo de frontend, backend y persistencia.
10. Revision mediante Pull Requests e integracion.
11. Despliegue en desarrollo, pruebas y produccion.
12. Pruebas, correccion de bugs, documentacion y bitacora de IA.
13. Preparacion de la entrega, demo y defensa individual.

## Evidencias

- GitHub: Issues, commits, ramas, Pull Requests, documentos y releases.
- Teams: reuniones clave, entrevistas autorizadas y evidencias audiovisuales.
- Moodle: tres entregas formales.
- GitHub Project: seguimiento del estado de las tareas.
- Bitacora de IA: consultas, decisiones, codigo aceptado, codigo rechazado y aprendizajes.

## Criterios de calidad

El producto final debe:

- Resolver un problema validado.
- Tener un alcance controlado.
- Presentar interfaz coherente y reutilizable.
- Contar con frontend, backend, API y base de datos.
- Estar publicado en internet.
- Tener pruebas y registro de errores.
- Mostrar trazabilidad individual y grupal.
- Ser comprensible para todos los integrantes.
- Poder evolucionar hacia Seminario II y una aplicacion movil.

## Issues del proyecto

- [Fase 1: Validar problema y contexto](../../issues/2)
- [Fase 2: Alcance y propuesta de valor](../../issues/5)
- [Fase 3: Celulas, roles y responsabilidades](../../issues/3)
- [Fase 4: UX/UI y sistema de componentes](../../issues/1)
- [Fase 5: Arquitectura, datos y API](../../issues/4)
- [Fase 6: Desarrollo e integracion](../../issues/6)
- [Fase 7: Despliegue y ambientes](../../issues/8)
- [Fase 8: Calidad, documentacion y defensa](../../issues/7)

## Documento ampliado

El detalle operativo tambien esta disponible en [docs/plan-seminario-actualizacion-I.md](docs/plan-seminario-actualizacion-I.md).
