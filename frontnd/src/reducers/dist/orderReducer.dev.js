"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderCreateReducer = void 0;

var _orderConstants = require("../constantes/orderConstants");

var orderCreateReducer = function orderCreateReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _orderConstants.ORDER_CREATE_REQUEST:
      return {
        loading: true
      };

    case _orderConstants.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload
      };

    case _orderConstants.ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

exports.orderCreateReducer = orderCreateReducer;