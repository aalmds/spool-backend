import { Router } from 'express';
import { initStatusRoutes, initChildRoutes, initEducationistRoutes, initTherapistRoutes } from './common/init-routes';

const router = Router();

// Routes group for record
router.get('/record/child/:childId', );
router.get('/record/child/:childId/therapist/:therapistId', );
router.get('/record/child/:childId/educationist/:educationistId', );
router.get('/record/educationist/:educationistId', );
router.get('/record/therapist/:therapistId', );
router.post('/record');

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
