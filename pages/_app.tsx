import { type AppType } from "next/app";

import "@/styles/globals.css";

import { ThemeProvider } from "../components/theme-provider";
import Layout from "./layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const MyApp: AppType = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default MyApp;