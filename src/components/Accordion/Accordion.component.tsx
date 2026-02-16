"use client";

import { useState } from "react";

import Loading from "@/app/loading";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items?: AccordionItem[];
}

export default function Accordion({ items = [] }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items || items.length === 0) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[var(--full-width)] mx-auto py-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={`mb-4 border border-[var(--color-border)] rounded-[var(--border-radius)] overflow-hidden bg-[var(--color-surface-400)] shadow-[var(--shadow-400)] transition-all duration-[var(--animation-duration-normal)] ease-in-out hover:shadow-[var(--shadow-500)] ${
            openIndex === index ? "bg-[var(--color-surface-700)]" : ""
          }`}
        >
          <button
            className="w-full px-3 py-3 flex justify-between items-center bg-[var(--color-surface-400)] border-none cursor-pointer text-base text-[var(--color-text-400)] text-right transition-[background-color] duration-[var(--animation-duration-fast)] ease-in-out hover:bg-[var(--color-surface-700)]"
            onClick={() => toggleAccordion(index)}
            aria-expanded={openIndex === index}
            aria-controls={`accordion-content-${index}`}
          >
            {item.question}
            <span
              className={`text-[var(--fz-700)] text-[var(--color-primary)] transition-transform duration-[var(--animation-duration-normal)] ease-in-out ${
                openIndex === index ? "rotate-180" : ""
              }`}
            >
              {openIndex === index ? "−" : "+"}
            </span>
          </button>
          <div
            id={`accordion-content-${index}`}
            className={`overflow-hidden transition-[max-height,padding] duration-[var(--animation-duration-normal)] ease-out bg-[var(--color-surface-400)] ${
              openIndex === index
                ? "max-h-[1000px] p-4"
                : "max-h-0"
            }`}
            aria-hidden={openIndex !== index}
          >
            <p className="m-0 leading-relaxed text-[var(--color-text-700)]">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
