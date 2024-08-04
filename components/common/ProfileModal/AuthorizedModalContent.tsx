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
          <ModalBody>
            <div className="flex flex-row justify-between items-center">
              <User
                name={username}
                description={email}
                avatarProps={{
                  src: avatar,
                }}
              />
              <ModalButton onClick={() => signOut()}>Sign Out</ModalButton>
            </div>

            <div>
              <p>Saves: {session.user.draws?.length}</p>

              <ul>{}</ul>
            </div>
          </ModalBody>
          <ModalFooter className="justify-center"></ModalFooter>
        </>
      )}
    </ModalContent>
  );
};
