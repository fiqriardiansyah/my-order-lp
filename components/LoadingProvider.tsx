"use client";

import { createContext, useCallback, useContext, useState } from "react";

interface LoadingContextValue {
  loading: boolean;
  setLoading: (v: boolean) => void;
}

const LoadingContext = createContext<LoadingContextValue>({
  loading: false,
  setLoading: () => {},
});

export function useLoading() {
  return useContext(LoadingContext);
}

function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/20 backdrop-blur-md">
      <div className="relative w-21 h-21 flex items-center justify-center">
        <svg
          className="absolute top-0 left-0 animate-spin"
          width="84"
          height="84"
          viewBox="0 0 84 84"
          aria-hidden
        >
          <circle
            cx="42"
            cy="42"
            r="36"
            fill="none"
            stroke="var(--brand)"
            strokeWidth="3.5"
            strokeDasharray="170 57"
            strokeLinecap="round"
          />
        </svg>
        <div
          className="kasigo-mark relative z-10"
          style={{ width: 52, height: 52, fontSize: 24, borderRadius: 13 }}
        >
          K
        </div>
      </div>
    </div>
  );
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoadingState] = useState(false);
  const setLoading = useCallback((v: boolean) => setLoadingState(v), []);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <GlobalLoader />}
    </LoadingContext.Provider>
  );
}
