import { useEffect, useState } from "react";

import { ShapeAPI } from "@/types/api";

export const useGetShapesAPI = () => {
  const [loading, setLoading] = useState(false);
  const [shapes, setShapes] = useState<ShapeAPI[]>([]);

  const getShapes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/shape", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const { shapes: data } = await response.json();
        setShapes(data);
      } else {
        throw new Error("Failed to delete shape");
      }
    } catch (error) {
      console.error("getShapes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getShapes();
  }, []);

  return { shapes, getShapes, loading };
};
