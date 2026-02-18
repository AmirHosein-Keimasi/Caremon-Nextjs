"use client";

import * as React from "react";
import {
  Accordion as ShadcnAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Loading from "@/app/loading";

/** آیتم ساده برای سوال‌و‑جواب (مثل سوالات متداول) */
export interface AccordionQAItem {
  question: string;
  answer: string;
}

/** آیتم با محتوای دلخواه (مثل شرایط و قوانین) */
export interface AccordionSectionItem {
  value: string;
  title: string;
  content: React.ReactNode;
}

const itemWrapperClass =
  "w-full min-w-0 border border-border rounded-lg overflow-hidden px-2 data-[state=open]:bg-muted/50";
const triggerClass =
  "w-full min-w-0 hover:no-underline py-3 text-right text-sm font-semibold lg:py-4 lg:text-base [&[data-state=open]>svg]:rotate-180";
const contentClass =
  "w-full min-w-0 px-3 py-2.5 border-t border-border text-xs leading-relaxed text-muted-foreground break-words overflow-hidden lg:px-4 lg:py-3 lg:text-sm";

interface AccordionProps {
  /** آیتم‌های سوال‌و‑جواب (سوالات متداول) */
  items?: AccordionQAItem[];
  /** آیتم‌های با محتوای دلخواه (شرایط و قوانین). در صورت ارسال، items نادیده گرفته می‌شود */
  sections?: AccordionSectionItem[];
  /** مقدار آیتم باز به‌طور پیش‌فرض (فقط برای sections) */
  defaultValue?: string;
}

export default function Accordion({
  items = [],
  sections,
  defaultValue,
}: AccordionProps) {
  const normalizedSections: AccordionSectionItem[] = React.useMemo(() => {
    if (sections && sections.length > 0) {
      return sections;
    }
    return items.map((item, index) => ({
      value: `item-${index}`,
      title: item.question,
      content: (
        <p className="m-0 leading-relaxed text-foreground pb-1 lg:pb-2">
          {item.answer}
        </p>
      ),
    }));
  }, [items, sections]);

  if (normalizedSections.length === 0) {
    return (
      <div className="w-full py-4">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 max-w-full py-1">
      <ShadcnAccordion
        type="single"
        collapsible
        defaultValue={
          defaultValue ??
          (normalizedSections[0] ? normalizedSections[0].value : undefined)
        }
        className="w-full min-w-0 max-w-full space-y-2"
      >
        {normalizedSections.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            className={itemWrapperClass}
          >
            <AccordionTrigger className={triggerClass}>
              {item.title}
            </AccordionTrigger>
            <AccordionContent className={contentClass}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </ShadcnAccordion>
    </div>
  );
}
