import {
  FolderTree,
  HardDriveDownload,
  Binary,
  ShieldCheck,
  Tags,
  CheckCircle2,
  Terminal,
  FolderGit2,
  Cpu,
  Database,
  Workflow,
  HardDrive,
  FileText,
  FileCode,
  Folder,
  Server,
  HelpCircle
} from "lucide-react";

export const springTransition = {
  type: "spring",
  stiffness: 120,
  damping: 20
};

export const iconMap = {
  FolderTree,
  HardDriveDownload,
  Binary,
  ShieldCheck,
  Tags,
  CheckCircle2,
  Terminal,
  FolderGit2,
  Cpu,
  Database,
  Workflow,
  HardDrive,
  FileText,
  FileCode,
  Folder,
  Server
};

export function renderIcon(name, props = {}) {
  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent strokeWidth={2} {...props} />;
}

