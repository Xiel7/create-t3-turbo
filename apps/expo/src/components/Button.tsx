import React, { useCallback, ReactNode } from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'

type Props = {
    children?: ReactNode
    onPress?: () => void
    title?: string
    activeOpacity?: number
    borderless?: boolean
    className?: string
}

export const Button = ({
    children,
    onPress,
    activeOpacity = 0.3,
    borderless = false,
    title,
    className,
}: Props) => {
    const _style = useCallback(
        ({ pressed }: any) => [{ opacity: pressed ? activeOpacity : 1 }],
        []
    )

    if (borderless) {
        return (
            <Pressable onPress={onPress} style={_style}>
                <Text className="text-lg text-sky-600 text-center">
                    {title}
                </Text>
            </Pressable>
        )
    }

    return (
        <Pressable onPress={onPress} style={_style} className={`${className}`}>
            {children}
        </Pressable>
    )
}
