// LoadingContext.js
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from 'react'

const LoadingContext = createContext<{
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
}>({
    loading: false,
    setLoading: () => {},
})

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState<boolean>(false)
    console.log(loading)
    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export function useLoading() {
    const context = useContext(LoadingContext)
    if (!context) {
        throw new Error('useLoading must be used within LoadingProvider')
    }
    return context
}
