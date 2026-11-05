// Copyright (c) 2026 Janat Yasser. All rights reserved.
require('dotenv').config();
const express = require('express');
// Express 4 doesn't catch errors thrown in async handlers; without this a single
// failed AI call could crash the whole process.
require('express-async-errors');
const rateLimit = require('express-rate-limit');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(express.json({ limit: '20kb' }));

// Every debate action calls the paid model API: cap requests per IP.
app.use('/debate', rateLimit({ windowMs: 60 * 1000, limit: 12, standardHeaders: 'draft-7', legacyHeaders: false,
  message: { error: 'Too many requests. Wait a minute and try again.' } }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

app.use((req, res) => {
  res.status(404).render('error', { title: '404', message: 'Page not found.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', { title: 'Error', message: 'Something went wrong.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`DebateBot running → http://localhost:${PORT}`));
