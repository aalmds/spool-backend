import { Router } from 'express';
import { initRecordRoutes, initStatusRoutes, initUserRoute } from './common/init-routes';
const router = Router();

// Routes group for record
initRecordRoutes(router);

// Routes group for child
router.get('/child/:childId/educationist');
router.get('/child/:childId/therapist');

// Routes for status
initStatusRoutes(router);

// Routes for symptoms
router.get('/symptoms');

// Routes for educationist
router.get('/educationist/:educationistId/child');

// Routes for therapists
router.get('/therapist/:therapistId/child');
router.post('/therapist'); 

// Routes for user
initUserRoute(router);

export default router;
