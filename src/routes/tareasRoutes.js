const express = require("express");
const TareasController = require("../controllers/tareasController");

const router = express.Router();

router.post("/crear", TareasController.createTarea);
router.get("/id/:id", TareasController.getTareaById);
router.put("/editar/:id", TareasController.editTarea);
router.put("/actualizarLog/:id", TareasController.actualizarLog);
router.get("/", TareasController.getAllTareas);
router.get("/getByColab/:id", TareasController.getAllTareasByColab);

module.exports = router;
