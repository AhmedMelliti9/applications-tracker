import { ApplicationStatus } from "../types";

export interface StatusConfig {
  label: string;
  color: string;
  bgColor: string;
}

export const STATUS_CONFIG: Record<ApplicationStatus, StatusConfig> = {
  [ApplicationStatus.Saved]: { label: "Saved", color: "text-gray-400", bgColor: "bg-gray-400/10" },
  [ApplicationStatus.Applied]: { label: "Applied", color: "text-blue-400", bgColor: "bg-blue-400/10" },
  [ApplicationStatus.InReview]: { label: "In Review", color: "text-yellow-400", bgColor: "bg-yellow-400/10" },
  [ApplicationStatus.PhoneScreen]: { label: "Phone Screen", color: "text-cyan-400", bgColor: "bg-cyan-400/10" },
  [ApplicationStatus.Interview]: { label: "Interview", color: "text-purple-400", bgColor: "bg-purple-400/10" },
  [ApplicationStatus.Technical]: { label: "Technical", color: "text-indigo-400", bgColor: "bg-indigo-400/10" },
  [ApplicationStatus.FinalRound]: { label: "Final Round", color: "text-orange-400", bgColor: "bg-orange-400/10" },
  [ApplicationStatus.Offer]: { label: "Offer", color: "text-green-400", bgColor: "bg-green-400/10" },
  [ApplicationStatus.Accepted]: { label: "Accepted", color: "text-emerald-400", bgColor: "bg-emerald-400/10" },
  [ApplicationStatus.Rejected]: { label: "Rejected", color: "text-red-400", bgColor: "bg-red-400/10" },
  [ApplicationStatus.Withdrawn]: { label: "Withdrawn", color: "text-slate-400", bgColor: "bg-slate-400/10" },
};