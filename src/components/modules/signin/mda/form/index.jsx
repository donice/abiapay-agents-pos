"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useEffect } from "react";
import { FormButton } from "@/src/components/common/button";
import { TextInput } from "@/src/components/common/input"; // Importing the custom input component
// import "./style.scss" // Moved to _app;
import toast from "react-hot-toast";
import { loginMDA, useAuthDispatch } from "@/src/context/authContext";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
var MDASigninForm = function () {
    var _a = useState({
        email: "",
        password: "",
    }), formData = _a[0], setFormData = _a[1];
    var _b = useState(false), isFormValid = _b[0], setIsFormValid = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var dispatch = useAuthDispatch();
    var router = useRouter();
    var mutation = useMutation({
        mutationFn: function (data) {
            return loginMDA(dispatch, data);
        },
        onSuccess: function () {
            router.push("/dashboard");
        },
        onError: function (error) {
            toast.error("Error Loging in");
            console.error("Login failed:", error);
        },
    });
    useEffect(function () {
        var allFieldsFilled = Object.values(formData).every(function (field) { return field !== ""; });
        setIsFormValid(allFieldsFilled);
    }, [formData]);
    var handleChange = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[name] = value, _a)));
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        setLoading(true);
        mutation.mutate(formData);
        // setLoading(false);
    };
    return (<form onSubmit={handleSubmit} className="signin_form">
      <TextInput label="Email" type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange}/>
      <TextInput label="Password" type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange}/>

      <div className="btn_container">
        <FormButton loading={loading} text="Sign in" disabled={!isFormValid || loading}/>
       
        <div className="bottom_links">
        <div className="forgot-password link" onClick={function () { return router.push("/forgot-password"); }}>
          Forgot Password?
        </div>

        <div className="forgot-password">
          Are you an Agent?{" "}
          <span onClick={function () { return router.push("/signin/agent"); }} className="link">
            Click here to sign in
          </span>{" "}
        </div>
      </div>
      </div>
    </form>);
};
export default MDASigninForm;
