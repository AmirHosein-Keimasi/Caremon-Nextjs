import {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  MouseEvent,
  useMemo,
} from "react";

import clsx from "clsx";

import { SelectOptionType } from "@/types/select-option.type";

type Props = {
  floating?: boolean;
  title?: string;
  placeholder?: string;
  options: SelectOptionType[];
  selectedOption?: SelectOptionType;
  onSelectedOptionChange?: (value: SelectOptionType) => void;
  onIsOpenChange?: (value: boolean) => void;
};

export default function SelectComponent({
  floating,
  title,
  placeholder,
  options,
  selectedOption,
  onSelectedOptionChange,
  onIsOpenChange,
}: Props): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const maximumCharactersCount = useMemo(() => {
    return Math.max(
      placeholder?.length ?? 0,
      ...options.map((option) => option.label.length),
    );
  }, [placeholder, options]);

  const selectOption = useCallback(
    (option: SelectOptionType): void => {
      if (option !== selectedOption) {
        onSelectedOptionChange?.(option);
      }
    },
    [onSelectedOptionChange, selectedOption],
  );

  const optionClickHandler = (
    e: MouseEvent<HTMLLIElement>,
    option: SelectOptionType,
  ): void => {
    e.stopPropagation();

    selectOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
    }

    onIsOpenChange?.(isOpen);
  }, [isOpen, onIsOpenChange]);

  useEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return;
    }

    const keydownHandler = (e: KeyboardEvent): void => {
      if (e.target != containerRef.current) {
        return;
      }

      switch (e.code) {
        case "Enter":
        case "Space": {
          e.preventDefault();

          if (isOpen) {
            selectOption(options[highlightedIndex]);
          }

          setIsOpen((prev) => !prev);

          break;
        }
        case "ArrowUp":
        case "ArrowDown": {
          e.preventDefault();

          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }

          break;
        }
        case "Escape": {
          e.preventDefault();

          setIsOpen(false);
          break;
        }
      }
    };

    containerElement.addEventListener("keydown", keydownHandler);

    return () => {
      containerElement.removeEventListener("keydown", keydownHandler);
    };
  }, [isOpen, highlightedIndex, options, selectOption]);

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((old) => !old)}
      tabIndex={0}
      className={clsx(
        "[scrollbar-color:#888_var(--color-surface-300)] [scrollbar-width:thin] relative flex items-center gap-2 p-2 rounded-[var(--border-radius)] outline-none cursor-default",
        (isOpen || containerRef.current === document.activeElement) &&
          "border border-[var(--color-border)]",
        floating &&
          "bg-[var(--color-surface-700)] shadow-[var(--shadow-400)]",
        floating &&
          !isOpen &&
          containerRef.current !== document.activeElement &&
          "border-transparent",
      )}
    >
      {title && (
        <span className="text-[var(--fz-300)] font-bold">{title}: </span>
      )}

      <span
        className="flex-1"
        style={{
          minInlineSize: `${maximumCharactersCount}ch`,
        }}
      >
        {selectedOption?.label ?? placeholder ?? String.fromCharCode(160)}
      </span>

      <div className="border-[0.25em] border-transparent border-t-[var(--color-border)] translate-y-[25%] [&]:border-t-[var(--color-primary)]"></div>

      {isOpen && (
        <ul className="bg-[var(--color-surface-700)] shadow-[var(--shadow-400)] absolute top-[calc(100%+0.5rem)] left-0 overflow-y-auto z-[100] max-h-[20rem] min-w-full w-max border border-[var(--color-border)] rounded-[var(--border-radius)]">
          {options.map((option, index) => (
            <li
              key={option.value}
              className={clsx(
                "py-1 px-2 cursor-pointer",
                index === highlightedIndex && "bg-[var(--color-surface-300)]",
                option === selectedOption &&
                  "bg-[var(--color-primary)] text-[var(--color-primary-opposite)]",
              )}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={(e) => optionClickHandler(e, option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
