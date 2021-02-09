"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addOrderItems = void 0;

var _orderModel = _interopRequireDefault(require("../models/orderModel.js"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @desc Create new order
// @route Post /api/orders
// @access  private
var addOrderItems = (0, _expressAsyncHandler["default"])(function _callee(req, res) {
  var _req$body, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, order, createOrder;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, orderItems = _req$body.orderItems, shippingAddress = _req$body.shippingAddress, paymentMethod = _req$body.paymentMethod, itemsPrice = _req$body.itemsPrice, taxPrice = _req$body.taxPrice, shippingPrice = _req$body.shippingPrice, totalPrice = _req$body.totalPrice;

          if (!(orderItems && orderItems.length === 0)) {
            _context.next = 6;
            break;
          }

          res.status(400);
          throw new Error('No order items');

        case 6:
          order = new _orderModel["default"]({
            user: req.user._id,
            orderItems: orderItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            itemsPrice: itemsPrice,
            taxPrice: taxPrice,
            shippingPrice: shippingPrice,
            totalPrice: totalPrice
          });
          _context.next = 9;
          return regeneratorRuntime.awrap(order.save());

        case 9:
          createOrder = _context.sent;
          res.status(201).json(createOrder);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.addOrderItems = addOrderItems;