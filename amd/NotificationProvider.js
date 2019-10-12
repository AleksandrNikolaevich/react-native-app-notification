var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "react", "prop-types", "react-native", "./Notification"], function (require, exports, React, prop_types_1, react_native_1, Notification_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    prop_types_1 = __importDefault(prop_types_1);
    Notification_1 = __importDefault(Notification_1);
    var NotificationProvider = /** @class */ (function (_super) {
        __extends(NotificationProvider, _super);
        function NotificationProvider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NotificationProvider.prototype.getChildContext = function () {
            var _this = this;
            return {
                showNotify: function (params) {
                    _this.notification.show(params);
                }
            };
        };
        NotificationProvider.prototype.render = function () {
            var _this = this;
            return React.createElement(react_native_1.View, { style: { flex: 1 } },
                this.props.children,
                React.createElement(Notification_1.default, __assign({ ref: function (c) { return _this.notification = c; } }, this.props)));
        };
        NotificationProvider.childContextTypes = {
            showNotify: prop_types_1.default.func
        };
        return NotificationProvider;
    }(React.PureComponent));
    exports.default = NotificationProvider;
});
