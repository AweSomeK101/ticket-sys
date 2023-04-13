const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../", "public/");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx)$/)) {
      return cb(new Error("only upload files with jpg, jpeg, png, pdf, doc, docx format."));
    }
    cb(null, true); // continue with upload
  },
  limits: { fileSize: 2 * 1024 * 1024 },
});

module.exports = upload;
