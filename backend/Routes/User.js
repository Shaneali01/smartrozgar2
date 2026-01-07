import express from 'express'
import getUserById from '../Controllers/User.js';
const router = express.Router();


router.get("/:userId",getUserById)
export default router