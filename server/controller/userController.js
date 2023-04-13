const User = require("../model/UserModel.js");
const {
  getUserTickets,
  getUnassignedTickets,
  getAssignedTickets,
} = require("./ticketController.js");

const userController = {
  registerUser: async function (req, res, next) {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send();
    } catch (error) {
      console.log("register user=>", error);
      next(error);
    }
  },

  loginUser: async function (req, res, next) {
    try {
      console.log(req.body);
      const user = await User.findByCred(
        [req.body.username, req.body.password, req.body.role],
        (error) => {
          if (error) {
            res.status(error.code);
            return next(new Error(error.message));
          }
        }
      );
      console.log("print: ", user);
      const token = await user.generateJWT();
      res.send({ token: `Bearer ${token}`, user: user.toJson() });
    } catch (error) {
      console.log("login user=> ", error);
      next(error);
    }
  },

  logoutUser: async function (req, res, next) {
    try {
      req.userData.tokens = req.userData.tokens.filter((tok) => tok.token !== req.userToken);
      await req.userData.save();
      res.send();
    } catch (error) {
      console.log("logout user=> ", error);
      next(error);
    }
  },

  getAllUsers: async function (req, res, next) {
    try {
      const users = await User.find({});
      // res.send(users.map((u) => ({ username: u.username, role: u.role, admin: u.admin })));
      res.send(users);
    } catch (error) {
      console.log("get all user => ", error);
      next(error);
    }
  },

  // getUser: async function (req, res, next) {
  //   try {
  //     if (req.userData.role == "user") {
  //       const tickets = await getUserTickets(req.userData);
  //       res.send({
  //         user: req.userData.toJson(),
  //         tickets,
  //       });
  //     }
  //     if (req.userData.role == "employee") {
  //       if (!req.userData.admin) {
  //         const tickets = await getUserTickets(req.userData);
  //         res.send({
  //           user: req.userData.toJson(),
  //           tickets,
  //         });
  //       } else {
  //         const unAssignedTickets = await getUnassignedTickets();
  //         const assignedTickets = await getAssignedTickets();
  //         res.send({
  //           user: req.userData.toJson(),
  //           unAssignedTickets,
  //           assignedTickets,
  //         });
  //       }
  //     }

  //     res.status(404).send();
  //   } catch (error) {
  //     console.log("get user => ", error);
  //     next(error);
  //   }
  // },
};

module.exports = userController;
