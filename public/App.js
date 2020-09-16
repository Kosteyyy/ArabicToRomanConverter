"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function digitToRoman(base, digit) {
  var thousands = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  //convert digit to roman 
  //base is array [1,5,10] in roman accoding to the category of number
  var romanStr = '';
  var overline = '';

  if (thousands) {
    overline = "\u0305";
  } //Rules


  if (digit > 0 && digit < 4) {
    for (var i = 1; i <= digit; i++) {
      romanStr += base[0] + overline;
    }
  } else if (digit == 4) {
    romanStr = base[0] + overline + base[1] + overline;
  } else if (digit >= 5 && digit < 9) {
    romanStr = base[1] + overline;

    for (var _i = 6; _i <= digit; _i++) {
      romanStr += base[0] + overline;
    }
  } else if (digit == 9) {
    romanStr = base[0] + overline + base[2] + overline;
  }

  return romanStr;
}

function convertToRoman(num) {
  //this works correctly up to 3999. Greater numbers require underlined symbols.
  //bases 1,5,10 for categories
  var BASES = {
    units: ['I', 'V', 'X'],
    tens: ['X', 'L', 'C'],
    hundreds: ['C', 'D', 'M'],
    thousands: ['M', 'A', 'K']
  }; //finding categories

  var roman = '';

  if (num > 3999999) {
    roman = "Can't calculate greater than 3999999";
  } else if (num < 4000) {
    roman = digitToRoman(BASES.thousands, Math.floor(num % 10000 / 1000)) + digitToRoman(BASES.hundreds, Math.floor(num % 1000 / 100)) + digitToRoman(BASES.tens, Math.floor(num % 100 / 10)) + digitToRoman(BASES.units, num % 10);
  } else {
    var thousands = Math.floor(num / 1000); //thousands are overlined

    roman = digitToRoman(BASES.thousands, Math.floor(thousands % 10000 / 1000), true) + digitToRoman(BASES.hundreds, Math.floor(thousands % 1000 / 100), true) + digitToRoman(BASES.tens, Math.floor(thousands % 100 / 10), true) + digitToRoman(BASES.units, thousands % 10, true);
    roman += digitToRoman(BASES.hundreds, Math.floor(num % 1000 / 100)) + digitToRoman(BASES.tens, Math.floor(num % 100 / 10)) + digitToRoman(BASES.units, num % 10);
  }

  return roman;
}

var ConverterToRoman = /*#__PURE__*/function (_React$Component) {
  _inherits(ConverterToRoman, _React$Component);

  var _super = _createSuper(ConverterToRoman);

  function ConverterToRoman() {
    var _this;

    _classCallCheck(this, ConverterToRoman);

    _this = _super.call(this);
    _this.state = {
      romanNumber: "RomanNumber",
      arabicNumber: 0
    };
    _this.numberValue = _this.numberValue.bind(_assertThisInitialized(_this));
    _this.setNewNumber = _this.setNewNumber.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ConverterToRoman, [{
    key: "numberValue",
    value: function numberValue(e) {
      this.setState({
        arabicNumber: e.target.value
      });
      console.log("number changed to: " + this.state.arabicNumber);
    }
  }, {
    key: "setNewNumber",
    value: function setNewNumber(e) {
      console.log("SetNumber to: " + this.state.arabicNumber);
      var romanStr;

      if (this.state.arabicNumber.match(/\D/)) {
        romanStr = "Only digits allowed";
      } else {
        romanStr = convertToRoman(this.state.arabicNumber);
      }

      this.setState({
        romanNumber: romanStr
      });
      this._input.value = ""; // 3 Назначаем input value, поскольку мы назначили this._input ссылаться на input

      this._input.focus(); // 4 Фокус на инпут        


      e.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "ArabicConverter"
      }, /*#__PURE__*/React.createElement("h1", null, "Convert Arabic to Roman number"), /*#__PURE__*/React.createElement("h2", null, this.state.romanNumber), /*#__PURE__*/React.createElement("form", {
        onSubmit: this.setNewNumber
      }, /*#__PURE__*/React.createElement("input", {
        ref: function ref(el) {
          return _this2._input = el;
        },
        onChange: this.numberValue,
        type: "text",
        placeholder: "Enter a number"
      }), /*#__PURE__*/React.createElement("button", {
        type: "submit"
      }, "Convert")));
    }
  }]);

  return ConverterToRoman;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(ConverterToRoman, null), document.getElementById('content'));