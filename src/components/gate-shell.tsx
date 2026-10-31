"use client";

import { memo, useSyncExternalStore, type ReactNode } from "react";
import { usePlanner } from "@/components/planner-context";

function useHasMounted() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
}

/**
 * Keeps heavy home chrome unmounted while the welcome gate is open,
 * so step interactions are not competing with the desk map / planner tree.
 */
export const GateShell = memo(function GateShell({
  welcome,
  header,
  footer,
  planner,
  children,
}: {
  welcome: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  planner: ReactNode;
  children: ReactNode;
}) {
  const mounted = useHasMounted();
  const { gate } = usePlanner();
  const blockApp = !mounted || gate;

  return (
    <>
      {welcome}
      {blockApp ? null : (
        <>
          {header}
          <div id="content" className="flex-1">
            {children}
          </div>
          {footer}
          {planner}
        </>
      )}
      {blockApp ? <div id="content" className="flex-1" aria-hidden /> : null}
    </>
  );
});
