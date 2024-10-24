const mongoose = require("mongoose");

const querySchema = mongoose.Schema(
  {
    constumerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    department: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    queryResponse: {
      type: String,
      required: true,
    },
    querySolution: {
      type: String,
      required: true,
    },
    querystatus: {
      type: Boolean,
      default: false,
      required: true,
    },
    priority: {
      type: String,
      enum: ["None", "Low", "Medium", "High"],
      required: true,
    },
    querySentiment: {
      type: String,
      enum: ["Positive", "Negative", "Neutral"],
      required: true,
    },
  },
  { timestamps: true }
);

const Query = new mongoose.model("Query", querySchema);

module.exports = Query;
