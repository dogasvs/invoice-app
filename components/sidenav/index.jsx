import DarkModeSvg from "@/svgs/dark-mode-svg";
import Image from "next/image";

export default function Sidenav() {
  return (
    <div className="sidenav">
      <Image src={"/img/logo.png"} />
      <div className="sidenavItem">
        <DarkModeSvg />
        <hr />
        <Image src={"/img/user.png"} />
      </div>
    </div>
  )
}