import { Modal } from "@nextui-org/react";

import { useSession } from "@/providers";

import { UnauthorizedModalContent } from "./UnauthorizedModalContent";
import { AuthorizedModalContent } from "./AuthorizedModalContent";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ProfileModal = ({ isOpen, onOpenChange }: Props) => {
  const session = useSession();

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="bg-gray-700"
      closeButton={<></>}
      backdrop="blur"
    >
      {!session ? (
        <UnauthorizedModalContent />
      ) : (
        <AuthorizedModalContent session={session} />
      )}
    </Modal>
  );
};
