import { FC } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button as ModalButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { Tool } from "@/types";
import { toolBarOptions } from "@/constants";

import { Button } from "./Button";

interface ToolBarProps {
  activeTool: string;
  onChange: (tool: Tool) => void;
}

export const ToolBar: FC<ToolBarProps> = ({ activeTool, onChange }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <div>
        <menu className="flex z-20 items-center absolute p-2 top-5 left-1/2 -translate-x-1/2 w-fit gap-1 rounded-lg bg-gray-800">
          {toolBarOptions.map((option, i) => {
            return (
              <Button
                onClick={() => onChange(option.id)}
                active={option.id === activeTool}
                key={option.id}
              >
                <FontAwesomeIcon icon={option.icon} />
                <span className="absolute text-xs right-1 bottom-0">
                  {i + 1}
                </span>
              </Button>
            );
          })}
        </menu>
        <div className="z-20 absolute p-1 top-6 right-1 -translate-x-1/2 w-fit gap-1 rounded-lg bg-gray-800">
          <Button onClick={onOpen}>
            <FontAwesomeIcon icon={faUser} />
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-gray-700"
        closeButton={<></>}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                This could be your profile and your saves 😋
              </ModalHeader>
              <ModalBody className="text-center">
                <p>
                  Access your profile to view and manage your saved items,
                  preferences, and settings. Keep track of your favorite tools
                  and easily access them anytime.
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
                  Register
                </ModalButton>
                <ModalButton color="default" onPress={onClose}>
                  Next Time 😭
                </ModalButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
