import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
// import contactsRouter from './routers/contacts.js';
import router from './routers/index.js';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  // app.get('/contacts', async (req, res) => {
  //   const contacts = await getAllContacts();
  //   res.status(200).json({
  //     status: 200,
  //     message: 'Contacts found',
  //     data: contacts,
  //   });
  // });

  // app.get('/contacts/:contactId', async (req, res) => {
  //   const { contactId } = req.params;
  //   const contact = await getContactById(contactId);

  //   if (!contact) {
  //     res.status(404).json({
  //       message: 'Contact not found',
  //     });
  //     return;
  //   }
  //   res.status(200).json({
  //     status: 200,
  //     message: 'Successfully found contact with id {**contactId**}!',
  //     data: contact,
  //   });
  // });

  app.use(contactsRouter);

  // app.use('*', (req, res, next) => {
  //   res.status(404).json({
  //     message: 'Not found',
  //   });
  // });

  // app.use((err, req, res, next) => {
  //   res.status(500).json({
  //     message: 'Something went wrong',
  //     error: err.message,
  //   });
  // });
  app.use(router);
  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
