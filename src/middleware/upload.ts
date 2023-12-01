import multer from "multer";
import crypto from "node:crypto";
import path from "node:path";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./uploads");
  },
  filename(req, file, callback) {
    crypto.randomBytes(16, (err, buff) => {
      if (err) return err;

      const filename = buff.toString("hex") + path.extname(file.originalname);

      callback(null, filename);
    });
  },
});

export default multer({ storage });


