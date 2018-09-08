import React from "react";
import PropTypes from "prop-types";
import { NotifyParams } from "./Notification";
import hoistNonReactStatics from "hoist-non-react-statics";
export declare type WithNotify = {
    notify: (params: NotifyParams)=>void
}

const contextTypes = {
    showNotify: PropTypes.func
};

const withNotify = function<T>(WrappedComponent: React.ComponentType<T & WithNotify>): React.ComponentType<T & WithNotify> {
    class Wrapper extends React.PureComponent<T & WithNotify, {}>{
        static contextTypes = contextTypes;

        render(){
            return(
                <WrappedComponent
                    {...this.props}
                    notify={this.context.showNotify}
                />
            )
        }
    }

    return hoistNonReactStatics(Wrapper, WrappedComponent);
}
export default withNotify