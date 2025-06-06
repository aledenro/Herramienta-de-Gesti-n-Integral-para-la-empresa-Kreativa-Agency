const express = require("express");
const ServiciosController = require("../controllers/serviciosController");

const router = express.Router();

router.get("/categorias", ServiciosController.getCategorias);
router.post("/categorias", ServiciosController.agregarCategoria);

router.get("/", ServiciosController.getServicios);
router.get("/nombres", ServiciosController.getServiciosNombres);
router.post("/agregar", ServiciosController.agregarServicio);
router.get("/:id", ServiciosController.getServicioById);
router.put("/modificar/:id", ServiciosController.modificarServicioById);
router.put("/:id/nuevoPaquete", ServiciosController.agregarPaquete);
router.put("/:id/paquetes/:paqueteId", ServiciosController.modificarPaquete);
router.put(
    "/:id/paquetes/:paqueteId/desactivar",
    ServiciosController.desactivarPaquete
);
router.put(
    "/:id/paquetes/:paqueteId/activar",
    ServiciosController.activarPaquete
);

router.put("/:id/activar", ServiciosController.activarServicio);
router.put("/:id/desactivar", ServiciosController.desactivarServicio);

module.exports = router;
