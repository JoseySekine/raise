import {registerUser} from '../controller/user'
import express from 'express';
const router = express.Router();

router.post('/register_user', registerUser)

export default router;
