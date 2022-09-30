const { ItemController } = require("../controllers/item");
const express = require("express");
const router = express.Router();

router.get("/", ItemController.getAllItems);
router.get("/:id", ItemController.getItemById);
router.put("/set-bid/:id", ItemController.setBidById);

module.exports = router;
