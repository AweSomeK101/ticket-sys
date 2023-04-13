function isCustomer(req, res, next) {
  if (req.userData.role == "user") next();
  res.status(403);
  next(new Error("Not a customer"));
}

function isEmployee(req, res, next) {
  if (req.userData.role == "employee") next();
  res.status(403);
  next(new Error("Not an employee"));
}

function isAdmin(req, res, next) {
  if (req.userData.admin) next();
  res.status(403);
  next(new Error("Not an admin"));
}

module.exports = { isCustomer, isEmployee, isAdmin };
