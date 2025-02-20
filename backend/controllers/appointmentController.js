const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time } = req.body;
    if (!patientId || !doctorId || !date || !time) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(patientId) || !mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ error: "Invalid patientId or doctorId" });
    }
    const existingAppointment = await Appointment.findOne({ doctorId, date, time });
    if (existingAppointment) {
      return res.status(400).json({ error: "Appointment slot already taken" });
    }
    const newAppointment = new Appointment({ patientId, doctorId, date, time });
    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
  } catch (error) {
    console.error("Book appointment error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    console.error("Get appointments error:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ error: "Invalid appointment ID" });
    }
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    console.error("Get appointment error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ error: "Invalid appointment ID" });
    }
    const appointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Delete appointment error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.checkInAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    if (!appointmentId || !mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ error: "Invalid appointmentId" });
    }
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { checkedIn: true },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json({ message: "Checked in successfully", appointment });
  } catch (error) {
    console.error("Check-in appointment error:", error);
    res.status(500).json({ error: "Check-in failed" });
  }
};