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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
define(["require", "exports", "react", "react-native", "./Notification", "./context"], function (require, exports, React, react_native_1, Notification_1, context_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    Notification_1 = __importDefault(Notification_1);
    var useRef = React.useRef;
    var NotificationProvider = function (_a) {
        var children = _a.children, other = __rest(_a, ["children"]);
        var NotificationRef = useRef(null);
        var showNotify = function (params) {
            NotificationRef.current && NotificationRef.current.show(params);
        };
        return (React.createElement(context_1.NotifyContext.Provider, { value: showNotify },
            React.createElement(react_native_1.View, { style: { flex: 1 } },
                children,
                React.createElement(Notification_1.default, __assign({ ref: NotificationRef }, other)))));
    };
    exports.default = NotificationProvider;
});
