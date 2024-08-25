import {
  faArrowPointer,
  faFont,
  faHand,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle, faSquare } from "@fortawesome/free-regular-svg-icons";

import { Tool } from "@/types";

export const toolBarOptions = [
  {
    id: Tool.POINTER,
    icon: faArrowPointer,
  },
  {
    id: Tool.GRAB,
    icon: faHand,
  },
  {
    id: Tool.RECTANGLE,
    icon: faSquare,
  },
  {
    id: Tool.CIRCLE,
    icon: faCircle,
  },
  {
    id: Tool.TEXT,
    icon: faFont,
  },
  {
    id: Tool.PENCIL,
    icon: faPencil,
  },
];

export const STORAGE_KEY = {
  SHAPES: "SHAPES",
  TOOL: "TOOL",
  ACTIVE_SHAPE: "ACTIVE_SHAPE",
};
