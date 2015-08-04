'use strict';

module.exports = function () {
    var service = {};

    service.compile = function (objects, errors) {
        objects.forEach(function (obj) {
            var config = obj.propertyValue('mailgun');
            if (config) {
                service.config = config;
            }
        });
    };

    return service;
};