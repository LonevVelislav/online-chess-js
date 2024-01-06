import { useState } from "react";

export default function useAuthState(key, deafaultValue) {
    const [state, setState] = useState(() => {
        const authState = localStorage.getItem(key);

        if (authState) {
            return JSON.parse(authState);
        }
        return deafaultValue;
    });

    const setAuthState = (value) => {
        setState(value);
        let stringifyValue;

        if (typeof value === "function") {
            stringifyValue = JSON.stringify(value(state));
        } else {
            stringifyValue = JSON.stringify(value);
        }
        localStorage.setItem(key, stringifyValue);
    };
    return [state, setAuthState];
}
