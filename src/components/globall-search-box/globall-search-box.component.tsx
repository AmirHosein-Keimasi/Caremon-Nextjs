"use client";

import { KeyboardEvent, ReactElement } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";

type Props = {
  value?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: () => void;
};

export default function GlobalSearchBoxComponent({
  value,
  onValueChange,
  onSubmit,
}: Props): ReactElement {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit?.();
    }
  };

  return (
    <div className="flex w-full max-w-full items-center gap-2 rounded-full border border-border px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 lg:w-[min(50rem,100%)] lg:px-4">
      <div className="grid items-center text-lg focus-within:text-primary">
        <Search />
      </div>
      <Input
        type="text"
        placeholder="نوع خودرو ، محل تحویل ، استان و شهرستان و ..."
        value={value ?? ""}
        onChange={(event) => onValueChange?.(event.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 border-0 bg-transparent py-4 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <div className="bg-border h-8 w-px"></div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onSubmit}
        className="gap-1 text-foreground flex items-center"
      >
        <MapPin className="text-[1.5em]" />
        همه شهرها
      </Button>
    </div>
  );
}
