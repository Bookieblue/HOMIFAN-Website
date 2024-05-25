import LeftSidebar from "@/components/LeftSidebar";
import Main from "@/components/Main";
import RightSidebar from "@/components/RightSidebar";
import Image from "next/image";

export default function Home() {
  return (
   <div className="grid grid-cols-[60px_1fr] h-full lg:grid-cols-[230px_1fr_300px] bg-gray-20 ">
   <div>
       <LeftSidebar />
   </div>
   <div>
       <Main />
   </div>
   <div className="hidden lg:block">
       <RightSidebar />
   </div>
</div>
  );
}
