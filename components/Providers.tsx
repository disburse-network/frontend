"use client";

import { ReactNode } from "react";
import { PrivyProvider } from "@privy-io/react-auth";

const Providers = ({ children }: { children: ReactNode }) => (
  <PrivyProvider
    appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? ""}
    config={{
      loginMethods: ["email", "wallet"],
      appearance: {
        theme: "light",
        accentColor: "#8b5cf6",
        showWalletLoginFirst: true,
      },
    }}
  >
    {children}
  </PrivyProvider>
);

export { Providers };
