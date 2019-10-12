import * as React from 'react';
import { Animated, ViewStyle } from 'react-native';
export declare type NotificationColors = {
    info?: string;
    success?: string;
    error?: string;
    warn?: string;
};
export declare type NotificationProps = {
    colors?: NotificationColors;
    containerStyle?: ViewStyle;
};
export declare type NotifyParams = {
    timeout?: number;
    message: string;
    type?: "success" | "error" | "warn" | "info";
    onPress?: () => void;
};
declare type State = {
    top: Animated.Value;
    params: NotifyParams;
    grant?: boolean;
};
declare class Notification extends React.PureComponent<NotificationProps, State> {
    static defaultProps: Partial<NotificationProps>;
    initState: NotifyParams;
    timer: any;
    layoutPanResponder: any;
    offsetMoveY: number;
    prevGestureState: any;
    constructor(props: NotificationProps);
    componentWillMount(): void;
    _swiping(newPos: number): void;
    hide(speed?: number): void;
    show(params: NotifyParams): void;
    componentWillUnmount(): void;
    getColor(): string | undefined;
    render(): JSX.Element;
}
export default Notification;
//# sourceMappingURL=Notification.d.ts.map