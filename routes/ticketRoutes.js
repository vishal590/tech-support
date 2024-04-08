import express from "express";
import { allTicketController, assignTechSupportController, getAllTicketController, getTicketController, sendMessageController, ticketController, updateStatusController } from "../controllers/ticketController.js";

const router = express.Router();

router.post('/create-tickets', ticketController);
router.get('/get-all-tickets/:createdBy', getAllTicketController);
router.get('/get-tickets/:id', getTicketController);
router.put('/update-status/:id', updateStatusController);
router.post('/send-message/:ticketId', sendMessageController);
router.get('/all-tickets/', allTicketController);
router.put('/assign-tech-support/:ticketId', assignTechSupportController);

export default router;