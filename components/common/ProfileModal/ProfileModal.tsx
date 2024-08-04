import { Modal } from "@nextui-org/react";

// import { useSession } from "@/providers";

import { useSession } from "next-auth/react";

import { UnauthorizedModalContent } from "./UnauthorizedModalContent";
import { AuthorizedModalContent } from "./AuthorizedModalContent";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ProfileModal = ({ isOpen, onOpenChange }: Props) => {
  const { data } = useSession();

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="bg-gray-700"
      closeButton={<></>}
      backdrop="blur"
    >
      {data && data?.user ? (
        <AuthorizedModalContent session={data} />
      ) : (
        <UnauthorizedModalContent />
      )}
    </Modal>
  );
};
