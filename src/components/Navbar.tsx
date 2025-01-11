"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Left section - Logo */}
          <div className="flex-shrink-0">
            <Link href={"/"} className="text-xl font-bold">
              Gibwork
            </Link>
          </div>

          {/* Center section - Navigation Links */}
          <div className="flex-grow flex justify-center space-x-14">
            <Link
              href="/listedTask"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/listedTask")
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Listed Tasks
            </Link>
            <Link
              href="/createTask"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/createTask")
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Create Task
            </Link>
          </div>

          {/* Right section - Wallet Button */}
          <div className="flex-shrink-0">
            <WalletMultiButton style={{ backgroundColor: "#000" }} />
          </div>
        </div>
      </div>
    </nav>
  );
}
