/**
 * Fix for Node.js --localstorage-file providing a broken localStorage
 * (getItem is not a function) when the path is invalid.
 * This ensures server-side code never hits that error.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const g = globalThis as typeof globalThis & { localStorage?: Storage };
  if (
    typeof g.localStorage !== "undefined" &&
    typeof g.localStorage.getItem !== "function"
  ) {
    g.localStorage = {
      getItem: () => null,
      setItem: () => { },
      removeItem: () => { },
      clear: () => { },
      key: () => null,
      get length() {
        return 0;
      },
    };
  }
}
