import * as React from "react";
import { NotifyParams } from "./types";
export declare type WithNotify = {
    notify: (params: NotifyParams) => void;
};
declare const withNotify: <T>(WrappedComponent: React.ComponentType<T & WithNotify>) => React.ComponentType<T & WithNotify>;
export default withNotify;
//# sourceMappingURL=withNotify.d.ts.map