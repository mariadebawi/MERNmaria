"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _colors = _interopRequireDefault(require("colors"));

var _db = _interopRequireDefault(require("./config/db.js"));

var _productRoutes = _interopRequireDefault(require("./routes/productRoutes.js"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes.js"));

var _orderRoutes = _interopRequireDefault(require("./routes/orderRoutes.js"));

var _Errorsmiddleware = require("./middleware/Errorsmiddleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import  products from './data/products.js'
_dotenv["default"].config();

(0, _db["default"])();
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.get('/', function (req, res) {
  res.send('API running');
});
app.use('/api/products', _productRoutes["default"]);
app.use('/api/users', _userRoutes["default"]);
app.use('/api/orders', _orderRoutes["default"]);
app.use(_Errorsmiddleware.NotFound);
app.use(_Errorsmiddleware.ErrorHandler);
var PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("run server in port ".concat(PORT).yellow.bold));