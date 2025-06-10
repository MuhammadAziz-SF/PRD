import { eq, and } from 'drizzle-orm';

import db from '../config/db.js';
import { address } from '../models/user-profile/address.model.js';

class AddressService {
  async createAddress(addressData) {
    const [newAddress] = await db.insert(address).values(addressData).returning();
    return newAddress;
  }

  async getAddressById(addressId) {
    const [foundAddress] = await db
      .select()
      .from(address)
      .where(eq(address.id, addressId))
      .limit(1);
    return foundAddress || null;
  }

  async getAddressesByUserId(userId) {
    const addresses = await db.select().from(address).where(eq(address.userId, userId));
    return addresses;
  }

  async updateAddress(addressId, addressData) {
    addressData.updatedAt = new Date();

    const [updatedAddress] = await db
      .update(address)
      .set(addressData)
      .where(eq(address.id, addressId))
      .returning();

    return updatedAddress || null;
  }

  async deleteAddress(addressId) {
    const [deletedAddress] = await db.delete(address).where(eq(address.id, addressId)).returning();

    return !!deletedAddress;
  }

  async setDefaultAddress(userId, addressId) {
    await db.update(address).set({ isDefault: false }).where(eq(address.userId, userId));

    const [defaultAddress] = await db
      .update(address)
      .set({ isDefault: true, updatedAt: new Date() })
      .where(and(eq(address.id, addressId), eq(address.userId, userId)))
      .returning();

    return defaultAddress || null;
  }
}

export const addressService = new AddressService();
export default AddressService;
