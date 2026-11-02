/**
 * Presentation Data - Operating Systems: File-System Layers & Architecture
 * Strictly Bicolor theme (#004643 Green and #F0EDE5 Cream)
 */

export const groupMembers = [
  "ALEX RIVERA",
  "JORDAN CHEN",
  "SAMIRA KHAN",
  "MARCUS VANCE"
];

export const presenters = {
  A: "Presenter 1 (Part A: Scenes 1-4)",
  B: "Presenter 2 (Part B: Scenes 5-8)"
};

export const scenesMeta = [
  {
    id: 1,
    title: "FILE-SYSTEM LAYERS & ARCHITECTURE",
    heroLines: ["FILE-SYSTEM", "LAYERS &", "ARCHITECTURE"],
    subtitle: "OPERATING SYSTEMS • STORAGE ABSTRACTIONS",
    part: "A",
    theme: "green",
    totalSteps: 1
  },
  {
    id: 2,
    title: "WHAT IS FILE MANAGEMENT?",
    heroLines: ["WHAT IS FILE", "MANAGEMENT?"],
    subtitle: "BRIDGING USER CONVENIENCE AND DISK REALITY",
    part: "A",
    theme: "cream",
    totalSteps: 7
  },
  {
    id: 3,
    title: "WHY LAYERS?",
    heroLines: ["WHY USE", "LAYERS?"],
    subtitle: "DECOUPLING COMPLEXITY INTO STANDARDIZED TIERS",
    part: "A",
    theme: "green",
    totalSteps: 4
  },
  {
    id: 4,
    title: "THE 6 LAYERS",
    heroLines: ["THE 6 CORE", "LAYERS"],
    subtitle: "HIERARCHICAL DECOMPOSITION FROM APP TO HARDWARE",
    part: "A",
    theme: "cream",
    totalSteps: 7
  },
  {
    id: 5,
    title: "LIVE TRACE: READ()",
    heroLines: ["LIVE TRACE", "READ OPERATION"],
    subtitle: "PACKET TRAVERSAL FOR read('notes.txt', byte 5000)",
    part: "B",
    theme: "green",
    totalSteps: 8
  },
  {
    id: 6,
    title: "VIRTUAL FILE SYSTEM",
    heroLines: ["VIRTUAL FILE", "SYSTEM (VFS)"],
    subtitle: "POLYMORPHIC INTERFACE ACROSS DIVERSE FILESYSTEMS",
    part: "B",
    theme: "cream",
    totalSteps: 5
  },
  {
    id: 7,
    title: "PROS AND CONS",
    heroLines: ["PROS & CONS", "OF LAYERING"],
    subtitle: "ARCHITECTURAL BENEFITS VS RUNTIME OVERHEAD",
    part: "B",
    theme: "cream",
    totalSteps: 2
  },
  {
    id: 8,
    title: "SUMMARY & TAKEAWAYS",
    heroLines: ["SUMMARY &", "KEY TAKEAWAYS"],
    subtitle: "CLOSING SYNTHESIS & QUESTIONS",
    part: "B",
    theme: "green",
    totalSteps: 3
  }
];

export const fileManagementResponsibilities = [
  {
    id: "naming",
    title: "NAMING",
    iconName: "FolderTree",
    description: "Hierarchical namespaces, human-readable paths, and directory traversal mapping strings to file objects."
  },
  {
    id: "allocation",
    title: "ALLOCATION",
    iconName: "HardDriveDownload",
    description: "Dynamic assignment of raw physical disk blocks to files via contiguous, linked, or indexed structures."
  },
  {
    id: "access",
    title: "ACCESS",
    iconName: "Binary",
    description: "Byte-level seeking, positioning, read/write stream buffers, and sequential vs direct access primitives."
  },
  {
    id: "protection",
    title: "PROTECTION",
    iconName: "ShieldCheck",
    description: "Access Control Lists (ACLs), user/group permissions, and multi-tenant process isolation enforcement."
  },
  {
    id: "metadata",
    title: "METADATA",
    iconName: "Tags",
    description: "Inodes and FCBs recording file sizes, timestamps, ownership, block pointers, and attribute flags."
  },
  {
    id: "reliability",
    title: "RELIABILITY",
    iconName: "CheckCircle2",
    description: "Crash recovery, journal transactions, fsck consistency auditing, and atomic directory operations."
  }
];

export const sixLayersData = [
  {
    id: "app",
    number: "01",
    name: "APPLICATION PROGRAMS",
    iconName: "Terminal",
    responsibility: "User processes that initiate file I/O operations through system calls like open(), read(), write(), and fopen().",
    keyTerms: ["System Calls", "POSIX API", "File Descriptors"],
    knows: "File name string, target byte offset, buffer pointer",
    doesntKnow: "Disk geometry, block layouts, or storage devices"
  },
  {
    id: "logical",
    number: "02",
    name: "LOGICAL FILE SYSTEM",
    iconName: "FolderGit2",
    responsibility: "Manages metadata, directory structures, and FCBs (inodes). Translates symbolic file names into unique internal identifiers.",
    keyTerms: ["FCB / Inode", "Directory Tree", "Permissions", "Access Control"],
    knows: "WHAT file is being accessed and user access rights",
    doesntKnow: "WHERE blocks physically reside on disk cylinders"
  },
  {
    id: "fileorg",
    number: "03",
    name: "FILE-ORGANIZATION MODULE",
    iconName: "Cpu",
    responsibility: "Translates logical block addresses within a file to physical block addresses on the partition. Manages free-space tracking.",
    keyTerms: ["Block Mapping", "Allocation Schemes", "Free-Space Bitmaps"],
    knows: "WHERE blocks are stored across physical sectors",
    doesntKnow: "Hardware controller registers or bus interfaces"
  },
  {
    id: "basic",
    number: "04",
    name: "BASIC FILE SYSTEM",
    iconName: "Database",
    responsibility: "Issues generic block commands ('read block N') to drivers. Manages kernel memory caches and I/O buffer pools.",
    keyTerms: ["Buffer Cache", "Block I/O Queue", "Prefetching"],
    knows: "Physical block numbers and in-memory buffer states",
    doesntKnow: "Specific hardware control registers or drive timing"
  },
  {
    id: "iocontrol",
    number: "05",
    name: "I/O CONTROL",
    iconName: "Workflow",
    responsibility: "Device drivers and interrupt service routines. Converts generic block commands into device controller machine instructions.",
    keyTerms: ["Device Drivers", "Interrupt Handlers", "DMA Transfers"],
    knows: "Hardware controller registers, DMA addresses, IRQ lines",
    doesntKnow: "File names, directory hierarchy, or user concepts"
  },
  {
    id: "devices",
    number: "06",
    name: "DEVICES",
    iconName: "HardDrive",
    responsibility: "The physical secondary storage hardware storing electromagnetic or flash charges across tracks, sectors, and flash pages.",
    keyTerms: ["NVMe SSD", "SATA HDD", "Flash Blocks", "Platters"],
    knows: "Raw magnetic flux reversals & flash charge states",
    doesntKnow: "Files, folders, operating systems, or permissions"
  }
];

export const traceStepsData = [
  {
    stepIndex: 1,
    layerId: "app",
    title: "APPLICATION INVOCATION",
    formula: "int n = read(fd, buf, 5000);",
    caption: "Application Program invokes read('notes.txt', byte 5000) through POSIX system call.",
    direction: "down",
    packetPos: 0
  },
  {
    stepIndex: 2,
    layerId: "logical",
    title: "LOGICAL FS RESOLUTION",
    formula: "Inode #40192 -> uid=1000, perms=0644 [OK]",
    caption: "Logical File System resolves 'notes.txt' to Inode #40192 and verifies user read permissions.",
    direction: "down",
    packetPos: 1
  },
  {
    stepIndex: 3,
    layerId: "fileorg",
    title: "BLOCK TRANSLATION",
    formula: "5000 / 4096 = Logical Block 1 -> Physical Block 8812",
    caption: "File-Organization Module calculates block offset: 5000 / 4096 = Logical Block 1, mapped to Physical Block 8812.",
    direction: "down",
    packetPos: 2
  },
  {
    stepIndex: 4,
    layerId: "basic",
    title: "BUFFER CACHE LOOKUP",
    formula: "CACHE MISS -> Queue Read Request for Block 8812",
    caption: "Basic File System probes memory cache: STAMP CACHE MISS. Formulates generic read command for block 8812.",
    isStamp: true,
    direction: "down",
    packetPos: 3
  },
  {
    stepIndex: 5,
    layerId: "iocontrol",
    title: "DEVICE DRIVER COMMAND",
    formula: "outb(0x1F7, 0x20); // ATA_READ_SECTORS LBA 8812",
    caption: "I/O Control driver writes command registers to storage controller and arms DMA controller.",
    direction: "down",
    packetPos: 4
  },
  {
    stepIndex: 6,
    layerId: "devices",
    title: "PHYSICAL DEVICE ACCESS",
    formula: "NAND Flash / Head Seek -> Sector 8812 Loaded",
    caption: "Physical Storage Device retrieves magnetic/solid-state sector 8812 and triggers completion interrupt.",
    direction: "down",
    packetPos: 5
  },
  {
    stepIndex: 7,
    layerId: "app",
    title: "RETURN DATA PATH",
    formula: "Sector 8812 -> Driver -> Cache -> User Buffer",
    caption: "Data flows back UP through layers along dashed line: Driver DMA -> Buffer Cache -> App memory.",
    direction: "up",
    packetPos: 0
  }
];

export const vfsData = {
  operations: ["open()", "read()", "write()", "close()", "stat()"],
  filesystems: [
    {
      id: "ext4",
      name: "ext4",
      type: "Native Linux",
      desc: "Journaling, extent-based allocation, sub-second timestamps, inode tables.",
      features: "Direct block mapping via extent trees"
    },
    {
      id: "ntfs",
      name: "NTFS",
      type: "Windows Native",
      desc: "Master File Table (MFT), B-tree indexes, compression, USN journaling.",
      features: "Attribute records inside $MFT"
    },
    {
      id: "fat32",
      name: "FAT32",
      type: "Legacy Universal",
      desc: "Linked-list File Allocation Table, maximum 4GB file size, universal firmware support.",
      features: "Linear cluster chain traversal"
    },
    {
      id: "nfs",
      name: "NFS",
      type: "Network Remote",
      desc: "Remote Procedure Calls (RPC), stateless protocol, handles server reboots.",
      features: "Network packet marshaling over TCP/IP"
    }
  ]
};

export const prosConsData = {
  pros: [
    {
      title: "MODULARITY",
      desc: "Clean separation of concerns. Modifying physical driver logic never affects logical directory parsing."
    },
    {
      title: "REUSE ACROSS FILE SYSTEMS",
      desc: "Basic FS cache, buffer pools, and block layer are shared identically by ext4, NTFS, and FAT32."
    },
    {
      title: "EASIER DEBUGGING & TESTING",
      desc: "Failures can be isolated immediately to driver hardware, block mapping math, or permission checking."
    },
    {
      title: "HARDWARE PORTABILITY",
      desc: "New storage technologies (e.g. NVMe, Optane) only require a new I/O Control driver without touching OS apps."
    }
  ],
  cons: [
    {
      title: "PER-LAYER OVERHEAD",
      desc: "Every I/O request traverses multiple layers of function indirection, parameter validation, and translation."
    },
    {
      title: "CAN REDUCE PERFORMANCE",
      desc: "Buffer duplication and memory copies between kernel buffer cache and user space can saturate bus bandwidth."
    },
    {
      title: "NEEDS CAREFUL DESIGN",
      desc: "Rigid layering can restrict optimizations (e.g. database engines needing direct disk I/O bypass abstractions)."
    },
    {
      title: "COMPLEX CACHE COHERENCY",
      desc: "Maintaining consistency across multiple cached layers requires intricate synchronization and invalidation."
    }
  ]
};

export const summaryTakeaways = [
  {
    num: "01",
    title: "ABSTRACTION HIDES COMPLEXITY",
    desc: "Transforms simple named byte streams requested by users into physical magnetic flux and NAND flash cells."
  },
  {
    num: "02",
    title: "SIX STRICT TIERS",
    desc: "Each layer has one focused responsibility: App, Logical FS, File-Org, Basic FS, I/O Control, and Devices."
  },
  {
    num: "03",
    title: "UNIFIED ACCESS VIA VFS",
    desc: "The Virtual File System provides a single standard POSIX interface for local, legacy, and network storage."
  },
  {
    num: "04",
    title: "ENGINEERING TRADE-OFF",
    desc: "Architectural layering delivers unmatched modularity and portability at the acceptable cost of per-call overhead."
  }
];
