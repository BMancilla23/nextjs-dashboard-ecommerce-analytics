"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useRouteCheck(routeNames: string[]) {
  const pathname = usePathname();
  const [isRoute, setIsRoute] = useState(false);

  useEffect(() => {
    setIsRoute(routeNames.includes(pathname.split("/")[1]));
  }, [pathname, routeNames]);

  return isRoute; // Devuelve el estado para que el componente que utiliza este gancho pueda acceder a él
}
