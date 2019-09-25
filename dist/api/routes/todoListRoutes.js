"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal dependenices
 */
const todoListController_1 = require("../controllers/todoListController");
/**
 * Application routes
 */
exports.default = (app) => {
    /**
     * GLobal routes
     */
    app.route('/tasks')
        .get(todoListController_1.listALL)
        .post(todoListController_1.create);
    /**
     * Single item routes
     */
    app.route('/tasks/:taskId')
        .get(todoListController_1.read)
        .put(todoListController_1.update)
        .delete(todoListController_1.remove);
};
//# sourceMappingURL=todoListRoutes.js.map