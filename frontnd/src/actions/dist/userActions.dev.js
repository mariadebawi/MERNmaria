"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserProfile = exports.getUserDetails = exports.logout = exports.register = exports.login = void 0;

var _userConstants = require("../constantes/userConstants");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var login = function login(email, password) {
  return function _callee(dispatch) {
    var config, _ref, data;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch({
              type: _userConstants.USER_LOGIN_REQUEST
            });
            config = {
              headers: {
                'Content-Type': 'application/json'
              }
            };
            _context.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].post('/api/users/login', {
              email: email,
              password: password
            }, config));

          case 5:
            _ref = _context.sent;
            data = _ref.data;
            dispatch({
              type: _userConstants.USER_LOGIN_SUCCESS,
              payload: data
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            dispatch({
              //the same messsage error in server 
              type: _userConstants.USER_LOGIN_FAIL,
              payload: _context.t0.response && _context.t0.response.data.message ? _context.t0.response.data.message : _context.t0.message
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 11]]);
  };
};

exports.login = login;

var register = function register(name, email, password) {
  return function _callee2(dispatch) {
    var config, _ref2, data;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            dispatch({
              type: _userConstants.USER_REGISTER_REQUEST
            });
            config = {
              headers: {
                'Content-Type': 'application/json'
              }
            };
            _context2.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].post('/api/users', {
              name: name,
              email: email,
              password: password
            }, config));

          case 5:
            _ref2 = _context2.sent;
            data = _ref2.data;
            dispatch({
              type: _userConstants.USER_REGISTER_SUCCESS,
              payload: data
            });
            dispatch({
              type: _userConstants.USER_LOGIN_SUCCESS,
              payload: data
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            dispatch({
              //the same messsage error in server 
              type: _userConstants.USER_REGISTER_FAIL,
              payload: _context2.t0.response && _context2.t0.response.data.message ? _context2.t0.response.data.message : _context2.t0.message
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 12]]);
  };
};

exports.register = register;

var logout = function logout() {
  return function _callee3(dispatch) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            localStorage.removeItem('userInfo');
            dispatch({
              type: _userConstants.USER_LOGOUT
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.logout = logout;

var getUserDetails = function getUserDetails(id) {
  return function _callee4(dispatch, getState) {
    var _getState, userInfo, config, _ref3, data, message;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            dispatch({
              type: _userConstants.USER_DETAILS_REQUEST
            });
            _getState = getState(), userInfo = _getState.userLogin.userInfo;
            config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context4.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/users/".concat(id), config));

          case 6:
            _ref3 = _context4.sent;
            data = _ref3.data;
            dispatch({
              type: _userConstants.USER_DETAILS_SUCCESS,
              payload: data
            });
            _context4.next = 15;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            message = _context4.t0.response && _context4.t0.response.data.message ? _context4.t0.response.data.message : _context4.t0.message;
            dispatch({
              type: _userConstants.USER_DETAILS_FAIL,
              payload: message
            });

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 11]]);
  };
};

exports.getUserDetails = getUserDetails;

var updateUserProfile = function updateUserProfile(user) {
  return function _callee5(dispatch, getState) {
    var _getState2, userInfo, config, _ref4, data, message;

    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            dispatch({
              type: _userConstants.USER_UPDATE_PROFILE_REQUEST
            });
            _getState2 = getState(), userInfo = _getState2.userLogin.userInfo;
            config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context5.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].put("/api/users/profile", user, config));

          case 6:
            _ref4 = _context5.sent;
            data = _ref4.data;
            dispatch({
              type: _userConstants.USER_UPDATE_PROFILE_SUCCESS,
              payload: data
            });
            dispatch({
              type: _userConstants.USER_LOGIN_SUCCESS,
              payload: data
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            /*
             
              dispatch({
                type : USER_LOGIN_SUCCESS ,
                payload : data
            })
                  localStorage.setItem('userInfo' ,JSON.stringify(data))
            
            
            
            
            */

            _context5.next = 18;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](0);
            message = _context5.t0.response && _context5.t0.response.data.message ? _context5.t0.response.data.message : _context5.t0.message;

            if (message === 'Not authorized, token failed') {
              dispatch(logout());
            }

            dispatch({
              type: _userConstants.USER_UPDATE_PROFILE_FAIL,
              payload: message
            });

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 13]]);
  };
};

exports.updateUserProfile = updateUserProfile;