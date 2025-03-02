'use client'

import './main.css';

import { ReactElement } from "react";
import { AppSidebar } from "../navigation/sidebar";
import { SidebarProvider } from "../ui/sidebar";
import { Page } from '../navigation/page';

type MainLayoutProps = {
  children: ReactElement;
};

export const MainLayout = (props: MainLayoutProps) => {

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <Page {...props} />
      </SidebarProvider>
    </>
  );
};
