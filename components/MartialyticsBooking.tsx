"use client";

import { useEffect, useRef } from "react";

// Inline Martialytics Bookings widget. Activates only when both env vars are
// set (School ID + Hash from Martialytics → Widgets page), so the site falls
// back to the built-in form until the gym's credentials are in place.
//
// NOTE: this uses the loader shape from Martialytics' public docs. If your
// account's Widgets page shows a slightly different embed snippet, paste that
// exact snippet's config here — that page is the authoritative source.
const SCHOOL = process.env.NEXT_PUBLIC_MARTIALYTICS_SCHOOL;
const HASH = process.env.NEXT_PUBLIC_MARTIALYTICS_HASH;

export default function MartialyticsBooking() {
  const initialised = useRef(false);

  useEffect(() => {
    if (!SCHOOL || !HASH || initialised.current) return;
    initialised.current = true;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const w = window as any;
    (function (ma: any, rt: Document, ia: string, ly: string, ti: string) {
      ma["bookings"] = ly;
      ma[ly] =
        ma[ly] ||
        function () {
          (ma[ly].q = ma[ly].q || []).push(arguments);
        };
      const c = rt.createElement(ia) as HTMLScriptElement;
      const s = rt.getElementsByTagName(ia)[0];
      c.id = ly;
      c.src = ti;
      c.async = true;
      s.parentNode?.insertBefore(c, s);
    })(w, document, "script", "ma", "//martialytics.com/widgets/bookings/loader.js");

    w.ma("school", SCHOOL);
    w.ma("hash", HASH);
    w.ma("element", "bookings_widget");
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }, []);

  if (!SCHOOL || !HASH) return null;

  return <div id="bookings_widget" />;
}
