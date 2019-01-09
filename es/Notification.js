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
import * as React from 'react';
import { StyleSheet, Animated, Easing, View, Platform, PanResponder, Text, Dimensions } from 'react-native';
//import { ifIphoneX } from 'react-native-iphone-x-helper'
import { AlertTypes } from './AlertTypes';
//default height notify panel
var height = 60;
var IPHONE_X_HEIGHT = [812, 896];
var deviceHeight = Dimensions.get("window").height;
var paddingTop = Platform.select({ ios: ~IPHONE_X_HEIGHT.indexOf(deviceHeight) ? 40 : 20, android: 0 });
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
            type: AlertTypes.info,
            onPress: function () { }
        };
        _this.offsetMoveY = 0;
        _this.state = {
            top: new Animated.Value(-(height + paddingTop)),
            params: _this.initState
        };
        return _this;
    }
    Notification.prototype.componentWillMount = function () {
        var _this = this;
        this.layoutPanResponder = PanResponder.create({
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
                _this.prevGestureState = __assign({}, gesture, { moveX: gesture.x0, moveY: gesture.y0 });
            }
        });
    };
    Notification.prototype._swiping = function (newPos) {
        Animated.timing(this.state.top, {
            duration: 0,
            delay: 0,
            toValue: newPos,
        }).start();
    };
    Notification.prototype.hide = function (speed) {
        var _this = this;
        if (speed === void 0) { speed = 200; }
        Animated.timing(this.state.top, {
            toValue: -(height + paddingTop),
            duration: speed,
        }).start(function () {
            _this.setState({ params: _this.initState });
        });
    };
    Notification.prototype.show = function (params) {
        var _this = this;
        clearTimeout(this.timer);
        this.state.top.setValue(-(height + paddingTop));
        this.setState({ params: __assign({}, this.initState, params) }, function () {
            Animated.timing(_this.state.top, {
                toValue: 0,
                duration: 300,
                easing: Easing.bounce,
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
        return (React.createElement(Animated.View, __assign({ style: [
                style.container,
                {
                    backgroundColor: this.getColor(),
                    top: this.state.top
                },
                grant && { opacity: .9 }
            ] }, this.layoutPanResponder.panHandlers),
            React.createElement(View, { style: style.content },
                React.createElement(View, { style: { flex: 1 } },
                    React.createElement(Text, { style: [
                            style.text
                        ] }, this.state.params.message))),
            React.createElement(View, { style: style.swipeButton })));
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
var style = StyleSheet.create({
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
export default Notification;
