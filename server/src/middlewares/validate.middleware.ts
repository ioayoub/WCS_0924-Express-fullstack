import { RequestHandler } from "express-serve-static-core";
import { validateRoleSchema } from "../helpers/validators/role.validator";

export const validateRole: RequestHandler = (req, res, next) => {
  try {
    const result = validateRoleSchema(req.body);

    if (!result.success) {
      res.status(401).json(result?.errors);
      return;
    }

    return next();
  } catch (error) {
    next(error);
  }
};
