import { Router } from 'express';
import { initRecordRoutes, initStatusRoutes, initChildRoutes, initEducationistRoutes, initTherapistRoutes } from './common/init-routes';
const router = Router();

// Routes group for record
initRecordRoutes(router);

// Routes group for child
initChildRoutes(router);

// Routes for status
initStatusRoutes(router);

// Routes for symptoms
router.get('/symptoms');

// Routes for educationist
initEducationistRoutes(router)

// Routes for therapists
initTherapistRoutes(router)

export default router;
