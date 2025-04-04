"use client";

import { useState } from "react";

import styles from "./Accordion.module.css";
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
      <div className={styles.noItems}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.accordionContainer}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`${styles.accordionItem} ${openIndex === index ? styles.open : ""}`}
        >
          <button
            className={styles.accordionHeader}
            onClick={() => toggleAccordion(index)}
            aria-expanded={openIndex === index}
            aria-controls={`accordion-content-${index}`}
          >
            {item.question}
            <span className={styles.accordionIcon}>
              {openIndex === index ? "−" : "+"}
            </span>
          </button>
          <div
            id={`accordion-content-${index}`}
            className={`${styles.accordionContent} ${openIndex === index ? styles.open : ""}`}
            aria-hidden={openIndex !== index}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
