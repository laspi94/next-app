import { ReactElement } from "react";

type AuthLayoutProps = {
  children: ReactElement;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {

  return (
    <>
      {children}
    </>
  );
};
