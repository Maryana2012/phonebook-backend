import express from 'express';
import controllers from '../controllers/contacts-controllers.js'
import {authenticate} from '../middlewares/authenticate.js'
import { addContactSchema} from '../joiSchemas/contactSchema.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = express.Router()

router.get('/',authenticate, controllers.getContacts)

router.post('/', validateBody(addContactSchema), authenticate, controllers.addContact)

router.delete('/:contactId',)

router.put('/:contactId')

export default router;
