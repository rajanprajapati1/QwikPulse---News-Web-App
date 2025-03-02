import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import {  routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import styles from "./styles.css?inline";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <main>
        <Navbar/>
        <Slot />
        <Footer/>
      </main>
    </>
  );
});
