"use client";
import { useFormStatus } from "react-dom";
import { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface Props extends ComponentProps<typeof Button> {
  title: string;
  alternative: string;
  pending?: boolean;
}

export default function StateButton({ title, alternative, pending, ...props }: Props) {
  const { pending: formPending } = useFormStatus();

  const isPending = pending || formPending;
  return (
    <Button {...props} disabled={props.disabled || isPending}>
      {isPending && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
      {isPending ? alternative : title}
    </Button>
  );
}
