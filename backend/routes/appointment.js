const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const router = express.Router();

router.post('/book', appointmentController.bookAppointment);
router.get('/', appointmentController.getAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.delete('/:id', appointmentController.deleteAppointment);
router.post('/checkin', appointmentController.checkInAppointment);

module.exports = router;