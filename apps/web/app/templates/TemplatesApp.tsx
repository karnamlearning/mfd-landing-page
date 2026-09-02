"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "styled-components";
import { themes } from "@mfd/tokens";
import { BrandLogo } from "../BrandLogo";
import { TEMPLATES_LOGO } from "../brand";
import { CustomSiteBar } from "../place/CustomSiteBar";
import { TemplateGallery } from "../place/TemplateGallery";
import { usePersistDraft } from "../place/persist";
import { useDraft, type ServerDraft } from "../place/store";
import { AuthGlobal } from "../signup/styles";
import * as U from "../place/styles";

export function TemplatesApp() {
  const router = useRouter();
  const hydrate = useDraft((s) => s.hydrate);
  const pickedFamily = useDraft((s) => s.config.pickedFamily);
  const [ready, setReady] = useState(false);

  usePersistDraft();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch("/api/me/config");
      if (res.status === 401 || !res.ok) {
        router.replace("/");
        return;
      }
      const data = (await res.json()) as ServerDraft;
      if (cancelled) return;
      hydrate(data);
      setReady(true);
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [hydrate, router]);

  return (
    <ThemeProvider theme={themes.slate}>
      <AuthGlobal />
      {!ready ? (
        <U.Marketing $white>
          <BrandLogo src={TEMPLATES_LOGO} size="md" />
          <U.StepLead>Loading templates…</U.StepLead>
        </U.Marketing>
      ) : (
        <>
          <TemplateGallery
            browsing={pickedFamily !== false}
            onPicked={() => router.push("/place")}
          />
          <CustomSiteBar />
        </>
      )}
    </ThemeProvider>
  );
}
