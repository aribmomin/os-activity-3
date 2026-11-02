/**
 * MiniMap — persistent small 6-layer stack for Scenes 5 & 6.
 * Shows which layer is currently active.
 */
import { layers } from "../data/content";
import LayerCard from "./LayerCard";

export default function MiniMap({ activeLayerId, direction = "down" }) {
  return (
    <div className="flex flex-col gap-1 w-28">
      <p className="text-[10px] text-text-dim font-medium uppercase tracking-widest mb-1 text-center">
        Layers
      </p>
      {layers.map((layer) => (
        <LayerCard
          key={layer.id}
          layer={layer}
          isMini
          isActive={layer.id === activeLayerId}
          highlightColor={direction === "up" ? "border-return" : undefined}
        />
      ))}
    </div>
  );
}
