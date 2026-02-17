"use client";

import {
  Accordion as ShadcnAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Loading from "@/app/loading";

interface AccordionItemType {
  question: string;
  answer: string;
}

interface AccordionProps {
  items?: AccordionItemType[];
}

export default function Accordion({ items = [] }: AccordionProps) {
  if (!items || items.length === 0) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[var(--full-width)] mx-auto py-4">
      <ShadcnAccordion type="single" collapsible className="space-y-2">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-[var(--color-border)] rounded-[var(--border-radius)] overflow-hidden bg-[var(--color-surface-400)] shadow-[var(--shadow-400)] px-2 data-[state=open]:bg-[var(--color-surface-700)]"
          >
            <AccordionTrigger className="hover:no-underline py-4 text-right [&[data-state=open]>svg]:rotate-180">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="m-0 leading-relaxed text-[var(--color-text-700)] pb-4">
                {item.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </ShadcnAccordion>
    </div>
  );
}
