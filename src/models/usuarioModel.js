const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  usuario: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  contraseña: { type: String, required: true },
  tipo_usuario: { type: String, enum: ['Administrador', 'Colaborador', 'Cliente'], required: true },
  estado: { type: String, default: 'Activo' },
  must_change: { type: Boolean, default: false },
  fecha_creacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Usuario', usuarioSchema);