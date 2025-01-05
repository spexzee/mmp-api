import express from 'express';
import jwt from 'jsonwebtoken'
import googleLogin from '../../controller/google-login/google.controller.js';

const router = express.Router();

router.get('/google', googleLogin)


export default router;