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
    <div className="w-full max-w-[85rem] mx-auto py-4">
      <ShadcnAccordion type="single" collapsible className="space-y-2">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-border rounded-lg overflow-hidden bg-card shadow-md px-2 data-[state=open]:bg-muted"
          >
            <AccordionTrigger className="hover:no-underline py-4 text-right [&[data-state=open]>svg]:rotate-180">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="m-0 leading-relaxed text-foreground pb-4">
                {item.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </ShadcnAccordion>
    </div>
  );
}
