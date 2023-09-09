export interface listingModel {
  jobTitle: string;
  companyTitle: string;
  locationCity: string;
  locationState: string;
  isRemote: boolean;
  salary: number;
  isPartTime: boolean;
  isFullTime: boolean;
  isJuniorLevel: boolean;
  isMidLevel: boolean;
  isSeniorLevel: boolean;
  description: string;
  isDraft: boolean;
  creationDate: string;
}

export interface listingModelWithId {
  lid: number;
  jobTitle: string;
  companyTitle: string;
  locationCity: string;
  locationState: string;
  isRemote: boolean;
  salary: number;
  isPartTime: boolean;
  isFullTime: boolean;
  isJuniorLevel: boolean;
  isMidLevel: boolean;
  isSeniorLevel: boolean;
  description: string;
  isDraft: boolean;
  creationDate: string;
}
