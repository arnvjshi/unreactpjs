"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponent = exports.Footer = exports.Navbar = void 0;
const state_1 = __importDefault(require("./core/state"));
const component_1 = require("./core/component");
Object.defineProperty(exports, "createComponent", { enumerable: true, get: function () { return component_1.createComponent; } });
const communication_1 = require("./core/communication");
var Navbar_1 = require("./components/Navbar");
Object.defineProperty(exports, "Navbar", { enumerable: true, get: function () { return Navbar_1.Navbar; } });
var Footer_1 = require("./components/Footer");
Object.defineProperty(exports, "Footer", { enumerable: true, get: function () { return Footer_1.Footer; } });
class Unreact {
    constructor() {
        this.state = new state_1.default();
        this.communication = new communication_1.Communication(this);
    }
    getState() {
        return this.state;
    }
    getCommunication() {
        return this.communication;
    }
}
exports.default = new Unreact();
