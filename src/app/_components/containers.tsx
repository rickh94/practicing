import { cn } from "~/lib/util";

export function TwoColumnPageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative grid w-full grid-cols-1 gap-x-2 gap-y-4 sm:max-w-6xl md:grid-cols-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BreadcrumbContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2 md:mx-auto md:max-w-6xl md:flex-row md:items-center md:justify-between md:gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function NarrowPageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full justify-center p-4 sm:mx-auto sm:max-w-4xl">
      {children}
    </div>
  );
}

export function FiveColumnPageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative grid w-full grid-cols-1 gap-x-2 gap-y-4 sm:max-w-6xl lg:grid-cols-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
