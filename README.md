# File-System Layers & Architecture

> **Operating Systems — File Management & Storage Abstractions**  
> An interactive, high-performance slide deck and educational visualization built with React, Vite, Tailwind CSS v4, and Framer Motion.

---

## 👥 Presentation Team

| Name | Role |
| :--- | :--- |
| **Arib Momin** | Operating Systems Module Lead |
| **Rohan Gawade** | Operating Systems Module Lead |
| **Sneha Dhole** | Operating Systems Module Lead |
| **Sanika Kharade** | Operating Systems Module Lead |

---

## 🎨 Visual & Technical Highlights

- **Strictly Bicolor Design**: Distinctive editorial aesthetic alternating between **Deep Pine Green (`#004643`)** and **Warm Vintage Cream (`#F0EDE5`)**.
- **Hardware-Accelerated Smooth Cursor**: Custom magnetic cursor follower powered by `requestAnimationFrame` and direct CSS hardware transforms (`translate3d`), running at 120+ FPS with zero React re-render overhead.
- **Fixed 16:9 Scaled Canvas**: Dynamic responsive scaling ensuring pixel-perfect 1920×1080 proportions on any display resolution (4K, 1440p, 1080p, ultra-wide) with zero clipping or scrollbars.
- **Procedural Audio Synthesis**: Zero-dependency Web Audio API sound effects providing tactile auditory feedback on step increments and slide transitions, with quick mute toggle.
- **Presenter Utilities**: Built-in elapsed timer, distraction-free UI hide mode, fullscreen mode, and direct scene jumping.

---

## 🎬 Presentation Scenes Overview

1. **Scene 01: Landing & Title**  
   Bold Norwester display typography, team member roster, and animated architectural marquee ribbon.

2. **Scene 02: What is File Management?**  
   Side-by-side contrast between the **User View** (symbolic, human-readable file streams) and **Disk Reality** (fragmented 4KB sector blocks), bridged by the 6 core OS responsibilities (*Naming*, *Allocation*, *Access*, *Protection*, *Metadata*, *Reliability*).

3. **Scene 03: Why Use Layers?**  
   Comparison of the tightly-coupled **Monolithic Nightmare** against the **Layered Abstraction**, highlighting the 4 pillars: *Modularity*, *Code Reuse*, *Simplified Debugging*, and the trade-off of *Call Overhead*.

4. **Scene 04: The 6 Core Layers**  
   Interactive hierarchical stack representing the standard storage hierarchy:
   - **Application Programs** (POSIX system calls)
   - **Logical File System** (Inodes, directories, permissions)
   - **File-Organization Module** (Logical-to-physical block mapping)
   - **Basic File System** (Buffer cache, generic block I/O)
   - **I/O Control** (Device drivers, DMA, interrupt handlers)
   - **Devices** (Physical magnetic platters & flash cells)

5. **Scene 05: Live Execution Trace — `read("notes.txt", byte 5000)`**  
   Step-by-step packet traversal through the abstraction tiers down to physical disk media and back up, complete with block offset arithmetic (`5000 / 4096 = Logical Block 1 -> Physical Block 8812`) and dynamic `CACHE MISS` verification stamp.

6. **Scene 06: Virtual File System (VFS)**  
   Polymorphic kernel interface decoupling uniform POSIX API calls (`open()`, `read()`, `write()`, `close()`) from underlying file systems via `vnode` abstraction, with interactive inspection of `ext4`, `NTFS`, `FAT32`, and `NFS`.

7. **Scene 07: Pros & Cons of Layering**  
   Balanced two-column architectural evaluation:
   - **Advantages**: Separation of concerns, universal component reuse, isolated fault diagnosis, hardware portability.
   - **Trade-offs**: Indirection latency, kernel-to-user memory copy overhead, rigid abstraction constraints, cache synchronization.

8. **Scene 08: Summary & Key Takeaways**  
   Synthesis of the 4 core principles (*Abstraction Hides Complexity*, *Six Strict Tiers*, *Unified Access via VFS*, *Engineering Trade-offs*) transitioning to a full-bleed "Thank You / Questions?" closing slide with a 1-click presentation restart.

---

## ⌨️ Keyboard Shortcuts & Controls

| Key | Action |
| :--- | :--- |
| <kbd>Space</kbd> / <kbd>→</kbd> / <kbd>Enter</kbd> / <kbd>PageDown</kbd> | Advance to next step or scene |
| <kbd>←</kbd> / <kbd>Backspace</kbd> / <kbd>PageUp</kbd> | Return to previous step or scene |
| <kbd>1</kbd> – <kbd>8</kbd> | Jump directly to Scene 1 through 8 |
| <kbd>T</kbd> | Toggle presenter timer (`MM:SS`) |
| <kbd>F</kbd> | Toggle fullscreen presentation mode |
| <kbd>H</kbd> | Toggle hide/show UI chrome (zen presentation mode) |
| <kbd>M</kbd> | Toggle procedural sound effects on/off |
| <kbd>Home</kbd> | Restart presentation from Scene 1, Step 0 |
| <kbd>End</kbd> | Jump directly to concluding summary slide |

---

## 🛠️ Project Structure

```text
Activity3/
├── public/
│   └── fonts/
│       └── Norwester.otf           # Custom display typeface
├── src/
│   ├── assets/                     # Static graphics and icons
│   ├── components/
│   │   ├── CustomCursor.jsx        # Hardware-accelerated smooth round cursor
│   │   └── HeroHeader.jsx          # Reusable hero banner and compact section header
│   ├── data.js                     # Structured presentation data & scene definitions
│   ├── scenes/
│   │   ├── Scene1_Title.jsx        # Landing scene
│   │   ├── Scene2_FileManagement.jsx
│   │   ├── Scene3_WhyLayers.jsx
│   │   ├── Scene4_Layers.jsx
│   │   ├── Scene5_LiveTrace.jsx
│   │   ├── Scene6_VFS.jsx
│   │   ├── Scene7_ProsCons.jsx
│   │   ├── Scene8_Summary.jsx
│   │   └── index.js                # Modular scene exports
│   ├── utils/
│   │   └── theme.jsx               # Spring physics tokens and icon mapping
│   ├── App.jsx                     # Presentation shell, 16:9 canvas, and navigation
│   ├── index.css                   # Tailwind v4 directives, Norwester font, and theme tokens
│   └── main.jsx                    # React 19 entrypoint
├── index.html                      # HTML root with Bebas Neue, Poppins, & JetBrains Mono
├── package.json
└── vite.config.js                  # Vite configuration with Tailwind CSS v4 plugin
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** or **pnpm**

### Installation
```bash
# Clone or navigate into the repository
cd Activity3

# Install dependencies
npm install
```

### Development
```bash
# Start local Vite development server
npm run dev
```

### Production Build & Linting
```bash
# Run Oxlint validation
npm run lint

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License
Educational coursework project for Operating Systems — File Management & Storage Architecture.
