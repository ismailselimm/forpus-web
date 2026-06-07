import { clsx } from "clsx";

export default function Aurora({ className }: { className?: string }) {
  return (
    <div className={clsx("aurora", className)} aria-hidden="true">
      <span className="aurora-blob b1" />
      <span className="aurora-blob b2" />
      <span className="aurora-blob b3" />
    </div>
  );
}
