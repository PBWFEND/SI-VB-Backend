const express = require("express");
const router = express.Router();
const controller = require("../controllers/laboratoriumController");

// GET    /laboratorium        → list semua lab (mendukung query ?status=&nama=&minKapasitas=)
// GET    /laboratorium/:id    → detail lab berdasarkan id
// POST   /laboratorium        → tambah lab baru
// PUT    /laboratorium/:id    → update data lab
// DELETE /laboratorium/:id    → hapus lab

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;