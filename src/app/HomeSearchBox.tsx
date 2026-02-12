"use client";

import { ReactElement, useState } from "react";

import { useRouter } from "next/navigation";

import GlobalSearchBoxComponent from "@/components/globall-search-box/globall-search-box.component";

export default function HomeSearchBox(): ReactElement {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (): void => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      router.push("/search");
      return;
    }

    const params = new URLSearchParams();
    params.set("query", trimmedQuery);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <GlobalSearchBoxComponent
      value={query}
      onValueChange={setQuery}
      onSubmit={handleSubmit}
    />
  );
}


