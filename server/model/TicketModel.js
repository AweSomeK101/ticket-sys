const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
      enum: ["Mobile Phone", "TV", "Washing Machine", "Refrigerator"],
    },
    issue: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    customer: {
      type: String,
      required: true,
      ref: "Users",
    },
    assigned: {
      type: String,
      ref: "Users",
    },
    policy: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["In Progress", "Completed", "On Hold"],
      default: "In Progress",
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Tickets", ticketSchema);

module.exports = Ticket;
