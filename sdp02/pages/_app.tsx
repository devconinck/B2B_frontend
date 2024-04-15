import { type AppType } from "next/app";

import "@/styles/globals.css";

import { ThemeProvider } from "../components/theme-provider";
import Layout from "./layout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
