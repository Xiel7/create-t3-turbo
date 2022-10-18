import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export type IoniconsIconsName = React.ComponentProps<typeof Ionicons>['name']
type IoniconsProps = React.ComponentProps<typeof Ionicons>

interface IconProps extends IoniconsProps {
    name: IoniconsIconsName
    size?: number
    color?: string
}

export const Icon = ({ name, size, color, ...otherProps }: IconProps) => {
    return <Ionicons name={name} size={size} color={color} {...otherProps} />
}
