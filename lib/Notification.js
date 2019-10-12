"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_native_1 = require("react-native");
//import { ifIphoneX } from 'react-native-iphone-x-helper'
var AlertTypes_1 = require("./AlertTypes");
var IPHONE_X_HEIGHT = [812, 896];
var deviceHeight = react_native_1.Dimensions.get("window").height;
var paddingTop = react_native_1.Platform.select({ ios: ~IPHONE_X_HEIGHT.indexOf(deviceHeight) ? 40 : 20, android: 0 });
var maxHeight = deviceHeight / 2;
var minHeight = 60;
var Notification = /** @class */ (function (_super) {
    __extends(Notification, _super);
    function Notification(props) {
        var _this = _super.call(this, props) || this;
        /* public static PropTypes: Partial<Props> = {
            colors: PropTypes.shape({
                info: PropTypes.string,
                success: PropTypes.string,
                warn: PropTypes.string,
                error: PropTypes.string
            })
        }; */
        _this.initState = {
            timeout: 3000,
            message: '',
            type: AlertTypes_1.AlertTypes.info,
            onPress: function () { }
        };
        _this.offsetMoveY = 0;
        _this.state = {
            top: new react_native_1.Animated.Value(-maxHeight),
            params: _this.initState
        };
        return _this;
    }
    Notification.prototype.componentWillMount = function () {
        var _this = this;
        this.layoutPanResponder = react_native_1.PanResponder.create({
            onStartShouldSetPanResponder: function () { return true; },
            onPanResponderMove: function (e, gesture) {
                if (gesture.dy < 0 && Math.abs(gesture.dy) > 3) {
                    _this.offsetMoveY = gesture.dy;
                    _this._swiping(gesture.dy);
                }
                else {
                    _this.offsetMoveY = 0;
                }
            },
            onPanResponderRelease: function (e, gesture) {
                _this.setState({ grant: false });
                if (Math.abs(_this.offsetMoveY) > 10) {
                    _this.hide(20);
                }
                else {
                    _this._swiping(0);
                    if (Math.abs(_this.offsetMoveY) < 3) {
                        _this.timer = setTimeout(function () { _this.hide(); }, 100);
                        _this.state.params.onPress && _this.state.params.onPress();
                    }
                }
                _this.offsetMoveY = 0;
            },
            onPanResponderGrant: function (e, gesture) {
                _this.setState({ grant: true });
                clearTimeout(_this.timer);
                _this.prevGestureState = __assign(__assign({}, gesture), { moveX: gesture.x0, moveY: gesture.y0 });
            }
        });
    };
    Notification.prototype._swiping = function (newPos) {
        react_native_1.Animated.timing(this.state.top, {
            duration: 0,
            delay: 0,
            toValue: newPos,
        }).start();
    };
    Notification.prototype.hide = function (speed) {
        var _this = this;
        if (speed === void 0) { speed = 300; }
        react_native_1.Animated.timing(this.state.top, {
            toValue: -maxHeight,
            duration: speed,
        }).start(function () {
            _this.setState({ params: _this.initState });
        });
    };
    Notification.prototype.show = function (params) {
        var _this = this;
        clearTimeout(this.timer);
        this.state.top.setValue(-maxHeight);
        this.setState({ params: __assign(__assign({}, this.initState), params) }, function () {
            react_native_1.Animated.timing(_this.state.top, {
                toValue: 0,
                duration: 400,
                easing: react_native_1.Easing.sin,
            }).start(function () {
                _this.timer = setTimeout(function () { _this.hide(); }, _this.state.params.timeout);
            });
        });
    };
    Notification.prototype.componentWillUnmount = function () {
        clearTimeout(this.timer);
    };
    Notification.prototype.getColor = function () {
        return this.props.colors[this.state.params.type];
    };
    /* renderContent() {
        switch (this.state.params.buttons.length) {
            case 0:
                return <Text style={[
                    style.text
                ]}>{this.state.params.alert}</Text>;
                break;
            case 1:
                return <View style={{ flexDirection: 'row' }}>
                    <Text style={[
                        style.text, { paddingVertical: 5, flex: 1 }
                    ]}>
                        {this.state.params.alert}</Text>
                    <Button
                        {...this.state.params.buttons[0]}
                        hideAlert={() => { clearTimeout(this._timer); this.hide() }}
                    />
                </View>;
                break;
            case 2:
                return this.state.params.buttons.map((item, i) => {
                    return <Button key={i} {...item} hideAlert={() => { clearTimeout(this._timer); this.hide() }} />
                });
                break;

        }
        return null;

    } */
    Notification.prototype.render = function () {
        var grant = this.state.grant;
        var containerStyle = this.props.containerStyle;
        return (React.createElement(react_native_1.Animated.View, __assign({ style: [
                style.container,
                {
                    maxHeight: maxHeight,
                    minHeight: minHeight,
                    backgroundColor: this.getColor(),
                    top: this.state.top,
                    opacity: this.state.top.interpolate({
                        inputRange: [-150, 0],
                        outputRange: [0, 1]
                    })
                },
                grant && { opacity: .9 },
                containerStyle
            ] }, this.layoutPanResponder.panHandlers),
            React.createElement(react_native_1.View, { style: style.content },
                React.createElement(react_native_1.Text, { style: [
                        style.text
                    ] }, this.state.params.message)),
            React.createElement(react_native_1.View, { style: style.swipeButton })));
    };
    Notification.defaultProps = {
        colors: {
            info: '#4671ff',
            success: '#0cd8ab',
            error: '#ff426b',
            warn: 'rgb(255, 193, 7)'
        }
    };
    return Notification;
}(React.PureComponent));
var style = react_native_1.StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        flex: 1,
        //height: height + paddingTop,
        paddingTop: paddingTop,
        backgroundColor: 'rgb(255, 193, 7)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },
        elevation: 2,
    },
    content: {
        flex: 1,
        justifyContent: 'center'
        //flexDirection: 'row',
        /*  paddingHorizontal: 12,
         paddingVertical: 12 */
    },
    text: {
        fontSize: 16,
        color: '#fff',
        backgroundColor: 'transparent',
        textAlign: 'center',
        padding: 0,
        margin: 6
    },
    swipeButton: {
        width: 30,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, .5)',
        marginVertical: 4,
        alignSelf: 'center'
    }
});
exports.default = Notification;
