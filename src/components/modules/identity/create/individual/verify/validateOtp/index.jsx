import React, { useState } from "react";
import { FormTextInput } from "@/src/components/common/input";
import { BackButton, Button } from "@/src/components/common/button";
import { CustomHeader } from "@/src/components/common/header";
// import "../../style.scss" // Moved to _app;
import { useMutation } from "@tanstack/react-query";
import { validateIDOtp, validateNoIDOtp } from "@/src/services/identityService";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSearchParams } from "@/src/utils/navigation";
import { OtpSuccessModal } from "@/src/components/common/modal";
import Unauthorized from "@/src/components/common/unauthorized";
var ValidateOtpComponent = function () {
    var querySearch = useSearchParams();
    var source = querySearch.get("source");
    var _id = querySearch.get("_id");
    var _a = useState({
        mode: false,
        message: "",
    }), show = _a[0], setShow = _a[1];
    var _b = useMutation({
        mutationKey: ["verify_otp_for_abssin_creation"],
        mutationFn: source == "No ID"
            ? function (data) {
                return validateNoIDOtp(data);
            }
            : function (data) {
                return validateIDOtp(data);
            },
        onSuccess: function (data) {
            console.log("DATA", data);
            source == "No ID"
                ? data.status == true && setShow({ mode: true, message: data.message })
                : data.status == true
                    ? toast.success(data.response_message) && setShow({ mode: true, message: data.response_message })
                    : toast.error(data.response_message);
        },
        onError: function (error) {
            console.log("ERROR DATA", error);
            return error;
        },
    }), mutate = _b.mutate, isLoading = _b.isLoading;
    var _c = useForm({
        defaultValues: {
            otp: "",
        },
    }), registerNoID = _c.register, handleSubmitNoID = _c.handleSubmit, errorsNoID = _c.formState.errors;
    var _d = useForm({
        defaultValues: {
            code: "",
        },
    }), registerID = _d.register, handleSubmitID = _d.handleSubmit, errorsID = _d.formState.errors;
    var onsubmit = function (data) {
        mutate(data);
    };
    return (<>
      {source ? (<div>
          <CustomHeader title={"Validate OTP"} desc={"Enter token to validate ID"}/>
          <form onSubmit={source == "No ID"
                ? handleSubmitNoID(onsubmit)
                : handleSubmitID(onsubmit)} className="identity-form">
            {source == "No ID" ? (<FormTextInput label={"OTP"} name="otp" type="password" placeholder={"Enter OTP"} register={registerNoID} error={errorsNoID.otp}/>) : (<FormTextInput label={"OTP Token"} name="code" type="password" placeholder={"Enter OTP Token"} register={registerID} error={errorsID.code}/>)}
            <div className="button-container">
              <BackButton link="/identity/create/individual/verify"/>
              <Button text={"Validate OTP"} loading={isLoading} disabled={isLoading}/>
            </div>
            
          </form>

          {show.mode && (<OtpSuccessModal mode="verified" maintext={"".concat(show === null || show === void 0 ? void 0 : show.message)} subtext="Click 'Continue' to proceed your ABSSIN creation" buttontext="Continue" link={"/identity/create/individual?source=".concat(source, "&_id=").concat(_id)}/>)}
        </div>) : (<div>
          <Unauthorized text="You don't have access to this page"/>
        </div>)}{" "}


    </>);
};
export default ValidateOtpComponent;
