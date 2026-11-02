/**
 * Scene 7 — Pros and Cons of Layering
 * Advantages (Modularity, Reuse, Debugging, Portability) vs Trade-offs (Overhead, Latency, Cache).
 */

import { Plus, Minus } from "lucide-react";
import HeroHeader from "../components/HeroHeader";
import { prosConsData } from "../data.js";

export default function Scene7_ProsCons({ meta, step }) {
  return (
    <HeroHeader meta={meta} step={step}>
      <div className="w-full h-full grid grid-cols-2 gap-8">
        {/* Left Column: PROS on Green */}
        <div className="p-8 rounded-2xl border-2 border-[#004643] bg-[#004643] text-[#F0EDE5] flex flex-col justify-between card-interactive">
          <div className="flex items-center justify-between border-b border-[#F0EDE5]/20 pb-4">
            <span className="font-display text-[84px] leading-none">ADVANTAGES</span>
            <Plus strokeWidth={2} size={64} />
          </div>

          <div className="flex flex-col gap-6 my-auto">
            {prosConsData.pros.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-1 border-b border-[#F0EDE5]/10 pb-4"
              >
                <span className="font-display text-[40px] leading-none">{item.title}</span>
                <span className="text-[28px] font-body opacity-90">{item.desc}</span>
              </div>
            ))}
          </div>

          <div className="text-[26px] font-mono opacity-60">
            PROVEN IN: UNIX, LINUX, WINDOWS NT, MACOS
          </div>
        </div>

        {/* Right Column: CONS on Cream */}
        <div className="p-8 rounded-2xl border-2 border-[#004643] bg-[#F0EDE5] text-[#004643] flex flex-col justify-between card-interactive">
          <div className="flex items-center justify-between border-b border-[#004643]/20 pb-4">
            <span className="font-display text-[84px] leading-none">TRADE-OFFS</span>
            <Minus strokeWidth={2} size={64} />
          </div>

          <div className="flex flex-col gap-6 my-auto">
            {prosConsData.cons.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-1 border-b border-[#004643]/10 pb-4"
              >
                <span className="font-display text-[40px] leading-none">{item.title}</span>
                <span className="text-[28px] font-body opacity-90">{item.desc}</span>
              </div>
            ))}
          </div>

          <div className="text-[26px] font-mono opacity-60">
            MITIGATED VIA: DIRECT I/O, ASYNC AIO, DMA BYPASS
          </div>
        </div>
      </div>
    </HeroHeader>
  );
}
