import type { ReactNode } from "react";
import { PerformanceProvider } from "@rayan_hn/render-inspector";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PerformanceProvider slowRenderThreshold={12}>{children}</PerformanceProvider>
      </body>
    </html>
  );
}
