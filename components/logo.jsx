import Image from "next/image";
import logo from "@/public/logo.svg";
import { cn } from "@/lib/utils";
export const Logo = ({ className = "" }) => {
  return (
    <Image className={cn("max-w-[70px] z-50", className)} src={logo} alt="logo" />
  );
};