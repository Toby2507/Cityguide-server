import { PropertyType } from '@types';
import { boolean, coerce, nativeEnum, number, object, strictObject, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    firstName: string({ required_error: 'First name is required' }).min(3, 'First name requires atleast 3 characters'),
    lastName: string({ required_error: 'Last name is required' }).min(3, 'Last name requires atleast 3 characters'),
    phoneNumber: string().min(11, 'Invalid phone number').optional(),
    dateOfBirth: coerce.date({ required_error: 'Date of birth is required' }).optional(),
    isPartner: boolean({ invalid_type_error: 'isPartner should be a boolean' }).optional(),
    email: string({ required_error: 'Email is required' }).email('Invalid email'),
    password: string({ required_error: 'Password is required' }).min(8, 'Password should be atleast 8 characters'),
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email('Invalid email'),
    password: string({ required_error: 'Password is required' }).min(8, 'Password should be atleast 8 characters'),
  }),
});

export const updateUserSchema = object({
  body: strictObject({
    firstName: string().min(3, 'First name requires atleast 3 characters').optional(),
    lastName: string().min(3, 'Last name requires atleast 3 characters').optional(),
    dateOfBirth: coerce.date().optional(),
    phoneNumber: string().min(11, 'Invalid phone number').optional(),
    imgUrl: string().optional(),
    cancellationPolicy: object({
      daysFromReservation: number({
        required_error: 'Days from reservation is required',
        invalid_type_error: 'Days from reservation should be a number',
      }).nonnegative(),
      percentRefundable: number({
        required_error: 'Percent refundable is required',
        invalid_type_error: 'Percent refundable should be a number',
      }).refine((val) => val >= 0 && val <= 1, { message: 'Percent refundable should be between 0 and 1' }),
    }).optional(),
  }),
});

export const upgradeUserToPartnerSchema = object({
  body: object({
    dateOfBirth: coerce.date({ required_error: 'Date of birth is required' }),
    phoneNumber: string({ required_error: 'Phone number is required' }).min(11, 'Invalid phone number'),
  }),
});

export const addFavouritePropertySchema = object({
  body: object({
    propertyId: string({ required_error: 'Property id is required' }),
    propertyType: nativeEnum(PropertyType, {
      required_error: 'Property type is required',
      invalid_type_error: 'Property type should be a Stay | Restaurant | NightLife',
    }),
  }),
});

export const removeFavouritePropertySchema = object({
  body: object({
    propertyId: string({ required_error: 'Property id is required' }),
  }),
});

export const addCardSchema = object({
  body: object({
    reference: string({ required_error: 'Reference is required' }),
  }),
});

export type addCardInput = TypeOf<typeof addCardSchema>['body'];
export type loginUserInput = TypeOf<typeof loginUserSchema>['body'];
export type createUserInput = TypeOf<typeof createUserSchema>['body'];
export type updateUserInput = TypeOf<typeof updateUserSchema>['body'];
export type upgradeUserToPartnerInput = TypeOf<typeof upgradeUserToPartnerSchema>['body'];
export type addFavouritePropertyInput = TypeOf<typeof addFavouritePropertySchema>['body'];
export type removeFavouritePropertyInput = TypeOf<typeof removeFavouritePropertySchema>['body'];
