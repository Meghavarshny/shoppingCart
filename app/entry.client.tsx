import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

// Handle hydration error gracefully for static hosting
function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <HydratedRouter />
      </StrictMode>,
    );
  });
}

// Support async hydration for better compatibility with static hosting
if (typeof window !== "undefined" && window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Fallback to immediate hydration
  hydrate();
}