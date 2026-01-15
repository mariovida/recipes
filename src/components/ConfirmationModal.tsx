"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { BadgeCheck } from "lucide-react";
import "@/styles/components/confirmationModal.scss";

type ConfirmationModalProps = {
  open: boolean;
  onClose: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm?: () => void;
  icon?: React.ReactNode;
  confirmLabel?: string;
};

export default function ConfirmationModal({
  open,
  onClose,
  title,
  description,
  onConfirm,
  icon,
  confirmLabel,
}: ConfirmationModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-content">
          <Dialog.Title>
            <span>{icon ?? <BadgeCheck size={22} color="#f0960f" />}</span>
            {title}
          </Dialog.Title>
          <Dialog.Description className="modal-description">
            {description}
          </Dialog.Description>

          <button
            className="btn-primary"
            onClick={() => {
              onClose(false);
              onConfirm?.();
            }}
          >
            {confirmLabel ?? "Zatvori"}
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
