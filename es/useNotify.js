import * as React from "react";
import { NotifyContext } from "./context";
var useNotify = function () {
    var show = React.useContext(NotifyContext);
    return show;
};
export default useNotify;
