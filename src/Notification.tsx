import * as React from 'react';
import {
    StyleSheet,
    Animated,
    Easing,
    View,
    Platform,
    PanResponder,
    Text,
    TextInput,
    PanResponderStatic,
    PanResponderInstance,
} from 'react-native';
//import { ifIphoneX } from 'react-native-iphone-x-helper'
import { AlertTypes } from './AlertTypes';
import PropTypes from "prop-types";
/* const Button = React.createClass({
    propTypes: {
        icon: React.PropTypes.func,
        action: React.PropTypes.func,
        iconStyle: React.PropTypes.object,
        buttonStyle: React.PropTypes.object,
        positionIcon: React.PropTypes.oneOf(['left', 'right']),
        caption: React.PropTypes.string,
        hideAlert: React.PropTypes.func,
    },

    getDefaultProps: function() {
        return {
            icon: ()=>{return null;},
            action: ()=>{},
            iconStyle: {
                width: 25,
                height: 25,
            },
            buttonStyle: {

            },
            positionIcon: 'left'
        };
    },
    renderCaption: function () {
        if(this.props.caption){
            return <Text style={[style.text]}>{this.props.caption}</Text>
        }
         return null;
    },
    renderIcon:function (position) {
        if(this.props.icon() && this.props.positionIcon === position){
            return  <Image
                style={[this.props.iconStyle]}
                resizeMode={'stretch'}
                source={this.props.icon()}
            />
        }
        return null;
    },
    render:function () {
        return <TouchableOpacity
            style = {[{
                paddingHorizontal: 10,
                marginHorizontal: 10,
                flexDirection: 'row',
                backgroundColor: 'rgb(198, 19, 48)',
                alignItems:'center',
                alignSelf:'center'
            }, this.props.buttonStyle]}
            onPress={() => {
                if(this.props.hideAlert)
                    this.props.hideAlert();
                this.props.action();
            }}
            underlayColor={"transparent"}
        >
            {this.renderIcon('left')}
            {this.renderCaption()}
            {this.renderIcon('right')}


        </TouchableOpacity>;
    }
}); */

export type NotificationColors = {
    info?: string,
    success?: string,
    error?: string,
    warn?: string
}

type Props = {
    colors?: NotificationColors
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

//default height notify panel
const height = 60;
//TODO: add padding for iPhone X
const paddingTop = Platform.select({ ios: 20, android: 0 });


class Notification extends React.PureComponent<Props, State> {

    public static defaultProps: Partial<Props> = {
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

    timer:any;
    layoutPanResponder: any;
    offsetMoveY: number = 0;
    prevGestureState: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            top: new Animated.Value(-(height + paddingTop)),
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
                this.setState({grant: false})
                if (Math.abs(this.offsetMoveY) > 10) {
                    this.hide(20);
                } else {
                    this._swiping(0);
                    if (Math.abs(this.offsetMoveY) < 3) {
                        this.timer = setTimeout(()=>{this.hide()}, 100);
                        this.state.params.onPress && this.state.params.onPress();
                    }

                }
                this.offsetMoveY = 0;
            },
            onPanResponderGrant: (e, gesture) => {
                this.setState({grant: true})
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

    hide(speed = 200) {
        Animated.timing(this.state.top, {
            toValue: -(height + paddingTop),
            duration: speed,
        }).start(() => {
            this.setState({ params: this.initState })
        });
    }

    show(params: NotifyParams) {

        clearTimeout(this.timer);
        this.state.top.setValue(-(height + paddingTop));
        this.setState({ params: { ...this.initState, ...params } }, () => {
            Animated.timing(this.state.top, {
                toValue: 0,
                duration: 300,
                easing: Easing.bounce,
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
        const {grant} = this.state;
        return (
            <Animated.View
                style={[
                    style.container,
                    {
                        backgroundColor: this.getColor(),
                        top: this.state.top
                    },
                    grant && {opacity: .9}
                ]}
                {...this.layoutPanResponder.panHandlers}
            >
                <View
                    style={style.content}
                >
                    {/* <TextInput style={[
                        style.text
                    ]}
                    multiline
                    editable={false}
                    value={this.state.params.message}
                    underlineColorAndroid={'transparent'}
                    /> */}
                    <View style={{flex:1}}>
                        <Text
                            style={[
                                style.text
                            ]}
                        >{this.state.params.message}</Text>
                    </View>

                    {/* this.renderContent() */}
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
