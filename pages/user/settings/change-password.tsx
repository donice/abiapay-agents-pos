import ChangePasswordComponent from '@/src/components/modules/user/settings/change-password'
import Head from 'next/head'
import React from 'react'

const ChangePasswordPage = () => {
    return (
        <div>
            <Head>
                <title>Change Password</title>
            </Head>
            <ChangePasswordComponent />
        </div>
    )
}

export default ChangePasswordPage
