const multer = require("multer")
const crypto = require("crypto")
const path = require("path")

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "./uploads")
    },
    filename(req, file, callback) {
        crypto.randomBytes(16, (err, buff) => {
            if(err) return err

            const filename = buff.toString("hex") + path.extname(file.originalname)

            callback(null, filename)
        })
    }
})


const upload  = multer({storage})

module.exports = upload