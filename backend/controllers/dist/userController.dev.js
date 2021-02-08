"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserProfile = exports.registerUser = exports.getUserProfile = exports.authUser = void 0;

var _userModel = _interopRequireDefault(require("../models/userModel.js"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _generateToken = _interopRequireDefault(require("../utils/generateToken.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @desc Auth user&get token 
// @route POST /api/users/login
// @access  Public
var authUser = (0, _expressAsyncHandler["default"])(function _callee(req, res) {
  var _req$body, email, password, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: email
          }));

        case 3:
          user = _context.sent;
          _context.t0 = user;

          if (!_context.t0) {
            _context.next = 9;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(user.matchPassword(password));

        case 8:
          _context.t0 = _context.sent;

        case 9:
          if (!_context.t0) {
            _context.next = 13;
            break;
          }

          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, _generateToken["default"])(user._id)
          });
          _context.next = 15;
          break;

        case 13:
          res.status(401);
          throw new Error('Invalid email or password');

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
}); // @desc Get user profile
// @route GET /api/users/profile
// @access  Private

exports.authUser = authUser;
var getUserProfile = (0, _expressAsyncHandler["default"])(function _callee2(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_userModel["default"].findById(req.user._id));

        case 2:
          user = _context2.sent;

          if (!user) {
            _context2.next = 7;
            break;
          }

          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
          });
          _context2.next = 9;
          break;

        case 7:
          res.status(404);
          throw new Error('User not found');

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // @desc update user profile
// @route PUT /api/users/profile
// @access  Private

exports.getUserProfile = getUserProfile;
var updateUserProfile = (0, _expressAsyncHandler["default"])(function _callee3(req, res) {
  var user, UpdateUser;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_userModel["default"].findById(req.user._id));

        case 2:
          user = _context3.sent;

          if (!user) {
            _context3.next = 13;
            break;
          }

          user.name = req.body.name || user.name;
          user.email = req.body.email || user.email;

          if (req.body.password) {
            user.password = req.body.password;
          }

          _context3.next = 9;
          return regeneratorRuntime.awrap(user.save());

        case 9:
          UpdateUser = _context3.sent;
          res.json({
            _id: UpdateUser._id,
            name: UpdateUser.name,
            email: UpdateUser.email,
            isAdmin: UpdateUser.isAdmin
          });
          _context3.next = 15;
          break;

        case 13:
          res.status(404);
          throw new Error('User not found');

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // @desc register new user
// @route POST /api/users
// @access  Public

exports.updateUserProfile = updateUserProfile;
var registerUser = (0, _expressAsyncHandler["default"])(function _callee4(req, res) {
  var _req$body2, name, email, password, userExist, user;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: email
          }));

        case 3:
          userExist = _context4.sent;

          if (!userExist) {
            _context4.next = 7;
            break;
          }

          res.status(401);
          throw new Error('User already exist');

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(_userModel["default"].create({
            name: name,
            email: email,
            password: password
          }));

        case 9:
          user = _context4.sent;

          if (!user) {
            _context4.next = 14;
            break;
          }

          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, _generateToken["default"])(user._id)
          });
          _context4.next = 16;
          break;

        case 14:
          res.status(401);
          throw new Error('Invalid data user');

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.registerUser = registerUser;