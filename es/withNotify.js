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
import * as React from "react";
import { NotifyContext } from "./context";
import hoistNonReactStatics from "hoist-non-react-statics";
var withNotify = function (WrappedComponent) {
    var Wrapper = /** @class */ (function (_super) {
        __extends(Wrapper, _super);
        function Wrapper() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Wrapper.prototype.render = function () {
            var _this = this;
            return (React.createElement(NotifyContext.Consumer, null, function (showNotify) { return (React.createElement(WrappedComponent, __assign({}, _this.props, { notify: showNotify }))); }));
        };
        return Wrapper;
    }(React.PureComponent));
    return hoistNonReactStatics(Wrapper, WrappedComponent);
};
export default withNotify;
