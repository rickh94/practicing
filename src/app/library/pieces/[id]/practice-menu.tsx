"use client";

import { Menu, Transition } from "@headlessui/react";
import { PlayIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Fragment } from "react";
import { type BasicPiece } from "~/lib/validators/library";

export function PracticeMenu({ piece }: { piece: BasicPiece }) {
  const links = [
    {
      href: `/library/pieces/${piece.id}/practice/random-spots`,
      label: "Random Spots",
    },
    {
      href: `/library/pieces/${piece.id}/practice/repeat`,
      label: "Repeat Practice",
    },
    {
      href: `/library/pieces/${piece.id}/practice/starting-point`,
      label: "Random Starting Point",
    },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="focusable flex items-center justify-center gap-1 rounded-xl bg-green-700/10 px-4 py-2 font-semibold text-green-800  transition duration-200 hover:bg-green-700/20">
        <PlayIcon className="-ml-1 h-5 w-5" />
        Practice
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
          className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-lg bg-green-50/90 shadow-lg  ring-1 ring-black ring-opacity-5 backdrop-blur focus:outline-none"
          as="nav"
        >
          <ul className="flex flex-col gap-0">
            {links.map((link) => (
              <Menu.Item
                key={link.href}
                as="li"
                className="w-full text-lg font-semibold text-green-900 first:rounded-t-lg last:rounded-b-lg hover:bg-neutral-800/10"
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
