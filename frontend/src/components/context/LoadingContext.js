import { useState, createContext, useContext } from "react";

const LoadingContext = createContext();
const UpdateLoadingContext = createContext();

// custom hooks
export const useLoader = () => {
    return useContext(LoadingContext);
};

export const useUpdateLoader = () => {
    return useContext(UpdateLoadingContext);
};

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={isLoading}>
            <UpdateLoadingContext.Provider value={setIsLoading}>
                {children}
            </UpdateLoadingContext.Provider>
        </LoadingContext.Provider>
    )
};