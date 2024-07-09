const multer = require("multer");

const multerOptions = ()=>{
  const multerStorage = multer.memoryStorage();
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("Only Images Allowed", false);
    }
  };
  const uplode = multer({ storage: multerStorage, fileFilter: multerFilter });
  return uplode
}

exports.uplodeSingleImage = (fildename)=>multerOptions().single(fildename)

exports.uplodeMixOfImage = (fildsImage)=>multerOptions().fields(fildsImage)
