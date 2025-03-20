import { Router } from 'express';
import { initStatusRoutes } from './common/init-routes';

const router = Router();

// Routes group for record
router.get('/record/child/:childId', );
router.get('/record/child/:childId/therapist/:therapistId', );
router.get('/record/child/:childId/educationist/:educationistId', );
router.get('/record/educationist/:educationistId', );
router.get('/record/therapist/:therapistId', );
router.post('/record');

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

export default router;
