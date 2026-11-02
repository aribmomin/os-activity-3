/**
 * All presentation content lives here.
 * Edit names, layer facts, or any text without touching component code.
 */

/* ── Group members ──────────────────────────────────────────── */
export const groupMembers = [
  "Member 1",
  "Member 2",
  "Member 3",
  "Member 4",
];

/* ── Presenter names per part ───────────────────────────────── */
export const presenters = {
  A: "Presenter 1",
  B: "Presenter 2",
};

/* ── Scene meta ─────────────────────────────────────────────── */
export const scenes = [
  { id: 1, title: "Title",                    part: "A", steps: 2 },
  { id: 2, title: "What is File Management?", part: "A", steps: 7 },
  { id: 3, title: "Why Layers?",              part: "A", steps: 4 },
  { id: 4, title: "The 6 Layers",             part: "A", steps: 7 },
  { id: 5, title: "Live Trace",               part: "B", steps: 9 },
  { id: 6, title: "Virtual File System",       part: "B", steps: 4 },
  { id: 7, title: "Pros & Cons",              part: "B", steps: 3 },
  { id: 8, title: "Summary",                  part: "B", steps: 2 },
];

/* ── Layer data (top → bottom in the stack) ─────────────────── */
export const layers = [
  {
    id: "app",
    label: "Application Programs",
    short: "App",
    color: "#94A3B8",
    responsibility: "User programs that issue file-system calls (open, read, write, close).",
    keyTerms: ["System calls", "High-level API"],
    knows: "File names, byte offsets, and the high-level API",
    doesntKnow: "How data is physically stored",
  },
  {
    id: "logical",
    label: "Logical File System",
    short: "Logical FS",
    color: "#38BDF8",
    responsibility:
      "Manages names, directories, metadata (FCB / inode), and permissions. Translates a file name into a logical reference.",
    keyTerms: ["FCB / inode", "Directory tree", "Permissions", "Metadata"],
    knows: "WHAT file is being accessed",
    doesntKnow: "WHERE the blocks physically reside on disk",
  },
  {
    id: "fileorg",
    label: "File-Organization Module",
    short: "File-Org",
    color: "#38BDF8",
    responsibility:
      "Maps logical blocks to physical blocks. Handles allocation strategy (contiguous, linked, indexed) and free-space management.",
    keyTerms: ["Block mapping", "Allocation", "Free-space list"],
    knows: "Logical → physical block translation",
    doesntKnow: "File names or user permissions",
  },
  {
    id: "basic",
    label: "Basic File System",
    short: "Basic FS",
    color: "#38BDF8",
    responsibility:
      'Issues generic "read block N" / "write block N" commands to the driver. Manages the buffer cache.',
    keyTerms: ["Block I/O", "Buffer cache", "Read/Write block"],
    knows: "Physical block numbers and caching",
    doesntKnow: "Which file a block belongs to",
  },
  {
    id: "iocontrol",
    label: "I/O Control",
    short: "I/O Ctrl",
    color: "#38BDF8",
    responsibility:
      "Device drivers and interrupt handlers. Translates generic block commands into hardware-specific instructions.",
    keyTerms: ["Device driver", "Interrupt handler", "DMA"],
    knows: "Hardware-specific command set",
    doesntKnow: "Logical file structure",
  },
  {
    id: "devices",
    label: "Devices",
    short: "Devices",
    color: "#94A3B8",
    responsibility:
      "Physical storage hardware: HDD platters, SSD flash cells, USB drives.",
    keyTerms: ["HDD", "SSD", "USB", "Sectors"],
    knows: "Raw electrical / magnetic signals",
    doesntKnow: "Anything about files or the OS",
  },
];

/* ── File-management responsibilities (Scene 2) ────────────── */
export const fmResponsibilities = [
  { label: "Naming",      desc: "Map human-readable names to storage locations" },
  { label: "Allocation",  desc: "Decide where to place data on disk" },
  { label: "Access",      desc: "Provide read / write / seek operations" },
  { label: "Protection",  desc: "Enforce permissions and access control" },
  { label: "Metadata",    desc: "Track size, dates, ownership, type" },
  { label: "Reliability", desc: "Handle crashes, backups, journaling" },
];

/* ── User-view sample files (Scene 2) ───────────────────────── */
export const sampleFiles = [
  { name: "notes.txt",    icon: "FileText" },
  { name: "photo.png",    icon: "Image" },
  { name: "homework/",    icon: "Folder" },
  { name: "project.zip",  icon: "Archive" },
];

/* ── Disk blocks (Scene 2) ──────────────────────────────────── */
export const diskBlocks = Array.from({ length: 24 }, (_, i) => i);

/* ── Layer benefit chips (Scene 3) ──────────────────────────── */
export const layerBenefits = [
  { label: "Modularity",      desc: "Change one layer without affecting others", type: "pro" },
  { label: "Reuse",           desc: "Share layers across different file systems",  type: "pro" },
  { label: "Easy Debugging",  desc: "Isolate bugs to a specific layer",           type: "pro" },
];

export const layerCosts = [
  { label: "Overhead",  desc: "Extra indirection at each boundary", type: "con" },
];

/* ── Live-trace steps (Scene 5) ─────────────────────────────── */
export const traceSteps = [
  {
    direction: "down",
    layerId: "logical",
    title: "Logical FS → Find inode",
    caption:
      'Look up "notes.txt" in the directory, locate its inode, check read permissions.',
    detail: 'inode #4271 — size 8 192 B, perms: rw-r--r--',
  },
  {
    direction: "down",
    layerId: "fileorg",
    title: "File-Org → Map to physical block",
    caption:
      "byte 5000 ÷ 4096 = logical block 1 → mapped to physical block 8812",
    detail: "5000 ÷ 4096 = 1  remainder 904\nlogical block 1 → phys block 8812",
    isMath: true,
  },
  {
    direction: "down",
    layerId: "basic",
    title: "Basic FS → Cache check",
    caption:
      "Check buffer cache for block 8812 — MISS. Queue a read request.",
    detail: "cache lookup(8812) → MISS\nenqueue read(block 8812)",
  },
  {
    direction: "down",
    layerId: "iocontrol",
    title: "I/O Control → Hardware command",
    caption:
      "Device driver translates to a hardware-specific read command.",
    detail: "SATA CMD: READ_DMA_EXT  LBA=8812  count=1",
  },
  {
    direction: "down",
    layerId: "devices",
    title: "Device → Read sectors",
    caption: "Disk hardware reads the physical sectors and returns raw data.",
    detail: "← 4 096 bytes returned",
  },
  {
    direction: "up",
    layerId: "basic",
    title: "Basic FS ← Cache the block",
    caption: "Store block 8812 in the buffer cache for future reads.",
    detail: "cache insert(8812, data)  → HIT next time",
  },
  {
    direction: "up",
    layerId: "fileorg",
    title: "File-Org ← Extract byte range",
    caption: "Extract bytes 904–4095 from block data (offset within the block).",
    detail: "data[904..4095]  → 3 192 bytes to Logical FS",
  },
  {
    direction: "up",
    layerId: "logical",
    title: "Logical FS ← Return to App",
    caption: "Deliver the requested bytes to the application's buffer.",
    detail: 'read("notes.txt", 5000) → 3 192 bytes',
  },
];

/* ── VFS file systems (Scene 6) ─────────────────────────────── */
export const vfsFileSystems = [
  { id: "ext4", label: "ext4",   desc: "Linux default journaling FS" },
  { id: "ntfs", label: "NTFS",   desc: "Windows default FS" },
  { id: "fat32", label: "FAT32", desc: "Simple, universal, max 4 GB file" },
  { id: "nfs",  label: "NFS",    desc: "Network File System (remote)" },
];

/* ── Pros and Cons (Scene 7) ────────────────────────────────── */
export const prosItems = [
  { title: "Modularity",  desc: "Layers can be developed and updated independently." },
  { title: "Reuse",       desc: "Lower layers are shared across many file systems." },
  { title: "Debugging",   desc: "Bugs are isolated to a specific layer's scope." },
  { title: "Portability", desc: "Abstract interfaces make porting to new hardware easier." },
];

export const consItems = [
  { title: "Overhead",     desc: "Each layer boundary adds processing cost." },
  { title: "Performance",  desc: "Deep stacks can slow down hot-path I/O." },
  { title: "Complexity",   desc: "Clean interfaces require careful, deliberate design." },
];

/* ── Summary bullets (Scene 8) ──────────────────────────────── */
export const summaryBullets = [
  "File management bridges the gap between human-friendly names and raw disk blocks.",
  "A six-layer architecture gives modularity, reuse, and easier debugging.",
  "VFS provides one interface for every file system — ext4, NTFS, FAT32, NFS, and more.",
  "Trade-off: layering adds overhead, but the engineering benefits far outweigh the cost.",
];
