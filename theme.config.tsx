import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useConfig, type DocsThemeConfig } from "nextra-theme-docs";
import Navigation from "./components/Navigation";
import HeaderLogo from "./components/HeaderLogo";
import ExtraContent from "./components/ExtraContent";

const config: DocsThemeConfig = {
  sidebar: {
    defaultMenuCollapseLevel: 10000,
  },
  docsRepositoryBase:
    "https://github.com/TinsFox/front-end-diary/blob/main/docs",
  useNextSeoProps: function SEO() {
    const router = useRouter();
    const { frontMatter } = useConfig();

    let section = "Front End Diary";
    if (router?.pathname.startsWith("/diary")) {
      section = "Diary";
    }

    const defaultTitle = frontMatter.overrideTitle || section;

    return {
      description: frontMatter.description,
      defaultTitle,
      titleTemplate: `%s – ${section}`,
    };
  },
  gitTimestamp({ timestamp }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [dateString, setDateString] = useState(timestamp.toISOString());

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      try {
        setDateString(
          timestamp.toLocaleDateString(navigator.language, {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        );
      } catch (e) {
        // Ignore errors here; they get the ISO string.
        // At least one person out there has manually misconfigured navigator.language.
      }
    }, [timestamp]);

    return <>Last updated on {dateString}</>;
  },
  toc: {
    float: true,
    extraContent: ExtraContent,
  },
  // font: false,
  logo: HeaderLogo,
  logoLink: false,
  i18n: [],
  editLink: {
    text: "Edit this page on GitHub",
  },
  navbar: {
    component: Navigation,
  },
  search: {
    placeholder: "Search documentation…",
  },
  footer: {},
  nextThemes: {
    defaultTheme: "dark",
  },
};

export default config;
