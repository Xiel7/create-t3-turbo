import React from 'react'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { useAuth } from '../provider/AuthProvider'
import AuthStack from './stacks/AuthStack'
import MainStack from './stacks/MainStack'

const RootNavigator = () => {
    const { user, isFetching } = useAuth()

    if (isFetching) return <LoadingIndicator />

    return user ? <MainStack /> : <AuthStack />
}

export default RootNavigator
