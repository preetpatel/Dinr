// import express from 'express';
// import configureApi from "./api";

const configureApi = require('./api');
const express = require('express');
const router = express.Router();
router.use('/api', configureApi); 

export = router;