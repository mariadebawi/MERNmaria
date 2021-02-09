"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrder = void 0;

var _orderConstants = require("../constantes/orderConstants");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createOrder = function createOrder(order) {
  return function _callee(dispatch, getState) {
    var _getState, userInfo, config, _ref, data, message;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch({
              type: _orderConstants.ORDER_CREATE_REQUEST
            });
            _getState = getState(), userInfo = _getState.userLogin.userInfo;
            config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].post("/api/orders/", order, config));

          case 6:
            _ref = _context.sent;
            data = _ref.data;
            dispatch({
              type: _orderConstants.ORDER_CREATE_SUCCESS,
              payload: data
            });
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            message = _context.t0.response && _context.t0.response.data.message ? _context.t0.response.data.message : _context.t0.message;
            dispatch({
              type: _orderConstants.ORDER_CREATE_FAIL,
              payload: message
            });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 11]]);
  };
};

exports.createOrder = createOrder;