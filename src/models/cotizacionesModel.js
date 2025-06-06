const mongoose = require("mongoose");

const CotizacionesModel = new mongoose.Schema(
    {
        proyecto_id: {
            required: false,
            type: mongoose.Schema.Types.ObjectId,
            ref: "proyectos",
            default: null,
        },
        cliente_id: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "usuarios",
        },
        titulo: {
            type: String,
            required: true,
        },
        detalles: {
            type: String,
            required: true,
        },
        fecha_solicitud: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        urgente: {
            type: Boolean,
            required: true,
        },
        historial_respuestas: [
            {
                usuario_id: {
                    required: true,
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "usuarios",
                },
                contenido: {
                    type: String,
                    required: true,
                },
                fecha_envio: {
                    type: Date,
                    required: true,
                    default: Date.now(),
                },
                files: [],
            },
        ],
        estado: {
            type: String,
            required: true,
            enum: ["Nuevo", "Aceptado", "Cancelado"],
        },
        files: [],
    },
    { collection: "cotizaciones" }
);

module.exports = mongoose.model("cotizaciones", CotizacionesModel);
