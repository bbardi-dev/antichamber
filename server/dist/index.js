"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const logger_1 = __importDefault(require("./config/logger"));
const routes_1 = __importDefault(require("./routes"));
const main = async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.listen(config_1.default.server.port, config_1.default.server.hostname, () => {
        logger_1.default.info(`Listening on ${config_1.default.server.hostname}/${config_1.default.server.port}`);
        (0, routes_1.default)(app);
    });
};
main();
//# sourceMappingURL=index.js.map