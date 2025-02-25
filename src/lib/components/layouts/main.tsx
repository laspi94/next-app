import { ReactElement } from "react";
import { Sidebar } from "../sidebar";

type MainLayoutProps = {
  children: ReactElement;
};

export const MainLayout = ({ children }: MainLayoutProps) => {

  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};
