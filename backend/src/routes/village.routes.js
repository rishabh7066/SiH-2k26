import { Router } from 'express';
import {
  searchVillages,
  getVillageById,
  getNearbyVillages,
  getVillageCompetitors,
  getVillageGapMap,
  getVillageHealthScore
} from '../controllers/village.controller.js';

const router = Router();

// GET /api/villages/search?q=varanasi&state=UP
router.get('/search', searchVillages);

// GET /api/villages/nearby?lat=25.3176&lng=82.9739&radius=10
router.get('/nearby', getNearbyVillages);

// GET /api/villages/:id/competitors — Competitor intelligence (OSM + DB)
router.get('/:id/competitors', getVillageCompetitors);

// GET /api/villages/:id/gap-map — Leaflet pins for existing shops & opportunity gaps
router.get('/:id/gap-map', getVillageGapMap);

// GET /api/villages/:id/health-score — Multi-factor Village Business Health Score
router.get('/:id/health-score', getVillageHealthScore);

// GET /api/villages/:id
router.get('/:id', getVillageById);

export default router;
