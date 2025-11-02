'use strict';

var utils = require('../utils/writer.js');
var Notifications = require('../service/NotificationsService');

module.exports.createPOST = function createPOST (req, res, next) {
  Notifications.createPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.notificationIdDELETE = function notificationIdDELETE (req, res, next) {
  var notificationId = req.swagger.params['notificationId'].value;
  Notifications.notificationIdDELETE(notificationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.notificationIdPUT = function notificationIdPUT (req, res, next) {
  var notificationId = req.swagger.params['notificationId'].value;
  Notifications.notificationIdPUT(notificationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
