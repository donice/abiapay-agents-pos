"use client";

import { useEffect } from "react";
import { RouteConfig } from "..";

interface RouteWithMetaProps {
  route: RouteConfig;
}

export const RouteWithMeta: React.FC<RouteWithMetaProps> = ({ route }) => {
  useEffect(() => {
    if (route.meta?.title) {
      document.title = route.meta.title;
    }
    if (route.meta?.description) {
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", route.meta.description);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = route.meta.description;
        document.head.appendChild(meta);
      }
    }
  }, [route.meta]);

  return route.element;
};
