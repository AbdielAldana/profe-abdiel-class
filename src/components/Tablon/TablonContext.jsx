import React, { useEffect } from "react";
import { toast } from "react-toastify";
import axios, { all } from "axios";
import { useCookies } from "react-cookie";


const TablonContext = React.createContext(null);

// Usuarios
const usersJson = [
    {
        matricula: "A20250011",
        nombre: "Abdiel Aldana",
        nickname: "Aurora93",
        color: "#90be4fff",
        marco: 0,
        fondo: 0,

        puntos: {
            totales: 0,
            gastados: 0
        },
        misionesCompletadas: [],

        fechaRegistro: "2025-12-20 09:20:00",
        activo: true,

    },
    {
        matricula: "A20250012",
        nombre: "María López",
        nickname: "LunaPixel",
        color: "#7E57C2",
        marco: 3,
        fondo: 1,

        puntos: {
            totales: 800,
            gastados: 0
        },
        misionesCompletadas: [2],

        fechaRegistro: "2025-12-15 09:20:00",
        activo: true,

    },
    {
        matricula: "A20250034",
        nombre: "Carlos Méndez",
        nickname: "ByteHunter",
        color: "#1E88E5",
        marco: 2,
        fondo: 5,

        puntos: {
            totales: 2400,
            gastados: 300
        },

        misionesCompletadas: [1, 2, 4, 6, 7, 8, 9, 10, 3, 5],

        fechaRegistro: "2025-12-14 11:45:00",
        activo: true,

    },
    {
        matricula: "A20250056",
        nombre: "Ana Torres",
        nickname: "NekoArt",
        color: "#EC407A",
        marco: 1,
        fondo: 3,

        puntos: {
            totales: 420,
            gastados: 0
        },

        misionesCompletadas: [1],

        fechaRegistro: "2025-12-16 08:10:00",
        activo: true,

    },
    {
        matricula: "A20250078",
        nombre: "Luis Hernández",
        nickname: "ForgeCode",
        color: "#43A047",
        marco: 2,
        fondo: 4,

        puntos: {
            totales: 3200,
            gastados: 1200
        },

        misionesCompletadas: [1, 2, 4, 6, 8],

        fechaRegistro: "2025-12-10 14:30:00",
        activo: true,

    },
    {
        matricula: "A20250091",
        nombre: "Sofía Ramírez",
        nickname: "AuroraInk",
        color: "#FB8C00",
        marco: 1,
        fondo: 5,

        puntos: {
            totales: 2100,
            gastados: 500
        },

        misionesCompletadas: [1, 4, 6, 7],

        fechaRegistro: "2025-12-12 16:00:00",
        activo: true,

    }
]

// Misiones
const misionesJson = [
    {
        id_mision: 1,
        dificultad: 0,
        nombre: "Presencia",
        subNombre: "Asistencia asegurada",
        puntos: 50,
        lore: "Todo aventurero debe de asistir a sus aventurar, eso trae buenas recompenzas",
        objetivo: "Canjea el codigo del dia.",
        requisitos: [],
        tipoEntrega: 4,
        frecuencia: 1,       // periódica (diaria)
        codigo_contador: 3, // ejemplo del día / vigente
        fechaInicioGlobal: "2025-12-20 00:00:00",
        fechaFinGlobal: "2030-12-22 23:59:59",
        visible: true
    },
    {
        id_mision: 2,
        dificultad: 0,
        nombre: "Juramento al Gremio",
        subNombre: "Palabras que Forjan Aventureros",
        puntos: 800,
        lore: "El gremio reconoce a quienes aceptan su camino con respeto y convicción.",
        objetivo: "Sube una imagen mostrando tu matrícula.",
        requisitos: ["Documento visible", "Superpoderes", 'Mirar a alguien con reselo y decirle de cosas feas y asi'],
        tipoEntrega: 0,
        frecuencia: 0,       // periódica (diaria)
        codigo_contador: null, // ejemplo del día / vigente
        fechaInicioGlobal: "2025-12-16 00:00:00",
        fechaFinGlobal: "2025-12-19 23:59:59",
        visible: true
    },
    {
        id_mision: 3,
        dificultad: 1,
        nombre: "Explorador del Aula",
        subNombre: "Reconociendo Terreno",
        puntos: 1200,
        lore: "Antes de partir a grandes aventuras, debes conocer bien tu entorno.",
        objetivo: "Sube una foto del salón de clases.",
        requisitos: ["Foto del aula"],
        tipoEntrega: 0,
        frecuencia: 0,       // periódica (diaria)
        codigo_contador: null, // ejemplo del día / vigente
        fechaInicioGlobal: "2025-12-17 00:00:00",
        fechaFinGlobal: "2025-12-23 23:59:59",
        visible: true
    },
    {
        id_mision: 4,
        dificultad: 1,
        nombre: "Bitácora del Aventurero",
        subNombre: "Registro de Experiencias",
        puntos: 1500,
        lore: "Todo aventurero documenta su camino para no olvidar sus aprendizajes.",
        objetivo: "Sube un PDF con una reflexión corta.",
        requisitos: ["Archivo PDF"],
        tipoEntrega: 1,
        frecuencia: 0,       // periódica (diaria)
        codigo_contador: null, // ejemplo del día / vigente
        fechaInicioGlobal: "2025-12-18 00:00:00",
        fechaFinGlobal: "2025-12-26 23:59:59",
        visible: true
    },
    {
        id_mision: 5,
        dificultad: 2,
        nombre: "Prueba de Ingenio",
        subNombre: "La Mente como Arma",
        puntos: 2000,
        lore: "El ingenio separa a los aventureros comunes de los excepcionales.",
        objetivo: "Entrega un archivo comprimido con tu evidencia.",
        requisitos: ["Archivo ZIP"],
        tipoEntrega: 2,
        frecuencia: 0,       // periódica (diaria)
        codigo_contador: null, // ejemplo del día / vigente
        fechaInicioGlobal: "2025-12-18 00:00:00",
        fechaFinGlobal: "2025-12-27 23:59:59",
        visible: true
    },
    {
        id_mision: 6,
        dificultad: 2,
        nombre: "Sendero del Conocimiento",
        subNombre: "Aprender es Avanzar",
        puntos: 1800,
        lore: "Cada paso aprendido fortalece tu camino como aventurero.",
        objetivo: "Comparte un enlace relacionado con la misión.",
        requisitos: ["Enlace funcional"],
        tipoEntrega: 3,
        frecuencia: 2,       // periódica (diaria)
        codigo_contador: 1, // ejemplo del día / vigente
        fechaInicioGlobal: "2025-12-19 00:00:00",
        fechaFinGlobal: "2025-12-28 23:59:59",
        visible: true
    },
    {
        id_mision: 7,
        dificultad: 3,
        nombre: "Rito de Superación",
        subNombre: "Más Allá del Esfuerzo",
        puntos: 2500,
        lore: "Solo quienes desafían sus límites logran destacar en el gremio.",
        objetivo: "Sube una imagen que represente tu esfuerzo.",
        requisitos: ["Imagen clara"],
        tipoEntrega: 0,
        frecuencia: 1,       // periódica (diaria)
        codigo_contador: 33, // ejemplo del día / vigente
        fechaInicioGlobal: "2025-12-20 00:00:00",
        fechaFinGlobal: "2025-12-30 23:59:59",
        visible: true
    },
    {
        id_mision: 8,
        dificultad: 3,
        nombre: "Crónica del Viaje",
        subNombre: "Historias que Inspiran",
        puntos: 2700,
        lore: "Cada aventura merece ser contada para inspirar a otros.",
        objetivo: "Entrega un PDF narrando tu experiencia.",
        requisitos: ["PDF legible"],
        tipoEntrega: 1,
        frecuencia: 1,       // periódica (diaria)
        codigo_contador: 33, // ejemplo del día / vigente
        fechaInicioGlobal: "2025-12-20 00:00:00",
        fechaFinGlobal: "2025-12-31 23:59:59",
        visible: true
    },
    {
        id_mision: 9,
        dificultad: 4,
        nombre: "Desafío del Maestro",
        subNombre: "Prueba de Disciplina",
        puntos: 3500,
        lore: "Los maestros del gremio observan con atención a quienes llegan hasta aquí.",
        objetivo: "Entrega un ZIP con todos tus avances.",
        requisitos: ["ZIP completo"],
        tipoEntrega: 2,
        frecuencia: 1,       // periódica (diaria)
        codigo_contador: 33, // ejemplo del día / vigente
        fechaInicioGlobal: "2025-12-21 00:00:00",
        fechaFinGlobal: "2026-01-05 23:59:59",
        visible: true
    },
    {
        id_mision: 10,
        dificultad: 5,
        nombre: "Leyenda en Formación",
        subNombre: "El Nombre que Perdura",
        puntos: 5000,
        lore: "Muy pocos alcanzan este punto. Tu nombre empieza a ser recordado.",
        objetivo: "Comparte un enlace que pruebe tu logro.",
        requisitos: ["Enlace válido"],
        tipoEntrega: 3,
        frecuencia: 1,       // periódica (diaria)
        codigo_contador: 33, // ejemplo del día / vigente
        fechaInicioGlobal: "2025-12-22 00:00:00",
        fechaFinGlobal: "2026-01-10 23:59:59",
        visible: true
    }
]

const recompensasJson = [
    {
        id_articulo: 1,
        nombre: "Pergamino Atemporal I",
        tipo: "Beneficio",
        costo: 500,
        uso: "Consumible",
        descripcion: "Perdona una llegada tarde.",
        lore: "“Retrocede el reloj justo antes de cruzar el portal del aula.”",
        nivel_min: 5,
        clase: 0,
        icono: "GiSandsOfTime",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 8,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 2,
        nombre: "Pergamino Atemporal V",
        tipo: "Beneficio",
        costo: 1500,
        uso: "Consumible",
        descripcion: "Permite una salida temprano.",
        lore: "\"Las habilidades atemporales te permiten dar un salto en el tiempo\"",
        nivel_min: 10,
        clase: 1,
        icono: "GiHeavyTimer",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 8,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 3,
        nombre: "Pergamino Atemporal X",
        tipo: "Beneficio",
        costo: 2000,
        uso: "Consumible",
        descripcion: "Puede solicitar atención fuera del horario permitido.",
        lore: "“Quien domina el pergamino del tiempo invoca al sabio atemporal.”",
        nivel_min: 2,
        clase: 2,
        icono: "GiExtraTime",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 8,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 4,
        nombre: "Pergamino Maestro",
        tipo: "Beneficio",
        costo: 20000,
        uso: "Consumible",
        descripcion: "Queda Excento de la Materia",
        lore: "\"La gracia de un ser divino cae en tus manos, te otorga inmunidad inmediata\"",
        nivel_min: 40,
        clase: 3,
        icono: "GiSwordsPower",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 8,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 5,
        nombre: "Pergamino Tecnologico",
        tipo: "Beneficio",
        costo: 1500,
        uso: "Temporal",
        descripcion: "Usa el celular en toda la semana sin penalización.",
        lore: "“La bendición del código te envuelve.”",
        nivel_min: 5,
        clase: 2,
        icono: "GiSmartphone",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 8,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 6,
        nombre: "Pierna de Pollo",
        tipo: "Beneficio",
        costo: 200,
        uso: "Consumible",
        descripcion: "Permite comer en el salón.",
        lore: "“Un alimento menor que calma al espíritu hambriento.”",
        nivel_min: 1,
        clase: 0,
        icono: "GiChickenLeg",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 8,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 7,
        nombre: "Pocion de Sueno",
        tipo: "Beneficio",
        costo: 900,
        uso: "Consumible",
        descripcion: "Puede dormir durante 1 clase.",
        lore: "“El usuario entra en un trance profundo mientras el mundo sigue su curso.”",
        nivel_min: 5,
        clase: 0,
        icono: "GiPotionBall",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 8,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 8,
        nombre: "Pocion de Tranformacion",
        tipo: "Beneficio",
        costo: 2000,
        uso: "Consumible",
        descripcion: "Perdona 1 falta sin justificar.",
        lore: "“El Guardián desvanece un registro maldito.”",
        nivel_min: 10,
        clase: 1,
        icono: "GiPotionOfMadness",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 8,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 9,
        nombre: "Pocion del Control",
        tipo: "Beneficio",
        costo: 2500,
        uso: "Consumible",
        descripcion: "Perdona 1 actividad no entregada.",
        lore: "“La aventura se completa automaticamente.”",
        nivel_min: 15,
        clase: 2,
        icono: "GiHealthPotion",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 8,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 10,
        nombre: "Pocion del Olvido",
        tipo: "Beneficio",
        costo: 1000,
        uso: "Consumible",
        descripcion: "Anula la falta por olvidar el material.",
        lore: "“La magia en tu interior restaura lo que fue olvidado.”",
        nivel_min: 5,
        clase: 0,
        icono: "GiMagicPotion",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 8,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 11,
        nombre: "Escudo del Novato",
        tipo: "Cosmetico",
        costo: 200,
        uso: "Fijo",
        descripcion: "Marco 2 \"Orbita\"",
        lore: "\"Destacas ante los plebeyos\"",
        nivel_min: 1,
        clase: 1,
        icono: "GiEdgedShield",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 4,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 12,
        nombre: "Espada del Aventurero",
        tipo: "Cosmetico",
        costo: 500,
        uso: "Fijo",
        descripcion: "Marco 3 \"Pulso\"",
        lore: "\"Destacas ante los aventureros\"",
        nivel_min: 10,
        clase: 2,
        icono: "GiBroadsword",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 4,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 13,
        nombre: "Hacha del Heroe",
        tipo: "Cosmetico",
        costo: 1500,
        uso: "Fijo",
        descripcion: "Marco 1 \"Estrella\"",
        lore: "\"Deslumbras al Rey Demonio\"",
        nivel_min: 30,
        clase: 3,
        icono: "GiWoodAxe",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 4,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 14,
        nombre: "Guantes de Cuero",
        tipo: "Cosmetico",
        costo: 200,
        uso: "Fijo",
        descripcion: "Fondo 2 \"Estrellas\"",
        lore: "\"Adquieres algo de aura\"",
        nivel_min: 1,
        clase: 0,
        icono: "GiWinterGloves",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 4,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 15,
        nombre: "Pala de Hierro",
        tipo: "Cosmetico",
        costo: 500,
        uso: "Fijo",
        descripcion: "Fondo 5 \"Rayas\"",
        lore: "\"Tu poder empieza a destacar\"",
        nivel_min: 5,
        clase: 0,
        icono: "GiSpade",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 4,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 16,
        nombre: "Lanza de Cobre",
        tipo: "Cosmetico",
        costo: 800,
        uso: "Fijo",
        descripcion: "Fondo 3 \"Cuadros\"",
        lore: "\"Dominas tu poder\"",
        nivel_min: 10,
        clase: 1,
        icono: "GiSpearHook",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 4,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 17,
        nombre: "Arco Infinito",
        tipo: "Cosmetico",
        costo: 1000,
        uso: "Fijo",
        descripcion: "Fondo 1 \"Burbujas\"",
        lore: "\"Tu Aura esta arriba del promedio\"",
        nivel_min: 15,
        clase: 1,
        icono: "GiLightningBow",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 4,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 18,
        nombre: "Amuleto de Hielo",
        tipo: "Cosmetico",
        costo: 1200,
        uso: "Fijo",
        descripcion: "Fondo 4 \"Rectangulos\"",
        lore: "\"Dominas la magia a tu voluntad\"",
        nivel_min: 20,
        clase: 2,
        icono: "GiGemPendant",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 4,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 19,
        nombre: "Baston de Mago",
        tipo: "Cosmetico",
        costo: 1500,
        uso: "Fijo",
        descripcion: "Fondo 6 \"Puntos Orbitando\"",
        lore: "\"Tu poder se persive en el aire\"",
        nivel_min: 30,
        clase: 2,
        icono: "GiWizardStaff",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 4,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 20,
        nombre: "Yelmo del Sabio",
        tipo: "Cosmetico",
        costo: 2000,
        uso: "Fijo",
        descripcion: "Fondo 7 \"Simbolos\"",
        lore: "\"El aura de tu magia es visible\"",
        nivel_min: 40,
        clase: 3,
        icono: "GiElfHelmet",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 4,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 21,
        nombre: "Sello del Mago",
        tipo: "Modificador",
        costo: 1000,
        uso: "Consumible",
        descripcion: "Puede hacer proyecto o actividad solo.",
        lore: "“Tu historia no necesita acompañantes.”",
        nivel_min: 8,
        clase: 1,
        icono: "GiScrollQuill",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 8,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 22,
        nombre: "Sello Estrategico",
        tipo: "Modificador",
        costo: 3500,
        uso: "Consumible",
        descripcion: "Se evalúa solo su esfuerzo individual de un trabajo grupal.",
        lore: "“El aventurero camina su propio sendero.”",
        nivel_min: 5,
        clase: 2,
        icono: "GiTiedScroll",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 8,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 23,
        nombre: "Contrato de Contrabando ",
        tipo: "Ventaja",
        costo: 5000,
        uso: "Consumible",
        descripcion: "Obtiene la guía del examen con las respuestas.",
        lore: "“Los magos de la torre revelan secretos prohibidos.”",
        nivel_min: 10,
        clase: 3,
        icono: "GiBookPile",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 8,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 24,
        nombre: "Contrato del Aventurero",
        tipo: "Ventaja",
        costo: 1000,
        uso: "Consumible",
        descripcion: "Aumenta +1 punto en el examen.",
        lore: "“La fuerza del héroe incrementa su golpe final.”",
        nivel_min: 5,
        clase: 1,
        icono: "GiBookmarklet",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 8,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 25,
        nombre: "Contrato del Gremio",
        tipo: "Ventaja",
        costo: 3000,
        uso: "Temporal",
        descripcion: "Las actividades de la semana no son obligatorias",
        lore: "“Un manto arcano distorsiona las reglas del deber.”",
        nivel_min: 3,
        clase: 2,
        icono: "GiSpellBook",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 8,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    },
    {
        id_articulo: 26,
        nombre: "Contrato Real",
        tipo: "Ventaja",
        costo: 10000,
        uso: "Consumible",
        descripcion: "Proyecto vale 100% si entregó 50%.",
        lore: "“La divinidad declara victoria antes del combate final.”",
        nivel_min: 40,
        clase: 3,
        icono: "GiBookAura",


        comprable: true,
        vendible: true,
        revendible: true,
        donable: true,
        stack_max: 8,


        reventa_pct: 0.5,   // ±50%
        comision: 0.15      // 15% (si lo manejas por item)
    }
]


const inventariosJson = [
    {
        matricula: "A20250011",
        inventario: [
            { id: 1, id_articulo: 1, cantidad: 3, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null },
            { id: 2, id_articulo: 6, cantidad: 2, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null },
            { id: 3, id_articulo: 11, cantidad: 1, estado: 1, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null }, // marco equipado
            { id: 4, id_articulo: 14, cantidad: 1, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null }
        ]
    },

    {
        matricula: "A20250012",
        inventario: [
            { id: 5, id_articulo: 1, cantidad: 2, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null },
            { id: 6, id_articulo: 7, cantidad: 1, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null },
            { id: 7, id_articulo: 12, cantidad: 1, estado: 1, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null }, // marco equipado
            { id: 8, id_articulo: 15, cantidad: 1, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null }
        ]
    },

    {
        matricula: "A20250034",
        inventario: [
            { id: 9, id_articulo: 2, cantidad: 2, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null },
            { id: 10, id_articulo: 6, cantidad: 1, estado: 2, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: 1000 }, // temporal sin activar
            { id: 11, id_articulo: 6, cantidad: 1, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null }, // temporal sin activar
            { id: 12, id_articulo: 5, cantidad: 1, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null }, // temporal sin activar
            { id: 13, id_articulo: 5, cantidad: 1, estado: 1, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: "2025-12-22 10:00:00", fecha_fin: "2025-12-29T10:00:00", precio: null }, // temporal sin activar
            { id: 14, id_articulo: 8, cantidad: 1, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null },
            { id: 15, id_articulo: 8, cantidad: 0, estado: 3, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: "2025-12-22 10:00:00", fecha_fin: null, precio: null },
            { id: 16, id_articulo: 13, cantidad: 1, estado: 1, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null }, // marco épico equipado
            { id: 17, id_articulo: 18, cantidad: 1, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null }
        ]
    },

    {
        matricula: "A20250056",
        inventario: [
            { id: 18, id_articulo: 1, cantidad: 1, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null },
            { id: 19, id_articulo: 6, cantidad: 3, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null },
            { id: 20, id_articulo: 11, cantidad: 1, estado: 1, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null },
            { id: 21, id_articulo: 14, cantidad: 1, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null }
        ]
    },

    {
        matricula: "A20250078",
        inventario: [
            { id: 22, id_articulo: 3, cantidad: 2, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null },
            { id: 23, id_articulo: 9, cantidad: 1, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null },
            { id: 24, id_articulo: 17, cantidad: 1, estado: 1, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null },
            { id: 25, id_articulo: 21, cantidad: 1, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null }
        ]
    },

    {
        matricula: "A20250091",
        inventario: [
            { id: 26, id_articulo: 2, cantidad: 1, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null },
            { id: 27, id_articulo: 5, cantidad: 1, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null },
            { id: 28, id_articulo: 16, cantidad: 1, estado: 1, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null },
            { id: 129, id_articulo: 22, cantidad: 1, estado: 0, fecha_obtencion: "2025-05-12 20:50:00", fecha_inicio: null, fecha_fin: null, precio: null }
        ]
    }
];



// Funcio del tiempo Actual
const formatoFecha = () => {
    const d = new Date();

    const pad = (n) => String(n).padStart(2, "0");

    return (
        d.getFullYear() +
        "-" +
        pad(d.getMonth() + 1) +
        "-" +
        pad(d.getDate()) +
        " " +
        pad(d.getHours()) +
        ":" +
        pad(d.getMinutes()) +
        ":" +
        pad(d.getSeconds())
    );
};

export function TablonProvider({ children, initial }) {
    const [cookies, setCookie] = useCookies(["matricula_actual"]);

    const notifyError = (txt) =>
        toast.error(txt, { position: "top-center" });

    const notifySuccess = (txt) =>
        toast.success(txt, { position: "top-center" });

    const [misiones, setMisiones] = React.useState(initial.misiones);
    const [usuarios, setUsuarios] = React.useState(initial.usuarios);
    const [misionesUsuario, setMisionesUsuario] = React.useState(initial.misionesUsuario);
    const [usuario, setUsuario] = React.useState(initial.usuario)
    const [matricula, setMatricula] = React.useState(initial.matricula)
    const [recompensas, setRecompensas] = React.useState(initial.recompensas)
    const [inventario, setInventario] = React.useState(initial.inventario)
    const tipo_entrega = initial.tipo_entrega;

    useEffect(() => {
        if (cookies.matricula_actual) {
            getUsuario(cookies.matricula_actual, true)
        }
    }, [cookies.matricula_actual])

    const now = new Date();

    const fechaActual =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0") + " " +
        String(now.getHours()).padStart(2, "0") + ":" +
        String(now.getMinutes()).padStart(2, "0") + ":" +
        String(now.getSeconds()).padStart(2, "0");

    // GET Usuario
    const getUsuario = async (ma, okMa) => {
        try {
            const res = await toast.promise(
                axios.get(
                    `${process.env.REACT_APP_GREMIO_API_URL}/get_usuario.php`,
                    { params: { matricula: ma } }
                ),
                {
                    pending: "Iniciando sesión...",
                    success: "Sesión iniciada",
                    error: "No se pudo iniciar sesión",
                },
                { position: "top-center" }
            );

            // notifySuccess("Sesion Iniciada");
            setUsuario(res.data.usuario);
            setMatricula(res.data.usuario.matricula);

            if (!okMa) {
                setCookie("matricula_actual", res.data.usuario.matricula, {
                    path: "/",
                    maxAge: 60 * 60 * 24,
                });
            }

            setMisionesUsuario(res.data.usuario.misiones);
            setInventario(res.data.usuario.inventario);

            return res.data;
        } catch (err) {
            console.log("Error:", err?.response?.data || err.message);
            notifyError(err?.response?.data?.msg || "Algo salio mal");
            return { ok: false };
        }
    };


    // SET Misiones Usuario (Probablemente Temporal)
    const getMisionesUsuario = (us_ma, mis) => {
        const usuario = usersJson.find(u => u.matricula === us_ma);
        if (!usuario) return [];

        const tempMisionesUsuario = usuario.misionesCompletadas
            .map(id => mis.find(m => m.id_mision === id))
            .filter(Boolean); // quita undefined si no encuentra la misión

        console.log(tempMisionesUsuario);
        return tempMisionesUsuario;
    };

    // UPDATE Usuario
    const updateUsuario = (data) => {
        notifySuccess("Usando API")

        // Inicio Api
        // Devuelve usuario
        setUsuario(prev => ({
            ...prev,
            ...data
        }));
        notifySuccess("Usuario Actualizado")
        // Fin Api
    };

    // UPDATE Inventario
    const updateInventario = (data) => {
        // Donacion
        if (data.accion === 4) {
            // Confirmacion de existencia de Reseptor
            let tempUsuario = usersJson.find(u => u.matricula === data.matriculaReceptor)
            if (tempUsuario === undefined) return { state: false, msg: "No se encontro" }

            let tempArticuloMod = data.articulo


            let tempInv = inventario.map(x => {
                if (x.id !== tempArticuloMod.id) return x;

                return {
                    ...x,
                    cantidad: Math.max(0, x.cantidad - 1),
                    estado: 4,
                    fecha_inicio: fechaActual
                };
            });

            console.log(tempInv);


            // let tempInv2 = tempInv.find(i => id_articulo)
            setInventario(tempInv)

            return { state: true, msg: "Donacion Completada" }

        }

    }

    // Ya Jala
    // POST Usuario Nuevo
    const postUsuarioNuevo = async (data) => {
        try {
            const fd = new FormData();
            fd.append("matricula", data.matricula);
            fd.append("nombre", data.nombre);
            fd.append("nickname", data.nickname);
            fd.append("color", data.color);

            // data.imagen debe ser File (de input type="file")
            fd.append("imagen", data.imagen);

            const res = await toast.promise(
                axios.post(
                    `${process.env.REACT_APP_GREMIO_API_URL}/post_usuario.php`,
                    fd
                ),
                {
                    pending: "Creando Usuario...",
                    success: "Usuario Creado",
                    error: "No se pudo crear usuario",
                },
                { position: "top-center" }
            );

            // notifySuccess(res.data.msg);
            setUsuario(res.data.usuario);
            setMatricula(res.data.usuario.matricula);
            setCookie("matricula_actual", res.data.usuario.matricula, {
                path: "/",
                maxAge: 60 * 60 * 24,
            });

            return res.data; // opcional
        } catch (err) {
            console.log("Error:", err?.response?.data || err.message);
            notifyError(err?.response?.data?.msg || "Error al crear usuario");
            return { ok: false };
        }
    };

    // Actualiza Los datos
    const value = React.useMemo(() => ({
        // Universales
        matricula, setMatricula,
        misiones, setMisiones,
        misionesUsuario, setMisionesUsuario,
        usuarios, setUsuarios,
        usuario, setUsuario,
        recompensas, setRecompensas,
        inventario, setInventario,

        // Api Calls Functions
        getUsuario,
        updateUsuario,
        postUsuarioNuevo,
        updateInventario,

        // Estaticos
        tipo_entrega,
    }), [misiones, usuarios, usuario, recompensas, misionesUsuario, matricula, inventario]);

    return <TablonContext.Provider value={value}>{children}</TablonContext.Provider>;
}

export function useTablon() {
    const ctx = React.useContext(TablonContext);
    if (!ctx) throw new Error("useTablon debe usarse dentro de <TablonProvider />");
    return ctx;
}
