import ChangePasswordComponent from "@/src/components/modules/user/settings/change-password";
import { CustomFormHeader } from "@/src/components/common/header";
import Head from "next/head";
import React from "react";

const ForgotPasswordPage = () => {
    return (
        <div>
            <Head>
                <title>Change Password</title>
                <meta name="description" content="Reset Password for agent's account" />
            </Head>
            <CustomFormHeader title="Forgot Password" desc="Reset password for agent's account" />
            <div className="forgot-password">
                <ChangePasswordComponent />
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
