export const AdminGuard = (req, res, next) => {
  try {
    const user = req.user;
    console.log(user.role);

    if (user.role != 'superAdmin') {
      return res.status(403).json({
        statusCode: 403,
        message: 'Forbidden user',
      });
    }

    next();
  } catch (e) {
    next(e);
  }
};
