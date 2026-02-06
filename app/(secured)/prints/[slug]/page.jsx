import PrintIDComp from "@/src/components/modules/prints/id";
import PrintStickerComp from "@/src/components/modules/prints/sticker";
import { redirect } from "next/navigation";
import React from "react";
var page = function (_a) {
    var params = _a.params;
    var slug = params.slug;
    if (slug !== "sticker" && slug !== "id") {
        redirect("/dashboard");
    }
    return (<div>
      {slug === "sticker" ? (<PrintStickerComp />) : slug === "id" ? (<PrintIDComp />) : null}
    </div>);
};
export default page;
