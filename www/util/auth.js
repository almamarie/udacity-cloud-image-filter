"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const config_1 = require("./config");
function requireAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const image_url = req.query.image_url;
        console.log(req.query.image_url);
        if (!req.headers || !req.headers.authorization) {
            return res.status(401).send({ message: "No authorization header." });
        }
        const token_bearer = req.headers.authorization.split(" ");
        if (token_bearer.length != 2) {
            return res.status(401).send({ message: "Malformed token." });
        }
        console.log(config_1.config.dev.AUTH_URL);
        try {
            const response = yield fetch(config_1.config.dev.AUTH_URL, {
                method: "GET",
                headers: { Authorization: req.headers.authorization },
            });
            const data = yield response.json();
            console.log(req.headers.authorization);
            if (!data.auth) {
                return res
                    .status(401)
                    .send({ auth: false, message: "Failed to authenticate." });
            }
        }
        catch (error) {
            console.log(error);
            return res
                .status(401)
                .send({ auth: false, message: "Failed to authenticate." });
        }
        return next();
    });
}
exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.js.map