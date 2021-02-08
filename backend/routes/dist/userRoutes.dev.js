"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController.js");

var _authMiddleware = require("../middleware/authMiddleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.route('/').post(_userController.registerUser);
router.post('/login', _userController.authUser);
router.route('/profile').get(_authMiddleware.protect, _userController.getUserProfile).put(_authMiddleware.protect, _userController.updateUserProfile);
var _default = router;
exports["default"] = _default;