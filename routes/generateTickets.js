const express = require("express");
const router = express.Router();
const ticketCont = require("../controller/ticketController")

router.post('/tambola-ticket-generator',ticketCont.tambolaTicketGenerator)

