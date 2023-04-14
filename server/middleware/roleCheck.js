function isCustomer(req, res, next) {
  if (req.userData.role !== "user") {
    res.status(403);
    next(new Error("Not a customer"));
  }
  next();
}

function isEmployee(req, res, next) {
  if (!req.userData.role == "employee") {
    res.status(403);
    next(new Error("Not an employee"));
  }
  next();
}

function isAdmin(req, res, next) {
  if (!req.userData.admin) {
    res.status(403);
    next(new Error("Not an admin"));
  }
  next();
}

module.exports = { isCustomer, isEmployee, isAdmin };
