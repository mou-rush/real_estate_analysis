"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  isActive?: boolean;
};

type HeaderNavigationProps = {
  navItems: NavItem[];
};

export const HeaderNavigation = ({ navItems }: HeaderNavigationProps) => {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <nav className="flex space-x-6">
            {navItems.map((item, index) => {
              const isActive =
                pathname === item.href ||
                (pathname === "/" && item.href === "/deal-overview");

              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`${
                    isActive
                      ? "font-semibold text-black text-sm"
                      : "text-[#71717A] hover:text-gray-700 text-sm"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/avatar.svg"
              alt="Avatar"
              width={24}
              height={24}
              className="rounded-full"
            />
            <input
              type="text"
              placeholder="Ask me anything!"
              className="w-[320px] h-[36px] pt-[4px] pr-[12px] pb-[4px] pl-[12px] border border-[#E4E4E7] rounded-tl-[12px] rounded-tr-[12px] rounded-br-[12px] text-sm bg-[#FFFFFF] shadow-[0px_1px_2px_0px_#0000000D]"
            />
          </div>
          <div className="flex items-center">
            <Image src="/logo.svg" alt="Logo" width={74} height={46} priority />
          </div>
        </div>
      </div>
    </header>
  );
};
