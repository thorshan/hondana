const functions = require("firebase-functions");
const express = require('express');
const app = express();
exports.api = functions.https.onRequest(app)
