"use strict";

var q = require('q');

exports.installModule = function (injection) {
    injection.bindMultiple('compileServices', [
        'mailgunIntegrationService'
    ]);

    injection.bindFactory('mailgunIntegrationConfig', function (app, appAccessRouter, express, mailgunIntegrationService, securityService) {
            return {
                configure: function () {
                    app.all('/api/mailgun/incoming', function (req, res, next) {
                        return injection.inScope({
                            Message: req.body
                        }, function () {
                            return q(securityService.asSystemUser(function () {
                                return mailgunIntegrationService.config.propertyValue('onMessage');
                            })).then(function () {
                                res.sendStatus(200);
                            }).catch(function (err) {
                                next(err);
                            });
                        });
                    });
                }
            };
        }
    );

    injection.bindMultiple('appConfigurators', [
        'mailgunIntegrationConfig'
    ]);

    injection.bindFactory('mailgunIntegrationService', require(require('path').join(__dirname, 'mailgun-integration-service.js')));
};
