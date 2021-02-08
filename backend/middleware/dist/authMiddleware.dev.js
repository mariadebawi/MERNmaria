"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var protect = (0, _expressAsyncHandler["default"])(function _callee(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) {
            _context.next = 14;
            break;
          }

          _context.prev = 1;
          token = req.headers.authorization.split(' ')[1];
          decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
          _context.next = 6;
          return regeneratorRuntime.awrap(_userModel["default"].findById(decoded.id).select('-password'));

        case 6:
          req.user = _context.sent;
          _context.next = 14;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          res.status(401);
          throw new Error('No authorized , token failed');

        case 14:
          if (token) {
            _context.next = 17;
            break;
          }

          res.status(401);
          throw new Error('No authorized , no token');

        case 17:
          next();

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
exports.protect = protect;