import { useMediaQuery } from "usehooks-ts";
export default function useDeviceSize() {
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isLaptop = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
  const isTablet = useMediaQuery("(min-width:768px) and (max-width:1023px)");
  const isMobile = useMediaQuery("(max-width:767px)");

  return { isDesktop, isLaptop, isTablet, isMobile };
}
