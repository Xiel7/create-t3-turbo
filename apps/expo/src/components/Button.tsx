import React, { useCallback, ReactNode } from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'

type RNPressableProps = React.ComponentProps<typeof Pressable>

interface Props extends RNPressableProps {
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
    ...otherProps
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
        <Pressable onPress={onPress} style={_style} {...otherProps}>
            {children}
        </Pressable>
    )
}
