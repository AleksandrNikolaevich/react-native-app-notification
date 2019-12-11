import * as React from "react";
import { NotifyContext } from "./context";



const useNotify = () => {

    const show = React.useContext(NotifyContext);

    return show
}

export default useNotify