// const multer = require('multer')
 
//     const storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//         if (file.fieldname === "image") {
//           cb(null, "./Uploads/User/");
//         }else if(file.fieldname === "catImage"){
//             cb(null, "./Uploads/Category/");
//         }else if(file.fieldname === "petImage"){
//           cb(null, "./Uploads/Dog/");
//       }else if(file.fieldname === "contentImage"){
//         cb(null, "./Uploads/ContentImage/");
//     }else if(file.fieldname === "taskImage"){
//       cb(null, "./Uploads/Task/");
//   }
//       },
//       filename: function (req, file, cb) {
//         if (file.fieldname === "image") {
//           const filename = file.originalname.split(" ").join("-");
//           cb(null, `${filename}`);
//         }else  if (file.fieldname === "catImage"){
//             const filename = file.originalname.split(" ").join("-");
//             cb(null, `${filename}`);
//         }else  if (file.fieldname === "petImage"){
//           const filename = file.originalname.split(" ").join("-");
//           cb(null, `${filename}`);
//       }else  if (file.fieldname === "contentImage"){
//         const filename = file.originalname.split(" ").join("-");
//         cb(null, `${filename}`);
//     }else  if (file.fieldname === "taskImage"){
//       const filename = file.originalname.split(" ").join("-");
//       cb(null, `${filename}`);
//   }
//       },
//     });
  
//     const  user = multer({ storage : storage }).single('image')
//     const  catImage = multer({ storage : storage }).single('catImage')
//     const  pet = multer({ storage : storage }).single('petImage')
//     const contentimage = multer({ storage : storage }).single('contentImage')
//     const taskimage = multer({ storage : storage }).single('taskImage')

//     module.exports={
//         user ,catImage , pet , contentimage ,taskimage
//     }


     
    
  const multer = require('multer');
const fs = require('fs');
const path = require('path');

// List of required upload directories
const uploadDirs = [
  './Uploads/User/',
  './Uploads/Category/',
  './Uploads/Dog/',
  './Uploads/ContentImage/',
  './Uploads/Task/'
];

// Ensure each directory exists
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    switch (file.fieldname) {
      case "image":
        cb(null, "./Uploads/User/");
        break;
      case "catImage":
        cb(null, "./Uploads/Category/");
        break;
      case "petImage":
        cb(null, "./Uploads/Dog/");
        break;
      case "contentImage":
        cb(null, "./Uploads/ContentImage/");
        break;
      case "taskImage":
        cb(null, "./Uploads/Task/");
        break;
      default:
        cb(new Error("Unknown field name"), false);
    }
  },
  filename: function (req, file, cb) {
    const sanitizedFilename = file.originalname.replace(/\s+/g, '-');
    cb(null, sanitizedFilename);
  }
});

// Create multer middleware for each upload type
const user = multer({ storage }).single('image');
const catImage = multer({ storage }).single('catImage');
const pet = multer({ storage }).single('petImage');
const contentimage = multer({ storage }).single('contentImage');
const taskimage = multer({ storage }).single('taskImage');

module.exports = {
  user,
  catImage,
  pet,
  contentimage,
  taskimage
};
