'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold">Gibwork</h1>
            </div>
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/listedTask"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/listedTask')
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Listed Tasks
              </Link>
              <Link
                href="/createTask"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/createTask')
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Create Task
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}