"use client";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { cn } from "~/lib/util";
import { CrossFadeContentFast } from "~/app/_components/transitions";

const links = [
  { href: "/practice/random-spots", label: "Random Spots" },
  { href: "/practice/repeat", label: "Repeat Practice" },
  { href: "/practice/starting-point", label: "Random Starting Point" },
];

export function TitleLinkMenu() {
  const pathname = usePathname();
  const current = links.find((link) => link.href === pathname);
  return (
    <Menu as="div" className="relative -mt-4 inline-block text-left">
      <Menu.Button className="focusable inline-flex h-14 w-full items-center justify-center gap-x-1.5 rounded-xl bg-neutral-700/10 px-6 py-4 shadow-sm hover:bg-neutral-700/20">
        {({ open }) => (
          <>
            <CrossFadeContentFast
              id={open ? "open" : "closed"}
              component={
                open ? (
                  <>
                    <div className="sr-only">Close Practice Tools Menu</div>
                    <XMarkIcon
                      className="-ml-2 h-6 w-6 text-neutral-800"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <>
                    <div className="sr-only">Open Practice Tools Menu</div>
                    <Bars3CenterLeftIcon
                      className="-ml-2 h-6 w-6 text-neutral-800"
                      aria-hidden="true"
                    />
                  </>
                )
              }
            />
            {!!current?.label ? (
              <h1 className="text-xl font-semibold tracking-tight text-neutral-800 sm:text-2xl">
                {current.label}
              </h1>
            ) : (
              <span className="font-semibold text-neutral-700">
                Practice Tools
              </span>
            )}
          </>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-lg bg-[#fffaf0]/90 shadow-lg  ring-1 ring-black ring-opacity-5 backdrop-blur focus:outline-none"
          as="nav"
        >
          <ul className="flex flex-col gap-0">
            {links.map((link) => (
              <Menu.Item
                key={link.href}
                as="li"
                className={cn(
                  "w-full text-lg text-neutral-800 first:rounded-t-lg last:rounded-b-lg",
                  {
                    "bg-neutral-700/10 font-bold": link.href === pathname,
                    "font-semibold hover:bg-neutral-800/10":
                      link.href !== pathname,
                  },
                )}
              >
                <Link
                  href={link.href}
                  className="block h-full w-full px-2 py-2"
                >
                  {link.label}
                </Link>
              </Menu.Item>
            ))}
          </ul>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
