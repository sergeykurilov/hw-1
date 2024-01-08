export enum AvailableResolution {
  P144 = "P144",
  P240 = "P240",
  P360 = "P360",
  P480 = "P480",
  P720 = "P720",
  P1080 = "P1080",
  P1440 = "P1440",
  P2160 = "P2160",
}

export type Video = {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  createdAt: string;
  publicationDate: string;
  availableResolutions: AvailableResolution[];
};

export type Param = {
  id: number;
};

export type CreateVideoType = {
  title: string;
  author: string;
  availableResolutions: AvailableResolution[];
};

export interface ErrorMessage {
  field: string;
  message: string;
}

interface ErrorType {
  errorMessages: ErrorMessage[];
}
