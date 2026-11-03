import React from "react";
import {
  QueryClientProvider as TanstackProvider,
  QueryClient
} from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function ReactQueryProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <TanstackProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </TanstackProvider>
  );
}
