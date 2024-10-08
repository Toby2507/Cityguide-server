import { DayOfWeek, EntityType, PropertyType } from './enums';

export interface ILatLng {
  lat: number;
  lng: number;
}
export interface IAddress {
  name: string;
  fullAddress?: string;
  locationId: string;
  city?: string;
  state: string;
  country: string;
  geoLocation: ILatLng;
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
  type: EntityType;
  isPartner: boolean;
}

export interface IEmail {
  template: string;
  to: string;
  locals: object;
}

export interface IFavProperties {
  propertyId: string;
  propertyType: PropertyType;
}

export type TAction = 'add' | 'update' | 'remove';
