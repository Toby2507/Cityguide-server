import { number, object, string, TypeOf } from 'zod';

export const refreshAccessTokenSchema = object({
  body: object({
    refreshToken: string({ required_error: 'Refresh Token is required' }),
  }),
});

export const verifyEmailSchema = object({
  params: object({
    otp: string(),
  }),
});

export const changePasswordSchema = object({
  body: object({
    password: string({ required_error: 'New password is required' }).min(8, 'Password should be atleast 8 characters'),
  }),
  params: object({
    otp: string(),
  }),
});

export const changeCancellationPolicySchema = object({
  body: object({
    daysFromReservation: number({
      required_error: 'No of days from reservation date is required',
      invalid_type_error: 'Days from reservation should be a number',
    }),
    percentRefundable: number({
      required_error: 'Percent refundable is required',
      invalid_type_error: 'Percent refundable should be a number',
    }),
  }),
});

export type refreshAccessTokenInput = TypeOf<typeof refreshAccessTokenSchema>['body'];
export type verifyEmailInput = TypeOf<typeof verifyEmailSchema>['params'];
export type changePasswordInput = TypeOf<typeof changePasswordSchema>;
export type changeCancellationPolicyInput = TypeOf<typeof changeCancellationPolicySchema>['body'];
