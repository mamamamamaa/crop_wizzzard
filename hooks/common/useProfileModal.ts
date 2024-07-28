import { useRouter, useSearchParams } from "next/navigation";
import { useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";

export const useProfileModal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const profile = searchParams.get("profile");

  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    defaultOpen: profile === "true",
  });

  useEffect(() => {
    if (profile === "true") {
      const currentUrl = new URL(window.location.href);

      currentUrl.searchParams.delete("profile");

      router.replace(currentUrl.toString(), { scroll: false });
    }
  }, [profile, router]);

  return {
    isOpen,
    onOpen,
    onOpenChange,
  };
};
