import DarkModeSvg from "@/svgs/dark-mode-svg";
import Image from "next/image";
import "./sidenav.css"

export default function Sidenav() {
  return (
    <div className="sidenav">
      <Image width={100} height={100} src={"/img/logo.png"} />
      <div className="sidenavItem">
        <DarkModeSvg />
        <hr />
        <Image width={100} height={100} src={"/img/user.png"} />
      </div>
    </div>
  );
}
