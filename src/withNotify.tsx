import React from "react";
import PropTypes from "prop-types";
import { NotifyParams } from "./Notification";

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
    Object.keys(WrappedComponent).forEach((key)=>{
        // @ts-ignore
        Wrapper[key] = WrappedComponent[key]
    })

    if(WrappedComponent.contextTypes){
        Wrapper.contextTypes = {
            ...WrappedComponent.contextTypes,
            ...contextTypes
        }
    }

    return Wrapper;
}
export default withNotify