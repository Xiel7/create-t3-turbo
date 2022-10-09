import React from 'react'
import { useAuth } from '../components/auth/AuthProvider'
import AuthStack from '../stacks/AuthStack'
import MainStack from '../stacks/MainStack'

const RootNavigation = () => {
    const { user } = useAuth()

    return user ? <MainStack /> : <AuthStack />
}

export default RootNavigation
