"use strict";
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
var utils_1 = require("./utils");
var IPHONE_X_HEIGHT = [812, 896];
var deviceHeight = react_native_1.Dimensions.get("window").height;
var paddingTop = react_native_1.Platform.select({ ios: ~IPHONE_X_HEIGHT.indexOf(deviceHeight) ? 40 : 20, android: 0 });
var maxHeight = deviceHeight / 2;
var minHeight = 60;
var initState = {
    timeout: 3000,
    message: '',
    type: AlertTypes_1.AlertTypes.info,
    onPress: function () { }
};
var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef, useImperativeHandle = React.useImperativeHandle;
var timer;
var layoutPanResponder;
var offsetMoveY = 0;
var prevGestureState;
var onPress;
var Notification = function (props, ref) {
    var _a = utils_1.useDefaultProps(props, {
        colors: {
            info: '#4671ff',
            success: '#0cd8ab',
            error: '#ff426b',
            warn: 'rgb(255, 193, 7)'
        }
    }), colors = _a.colors, containerStyle = _a.containerStyle;
    var _b = useState(initState.timeout), timeout = _b[0], setShowTimeout = _b[1];
    var _c = useState(initState.message), message = _c[0], setMessage = _c[1];
    var _d = useState(initState.type), type = _d[0], setType = _d[1];
    var _e = useState(false), grant = _e[0], setGrant = _e[1];
    var _f = useState(new react_native_1.Animated.Value(-maxHeight)), top = _f[0], setTop = _f[1];
    layoutPanResponder = react_native_1.PanResponder.create({
        onStartShouldSetPanResponder: function () { return true; },
        onPanResponderMove: function (e, gesture) {
            if (gesture.dy < 0 && Math.abs(gesture.dy) > 3) {
                offsetMoveY = gesture.dy;
                swiping(gesture.dy);
            }
            else {
                offsetMoveY = 0;
            }
        },
        onPanResponderRelease: function (e, gesture) {
            setGrant(false);
            if (Math.abs(offsetMoveY) > 10) {
                hide(20);
            }
            else {
                swiping(0);
                if (Math.abs(offsetMoveY) < 3) {
                    timer = setTimeout(function () { hide(); }, 100);
                    onPress && onPress();
                }
            }
            offsetMoveY = 0;
        },
        onPanResponderGrant: function (e, gesture) {
            setGrant(true);
            clearTimeout(timer);
            prevGestureState = __assign(__assign({}, gesture), { moveX: gesture.x0, moveY: gesture.y0 });
        }
    });
    useEffect(function () {
        return function () {
            clearTimeout(timer);
        };
    }, [] //useEffect will run only one time
    //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
    );
    var swiping = function (newPos) {
        react_native_1.Animated.timing(top, {
            duration: 0,
            delay: 0,
            toValue: newPos,
        }).start();
    };
    var hide = function (speed) {
        if (speed === void 0) { speed = 300; }
        react_native_1.Animated.timing(top, {
            toValue: -maxHeight,
            duration: speed,
        }).start(function () {
            setShowTimeout(initState.timeout);
            setMessage(initState.message);
            setType(initState.type);
        });
    };
    var show = function (params) {
        onPress = params.onPress;
        clearTimeout(timer);
        top.setValue(-maxHeight);
        setShowTimeout(params.timeout || initState.timeout);
        setMessage(params.message || initState.message);
        setType(params.type || initState.type);
        react_native_1.Animated.timing(top, {
            toValue: 0,
            duration: 400,
            easing: react_native_1.Easing.sin,
        }).start(function () {
            timer = setTimeout(function () { hide(); }, timeout);
        });
    };
    useImperativeHandle(ref, function () { return ({
        show: function (params) {
            show(params);
        }
    }); });
    var getColor = function () {
        return colors[type];
    };
    return (React.createElement(react_native_1.Animated.View, __assign({ style: [
            style.container,
            {
                maxHeight: maxHeight,
                minHeight: minHeight,
                backgroundColor: getColor(),
                top: top,
                opacity: top.interpolate({
                    inputRange: [-150, 0],
                    outputRange: [0, 1]
                })
            },
            grant && { opacity: .9 },
            containerStyle
        ] }, layoutPanResponder.panHandlers),
        React.createElement(react_native_1.View, { style: style.content },
            React.createElement(react_native_1.Text, { style: [
                    style.text
                ] }, message)),
        React.createElement(react_native_1.View, { style: style.swipeButton })));
};
// class Notification extends React.PureComponent<NotificationProps, State> {
//     public static defaultProps: Partial<NotificationProps> = {
//         colors: {
//             info: '#4671ff',
//             success: '#0cd8ab',
//             error: '#ff426b',
//             warn: 'rgb(255, 193, 7)'
//         }
//     };
//     /* public static PropTypes: Partial<Props> = {
//         colors: PropTypes.shape({
//             info: PropTypes.string,
//             success: PropTypes.string,
//             warn: PropTypes.string,
//             error: PropTypes.string
//         })
//     }; */
//     initState: NotifyParams = {
//         timeout: 3000,
//         message: '',
//         type: AlertTypes.info,
//         onPress: () => { }
//     }
//     timer: any;
//     layoutPanResponder: any;
//     offsetMoveY: number = 0;
//     prevGestureState: any;
//     constructor(props: NotificationProps) {
//         super(props);
//         this.state = {
//             top: new Animated.Value(-maxHeight),
//             params: this.initState
//         };
//         this.layoutPanResponder = PanResponder.create({
//             onStartShouldSetPanResponder: () => true,
//             onPanResponderMove: (e, gesture) => {
//                 if (gesture.dy < 0 && Math.abs(gesture.dy) > 3) {
//                     this.offsetMoveY = gesture.dy;
//                     this._swiping(gesture.dy);
//                 } else {
//                     this.offsetMoveY = 0
//                 }
//             },
//             onPanResponderRelease: (e, gesture) => {
//                 this.setState({ grant: false })
//                 if (Math.abs(this.offsetMoveY) > 10) {
//                     this.hide(20);
//                 } else {
//                     this._swiping(0);
//                     if (Math.abs(this.offsetMoveY) < 3) {
//                         this.timer = setTimeout(() => { this.hide() }, 100);
//                         this.state.params.onPress && this.state.params.onPress();
//                     }
//                 }
//                 this.offsetMoveY = 0;
//             },
//             onPanResponderGrant: (e, gesture) => {
//                 this.setState({ grant: true })
//                 clearTimeout(this.timer);
//                 this.prevGestureState = {
//                     ...gesture,
//                     moveX: gesture.x0,
//                     moveY: gesture.y0,
//                 };
//             }
//         });
//     }
//     _swiping(newPos: number) {
//         Animated.timing(this.state.top, {
//             duration: 0,
//             delay: 0,
//             toValue: newPos,
//         }).start();
//     }
//     hide(speed = 300) {
//         Animated.timing(this.state.top, {
//             toValue: -maxHeight,
//             duration: speed,
//         }).start(() => {
//             this.setState({ params: this.initState })
//         });
//     }
//     show(params: NotifyParams) {
//         clearTimeout(this.timer);
//         this.state.top.setValue(-maxHeight);
//         this.setState({ params: { ...this.initState, ...params } }, () => {
//             Animated.timing(this.state.top, {
//                 toValue: 0,
//                 duration: 400,
//                 easing: Easing.sin,
//             }).start(() => {
//                 this.timer = setTimeout(() => { this.hide() }, this.state.params.timeout);
//             });
//         });
//     }
//     componentWillUnmount() {
//         clearTimeout(this.timer);
//     }
//     getColor() {
//         return this.props.colors![this.state.params.type!];
//     }
//     /* renderContent() {
//         switch (this.state.params.buttons.length) {
//             case 0:
//                 return <Text style={[
//                     style.text
//                 ]}>{this.state.params.alert}</Text>;
//                 break;
//             case 1:
//                 return <View style={{ flexDirection: 'row' }}>
//                     <Text style={[
//                         style.text, { paddingVertical: 5, flex: 1 }
//                     ]}>
//                         {this.state.params.alert}</Text>
//                     <Button
//                         {...this.state.params.buttons[0]}
//                         hideAlert={() => { clearTimeout(this._timer); this.hide() }}
//                     />
//                 </View>;
//                 break;
//             case 2:
//                 return this.state.params.buttons.map((item, i) => {
//                     return <Button key={i} {...item} hideAlert={() => { clearTimeout(this._timer); this.hide() }} />
//                 });
//                 break;
//         }
//         return null;
//     } */
//     render() {
//         const { grant } = this.state;
//         const { containerStyle } = this.props;
//         return (
//             <Animated.View
//                 style={[
//                     style.container,
//                     {
//                         maxHeight,
//                         minHeight,
//                         backgroundColor: this.getColor(),
//                         top: this.state.top,
//                         opacity: this.state.top.interpolate({
//                             inputRange: [-150, 0],
//                             outputRange: [0, 1]
//                         })
//                     },
//                     grant && { opacity: .9 },
//                     containerStyle
//                 ]}
//                 {...this.layoutPanResponder.panHandlers}
//             >
//                 <View
//                     style={style.content}
//                 >
//                     <Text
//                         style={[
//                             style.text
//                         ]}
//                     >{this.state.params.message}</Text>
//                 </View>
//                 <View style={style.swipeButton}></View>
//             </Animated.View>
//         );
//     }
// }
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
exports.default = React.forwardRef(Notification);
