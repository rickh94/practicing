import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { clsx } from "clsx";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="block">
      <ol className="flex flex-grow-0 rounded-xl bg-neutral-900/10 px-4 py-2 sm:text-xl">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? "text-neutral-900" : "text-neutral-900/50",
              "flex items-center",
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="inline-block">
                <ChevronRightIcon className="h-8 w-8" />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
