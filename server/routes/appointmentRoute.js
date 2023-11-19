const express = require("express");

const router = express.Router();

const Appointment = require("../database/model/AppointmentSchema");

router.post("/add", async (req, res) => {
  try {
    const check = await Appointment.findOne(req.body);

    if (check) {
      throw new Error("Appointment already exists");
    }
    const appointment = await Appointment.create(req.body);
    appointment.populate("doctor");
    appointment.populate("patient");
    appointment.save();

    res.status(200).json(appointment._doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:role/:id", async (req, res) => {
  try {
    const { role, id } = req.params;
    const appointments = await Appointment.find(
      role === "Doctor" ? { doctor: id } : { patient: id }
    ).populate(role === "Doctor" ? "patient" : "doctor", { password: 0 });

    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
