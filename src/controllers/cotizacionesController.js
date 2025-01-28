const CotizacionesService = require("../services/cotizacionesService");
const lodash = require("lodash");

class CotizacionesController {
    async crearCotizacion(req, res) {
        try {
            const cotizacion = await CotizacionesService.crearCotizacion(
                req.body
            );

            return res.status(201).json(cotizacion);
        } catch (error) {
            console.error("Error al crear la cotización: " + error.message);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CotizacionesController();
