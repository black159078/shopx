import { useEffect, useState } from "react";
import { getCartCount, CART_UPDATED_EVENT } from "./cartUtils";

// live cart item count — updates the moment any component calls
// notifyCartUpdated(), and also across browser tabs via storage events
const useCartCount = () => {
    const [count, setCount] = useState(getCartCount());

    useEffect(() => {
        const update = () => setCount(getCartCount());

        window.addEventListener(CART_UPDATED_EVENT, update);
        window.addEventListener("storage", update);

        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, update);
            window.removeEventListener("storage", update);
        };
    }, []);

    return count;
};

export default useCartCount;