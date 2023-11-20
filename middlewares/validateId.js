import { isValidObjectId } from "mongoose";

const isValidId = (req, res, next) => {
    const {contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        return res.status(404).json({message: `${contactId} is not valid` });
    }
    next();
}

export default isValidId;