import { User, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react";
import { Button as ModalButton } from "@nextui-org/button";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

type Props = {
  session: Session;
};

export const AuthorizedModalContent = ({ session }: Props) => {
  const { username, email, avatar } = session.user;

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalBody className="text-start">
            <User
              name={username}
              description={email}
              avatarProps={{
                src: avatar,
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
