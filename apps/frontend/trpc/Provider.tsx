"use client";
import { TRPCRouter } from "@server/modules/trpc/trpc.routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";

export const trpc = createTRPCReact<TRPCRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 缓存数据 5 分钟内保持新鲜
        cacheTime: 1000 * 60 * 10, // 10 分钟后从内存中移除
        refetchOnWindowFocus: false, // 切换回页面时不自动重新获取数据
        retry: 2, // 请求失败后重试 2 次
        refetchOnReconnect: true, // 重新连接网络时重新获取数据
      },
    },
  }));

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchLink({
          url: 'http://localhost:3001/trpc',
          headers() {
            return {
              "x-trpc-source": "react",
            };
          },
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </trpc.Provider>
    </QueryClientProvider>
  );
}
