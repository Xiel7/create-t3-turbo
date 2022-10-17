import React from 'react'
import { TextInput as RNTextInput, View } from 'react-native'

import { Icon, IoniconsIconsName } from './Icon'
import { Button } from './Button'

type RNTextInputProps = React.ComponentProps<typeof RNTextInput>

interface Props extends RNTextInputProps {
    leftIconName?: IoniconsIconsName
    rightIcon?: IoniconsIconsName
    handleToggle?: () => void
}

export const TextInput = ({
    leftIconName,
    rightIcon,
    handleToggle,
    ...otherProps
}: Props) => {
    return (
        <View className="flex flex-row w-full border-gray-300 rounded-lg border-2 bg-white">
            {leftIconName ? (
                <View className="py-2 pl-4">
                    <Icon name={leftIconName} size={22} color="gray" />
                </View>
            ) : null}
            <RNTextInput className="flex-1 w-full ml-4 py-2" {...otherProps} />
            {rightIcon ? (
                <Button
                    onPress={handleToggle}
                    className="relative bg-gray-300 h-full py-2 px-4"
                >
                    <Icon name={rightIcon} size={22} color="gray" />
                </Button>
            ) : null}
        </View>
    )
}
