import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Home from "~/components/home";

export default component$(() => {
  return <Home />
});

export const head: DocumentHead = {
  title: "QwikPulse - Instant News Updates",
  meta: [
    {
      name: "description",
      content: "QwikPulse delivers fast, reliable news updates across general, technology, business, sports, entertainment, health, and science categories.",
    },
    {
      name: "keywords",
      content: "news, QwikPulse, breaking news, technology, business, sports, entertainment, health, science",
    },
    {
      property: "og:title",
      content: "QwikPulse - Instant News Updates",
    },
    {
      property: "og:description",
      content: "Stay informed with QwikPulse's lightning-fast news coverage across all major categories.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.qwikpulse.com", 
    },
    {
      property: "og:image",
      content: "https://www.qwikpulse.com/og-image.jpg", 
    },
    // Twitter Card
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "QwikPulse - Instant News Updates",
    },
    {
      name: "twitter:description",
      content: "Get the latest news instantly with QwikPulse.",
    },
    {
      name: "twitter:image",
      content: "https://www.qwikpulse.com/twitter-image.jpg", 
    },
  ],
  links: [
    {
      rel: "canonical",
      href: "https://www.qwikpulse.com",
    },
    {
      rel: "icon",
      href: "/favicon.svg", 
    },
  ],
};
