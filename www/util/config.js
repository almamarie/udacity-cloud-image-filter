"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    dev: {
        AUTH_URL: process.env.AUTH_BASE_URL + "/api/v0/users/auth/verification",
    },
    jwt: {
        secret: "hellowworld",
    },
    prod: {},
};
//# sourceMappingURL=config.js.map