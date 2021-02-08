"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxDevtoolsExtension = require("redux-devtools-extension");

var _productReducer = require("./reducers/productReducer");

var _cartReducer = require("./reducers/cartReducer");

var _userReducer = require("./reducers/userReducer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reducer = (0, _redux.combineReducers)({
  productList: _productReducer.productListReducer,
  productDetails: _productReducer.productDetailsReducer,
  cart: _cartReducer.cartReducer,
  userLogin: _userReducer.userLoginReducer,
  userRegister: _userReducer.userRegisterReducer,
  userDetails: _userReducer.userDetailsReducer,
  userUpdateProfile: _userReducer.userUpdateProfileReducer
});
var cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
var userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
var initialState = {
  cart: {
    cartItems: cartItemFromStorage
  },
  userLogin: {
    userInfo: userInfoFromStorage
  }
};
var middleware = [_reduxThunk["default"]];
var store = (0, _redux.createStore)(reducer, initialState, (0, _reduxDevtoolsExtension.composeWithDevTools)(_redux.applyMiddleware.apply(void 0, middleware)));
var _default = store;
exports["default"] = _default;