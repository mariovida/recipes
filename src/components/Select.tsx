"use client";

import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDown, ChevronUp } from "lucide-react";
import "@/styles/components/select.scss";

export function Select<T extends string>({
  name,
  value,
  onValueChange,
  children,
}: {
  name: string;
  value: T;
  onValueChange: (v: T) => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <input type="hidden" name={name} value={value} />

      <RadixSelect.Root
        value={value}
        onValueChange={(v) => onValueChange(v as T)}
      >
        <RadixSelect.Trigger className="select-trigger">
          <RadixSelect.Value />
          <RadixSelect.Icon>
            <ChevronDown />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            className="select-content"
            position="popper"
            side="bottom"
            align="start"
            sideOffset={5}
          >
            <RadixSelect.ScrollUpButton className="select-scroll-btn">
              <ChevronUp />
            </RadixSelect.ScrollUpButton>

            <RadixSelect.Viewport className="select-viewport">
              {children}
            </RadixSelect.Viewport>

            <RadixSelect.ScrollDownButton className="select-scroll-btn">
              <ChevronDown />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </>
  );
}

export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <RadixSelect.Item className="select-item" value={value}>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
}
