const mongoose = require("mongoose");

const Summaryschema = new mongoose.Schema(
  {
    Summary: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Summary = mongoose.model("Summary", Summaryschema);

module.exports = Summary;
