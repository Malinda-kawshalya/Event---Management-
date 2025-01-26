const router = express.Router();

// Routes
router.get('/', getOrganizers);
router.get('/:id', getOrganizer);
router.post('/register', createOrganizer);
router.put('/:id', updateOrganizer);
router.delete('/:id', deleteOrganizer);

module.exports = router;