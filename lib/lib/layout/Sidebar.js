"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _generic = require("../utility/generic");

var _interactjs = _interopRequireDefault(require("interactjs"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Sidebar =
/*#__PURE__*/
function (_Component) {
  _inherits(Sidebar, _Component);

  function Sidebar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Sidebar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Sidebar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "setResizeRef", function (element) {
      var isRightSidebar = _this.props.isRightSidebar;

      if (element) {
        _this.interact = (0, _interactjs["default"])(element).resizable({
          edges: {
            left: isRightSidebar,
            right: !isRightSidebar,
            top: false,
            bottom: false
          }
        }).on('resizestart', function (e) {
          _this.setState({
            resizing: true,
            resizeEdge: isRightSidebar ? 'left' : 'right',
            resizeStart: e.pageX,
            resizeTime: 0
          });
        }).on('resizemove', function (e) {
          if (_this.state.resizing) {
            if (_this.props.onResizeSidebar) {
              _this.props.onResizeSidebar(isRightSidebar, e.pageX);
            }
          }
        }).on('resizeend', function (e) {
          if (_this.state.resizing) {
            if (_this.props.onResizeSidebar) {
              _this.props.onResizeSidebar(isRightSidebar, e.pageX);
            }

            _this.setState({
              resizing: null,
              resizeStart: null,
              resizeEdge: null,
              resizeTime: null
            });
          }
        });
      } else if (_this.interact) {
        _this.interact.unset();
      }
    });

    return _this;
  }

  _createClass(Sidebar, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !(nextProps.keys === this.props.keys && nextProps.width === this.props.width && nextProps.height === this.props.height && (0, _generic.arraysEqual)(nextProps.groups, this.props.groups) && (0, _generic.arraysEqual)(nextProps.groupHeights, this.props.groupHeights));
    }
  }, {
    key: "renderGroupContent",
    value: function renderGroupContent(group, isRightSidebar, groupTitleKey, groupRightTitleKey) {
      if (this.props.groupRenderer) {
        return _react["default"].createElement(this.props.groupRenderer, {
          group: group,
          isRightSidebar: isRightSidebar
        });
      } else {
        return (0, _generic._get)(group, isRightSidebar ? groupRightTitleKey : groupTitleKey);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _sidebarStyle,
          _this2 = this;

      var _this$props = this.props,
          width = _this$props.width,
          groupHeights = _this$props.groupHeights,
          height = _this$props.height,
          isRightSidebar = _this$props.isRightSidebar,
          _this$props$headerHei = _this$props.headerHeight,
          headerHeight = _this$props$headerHei === void 0 ? 60 : _this$props$headerHei;
      var _this$props$keys = this.props.keys,
          groupIdKey = _this$props$keys.groupIdKey,
          groupTitleKey = _this$props$keys.groupTitleKey,
          groupRightTitleKey = _this$props$keys.groupRightTitleKey;
      var sidebarStyle = (_sidebarStyle = {
        width: "".concat(width, "px"),
        height: "".concat(height, "px"),
        top: "".concat(headerHeight, "px")
      }, _defineProperty(_sidebarStyle, isRightSidebar ? 'right' : 'left', 0), _defineProperty(_sidebarStyle, "position", 'sticky'), _defineProperty(_sidebarStyle, "zIndex", 100), _sidebarStyle);
      var groupsStyle = {
        width: "".concat(width, "px")
      };
      var groupLines = this.props.groups.map(function (group, index) {
        var elementStyle = {
          height: "".concat(groupHeights[index], "px"),
          lineHeight: "".concat(groupHeights[index], "px")
        };
        return _react["default"].createElement("div", {
          key: (0, _generic._get)(group, groupIdKey),
          className: 'rct-sidebar-row rct-sidebar-row-' + (index % 2 === 0 ? 'even' : 'odd'),
          style: elementStyle
        }, _this2.renderGroupContent(group, isRightSidebar, groupTitleKey, groupRightTitleKey));
      });
      return _react["default"].createElement("div", {
        className: 'rct-sidebar' + (isRightSidebar ? ' rct-sidebar-right' : ''),
        style: sidebarStyle
      }, _react["default"].createElement("div", {
        style: groupsStyle
      }, groupLines), _react["default"].createElement("div", {
        ref: this.setResizeRef,
        className: 'rct-sidebar-resize',
        style: isRightSidebar ? {
          left: 0
        } : {
          right: 0
        }
      }));
    }
  }]);

  return Sidebar;
}(_react.Component);

exports["default"] = Sidebar;

_defineProperty(Sidebar, "propTypes", {
  groups: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object]).isRequired,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  headerHeight: _propTypes["default"].number,
  groupHeights: _propTypes["default"].array.isRequired,
  keys: _propTypes["default"].object.isRequired,
  groupRenderer: _propTypes["default"].func,
  onResizeSidebar: _propTypes["default"].func,
  isRightSidebar: _propTypes["default"].bool
});