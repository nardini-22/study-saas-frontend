// Tremor Toaster [v0.0.0]

"use client";

import { useToast } from "@/presentation/hooks";

import { Toast, ToastProvider, ToastViewport } from "./toast";

const Toaster = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(({ id, ...props }) => {
        return <Toast key={id} {...props} />;
      })}
      <ToastViewport />
    </ToastProvider>
  );
};

export { Toaster };
