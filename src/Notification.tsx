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

export type NotifyParams = {
    timeout?: number,
    message: string,
    type?: "success" | "error" | "warn" | "info",
    onPress?: () => void,

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
const minHeight = 60
class Notification extends React.PureComponent<NotificationProps, State> {

    public static defaultProps: Partial<NotificationProps> = {
        colors: {
            info: '#4671ff',
            success: '#0cd8ab',
            error: '#ff426b',
            warn: 'rgb(255, 193, 7)'
        }
    };

    /* public static PropTypes: Partial<Props> = {
        colors: PropTypes.shape({
            info: PropTypes.string,
            success: PropTypes.string,
            warn: PropTypes.string,
            error: PropTypes.string
        })
    }; */

    initState: NotifyParams = {
        timeout: 3000,
        message: '',
        type: AlertTypes.info,
        onPress: () => { }
    }

    timer: any;
    layoutPanResponder: any;
    offsetMoveY: number = 0;
    prevGestureState: any;

    constructor(props: NotificationProps) {
        super(props);
        this.state = {
            top: new Animated.Value(-maxHeight),
            params: this.initState
        };
    }

    componentWillMount() {
        this.layoutPanResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gesture) => {
                if (gesture.dy < 0 && Math.abs(gesture.dy) > 3) {
                    this.offsetMoveY = gesture.dy;
                    this._swiping(gesture.dy);
                } else {
                    this.offsetMoveY = 0
                }

            },
            onPanResponderRelease: (e, gesture) => {
                this.setState({ grant: false })
                if (Math.abs(this.offsetMoveY) > 10) {
                    this.hide(20);
                } else {
                    this._swiping(0);
                    if (Math.abs(this.offsetMoveY) < 3) {
                        this.timer = setTimeout(() => { this.hide() }, 100);
                        this.state.params.onPress && this.state.params.onPress();
                    }

                }
                this.offsetMoveY = 0;
            },
            onPanResponderGrant: (e, gesture) => {
                this.setState({ grant: true })
                clearTimeout(this.timer);
                this.prevGestureState = {
                    ...gesture,
                    moveX: gesture.x0,
                    moveY: gesture.y0,
                };
            }
        });
    }

    _swiping(newPos: number) {
        Animated.timing(this.state.top, {
            duration: 0,
            delay: 0,
            toValue: newPos,
        }).start();
    }

    hide(speed = 300) {
        Animated.timing(this.state.top, {
            toValue: -maxHeight,
            duration: speed,
        }).start(() => {
            this.setState({ params: this.initState })
        });
    }

    show(params: NotifyParams) {

        clearTimeout(this.timer);
        this.state.top.setValue(-maxHeight);
        this.setState({ params: { ...this.initState, ...params } }, () => {
            Animated.timing(this.state.top, {
                toValue: 0,
                duration: 400,
                easing: Easing.sin,
            }).start(() => {
                this.timer = setTimeout(() => { this.hide() }, this.state.params.timeout);
            });
        });

    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    getColor() {
        return this.props.colors![this.state.params.type!];
    }

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

    render() {
        const { grant } = this.state;
        const { containerStyle } = this.props;
        return (
            <Animated.View
                style={[
                    style.container,
                    {
                        maxHeight,
                        minHeight,
                        backgroundColor: this.getColor(),
                        top: this.state.top,
                        opacity: this.state.top.interpolate({
                            inputRange: [-150, 0],
                            outputRange: [0, 1]
                        })
                    },
                    grant && { opacity: .9 },
                    containerStyle
                ]}
                {...this.layoutPanResponder.panHandlers}
            >
                <View
                    style={style.content}
                >
                    <Text
                        style={[
                            style.text
                        ]}
                    >{this.state.params.message}</Text>
                </View>
                <View style={style.swipeButton}></View>
            </Animated.View>
        );
    }
}

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


export default Notification;
