"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { debounce } from "lodash";

import { Shape } from "@/types";
import { STORAGE_KEY } from "@/constants";

type ContextType = {
  shapes: Shape[];
  setShapes: Dispatch<SetStateAction<Shape[]>>;
};

const defaultContext: ContextType = {
  shapes: [],
  setShapes: () => {},
};

const ShapeContext = createContext<ContextType>(defaultContext);

export const ShapeProvider = ({ children }: PropsWithChildren) => {
  const [shapes, setShapes] = useState<Shape[]>([]);

  const debouncedSave = useCallback(
    debounce(
      (shapesToSave) =>
        localStorage.setItem(STORAGE_KEY.SHAPES, JSON.stringify(shapesToSave)),
      5000,
    ),
    [],
  );

  useEffect(() => {
    debouncedSave(shapes);
  }, [shapes, debouncedSave]);

  useEffect(() => {
    const shapesFromStorage = localStorage.getItem(STORAGE_KEY.SHAPES);
    if (shapesFromStorage) {
      setShapes(JSON.parse(shapesFromStorage));
    }
  }, []);

  return (
    <ShapeContext.Provider value={{ setShapes, shapes }}>
      {children}
    </ShapeContext.Provider>
  );
};

export const useShapeContext = () => useContext(ShapeContext);
