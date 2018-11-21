import * as React from "react";
import PropTypes from "prop-types";
import {
    View
} from "react-native";
import Notification, { NotifyParams, NotificationColors } from "./Notification";

type NotificationProviderProps = {
    colors?: NotificationColors
}

class NotificationProvider extends React.PureComponent<NotificationProviderProps,{}>{

    static childContextTypes = {
        showNotify: PropTypes.func
    };

     notification:any;

    getChildContext() {
        return {
            showNotify: (params: NotifyParams) => {
                this.notification.show(params);
            }
        };
    }

    render(){
        return <View style={{flex:1}}>
            {this.props.children}
            <Notification
                ref={c => this.notification = c}
                {...this.props}
            />
        </View>
    }
}

export default NotificationProvider;