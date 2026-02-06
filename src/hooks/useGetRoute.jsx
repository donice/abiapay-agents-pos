"use client";
import { usePathname } from "@/src/utils/navigation";
var useGetRoute = function () {
    var currentPage = usePathname();
    function removeLeadingSlash(input) {
        if (input.startsWith("/")) {
            return input.substring(1);
        }
        return input;
    }
    return removeLeadingSlash(currentPage);
};
export default useGetRoute;
