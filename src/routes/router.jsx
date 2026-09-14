import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import { DoctorsPage } from '../pages/DoctorsPage';
import { DoctorDetailsPage } from '../pages/DoctorDetailsPage';
import { BookAppointmentPage } from '../pages/BookAppointmentPage';
import { AppointmentsPage } from '../pages/AppointmentsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <DoctorsPage />,
      },
      {
        path: 'doctors',
        element: <DoctorsPage />,
      },
      {
        path: 'doctors/:id',
        element: <DoctorDetailsPage />,
      },
      {
        path: 'book',
        element: <BookAppointmentPage />,
      },
      {
        path: 'book/:doctorId',
        element: <BookAppointmentPage />,
      },
      {
        path: 'appointments',
        element: <AppointmentsPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
