import { Router } from 'express';

import auth from './auth/auth.route';
import boycottProducts from './boycott-products/boycott-products.route';
import upload from './upload/upload.route';

const router: Router = Router();

router.use('/auth', auth);
router.use('/boycott-products', boycottProducts);
router.use('/upload', upload);
// router.use("/projects", projects);

export default router;
