class AdminService {
    async createAdmin(adminData) {
        const admin = await db.insert(admins).values(adminData);
        return admin;
    }
}

export default new AdminService();