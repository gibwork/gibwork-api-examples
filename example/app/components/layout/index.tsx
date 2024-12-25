import { HTMLProps } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import AppWalletProvider from "./AppWalletProvider";

export const Layout = ({ children }: Readonly<HTMLProps<HTMLDivElement>>) => {
    return (
        <AppWalletProvider>
            <Navbar />
            {children}
            <Footer />
        </AppWalletProvider>
    )
}