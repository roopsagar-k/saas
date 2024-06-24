"use client";
import React from "react";
import SideBar from "@/components/SideBar";
import HomePageNav from "@/components/HomePageNav";
import { Separator } from "@/components/ui/separator";
import DrawerTest from "@/components/DrawerTest";
import ToolTip from "@/components/ToolTip";
import PhoneViewPannel from "../../components/PhoneViewPannel";
import { useMediaQuery } from "react-responsive";
import { Plus } from "lucide-react";

const Layout = ({children}: {children: React.ReactNode}) => {
  const isPhoneView = useMediaQuery({query: "(max-width: 767px)"});
  return (
    <div className="flex h-screen">
      {isPhoneView ? <PhoneViewPannel /> : <SideBar />}
      <div className="flex flex-col w-full h-screen">
        <HomePageNav />
        <Separator />
        <div className="flex-1 overflow-auto">{children}</div>
        {!isPhoneView && (
          <div className="absolute bottom-20 right-20">
            <ToolTip content="Start creating test" classNames="mb-2">
              <DrawerTest>
                <div className="bg-primary p-4 text-white rounded-full">
                  <Plus className="h-8 w-8" />
                </div>
              </DrawerTest>
            </ToolTip>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;

