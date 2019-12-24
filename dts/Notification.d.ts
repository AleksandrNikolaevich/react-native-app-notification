import * as React from 'react';
import { ViewStyle } from 'react-native';
import { NotifyParams } from './types';
export declare type NotifyParams = NotifyParams;
export declare type NotificationColors = {
    info?: string;
    success?: string;
    error?: string;
    warn?: string;
};
export declare type NotificationProps = {
    colors?: NotificationColors;
    containerStyle?: ViewStyle;
    render?: (props: NotifyParams) => React.ReactNode;
};
declare const _default: React.ForwardRefExoticComponent<NotificationProps & React.RefAttributes<unknown>>;
export default _default;
//# sourceMappingURL=Notification.d.ts.map