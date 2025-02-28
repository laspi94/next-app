'use client'

import { ReactElement, useEffect } from "react";
import { Sidebar } from "../sidebar";
import { Navbar } from "../navbar";
import { OverlayScrollbars, InitializationTarget } from 'overlayscrollbars';
import { Banner } from "../banner";
import { unstable_noStore } from "next/cache";


type MainLayoutProps = {
  children: ReactElement;
  breadcrumb?: ReactElement;
};

export const MainLayout = ({ children, breadcrumb }: MainLayoutProps) => {

  unstable_noStore();

  useEffect(() => {
    // const SELECTOR_SIDEBAR_WRAPPER = '.sidebar-wrapper';
    // if (typeof window !== 'undefined') {
    //   const sidebarWrapper: Element = document.querySelector(SELECTOR_SIDEBAR_WRAPPER)!;
    //   if (sidebarWrapper && typeof OverlayScrollbars !== 'undefined') {
    //     OverlayScrollbars(sidebarWrapper as InitializationTarget, {
    //       scrollbars: {
    //         theme: 'os-theme-dark',
    //         autoHide: 'scroll',
    //         clickScroll: true,
    //       },
    //     });
    //   }
    // }
  }, []);

  return (
    <div className="app-wrapper">
      <Navbar />
      <Sidebar />
      <main className="app-main">
        <div className="app-content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-9"><Banner message={'Mensaje'} /></div>
              <div className="col-sm-3">
                {breadcrumb}
              </div>
            </div>
          </div>
        </div>
        <div className="app-content">
          <div className="container-fluid">
            <div className="col-12">
              {children}
            </div>
          </div>
        </div>
      </main>
      <footer className="app-footer">
        <div className="float-end d-none d-sm-inline">hapore.net</div>
      </footer>
    </div>
  );
};
