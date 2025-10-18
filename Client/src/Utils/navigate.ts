// navigation.ts
import { NavigateFunction } from "react-router-dom";

let navigator: NavigateFunction | null = null;

export const setNavigator = (navFunc: NavigateFunction) => {
    navigator = navFunc;
};

export const navigate = (to: string, options?: { replace?: boolean }) => {
    if (navigator) {
        navigator(to, options);
    } else {
        console.warn("⚠️ Navigator not set yet");
    }
};
