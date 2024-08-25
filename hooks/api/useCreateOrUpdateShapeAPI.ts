import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useShapeContext } from "@/providers";

type Params = {
  title?: string;
  refetchCallback?: () => {};
};

type FormType = {
  title: string;
};

const schema = z.object({
  title: z.string().nonempty(),
});

export const useCreateOrUpdateShapeAPI = () => {
  const [visible, setVisible] = useState(false);
  const { shapes, activeShape, stageRef, setActiveShape, setShapes } =
    useShapeContext();

  const methods = useForm<FormType>({
    defaultValues: {
      title: activeShape?.title || "",
    },
    resolver: zodResolver(schema),
  });

  const handleSave = async (body?: any) =>
    await fetch(`/api/shape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        body || {
          title: methods.getValues("title"),
          shapeConfig: shapes,
          shapeId: activeShape?.id,
          image: stageRef?.current?.toDataURL(),
        },
      ),
    });

  const createOrUpdateShapeAPI = async ({ refetchCallback }: Params) => {
    try {
      const response = await handleSave();

      if (response.ok) {
        refetchCallback && refetchCallback();
        const { shape } = await response.json();
        setActiveShape(shape);
      } else {
        throw new Error("Failed to create or update shape");
      }
    } catch (error) {
      console.error("createOrUpdateShapeAPI", error);
    } finally {
      setVisible(false);
      methods.reset({ title: "" });
    }
  };

  const createNewAndUpdateOldShapeAPI = async ({ refetchCallback }: Params) => {
    try {
      const response1 = await handleSave();

      if (response1.ok) {
        setShapes([]);
        setActiveShape(null);
      } else {
        throw new Error("Failed save current shapes");
      }

      const response2 = await handleSave({
        title: methods.getValues("title"),
        shapeConfig: [],
        image: "",
      });

      if (response2.ok) {
        refetchCallback && refetchCallback();
        const { shape } = await response2.json();
        setActiveShape(shape);
      } else {
        throw new Error("Failed to create new shapes");
      }
    } catch (error) {
      console.error("createOrUpdateShapeAPI", error);
    } finally {
      setVisible(false);
      methods.reset({ title: "" });
    }
  };

  const disabledBtn = visible ? !methods.formState.isValid : !shapes.length;

  return {
    createOrUpdateShapeAPI,
    createNewAndUpdateOldShapeAPI,
    visible,
    setVisible,
    methods,
    disabledBtn,
  };
};
