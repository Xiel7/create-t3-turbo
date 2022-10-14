import React from 'react'
import { useAuth } from '../provider/AuthProvider'
import AuthStack from './stacks/AuthStack'
import MainStack from './stacks/MainStack'

const RootNavigator = () => {
    const { user } = useAuth()

    return user ? <MainStack /> : <AuthStack />
}

export default RootNavigator
