import express from "express";
import {
    getComps,
    createComps,
    updateComps,
    deleteComps
} from '../controllers/home.js';
import {
    getDetailCompe
} from '../controllers/detail.js';

const router = express.Router();

router.get('/home', getComps);
router.post('/save', createComps);
router.post('/update', updateComps);
router.post('/delete', deleteComps);

router.get('/tournament/:id', getDetailCompe);

export default router;