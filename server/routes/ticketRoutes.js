const express = require("express");
const ticketCtrl = require("../controller/ticketController.js");
const auth = require("../middleware/auth.js");
const upload = require("../middleware/policyUpload.js");
const { isCustomer, isEmployee } = require("../middleware/roleCheck.js");

const router = express.Router();

router
  .route("/:ticketId")
  .get(auth, ticketCtrl.getTicket)
  .patch(auth, isEmployee, ticketCtrl.updateTicket);
router
  .route("/")
  .post(auth, isCustomer, upload.single("policy"), ticketCtrl.createTicket)
  .get(auth, (req, res, next) => {
    if (req.userData.admin) {
      ticketCtrl.getAdminTickets(req, res, next);
    } else {
      ticketCtrl.getTickets(req, res, next);
    }
  });

module.exports = router;
