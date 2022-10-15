import React from 'react'
import { TextInput as RNTextInput, View } from 'react-native'

import { Icon, IoniconsIconsName } from './Icon'
import { Button } from './Button'

type Props = {
    leftIconName: IoniconsIconsName
    rightIcon: IoniconsIconsName
    handlePasswordVisibility: () => void
}

export const TextInput = ({
    leftIconName,
    rightIcon,
    handlePasswordVisibility,
    ...otherProps
}: Props) => {
    return (
        <View>
            {leftIconName ? <Icon name={leftIconName} size={22} /> : null}
            <RNTextInput {...otherProps} />
            {rightIcon ? (
                <Button onPress={handlePasswordVisibility}>
                    <Icon name={rightIcon} size={22} />
                </Button>
            ) : null}
        </View>
    )
}
