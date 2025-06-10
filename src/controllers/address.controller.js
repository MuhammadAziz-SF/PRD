import { addressService } from '../services/address.service.js';

class AddressController {
  async createAddress(req, res, next) {
    try {
      const addressData = req.body;
      addressData.userId = req.user.id;

      const newAddress = await addressService.createAddress(addressData);

      res.status(201).json({
        success: true,
        message: 'Address created successfully',
        data: newAddress,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAddressById(req, res, next) {
    try {
      const { id } = req.params;
      const address = await addressService.getAddressById(id);

      if (!address) {
        return res.status(404).json({
          success: false,
          message: 'Address not found',
        });
      }

      if (address.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this address',
        });
      }

      res.status(200).json({
        success: true,
        data: address,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserAddresses(req, res, next) {
    try {
      const userId = req.params.userId || req.user.id;

      if (userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to these addresses',
        });
      }

      const addresses = await addressService.getAddressesByUserId(userId);

      res.status(200).json({
        success: true,
        count: addresses.length,
        data: addresses,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateAddress(req, res, next) {
    try {
      const { id } = req.params;
      const addressData = req.body;

      const existingAddress = await addressService.getAddressById(id);
      if (!existingAddress) {
        return res.status(404).json({
          success: false,
          message: 'Address not found',
        });
      }

      if (existingAddress.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this address',
        });
      }

      const updatedAddress = await addressService.updateAddress(id, addressData);

      res.status(200).json({
        success: true,
        message: 'Address updated successfully',
        data: updatedAddress,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteAddress(req, res, next) {
    try {
      const { id } = req.params;

      const existingAddress = await addressService.getAddressById(id);
      if (!existingAddress) {
        return res.status(404).json({
          success: false,
          message: 'Address not found',
        });
      }

      if (existingAddress.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this address',
        });
      }

      await addressService.deleteAddress(id);

      res.status(200).json({
        success: true,
        message: 'Address deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async setDefaultAddress(req, res, next) {
    try {
      const { id } = req.params;

      const existingAddress = await addressService.getAddressById(id);
      if (!existingAddress) {
        return res.status(404).json({
          success: false,
          message: 'Address not found',
        });
      }

      if (existingAddress.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access to this address',
        });
      }

      const defaultAddress = await addressService.setDefaultAddress(req.user.id, id);

      res.status(200).json({
        success: true,
        message: 'Address set as default successfully',
        data: defaultAddress,
      });
    } catch (error) {
      next(error);
    }
  }
}

const Address = new AddressController();
export default Address;
