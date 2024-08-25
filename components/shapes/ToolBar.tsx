import { FC } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Tool } from "@/types";
import { toolBarOptions } from "@/constants";
import { useProfileModal } from "@/hooks";
import { ProfileModal } from "@/components";

import { Button } from "./Button";

interface ToolBarProps {
  activeTool: string;
  onChange: (tool: Tool) => void;
}

export const ToolBar: FC<ToolBarProps> = ({ activeTool, onChange }) => {
  const { isOpen, onOpen, onOpenChange } = useProfileModal();

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

      <ProfileModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
