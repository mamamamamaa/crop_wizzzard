export const useDeleteShapeAPI = () => {
  const deleteShape = async (shapeId: string, refetchCallback?: () => void) => {
    try {
      const response = await fetch(`/api/shape`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shapeId }),
      });
      if (response.ok) {
        refetchCallback && refetchCallback();
      } else {
        throw new Error("Failed to delete shape");
      }
    } catch (error) {
      console.error("deleteShape", error);
    }
  };

  return { deleteShape };
};
