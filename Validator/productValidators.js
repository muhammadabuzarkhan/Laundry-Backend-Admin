// const { ApiResponse } = require("../Helpers")
// const { body, validationResult } = require('express-validator');

// exports.newProductValidator = [
  
//     body('subCatId').not().isEmpty().withMessage("Sub Category is Required"),
//     body('title').not().isEmpty().withMessage("Title is Required"),
//     body('price').not().isEmpty().withMessage("Price is Required"),
    
    
//     function (req, res, next) {
//         const errors = validationResult(req);
//         console.log("errors",errors);
//         if (!errors.isEmpty()) {
//             return res.status(400).json(ApiResponse({}, errors.array()[0].msg, false));
//         }
//         next()
//     }
// ]

const { ApiResponse } = require("../Helpers");
const { body, validationResult } = require('express-validator');

exports.newProductValidator = [
  // Validate subCatId (check for non-empty and valid Mongo ObjectId format)
  body('subCatId')
    .not().isEmpty().withMessage("Sub Category is Required")
    .isMongoId().withMessage("Sub Category must be a valid ID"),

  // Validate title
  body('title')
    .not().isEmpty().withMessage("Title is Required"),

  // Validate price
  body('price')
    .not().isEmpty().withMessage("Price is Required")
    .isNumeric().withMessage("Price must be a number"),

  // Custom middleware for error handling
  function (req, res, next) {
    const errors = validationResult(req);

    // Log all errors for debugging
    console.log("Validation Errors:", errors.array());

    // If validation fails, send back the first error
    if (!errors.isEmpty()) {
      return res.status(400).json(ApiResponse({}, errors.array()[0].msg, false));
    }
    next();
  }
];
