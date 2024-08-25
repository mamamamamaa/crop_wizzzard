"use client";
import {
  createContext,
  Dispatch,
  MutableRefObject,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { debounce } from "lodash";

import { Shape } from "@/types";
import { STORAGE_KEY } from "@/constants";
import { ShapeAPI } from "@/types/api";

type ContextType = {
  shapes: Shape[];
  setShapes: Dispatch<SetStateAction<Shape[]>>;
  activeShape: ShapeAPI | null;
  setActiveShape: Dispatch<SetStateAction<ShapeAPI | null>>;
  stageRef: MutableRefObject<any> | null;
};

const defaultContext: ContextType = {
  shapes: [],
  setShapes: () => {},
  activeShape: null,
  setActiveShape: () => {},
  stageRef: null,
};

const ShapeContext = createContext<ContextType>(defaultContext);

export const ShapeProvider = ({ children }: PropsWithChildren) => {
  const stageRef = useRef(null);
  const [shapesConfig, setShapesConfig] = useState<Shape[]>([]);
  const [activeShape, setActiveShape] = useState<ShapeAPI | null>(null);

  const debouncedSave = useCallback(
    debounce(
      (shapesToSave) =>
        localStorage.setItem(STORAGE_KEY.SHAPES, JSON.stringify(shapesToSave)),
      1000,
    ),
    [],
  );

  useEffect(() => {
    debouncedSave(shapesConfig);
  }, [shapesConfig, debouncedSave]);

  useEffect(() => {
    const shapesFromStorage = localStorage.getItem(STORAGE_KEY.SHAPES);
    const activeShapeFromStorage = localStorage.getItem(
      STORAGE_KEY.ACTIVE_SHAPE,
    );

    if (shapesFromStorage) {
      setShapesConfig(JSON.parse(shapesFromStorage));
    }

    if (activeShapeFromStorage) {
      setActiveShape(JSON.parse(activeShapeFromStorage));
    }
  }, []);

  useEffect(() => {
    if (activeShape) {
      localStorage.setItem(
        STORAGE_KEY.ACTIVE_SHAPE,
        JSON.stringify(activeShape),
      );
    }
  }, [activeShape]);

  return (
    <ShapeContext.Provider
      value={{
        setShapes: setShapesConfig,
        shapes: shapesConfig,
        activeShape,
        setActiveShape,
        stageRef,
      }}
    >
      {children}
    </ShapeContext.Provider>
  );
};

export const useShapeContext = () => useContext(ShapeContext);
