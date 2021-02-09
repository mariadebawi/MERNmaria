"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cartReducer = void 0;

var _cartConstants = require("../constantes/cartConstants");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cartReducer = function cartReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    cartItems: [],
    shippingAddress: {}
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _cartConstants.CART_ADD_ITEM:
      var item = action.payload;
      var existItem = state.cartItems.find(function (x) {
        return x.product === item.product;
      });

      if (existItem) {
        return _objectSpread({}, state, {
          cartItems: state.cartItems.map(function (x) {
            return x.product === existItem.product ? item : x;
          })
        });
      } else {
        return _objectSpread({}, state, {
          cartItems: [].concat(_toConsumableArray(state.cartItems), [item])
        });
      }

    case _cartConstants.CART_REMOVE_ITEM:
      {
        return _objectSpread({}, state, {
          cartItems: state.cartItems.filter(function (x) {
            return x.product !== action.payload;
          })
        });
      }

    case _cartConstants.CART_SAVE_SHIPPING_ADDRESS:
      {
        return _objectSpread({}, state, {
          shippingAddress: action.payload
        });
      }

    case _cartConstants.CART_SAVE_PAYMENT_METHOD:
      {
        return _objectSpread({}, state, {
          paymentMethod: action.payload
        });
      }

    default:
      return state;
  }
};

exports.cartReducer = cartReducer;