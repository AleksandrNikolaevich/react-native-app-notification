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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "react", "prop-types"], function (require, exports, react_1, prop_types_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    react_1 = __importDefault(react_1);
    prop_types_1 = __importDefault(prop_types_1);
    var withNotify = function (WrappedComponent) {
        var Wrapper = /** @class */ (function (_super) {
            __extends(Wrapper, _super);
            function Wrapper() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Wrapper.prototype.render = function () {
                return (react_1.default.createElement(WrappedComponent, __assign({}, this.props, { notify: this.context.showNotify })));
            };
            Wrapper.contextTypes = {
                showNotify: prop_types_1.default.func
            };
            return Wrapper;
        }(react_1.default.PureComponent));
        Object.keys(WrappedComponent).forEach(function (key) {
            // @ts-ignore
            Wrapper[key] = WrappedComponent[key];
        });
        return Wrapper;
    };
    exports.default = withNotify;
});
