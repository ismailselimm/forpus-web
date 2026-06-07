import Image from "next/image";
import { clsx } from "clsx";

export default function Logo({
  variant = "full",
  className,
  priority = false,
}: {
  variant?: "full" | "mark";
  className?: string;
  priority?: boolean;
}) {
  if (variant === "mark") {
    return (
      <Image
        src="/brand/forpus-logo.png"
        alt="Forpus"
        width={44}
        height={44}
        priority={priority}
        className={clsx("h-auto w-auto", className)}
      />
    );
  }
  return (
    <Image
      src="/brand/forpus-yazi.png"
      alt="Forpus Yazılım"
      width={171}
      height={57}
      priority={priority}
      className={clsx("h-auto w-auto", className)}
    />
  );
}
