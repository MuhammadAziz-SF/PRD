class AdminController {
    async createAdmin(req, res) {
        const adminData = req.body;
        const admin = await AdminService.createAdmin(adminData);
        res.json(admin);
    }
}

export default new AdminController();