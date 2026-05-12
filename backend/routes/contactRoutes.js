const express = require("express");
const {
  createContact,
  getAllContacts,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", createContact);
router.get("/getContactInfo", getAllContacts);

module.exports = router;
