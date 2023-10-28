import express from 'express';
import registerUser from '../controller/userController.js';
import {authUser} from "../controller/userController.js";
import {allUsers} from '../controller/userController.js'

import {protect} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').post(registerUser).get(protect,allUsers)
router.post('/login',authUser)


export default router;