'use client'

import { Button } from "@mach/shared/ui";
import { useRouter } from "next/navigation";

export function CloseButton() {
  const router = useRouter();

  return <Button variant="danger" onClick={() => router.back()}>Close</Button>
}
