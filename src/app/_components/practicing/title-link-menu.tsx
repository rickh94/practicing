import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { cn } from "~/lib/util";

const links = [
  { href: "/practice/random-spots", label: "Spot Randomizer" },
  { href: "/practice/repeat", label: "Repeat Practicer" },
  { href: "/practice/starting-point", label: "Starting Point Randomizer" },
];

// TODO: play with sizing and padding
export function TitleLinkMenu() {
  const pathname = usePathname();
  const current = links.find((link) => link.href === pathname);
  if (!current) return <div>This cannot be used on this page</div>;
  return (
    <Menu as="div" className="relative -mt-4 inline-block text-left">
      <Menu.Button className="focusable inline-flex w-full items-center justify-center gap-x-1.5 rounded-xl bg-neutral-700/10 px-4 py-2 shadow-sm hover:bg-neutral-700/20">
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-800">
          {current.label}
        </h1>
        <div className="sr-only">Open Practice Tools Menu</div>
        <ChevronDownIcon
          className="-mr-1 h-10 w-10 text-neutral-800"
          aria-hidden="true"
        />
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
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-[#fffaf0]/90 shadow-lg  ring-1 ring-black ring-opacity-5 backdrop-blur focus:outline-none"
          as="nav"
        >
          <ul className="flex flex-col gap-0">
            {links.map((link) => (
              <Menu.Item
                key={link.href}
                as="li"
                className={cn(
                  "w-full text-lg font-medium text-neutral-800 first:rounded-t-lg last:rounded-b-lg",
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
