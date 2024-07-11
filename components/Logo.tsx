import Image from "next/image";
import Link from "next/link";
import { Karla } from "next/font/google";
import { cn } from "@/lib/utils";

const karla = Karla({ subsets: ["latin"], weight: "800" });

export const Logo = () => {
  return (
    <div className="flex items-center">
      <Link href={"/"}>
        <Image src="/logo.svg" height={60} width={60} alt="logo" />
      </Link>
      <h2 className={cn("text-2xl ml-2", karla.className)}>DocAI</h2>
    </div>
  );
};
