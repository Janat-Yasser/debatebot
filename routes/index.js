// Copyright (c) 2026 Janat Yasser. All rights reserved.
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/debateController');

router.get('/', ctrl.getHome);
router.get('/topic/:id', ctrl.getTopic);
router.post('/debate/start', ctrl.startDebate);
router.post('/debate/argue', ctrl.submitArgument);
router.get('/verdict/:sessionId', ctrl.getVerdict);

module.exports = router;
