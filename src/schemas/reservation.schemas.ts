import { EntityType, PropertyType, Status } from '@types';
import { boolean, coerce, nativeEnum, number, object, string, TypeOf, ZodIssueCode } from 'zod';

export const createReservationSchema = object({
  body: object({
    property: string({ required_error: 'Property ID is required' }),
    partner: string({ required_error: 'Partner ID is required ' }),
    partnerType: nativeEnum(EntityType, {
      required_error: 'Partner Type is required',
      invalid_type_error: 'Partner type should be User | Establishment',
    }),
    propertyType: nativeEnum(PropertyType, {
      required_error: 'Property type is required',
      invalid_type_error: 'Property type should be a Stay | Restaurant',
    }).refine((data) => data !== PropertyType.NIGHTLIFE, { message: 'NightLife reservations are not supported' }),
    checkInDay: coerce.date({ required_error: 'From date is required', invalid_type_error: 'Invalid date' }),
    checkInTime: string({ required_error: 'Check-in time is required' }).regex(
      /^\d{2}:\d{2}$/,
      'Check-in time should be in HH:MM 23-hour format'
    ),
    checkOutDay: coerce.date({ required_error: 'To date is required', invalid_type_error: 'Invalid date' }),
    checkOutTime: string({ required_error: 'Check-out time is required' }).regex(
      /^\d{2}:\d{2}$/,
      'Check-out time should be in HH:MM 23-hour format'
    ),
    accommodations: object(
      {
        accommodationId: string({ required_error: 'Accommodation ID is required' }),
        reservationCount: number({
          required_error: 'Quantity of accommodation reserved is required',
          invalid_type_error: 'Quantity of accommodation reserved should be a number',
        })
          .positive('Quantity of accommodation reserved should be atleast 1')
          .int(),
        noOfGuests: object(
          {
            adults: number({
              required_error: 'Number of adults for each reserved accommodation is required',
              invalid_type_error: 'Number of adults for each reserved accommodation is a number',
            }),
            children: number({
              required_error: 'Number of children for each reserved accommodation is required',
              invalid_type_error: 'Number of children for each reserved accommodation is a number',
            }),
          },
          {
            required_error: 'Number of guests for each reserved accommodation is required',
            invalid_type_error: 'Number of guests for each reserved accommodation should be an object',
          }
        ),
      },
      { invalid_type_error: 'Accommodations should be an array of objects' }
    )
      .array()
      .min(1, 'Atleast 1 accommodation should be reserved')
      .optional(),
    reservationCount: number({
      required_error: 'Reservation count is required',
      invalid_type_error: 'Reservation count is a number',
    }),
    noOfGuests: object(
      {
        adults: number({
          required_error: 'Number of adults is required',
          invalid_type_error: 'Number of adults is a number',
        }),
        children: number({
          required_error: 'Number of children is required',
          invalid_type_error: 'Number of children is a number',
        }),
      },
      { required_error: 'Number of guests is required', invalid_type_error: 'Number of guests should be an object' }
    ),
    price: number({ invalid_type_error: 'Price is a number' }).optional(),
    guestFullName: string().min(3, 'Guest full name should be atleast 3 characters long').optional(),
    guestEmail: string().email('Invalid guest email').optional(),
    creditCardToken: string().optional(),
    requests: string().array().min(1, 'Atleast 1 request').optional(),
    isAgent: boolean({
      invalid_type_error: 'isAgent should be true if reservation is for someone else and false otherwise',
    }).optional(),
  }).superRefine((data, ctx) => {
    if (data.propertyType === PropertyType.STAY && (!data.accommodations?.length || !data.price)) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: 'Price is required for Stay reservations and atleast 1 accommodation should be reserved',
        path: ['accommodations', 'price'],
      });
    }
    if (data.isAgent && (!data.guestEmail || !data.guestFullName))
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: 'Please fill the guest full name and email',
        path: ['isAgent', 'guestFullName', 'guestEmail'],
      });
  }),
});

export const updateReservationSchema = object({
  body: object({
    id: string({ required_error: 'Reservation ID is required' }),
    status: nativeEnum(Status, { required_error: 'Reservation Status is required' }),
  }),
});

export const getReservationDetailSchema = object({
  params: object({
    reservationId: string({ required_error: 'Reservation ID is required' }),
  }),
});

export const reservationRefSchema = object({
  params: object({
    reservationRef: string({ required_error: 'Reservation ref string is required' }),
  }),
});

export const cancelReservationSchema = object({
  params: object({
    reservationId: string({ required_error: 'Reservation ID is required' }),
  }),
});

export const reservationAnalyticsSchema = object({
  body: object({
    property: string().optional(),
    propertyType: nativeEnum(PropertyType, {
      invalid_type_error: 'Property type should be a Stay | Restaurant | NightLife',
    }).optional(),
    from: coerce.date({ required_error: 'From date is required', invalid_type_error: 'Invalid from date' }),
    to: coerce.date({ required_error: 'To date is required', invalid_type_error: 'Invalid to date' }),
    interval: string({ required_error: 'Interval is required' }).regex(/daily|weekly|monthly/i, 'Invalid interval'),
  }),
});

export type createReservationInput = TypeOf<typeof createReservationSchema>['body'];
export type updateReservationInput = TypeOf<typeof updateReservationSchema>['body'];
export type reservationAnalyticsInput = TypeOf<typeof reservationAnalyticsSchema>['body'];
export type cancelReservationInput = TypeOf<typeof cancelReservationSchema>['params'];
export type getReservationDetailInput = TypeOf<typeof getReservationDetailSchema>['params'];
export type reservationRefInput = TypeOf<typeof reservationRefSchema>['params'];
