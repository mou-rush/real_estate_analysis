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
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center md:justify-between gap-4">
        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <nav className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
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

        <div className="w-full md:w-auto flex justify-center">
          <div className="flex items-center space-x-2 w-full md:w-auto">
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
              className="flex-1 md:w-[320px] h-[36px] pt-[4px] pr-[12px] pb-[4px] pl-[12px] border border-[#E4E4E7] rounded-tl-[12px] rounded-tr-[12px] rounded-br-[12px] text-sm bg-[#FFFFFF] shadow-[0px_1px_2px_0px_#0000000D]"
            />
          </div>
        </div>
        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <Image src="/logo.svg" alt="Logo" width={74} height={46} priority />
        </div>
      </div>
    </header>
  );
};
