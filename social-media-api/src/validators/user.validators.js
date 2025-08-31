import { body } from "express-validator";

export const updateProfileValidator = [
  body('username').optional().isString().isLength({ min: 3 }),
  body('bio').optional().isString().isLength({ max: 160 })
];