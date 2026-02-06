var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
// components/common/Input.tsx
import React, { useState } from "react";
// import "./style.scss" // Moved to _app;
// import "./SearchableDropdown.scss" // Moved to _app;
import { TbCreditCard, TbEye, TbEyeOff, TbLockCheck } from "react-icons/tb";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Controller } from "react-hook-form";
import { LuAsterisk } from "react-icons/lu";
export var TextInput = function (_a) {
    var input_icon = _a.input_icon, label = _a.label, _b = _a.type, type = _b === void 0 ? "text" : _b, name = _a.name, _c = _a.placeholder, placeholder = _c === void 0 ? "" : _c, value = _a.value, onChange = _a.onChange, register = _a.register, error = _a.error, validation = _a.validation, rest = __rest(_a, ["input_icon", "label", "type", "name", "placeholder", "value", "onChange", "register", "error", "validation"]);
    var _d = React.useState(false), showPassword = _d[0], setShowPassword = _d[1];
    var handleTogglePassword = function () {
        setShowPassword(function (prevShowPassword) { return !prevShowPassword; });
    };
    var getErrorMessage = function (error) {
        if (!error)
            return "";
        switch (error.type) {
            case "required":
                return "".concat(label, " Field Required");
            case "minLength":
                return "Length must be more";
            case "maxLength":
                return "Length must be less";
            default:
                return "";
        }
    };
    var errorMessage = error ? getErrorMessage(error) : "";
    return (<div className="input-container">
      <label htmlFor={name}>{label}</label>
      <span>
        <span className="input_icon">
          {input_icon ? (input_icon) : type === "password" ? (<TbLockCheck />) : type === "email" ? (<MdOutlineAlternateEmail />) : (<TbCreditCard />)}
        </span>
      </span>
      <input type={type === "password" && showPassword ? "text" : type} name={name} placeholder={placeholder} value={value} onChange={onChange} {...(register && register(name, validation))} {...rest}/>
      {type === "password" && (<span onClick={handleTogglePassword} className="input_toggle_icon">
          {showPassword ? <TbEyeOff /> : <TbEye />}
        </span>)}
      {errorMessage && <span className="error">{errorMessage}</span>}
    </div>);
};
export var FormTextInput = function (_a) {
    var disabled = _a.disabled, label = _a.label, type = _a.type, name = _a.name, _b = _a.placeholder, placeholder = _b === void 0 ? "" : _b, value = _a.value, onChange = _a.onChange, onKeyDown = _a.onKeyDown, readOnly = _a.readOnly, register = _a.register, error = _a.error, validation = _a.validation, rest = __rest(_a, ["disabled", "label", "type", "name", "placeholder", "value", "onChange", "onKeyDown", "readOnly", "register", "error", "validation"]);
    var _c = useState(false), showPassword = _c[0], setShowPassword = _c[1];
    var handleTogglePassword = function () {
        setShowPassword(function (prevShowPassword) { return !prevShowPassword; });
    };
    var getErrorMessage = function (error) {
        if (!error)
            return "";
        if (error.message) {
            return error.message;
        }
        switch (error.type) {
            case "required":
                return "".concat(label, " Field Required");
            case "minLength":
                return "Length must be more";
            case "maxLength":
                return "Length must be less";
            case "validate":
                return "Invalid value";
            default:
                return "";
        }
    };
    var errorMessage = error ? getErrorMessage(error) : "";
    return (<div className="form-input-container">
      <span>
        <label className="form-input_icon flex">
          {label}{" "}
          {(validation === null || validation === void 0 ? void 0 : validation.required) && <LuAsterisk className="text-red-600"/>}
        </label>
      </span>
      <input type={type === "password" && showPassword ? "text" : type} name={name} placeholder={placeholder} value={value} readOnly={readOnly} disabled={disabled} onChange={onChange} className={"".concat(error ? "errorinput" : "")} {...(register && register(name, validation))} {...rest}/>
      <span></span>
      {type === "password" && (<span onClick={handleTogglePassword} className="form-input_toggle_icon">
          {showPassword ? <TbEyeOff /> : <TbEye />}
        </span>)}
      {errorMessage && <span className="error">{errorMessage}</span>}
    </div>);
};
export var SelectInput = function (_a) {
    var label = _a.label, name = _a.name, id = _a.id, className = _a.className, value = _a.value, onChange = _a.onChange, options = _a.options, _b = _a.placeholder, placeholder = _b === void 0 ? "Select an option" : _b, disabled = _a.disabled, register = _a.register, validation = _a.validation, error = _a.error, _c = _a.errorMessage, errorMessage = _c === void 0 ? "Field Required" : _c;
    return (<div className="select-container">
      <label htmlFor={id}>{label}</label>
      <select name={name} id={id} className={"".concat(className, " minimal")} value={value} disabled={disabled} onChange={onChange} {...(register && register(name, validation))}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options &&
            options.map(function (option) { return (<option key={option.value} value={option.value}>
              {option.label}
            </option>); })}
      </select>
      {error && <span className="error">{errorMessage}</span>}
    </div>);
};
export var SelectSearchInput = function (_a) {
    var name = _a.name, label = _a.label, options = _a.options, control = _a.control, _b = _a.placeholder, placeholder = _b === void 0 ? "Search..." : _b;
    var _c = useState(""), search = _c[0], setSearch = _c[1];
    var _d = useState(false), isOpen = _d[0], setIsOpen = _d[1];
    var filteredOptions = search.length > 0
        ? options.filter(function (option) {
            return option.label.toLowerCase().includes(search.toLowerCase());
        })
        : options; // Show all initially
    return (<div className="SearchableDropdown selectsearch-container">
      <label htmlFor={name} className="SearchableDropdown-label">
        {label}
      </label>
      <Controller name={name} control={control} render={function (_a) {
            var field = _a.field;
            return (<div className="SearchableDropdown-container">
            {/* Input Field (Mimics the Dropdown) */}
            <input type="text" placeholder={placeholder} value={search} onFocus={function () { return setIsOpen(true); }} onChange={function (e) { return setSearch(e.target.value); }} className="SearchableDropdown-input"/>

            {/* Dropdown Menu */}
            {isOpen && (<ul className="SearchableDropdown-menu">
                {filteredOptions.length > 0 ? (filteredOptions.map(function (option) { return (<li key={option.value} onClick={function () {
                            field.onChange(option.value);
                            setSearch(option.label); // Display selected value in input
                            setIsOpen(false); // Close dropdown
                        }} className="SearchableDropdown-option">
                      {option.label}
                    </li>); })) : (<li className="SearchableDropdown-option disabled">
                    No results found
                  </li>)}
              </ul>)}
          </div>);
        }}/>
    </div>);
};
