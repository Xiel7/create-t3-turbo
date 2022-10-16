import React from 'react'
import { Image, ImageSourcePropType, StyleSheet } from 'react-native'

type Props = {
    uri: ImageSourcePropType | undefined
}

export const Logo = ({ uri }: Props) => {
    return <Image source={uri} style={styles.image} />
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
    },
})
