export enum ApplicationStatus {
  Saved = "saved",
  Applied = "applied",
  InReview = "in_review",
  PhoneScreen = "phone_screen",
  Interview = "interview",
  Technical = "technical",
  FinalRound = "final_round",
  Offer = "offer",
  Accepted = "accepted",
  Rejected = "rejected",
  Withdrawn = "withdrawn",
}

export interface Application {
  id: string;
  companyName: string;
  position: string;
  applicationUrl: string;
  country: string;
  location: string;
  status: ApplicationStatus;
  dateApplied: string;
  dateUpdated: string;
  salary: string;
  contactPerson: string;
  notes: string;
}