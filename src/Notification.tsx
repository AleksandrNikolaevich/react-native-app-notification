import * as React from 'react';
import {
    StyleSheet,
    Animated,
    Easing,
    View,
    Platform,
    PanResponder,
    Text,
    Dimensions,
    ViewStyle
} from 'react-native';
//import { ifIphoneX } from 'react-native-iphone-x-helper'
import { AlertTypes } from './AlertTypes';
import { useDefaultProps } from './utils';
import { NotifyParams } from './types';

export type NotificationColors = {
    info?: string,
    success?: string,
    error?: string,
    warn?: string
}

export type NotificationProps = {
    colors?: NotificationColors,
    containerStyle?: ViewStyle
}



type State = {
    top: Animated.Value,
    params: NotifyParams,
    grant?: boolean
}

const IPHONE_X_HEIGHT = [812, 896];

const deviceHeight = Dimensions.get("window").height;

const paddingTop = Platform.select({ ios: ~IPHONE_X_HEIGHT.indexOf(deviceHeight) ? 40 : 20, android: 0 });

const maxHeight = deviceHeight / 2;
const minHeight = 60;

const initState: NotifyParams = {
    timeout: 3000,
    message: '',
    type: AlertTypes.info,
    onPress: () => { }
}

const { useState, useEffect, useRef, useImperativeHandle } = React;

let timer: any;
let layoutPanResponder: any;
let offsetMoveY: number = 0;
let prevGestureState: any;
let onPress: any;

const Notification: React.FC<NotificationProps> = (props, ref) => {

    const { colors, containerStyle } = useDefaultProps(props, {
        colors: {
            info: '#4671ff',
            success: '#0cd8ab',
            error: '#ff426b',
            warn: 'rgb(255, 193, 7)'
        }
    });
    

    const [timeout, setShowTimeout] = useState(initState.timeout);
    const [message, setMessage] = useState(initState.message);
    const [type, setType] = useState(initState.type);
    const [grant, setGrant] = useState(false);
    const [top, setTop] = useState(new Animated.Value(-maxHeight));

    layoutPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gesture) => {
            if (gesture.dy < 0 && Math.abs(gesture.dy) > 3) {
                offsetMoveY = gesture.dy;
                swiping(gesture.dy);
            } else {
                offsetMoveY = 0
            }

        },
        onPanResponderRelease: (e, gesture) => {
            setGrant(false)
            if (Math.abs(offsetMoveY) > 10) {
                hide(20);
            } else {
                swiping(0);
                if (Math.abs(offsetMoveY) < 3) {
                    timer = setTimeout(() => { hide() }, 100);
                    onPress && onPress();
                }

            }
            offsetMoveY = 0;
        },
        onPanResponderGrant: (e, gesture) => {
            setGrant(true)
            clearTimeout(timer);
            prevGestureState = {
                ...gesture,
                moveX: gesture.x0,
                moveY: gesture.y0,
            };
        }
    });

    useEffect(
        () => {
            return () => {
                clearTimeout(timer)
            }
        },
        [] //useEffect will run only one time
        //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
    )


    const swiping = (newPos: number) => {
        Animated.timing(top, {
            duration: 0,
            delay: 0,
            toValue: newPos,
        }).start();
    }

    const hide = (speed = 300) => {
        Animated.timing(top, {
            toValue: -maxHeight,
            duration: speed,
        }).start(() => {
            setShowTimeout(initState.timeout);
            setMessage(initState.message);
            setType(initState.type);
        });
    }

    const show = (params: NotifyParams) => {
        onPress = params.onPress;
        clearTimeout(timer);
        top.setValue(-maxHeight);
        setShowTimeout(params.timeout || initState.timeout);
        setMessage(params.message || initState.message);
        setType(params.type || initState.type);

        Animated.timing(top, {
            toValue: 0,
            duration: 400,
            easing: Easing.sin,
        }).start(() => {
            timer = setTimeout(() => { hide() }, timeout);
        });

    }

    useImperativeHandle(ref, () => ({
        show: (params: NotifyParams) => {
          show(params);
        }
      }));

    const getColor = () => {
        return colors![type!];
    }

    return (
        <Animated.View
            style={[
                style.container,
                {
                    maxHeight,
                    minHeight,
                    backgroundColor: getColor(),
                    top: top,
                    opacity: top.interpolate({
                        inputRange: [-150, 0],
                        outputRange: [0, 1]
                    })
                },
                grant && { opacity: .9 },
                containerStyle
            ]}
            {...layoutPanResponder.panHandlers}
        >
            <View
                style={style.content}
            >
                <Text
                    style={[
                        style.text
                    ]}
                >{message}</Text>
            </View>
            <View style={style.swipeButton}></View>
        </Animated.View>
    );

}


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

const style = StyleSheet.create({
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


export default React.forwardRef(Notification) ;
