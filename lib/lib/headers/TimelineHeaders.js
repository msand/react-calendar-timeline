"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _HeadersContext = require("./HeadersContext");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SidebarHeader = _interopRequireDefault(require("./SidebarHeader"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TimelineHeaders =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimelineHeaders, _React$Component);

  function TimelineHeaders() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TimelineHeaders);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TimelineHeaders)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getRootStyle", function () {
      return _objectSpread({}, _this.props.style, {
        display: 'flex',
        width: '300%'
      }, _this.props.sticky ? {
        position: 'sticky',
        zIndex: 101,
        top: 0
      } : null);
    });

    _defineProperty(_assertThisInitialized(_this), "handleRootRef", function (element) {
      if (_this.props.headerRef) {
        _this.props.headerRef(element);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isSidebarHeader", function (child) {
      if (child.type === undefined) return false;
      return child.type.secretKey === _SidebarHeader["default"].secretKey;
    });

    return _this;
  }

  _createClass(TimelineHeaders, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var rightSidebarHeader;
      var leftSidebarHeader;
      var calendarHeaders = [];
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          registerScroll = _this$props.registerScroll,
          rightSidebarWidth = _this$props.rightSidebarWidth,
          calendarHeaderStyle = _this$props.calendarHeaderStyle,
          calendarHeaderClassName = _this$props.calendarHeaderClassName;

      _react["default"].Children.map(Array.isArray(children) ? children.filter(function (c) {
        return c;
      }) : [children], function (child) {
        if (_this2.isSidebarHeader(child)) {
          if (child.props.variant === _constants.RIGHT_VARIANT) {
            rightSidebarHeader = child;
          } else {
            leftSidebarHeader = child;
          }
        } else {
          calendarHeaders.push(child);
        }
      });

      if (!leftSidebarHeader) {
        leftSidebarHeader = _react["default"].createElement(_SidebarHeader["default"], null);
      }

      if (!rightSidebarHeader && rightSidebarWidth) {
        rightSidebarHeader = _react["default"].createElement(_SidebarHeader["default"], {
          variant: "right"
        });
      }

      return _react["default"].createElement("div", {
        ref: this.handleRootRef,
        style: this.getRootStyle(),
        className: (0, _classnames["default"])('rct-header-root', className)
      }, leftSidebarHeader, _react["default"].createElement("div", {
        ref: registerScroll,
        style: _objectSpread({}, calendarHeaderStyle, {
          position: 'relative'
        }),
        className: (0, _classnames["default"])('rct-calendar-header', calendarHeaderClassName)
      }, calendarHeaders), rightSidebarHeader);
    }
  }]);

  return TimelineHeaders;
}(_react["default"].Component);

_defineProperty(TimelineHeaders, "propTypes", {
  registerScroll: _propTypes["default"].func.isRequired,
  leftSidebarWidth: _propTypes["default"].number.isRequired,
  rightSidebarWidth: _propTypes["default"].number.isRequired,
  style: _propTypes["default"].object,
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  calendarHeaderStyle: _propTypes["default"].object,
  calendarHeaderClassName: _propTypes["default"].string,
  headerRef: _propTypes["default"].func,
  sticky: _propTypes["default"].bool
});

var TimelineHeadersWrapper = function TimelineHeadersWrapper(_ref) {
  var children = _ref.children,
      style = _ref.style,
      className = _ref.className,
      calendarHeaderStyle = _ref.calendarHeaderStyle,
      calendarHeaderClassName = _ref.calendarHeaderClassName,
      sticky = _ref.sticky;
  return _react["default"].createElement(_HeadersContext.TimelineHeadersConsumer, null, function (_ref2) {
    var leftSidebarWidth = _ref2.leftSidebarWidth,
        rightSidebarWidth = _ref2.rightSidebarWidth,
        registerScroll = _ref2.registerScroll;
    return _react["default"].createElement(TimelineHeaders, {
      leftSidebarWidth: leftSidebarWidth,
      rightSidebarWidth: rightSidebarWidth,
      registerScroll: registerScroll,
      style: style,
      sticky: sticky,
      className: className,
      calendarHeaderStyle: calendarHeaderStyle,
      calendarHeaderClassName: calendarHeaderClassName
    }, children);
  });
};

TimelineHeadersWrapper.propTypes = {
  sticky: _propTypes["default"].bool,
  style: _propTypes["default"].object,
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  calendarHeaderStyle: _propTypes["default"].object,
  calendarHeaderClassName: _propTypes["default"].string
};
TimelineHeadersWrapper.secretKey = 'TimelineHeaders';
var _default = TimelineHeadersWrapper;
exports["default"] = _default;