const mongoose = require("mongoose");

const AdminPassSchema = mongoose.Schema(
  {
    password: {
      type: String,
    },
  },
  { timeStapms: true }
);

module.exports = mongoose.model("AdminPass", AdminPassSchema);
