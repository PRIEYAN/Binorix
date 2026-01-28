// This file MUST be imported on the server BEFORE anything else
// This prevents any dependency (wagmi, rainbowkit, etc.) from trying to use localStorage on the server

if (typeof window === "undefined") {
  Object.defineProperty(globalThis, "localStorage", {
    value: undefined,
    writable: false,
    configurable: false,
  });
}
