'use strict';

require('angular');

require('../stylesheets/main.scss')

var app = angular.module('app', []);

require('./controllers/board-controller')(app);