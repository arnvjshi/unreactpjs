"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Communication = exports.Component = exports.State = void 0;
const state_1 = __importDefault(require("../core/state"));
exports.State = state_1.default;
const component_1 = __importDefault(require("../core/component"));
exports.Component = component_1.default;
const communication_1 = require("../core/communication");
Object.defineProperty(exports, "Communication", { enumerable: true, get: function () { return communication_1.Communication; } });
