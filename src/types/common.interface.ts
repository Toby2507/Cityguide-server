import { DayOfWeek, Rating } from './enums';

export interface IAddress {
  name: string;
  fullAddress?: string;
  locationId: string;
  city?: string;
  state: string;
  country: string;
  geoLocation: { lat: number; lng: number };
  extraDetails?: string;
}

export interface ICustomAvailability {
  day: DayOfWeek;
  from: string;
  to: string;
}

export interface IAvailability {
  type: 'ANYTIME' | 'CUSTOM';
  custom: ICustomAvailability[];
}

export interface IPayload {
  id: string;
  type: 'USER' | 'ESTABLISHMENT';
  isPartner: boolean;
}

export interface IEmail {
  template: string;
  to: string;
  locals: object;
}

export interface IReview {
  id: string;
  user: string;
  rating: Rating;
  message: string;
  createdAt: Date;
}
