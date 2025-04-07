// app/layout.tsx
"use client"
import { Provider } from "react-redux";
import  store  from "../redux/store"; // Make sure you have created the store correctly
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}> {/* Wrap everything with Redux Provider */}
      <html lang="en" className="bg-gradient-to-l from-fuchsia-300 to-blue-400">
        <body>{children}</body>
      </html>
    </Provider>
  );
}
