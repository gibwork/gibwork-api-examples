import { HTMLProps } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

export const Layout = ({ children }: Readonly<HTMLProps<HTMLDivElement>>) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}