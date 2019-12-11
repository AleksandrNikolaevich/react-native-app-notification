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
define(["require", "exports", "react", "./context", "hoist-non-react-statics"], function (require, exports, React, context_1, hoist_non_react_statics_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    hoist_non_react_statics_1 = __importDefault(hoist_non_react_statics_1);
    var withNotify = function (WrappedComponent) {
        var Wrapper = /** @class */ (function (_super) {
            __extends(Wrapper, _super);
            function Wrapper() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Wrapper.prototype.render = function () {
                var _this = this;
                return (React.createElement(context_1.NotifyContext.Consumer, null, function (showNotify) { return (React.createElement(WrappedComponent, __assign({}, _this.props, { notify: showNotify }))); }));
            };
            return Wrapper;
        }(React.PureComponent));
        return hoist_non_react_statics_1.default(Wrapper, WrappedComponent);
    };
    exports.default = withNotify;
});
