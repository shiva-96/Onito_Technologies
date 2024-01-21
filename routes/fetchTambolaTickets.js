const express = require("express");
const router = express.Router();
const fetchTambola = require("../controller/fetchTambolaTickets");

router.get("/fetch-tambola-tickets",fetchTambola.fetchTambolaTickets)