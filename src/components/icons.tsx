import {
  Activity,
  AlertCircle,
  Brain,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Command,
  Droplet,
  Flame,
  Loader2,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  Wheat,
  X,
  LucideIcon
} from "lucide-react"

export type IconType = LucideIcon;

export const Icons = {
  Brain,
  Activity,
  Wheat,
  Flame,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Command,
  Loader2,
  Sun: SunMedium,
  MoreVertical,
  Plus,
  Settings,
  Trash,
  Twitter,
  User,
  X,
  AlertCircle,
  Pizza,
  Droplet,
} as const;

export type IconKeys = keyof typeof Icons; 