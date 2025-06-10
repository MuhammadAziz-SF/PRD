import express from 'express';

import AddressController from '../controllers/address.controller.js';
import { JwtAuthGuard } from '../guard/jwt-auth.guard.js';
import { SelfGuard } from '../guard/self.guard.js';

const router = express.Router();

router
  .post('/addresses', JwtAuthGuard, AddressController.createAddress)
  .get('/addresses', JwtAuthGuard, AddressController.getUserAddresses)
  .get('/users/:userId/addresses', JwtAuthGuard, SelfGuard, AddressController.getUserAddresses)
  .get('/addresses/:id', JwtAuthGuard, AddressController.getAddressById)
  .patch('/addresses/:id', JwtAuthGuard, AddressController.updateAddress)
  .delete('/addresses/:id', JwtAuthGuard, AddressController.deleteAddress)
  .patch('/addresses/:id/default', JwtAuthGuard, AddressController.setDefaultAddress);

export default router;
