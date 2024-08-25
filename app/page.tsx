"use client";
import { useEffect, useMemo, useState } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { Layer, Rect, Stage } from "react-konva";
import { SessionProvider } from "next-auth/react";

import { useDragging, useMouseArea, useTool } from "@/hooks";
import { Shape, Tool } from "@/types";
import { isShapeInSelection, SelectionBox } from "@/helpers";
import { ShapeOptions, Shapes, ToolBar } from "@/components";
import { useShapeContext } from "@/providers";

export interface ShapeStyle {
  fill: string;
  stroke: string;
  strokeWidth: number;
  fontSize: number;
  cornerRadius: number;
  text?: string;
}

export default function Draw() {
  const { tool, setTool } = useTool();
  const { shapes, setShapes, stageRef } = useShapeContext();
  const [defaultStyle, setDefaultStyle] = useState<ShapeStyle>({
    fill: "transparent",
    stroke: "white",
    strokeWidth: 7,
    fontSize: 20,
    cornerRadius: 10,
  });
  const { stageScale, stagePos, ...draggingProps } = useDragging();

  const selectShapesInArea = (selectionBox: SelectionBox) =>
    setShapes((p) =>
      p.map((shape) => ({
        ...shape,
        selected: isShapeInSelection(shape, selectionBox),
      })),
    );

  const onSelectShape = (shapeId: string) =>
    setShapes((p) =>
      p.map((shape) => ({ ...shape, selected: shape.id === shapeId })),
    );

  const unselectShapes = () =>
    setShapes((p) => p.map((shape) => ({ ...shape, selected: false })));

  const handleAppendShape = (shape: Shape) =>
    setShapes((p) => [
      ...p.map((x) => ({ ...x, selected: false })),
      { ...shape, selected: true },
    ]);

  const { selectedArea, previewLayerRef, ...selectHandlers } = useMouseArea({
    tool,
    style: defaultStyle,
    onAppendShape: handleAppendShape,
    selectShapesInArea,
    selectShape: onSelectShape,
    unselectShapes,
  });

  useEffect(unselectShapes, [tool]);

  const handleDragShape = (e: KonvaEventObject<MouseEvent>) => {
    if (!("id" in e.target.attrs)) return;

    const shapeId = e.target.attrs?.id as string;

    setShapes((p) =>
      p.map((shape) =>
        shape.id === shapeId
          ? { ...shape, x: e.target.x(), y: e.target.y() }
          : shape,
      ),
    );
  };

  const activeShapes = useMemo(
    () => shapes.filter((shape) => shape.selected),
    [shapes],
  );

  return (
    <SessionProvider>
      <main className="w-full relative">
        <ToolBar activeTool={tool} onChange={(tool: Tool) => setTool(tool)} />
        <ShapeOptions
          style={defaultStyle}
          deleteShapes={() =>
            setShapes((p) => p.filter((shape) => !shape.selected))
          }
          onApplyStyles={(style) => {
            setDefaultStyle((p) => ({ ...p, ...style }));
            setShapes((p) =>
              p.map((shape) =>
                shape.selected ? { ...shape, ...style } : shape,
              ),
            );
          }}
          activeShapes={activeShapes}
        />
        {/*@ts-ignore*/}
        <Stage
          draggable={tool === Tool.GRAB}
          {...draggingProps}
          {...stagePos}
          {...selectHandlers}
          scale={{ x: stageScale, y: stageScale }}
          style={{ cursor: tool === Tool.GRAB ? "grab" : "default" }}
          className="bg-gray-900"
          width={window.innerWidth}
          height={window.innerHeight}
          ref={stageRef}
        >
          <Layer>
            <Shapes tool={tool} shapes={shapes} onDragEnd={handleDragShape} />
          </Layer>
          <Layer>
            <Rect
              {...selectedArea}
              opacity={0.3}
              fill="aqua"
              stroke="blue"
              strokeWidth={1}
            />
          </Layer>
          <Layer ref={previewLayerRef}>
            {/* Create shape preview layer */}
          </Layer>
        </Stage>
      </main>
    </SessionProvider>
  );
}
