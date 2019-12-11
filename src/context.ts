import * as React from "react";
import { NotifyParams } from "./types";

export const NotifyContext = React.createContext((params: NotifyParams)=>{});