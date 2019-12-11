import * as React from "react";
import {
    View
} from "react-native";
import Notification, { NotificationProps } from "./Notification";
import { NotifyContext } from "./context";
import { NotifyParams } from "./types";

type NotificationProviderProps = NotificationProps;




const { useRef } = React;
const NotificationProvider: React.FC<NotificationProviderProps> = ({ children, ...other }) => {
    const NotificationRef = useRef<{show: (params: NotifyParams)=>void}>(null);
    const showNotify = (params: NotifyParams) => {
        NotificationRef.current && NotificationRef.current.show(params);
    }
    return (
        <NotifyContext.Provider value={showNotify}>
            <View style={{ flex: 1 }}>
                {children}
                <Notification
                    ref={NotificationRef}
                    {...other}
                />
            </View>
        </NotifyContext.Provider>

    )

}

export default NotificationProvider;