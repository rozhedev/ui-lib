import { useState } from "react";

export const useFetching = (cb) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadErr, setLoadErr] = useState("");

    const fetching = async () => {
        try {
            setIsLoading(true);
            await cb();
        } catch (err) {
            setLoadErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading, loadErr];
};

