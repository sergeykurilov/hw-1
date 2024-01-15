"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = exports.Router = void 0;
const express_1 = require("express");
const inversify_1 = require("inversify");
var express_2 = require("express");
Object.defineProperty(exports, "Router", { enumerable: true, get: function () { return express_2.Router; } });
require("reflect-metadata");
let BaseController = class BaseController {
    constructor(logger) {
        this.logger = logger;
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    send(res, code, message) {
        res.type("application/json");
        return res.status(200).json(message);
    }
    ok(res, message) {
        return this.send(res, 200, message);
    }
    created(res) {
        return res.sendStatus(201);
    }
    bindRoutes(routes) {
        var _a;
        for (const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`);
            const middleware = (_a = route.middlewares) === null || _a === void 0 ? void 0 : _a.map((m) => m.execute.bind(m));
            const handler = route.func.bind(this);
            const pipeline = middleware ? [...middleware, handler] : handler;
            const method = route.method;
            this.router[method](route.path, pipeline);
        }
    }
};
exports.BaseController = BaseController;
exports.BaseController = BaseController = __decorate([
    (0, inversify_1.injectable)()
], BaseController);
