import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export type SafeAreaViewProps = React.ComponentProps<typeof SafeAreaView>

interface Props extends SafeAreaViewProps {
    children: ReactNode
}

export const ScreenView = ({ children, ...otherProps }: Props) => {
    return (
        <SafeAreaView className={`flex-1 px-4 h-full w-full`} {...otherProps}>
            {children}
        </SafeAreaView>
    )
}
