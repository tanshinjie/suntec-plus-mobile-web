import "../styles/globals.css";
import { ViewTransitions } from "next-view-transitions";
import { Footer } from "./component";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" type="image/png" href="suntec+.png" />
        </head>
        <body className="sm:w-screen md:w-96 m-auto py-16">
          {children}
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
