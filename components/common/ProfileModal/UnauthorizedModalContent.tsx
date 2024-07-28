import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Button as ModalButton } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export const UnauthorizedModalContent = () => {
  const router = useRouter();

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1 text-center">
            This could be your profile and your saves 😋
          </ModalHeader>
          <ModalBody className="text-center">
            <p>
              Access your profile to view and manage your saved items,
              preferences, and settings. Keep track of your favorite tools and
              easily access them anytime.
            </p>
            <p>To access this feature, please register or log in.</p>
          </ModalBody>
          <ModalFooter className="justify-center">
            <ModalButton
              color="primary"
              onPress={() => {
                onClose();
                router.push("/auth/sign-in");
              }}
            >
              Login
            </ModalButton>
            <ModalButton color="default" onPress={onClose}>
              Next Time 😭
            </ModalButton>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  );
};
