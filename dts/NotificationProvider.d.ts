import * as React from "react";
import PropTypes from "prop-types";
import { NotifyParams, NotificationProps } from "./Notification";
declare type NotificationProviderProps = NotificationProps;
declare class NotificationProvider extends React.PureComponent<NotificationProviderProps, {}> {
    static childContextTypes: {
        showNotify: PropTypes.Requireable<(...args: any[]) => any>;
    };
    notification: any;
    getChildContext(): {
        showNotify: (params: NotifyParams) => void;
    };
    render(): JSX.Element;
}
export default NotificationProvider;
//# sourceMappingURL=NotificationProvider.d.ts.map