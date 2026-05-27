"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  alternative: string;
}

export default function SubmitButton({ title, alternative }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? alternative : title}
    </Button>
  );
}
