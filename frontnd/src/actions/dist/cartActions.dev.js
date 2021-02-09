"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.savePaymentMethod = exports.saveShippingAddress = exports.removeFromCart = exports.addToCart = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _cartConstants = require("../constantes/cartConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addToCart = function addToCart(id, qty) {
  return function _callee(dispatch, getState) {
    var _ref, data;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/products/".concat(id)));

          case 2:
            _ref = _context.sent;
            data = _ref.data;
            dispatch({
              type: _cartConstants.CART_ADD_ITEM,
              payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty: qty
              }
            }); //storage with getState

            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.addToCart = addToCart;

var removeFromCart = function removeFromCart(id) {
  return function _callee2(dispatch, getState) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch({
              type: _cartConstants.CART_REMOVE_ITEM,
              payload: id
            }); //storage with getState

            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.removeFromCart = removeFromCart;

var saveShippingAddress = function saveShippingAddress(data) {
  return function _callee3(dispatch) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            dispatch({
              type: _cartConstants.CART_SAVE_SHIPPING_ADDRESS,
              payload: data
            });
            localStorage.setItem('shippingAddress', JSON.stringify(data));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.saveShippingAddress = saveShippingAddress;

var savePaymentMethod = function savePaymentMethod(data) {
  return function _callee4(dispatch) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            dispatch({
              type: _cartConstants.CART_SAVE_PAYMENT_METHOD,
              payload: data
            });
            localStorage.setItem('paymentMethod', JSON.stringify(data));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
};

exports.savePaymentMethod = savePaymentMethod;