import {
  addSocketToRequest,
  corsCredentials,
  corsOptions,
  deserializeUser,
  errorHandler,
  facebookStrategy,
  googleStrategy,
  handler,
} from '@middlewares';
import {
  accountRoutes,
  establishmentRoutes,
  notificationRoutes,
  paymentRoutes,
  propertyRoutes,
  reservationRoutes,
  reviewRoutes,
  userRoutes,
  vtuRoutes,
} from '@routes';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import { notFoundHandler } from './controllers/account.controllers';

const app = express();

// MIDDLEWARES
app.use(helmet());
app.use(corsCredentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(deserializeUser);
app.use(addSocketToRequest);
app.use(passport.initialize());

// SOCIAL LOGIN STRATEGIES
passport.use(googleStrategy);
passport.use(facebookStrategy);

// ROUTERS
app.use('/api/v1/account', accountRoutes);
app.use('/api/v1/establishment', establishmentRoutes);
app.use('/api/v1/notification', notificationRoutes);
app.use('/api/v1/property', propertyRoutes);
app.use('/api/v1/reservation', reservationRoutes);
app.use('/api/v1/review', reviewRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/vtu', vtuRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('*', notFoundHandler);

// ERROR HANDLING
app.use(errorHandler);
process.on('uncaughtException', (err) => {
  handler.handleErrors(err);
});

export default app;
