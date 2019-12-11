import * as React from "react";
import PropTypes from "prop-types";
import { NotifyParams } from "./types";
import { NotifyContext } from "./context";
import hoistNonReactStatics from "hoist-non-react-statics";
export declare type WithNotify = {
    notify: (params: NotifyParams) => void
}

const withNotify = function <T>(WrappedComponent: React.ComponentType<T & WithNotify>): React.ComponentType<T & WithNotify> {
    class Wrapper extends React.PureComponent<T & WithNotify, {}>{

        render() {
            return (
                <NotifyContext.Consumer>
                    {
                        (showNotify) => (
                            <WrappedComponent
                                {...this.props}
                                notify={showNotify}
                            />
                        )
                    }
                </NotifyContext.Consumer>

            )
        }
    }

    return hoistNonReactStatics(Wrapper, WrappedComponent as any);
}
export default withNotify