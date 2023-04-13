const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "employee"],
      default: "user",
    },
    admin: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        token: {
          required: true,
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.virtual("tickets", {
  ref: "Tickets",
  localField: "username",
  foreignField: "customer",
});

userSchema.statics.findByCred = async ([username, password, role], cb) => {
  const user = await User.findOne({ username });
  if (!user) return cb({ message: "user not found", code: 404 });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return cb({ message: "wrong password", code: 401 });
  if (user.role != role) return cb({ message: "wrong role", code: 404 });
  return user;
};

userSchema.methods.generateJWT = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.SALT);
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 9);
  }
  next();
});

userSchema.methods.toJson = function () {
  let user = this.toObject();
  delete user.password;
  delete user.tokens;
  return user;
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
