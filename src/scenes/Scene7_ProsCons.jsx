/**
 * Scene 7 — Pros and Cons of Layering
 * Advantages (Modularity, Reuse, Debugging, Portability) vs Trade-offs (Overhead, Latency, Cache).
 * Cleanly proportioned 2-column layout with comfortable spacing and zero clipping.
 */

import { Plus, Minus } from "lucide-react";
import HeroHeader from "../components/HeroHeader";
import { prosConsData } from "../data.js";

export default function Scene7_ProsCons({ meta, step }) {
  return (
    <HeroHeader meta={meta} step={step}>
      <div className="w-full h-full grid grid-cols-2 gap-6">
        {/* Left Column: PROS on Green */}
        <div className="p-6 rounded-2xl border-2 border-[#004643] bg-[#004643] text-[#F0EDE5] flex flex-col justify-between card-interactive">
          <div className="flex items-center justify-between border-b border-[#F0EDE5]/20 pb-3">
            <span className="font-display text-[56px] leading-none">ADVANTAGES</span>
            <Plus strokeWidth={2.5} size={44} />
          </div>

          <div className="flex flex-col gap-3.5 my-auto">
            {prosConsData.pros.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-0.5 border-b border-[#F0EDE5]/10 pb-2.5"
              >
                <span className="font-display text-[26px] leading-none">{item.title}</span>
                <span className="text-[18px] font-body opacity-90 leading-snug">{item.desc}</span>
              </div>
            ))}
          </div>

          <div className="text-[17px] font-mono opacity-60 border-t border-[#F0EDE5]/20 pt-2">
            PROVEN IN: UNIX, LINUX, WINDOWS NT, MACOS
          </div>
        </div>

        {/* Right Column: CONS on Cream */}
        <div className="p-6 rounded-2xl border-2 border-[#004643] bg-[#F0EDE5] text-[#004643] flex flex-col justify-between card-interactive">
          <div className="flex items-center justify-between border-b border-[#004643]/20 pb-3">
            <span className="font-display text-[56px] leading-none">TRADE-OFFS</span>
            <Minus strokeWidth={2.5} size={44} />
          </div>

          <div className="flex flex-col gap-3.5 my-auto">
            {prosConsData.cons.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-0.5 border-b border-[#004643]/10 pb-2.5"
              >
                <span className="font-display text-[26px] leading-none">{item.title}</span>
                <span className="text-[18px] font-body opacity-90 leading-snug">{item.desc}</span>
              </div>
            ))}
          </div>

          <div className="text-[17px] font-mono opacity-60 border-t border-[#004643]/20 pt-2">
            MITIGATED VIA: DIRECT I/O, ASYNC AIO, DMA BYPASS
          </div>
        </div>
      </div>
    </HeroHeader>
  );
}
