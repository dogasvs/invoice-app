import DarkModeSvg from "@/svgs/dark-mode-svg";
import Image from "next/image";
import "./sidenav.css"

export default function Sidenav() {
  return (
    <div className="sidenav">
      <Image alt="logo image" priority width={103} height={103} src={"/img/logo.png"} />
      <div className="sidenavItem">
        <DarkModeSvg />
        <hr />
        <Image alt="user image" priority width={40} height={40} src={"/img/user.png"} />
      </div>
    </div>
  );
}
