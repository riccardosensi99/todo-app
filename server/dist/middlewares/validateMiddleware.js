"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const errors = result.error.errors.map(err => err.message);
        res.status(400).json({ errors });
        return;
    }
    next();
};
exports.validate = validate;
