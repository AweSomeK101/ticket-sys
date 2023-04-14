const Ticket = require("../model/TicketModel.js");

const getUnassignedTickets = async function () {
  const tickets = await Ticket.find({ assigned: { $exists: true, $eq: "" } });
  return tickets;
};

const getAssignedTickets = async function () {
  const tickets = await Ticket.find({ assigned: { $exists: true, $ne: "" } });
  return tickets;
};

const ticketController = {
  getTicket: async function (req, res, next) {
    try {
      const { ticketId } = req.params;
      const ticket = await Ticket.findById(ticketId);
      res.send(ticket);
    } catch (error) {
      console.log("get ticket =>", error);
      next(error);
    }
  },

  updateTicket: async function (req, res, next) {
    try {
      const ticket = await Ticket.findById(req.params.ticketId);
      const { status, assigned } = req.body;
      console.log(ticket, req.body);
      if (status) {
        if (req.userData.username != ticket.assigned) {
          res.status(403);
          next(new Error("Ticket not assigned to user"));
        }
        ticket.status = status;
      }
      if (assigned) {
        if (req.userData.admin != true) {
          res.status(403);
          next(new Error("Not an admin"));
        }
        ticket.assigned = assigned;
      }
      await ticket.save();
      res.status(201).send();
    } catch (error) {
      console.log("update ticket =>", error);
      next(error);
    }
  },

  createTicket: async function (req, res, next) {
    try {
      const { product, issue, description } = req.body;
      const policy = req.file;
      console.log(policy);
      if (!product || !issue || !policy) {
        res.status(400);
        next(new Error("Incomplete data"));
      }
      const ticket = new Ticket({
        product,
        issue,
        description,
        customer: req.userData.username,
        policy: policy.filename,
      });

      await ticket.save();
      console.log(ticket);
      res.status(201).send(ticket);
    } catch (error) {
      console.log("create ticket =>", error);
      next(error);
    }
  },

  getTickets: async function (req, res, next) {
    try {
      let tickets;
      if (req.userData.role == "employee") {
        tickets = {};
        let assigned = await Ticket.find({ assigned: req.userData.username });
        tickets.assignedTickets = assigned;
      } else {
        tickets = await Ticket.find({ customer: req.userData.username });
      }
      res.send(tickets);
    } catch (error) {
      console.log("get user tickets=>", error);
      next(error);
    }
  },

  getAdminTickets: async function (req, res, next) {
    try {
      const unAssignedTickets = await getUnassignedTickets();
      const assignedTickets = await getAssignedTickets();
      res.send({
        unAssignedTickets,
        assignedTickets,
      });
    } catch (error) {
      console.log("admin ticket error=>", error);
      next(error);
    }
  },
};

module.exports = ticketController;
