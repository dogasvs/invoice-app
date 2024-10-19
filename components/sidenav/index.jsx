import DarkModeSvg from "@/svgs/dark-mode-svg";
import Image from "next/image";
import "./sidenav.css"
import Logo from "@/svgs/logo";
import Link from "next/link";

export default function Sidenav() {
  return (
    <div className="sidenav">
       <Link href={"/"}> <Logo /></Link> 
      <div className="sidenavItem">
        <DarkModeSvg />
        <hr />
        <Image alt="user image" priority width={40} height={40} src={"/img/user.png"} />
      </div>
    </div>
  );
}
