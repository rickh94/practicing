import { type ButtonHTMLAttributes, type DetailedHTMLProps } from "react";
import { cn } from "~/lib/util";
import { topNavClasses } from "./links";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  grow?: boolean;
};

export function BasicButton({
  disabled,
  children,
  type = "button",
  grow = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(
        "focusable flex items-center justify-center gap-1  rounded-xl px-4 py-2 font-semibold transition duration-200",
        disabled
          ? "pointer-events-none bg-neutral-700/50 text-neutral-800"
          : "bg-neutral-700/10 text-neutral-800 hover:bg-neutral-700/20",
        grow && "flex-grow",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function HappyButton({
  disabled,
  children,
  type = "button",
  grow = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(
        "focusable flex items-center justify-center gap-1 rounded-xl px-4 py-2 font-semibold transition duration-200",
        disabled
          ? "pointer-events-none bg-neutral-700/50 text-neutral-800"
          : "bg-green-700/10 text-green-800 hover:bg-green-700/20",
        grow && "flex-grow",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ColorlessButton({
  disabled,
  children,
  type = "button",
  grow = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(
        "focusable flex items-center justify-center gap-1 rounded-xl px-4 py-2 font-semibold transition duration-200",
        disabled
          ? "pointer-events-none bg-neutral-700/50 text-neutral-800"
          : "",
        grow && "flex-grow",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function AngryButton({
  disabled,
  children,
  type = "button",
  grow = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(
        "focusable flex items-center justify-center gap-1 rounded-xl px-4 py-2 font-semibold transition duration-200",
        disabled
          ? "pointer-events-none bg-neutral-700/50 text-neutral-800"
          : "bg-red-700/10 text-red-800 hover:bg-red-700/20",
        grow && "flex-grow",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function WarningButton({
  disabled,
  children,
  type = "button",
  grow = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(
        "focusable flex items-center justify-center gap-1 rounded-xl px-4 py-2 font-semibold transition duration-200",
        disabled
          ? "pointer-events-none bg-neutral-700/50 text-neutral-800"
          : "bg-yellow-700/10 text-yellow-800 hover:bg-yellow-700/20",
        grow && "flex-grow",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function TopNavButton({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={cn(topNavClasses, className)} {...props}>
      {children}
    </button>
  );
}
export function ReadMoreButton({ className = "", ...props }: ButtonProps) {
  return (
    <TopNavButton className={className} {...props}>
      <span>Read More</span>
      <InformationCircleIcon className="-mr-1 h-6 w-6" />
    </TopNavButton>
  );
}

export function GiantBasicButton({
  disabled,
  children,
  type = "button",
  grow = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(
        "focusable flex items-center justify-center gap-1 rounded-xl px-8 py-4 text-2xl font-semibold transition duration-200",
        disabled
          ? "pointer-events-none bg-neutral-700/50 text-neutral-800"
          : "bg-neutral-700/10 text-neutral-800 hover:bg-neutral-700/20",
        grow && "flex-grow",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function GiantWarningButton({
  disabled,
  children,
  type = "button",
  grow = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(
        "focusable flex items-center justify-center gap-1 rounded-xl px-8 py-4 text-2xl font-semibold transition duration-200",
        disabled
          ? "pointer-events-none bg-neutral-700/50 text-neutral-800"
          : "bg-yellow-700/10 text-yellow-800 hover:bg-yellow-700/20",
        grow && "flex-grow",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function GiantHappyButton({
  disabled,
  children,
  type = "button",
  grow = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(
        "focusable flex items-center justify-center gap-1 rounded-xl px-8 py-4 text-2xl font-semibold transition duration-200",
        disabled
          ? "pointer-events-none bg-neutral-700/50 text-neutral-800"
          : "bg-green-700/10 text-green-800 hover:bg-green-700/20",
        grow && "flex-grow",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function BigAngryButton({
  disabled,
  children,
  type = "button",
  grow = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(
        "focusable flex items-center justify-center gap-1 rounded-xl px-6 py-4 text-2xl font-semibold transition duration-200",
        disabled
          ? "pointer-events-none bg-neutral-700/50 text-neutral-800"
          : "bg-red-700/10 text-red-800 hover:bg-red-700/20",
        grow && "flex-grow",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function BigHappyButton({
  disabled,
  children,
  type = "button",
  grow = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(
        "focusable flex items-center justify-center gap-1 rounded-xl px-6 py-4 text-2xl font-semibold transition duration-200",
        disabled
          ? "pointer-events-none bg-neutral-700/50 text-neutral-800"
          : "bg-green-700/10 text-green-800 hover:bg-green-700/20",
        grow && "flex-grow",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
