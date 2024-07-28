import {
  Avatar,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  User,
} from "@nextui-org/react";
import { Button as ModalButton } from "@nextui-org/button";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

type Props = {
  session: Session;
};

export const AuthorizedModalContent = async ({ session }: Props) => {
  const { username, email } = session.user;

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalBody className="text-center">
            <User
              name={username}
              description={email}
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
            />
          </ModalBody>
          <ModalFooter className="justify-center">
            <ModalButton onClick={() => signOut()}>Sign Out</ModalButton>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  );
};
