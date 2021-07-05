const { Router } = require("express");
const ServicesController = require("../controllers/ServicesController");
const authMiddleware = require("../middlewares/authMiddleware");

const Services = Router();

// ROUTES
Services.get("/api/services", ServicesController.showAllServices);
Services.get("/api/services/:id", ServicesController.showOneService);
Services.get(
  "/api/services/all/count",
  ServicesController.showServicesQuantity
);
Services.get("/api/services/user/:id", ServicesController.showServicesFromUser);
Services.post(
  "/api/services/",
  authMiddleware,
  ServicesController.createService
);
Services.put(
  "/api/services/:id",
  authMiddleware,
  ServicesController.updateService
);
Services.delete(
  "/api/services/:id",
  authMiddleware,
  ServicesController.deleteService
);

module.exports = Services;
