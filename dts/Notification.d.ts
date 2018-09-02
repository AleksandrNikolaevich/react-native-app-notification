import * as React from 'react';
import { Animated } from 'react-native';
declare type Props = {
    colors?: {
        info?: string;
        success?: string;
        error?: string;
        warn?: string;
    };
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
declare class Notification extends React.PureComponent<Props, State> {
    static defaultProps: Partial<Props>;
    initState: NotifyParams;
    timer: any;
    layoutPanResponder: any;
    offsetMoveY: number;
    prevGestureState: any;
    constructor(props: Props);
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