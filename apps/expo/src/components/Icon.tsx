import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export type IoniconsIconsName = React.ComponentProps<typeof Ionicons>['name']

type IconProps = {
    name: IoniconsIconsName
    size?: number
    color?: string
    className?: string
}

export const Icon = (props: IconProps) => {
    return (
        <Ionicons
            name={props.name}
            size={props.size}
            color={props.color}
            className={props.className}
        />
    )
}
