"use client";
import React from "react";
import { MdOutlineAdd, MdOutlineArrowBackIos } from "react-icons/md";
import { useRouter } from "next/router";
import Loader from "../loader";
export var FormButton = function (_a) {
    var text = _a.text, disabled = _a.disabled, loading = _a.loading;
    var router = useRouter();
    return (<button className={"button ".concat(disabled ? "disabled" : "primary")} disabled={disabled}>
      {text}
      {loading && <Loader />}
    </button>);
};
export var DefaultButton = function (_a) {
    var text = _a.text, link = _a.link, disabled = _a.disabled;
    var router = useRouter();
    var handleClick = function (route) {
        if (!disabled) {
            router.push(route);
        }
    };
    return (<button className={"button ".concat(disabled ? "disabled" : "primary")} disabled={disabled} onClick={function () { return link && handleClick(link); }}>
      {text}
    </button>);
};
export var Button = function (_a) {
    var text = _a.text, disabled = _a.disabled, onClick = _a.onClick, loading = _a.loading, children = _a.children;
    var router = useRouter();
    return (<button className={"button ".concat(disabled ? "disabled" : "primary")} disabled={disabled} onClick={onClick}>
      {children} {text}
      {loading && <Loader />}
    </button>);
};
export var CancelButton = function (_a) {
    var link = _a.link;
    var router = useRouter();
    var handleClick = function (route) {
        return router.push(route);
    };
    return (<div className="button secondary" onClick={function () { return handleClick(link); }}>
      Cancel
    </div>);
};
export var BackButton = function (_a) {
    var link = _a.link;
    var router = useRouter();
    var handleClick = function (route) {
        return router.push(route);
    };
    return (<div className="button secondary" onClick={function () { return handleClick(link); }}>
      Go Back
    </div>);
};
export var PrimaryButton = function (_a) {
    var text = _a.text, link = _a.link, addIcon = _a.addIcon;
    var router = useRouter();
    var handleClick = function (route) {
        return router.push(route);
    };
    return (<button className="button primary" onClick={function () { return link && handleClick(link); }}>
      {addIcon && <MdOutlineAdd className="icon"/>}
      {text}
    </button>);
};
export var SecondaryButton = function (_a) {
    var text = _a.text, link = _a.link, onClick = _a.onClick;
    var router = useRouter();
    var handleClick = function (route) {
        return router.push(route);
    };
    return (<button type="button" className="button secondary" onClick={function () {
            if (onClick) {
                onClick();
            }
            else if (link) {
                handleClick(link);
            }
        }}>
      <MdOutlineAdd className="icon"/>
      {text}
    </button>);
};
export var GoBackButton = function () {
    var router = useRouter();
    var handleClick = function () {
        return router.back();
    };
    return (<button className="go_back" onClick={function () { return handleClick(); }}>
      <MdOutlineArrowBackIos className="icon"/>
      Go Back
    </button>);
};
