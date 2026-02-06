import React from "react";
export var CustomHeader = function (_a) {
    var title = _a.title, desc = _a.desc;
    return (<div className="custom-header">
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>);
};
export var CustomFormHeader = function (_a) {
    var title = _a.title, desc = _a.desc;
    return (<div className="custom-form-header">
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>);
};
