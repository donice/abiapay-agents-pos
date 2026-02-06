import Head from 'next/head';
import ChangePasswordComponent from "@/src/components/modules/user/settings/change-password";
import { CustomFormHeader } from "@/src/components/common/header";

const ForgotPasswordPage = () => {
  return (
    <div>
      <Head>
        <title>Change Password | Abiapay</title>
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