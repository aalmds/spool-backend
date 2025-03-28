import { Router } from 'express';
import { initRecordRoutes, initStatusRoutes, initChildRoutes, initEducationistRoutes, initTherapistRoutes, initUserRoute, initNotificationRoutes } from './common/init-routes';
const router = Router();

// Routes group for record
initRecordRoutes(router);

// Routes group for child
initChildRoutes(router);

// Routes for status
initStatusRoutes(router);

// Routes for educationist
initEducationistRoutes(router)

// Routes for therapists
initTherapistRoutes(router)

// Routes for notifications
initNotificationRoutes(router);

// Routes for user
initUserRoute(router);

export default router;
