var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
import * as React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import Notification from "./Notification";
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
        return React.createElement(View, { style: { flex: 1 } },
            this.props.children,
            React.createElement(Notification, __assign({ ref: function (c) { return _this.notification = c; } }, this.props)));
    };
    NotificationProvider.childContextTypes = {
        showNotify: PropTypes.func
    };
    return NotificationProvider;
}(React.PureComponent));
export default NotificationProvider;
