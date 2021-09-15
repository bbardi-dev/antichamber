"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    app.get("/yoo", (req, res) => {
        res.status(200).send("hello there");
    });
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map