'use strict';

const utils = require('../utils/writer.js');
const Notification = require('../service/NotificationService');

module.exports.notificationIdGET = function notificationIdGET (req, res, next) {
  const notificationId = req.swagger.params['notificationId'].value;
  Notification.notificationIdGET(notificationId)
    .then(function (error_) {
      utils.writeJson(res, error_);
    })
    .catch(function (error_) {
      utils.writeJson(res, error_);
    });
};

module.exports.rootGET = function rootGET (req, res, next) {
  Notification.rootGET()
    .then(function (error_) {
      utils.writeJson(res, error_);
    })
    .catch(function (error_) {
      utils.writeJson(res, error_);
    });
};
