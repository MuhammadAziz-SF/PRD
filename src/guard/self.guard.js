export const SelfGuard = (req, res, next) => {
  try {
    const user = req?.user;
    console.log(user.role);

    if (user?.role == 'superAdmin' || user?.role == 'admin' || user?.id == req.params?.id) {
      next();
    } else {
      return res.status(403).json({
        statusCode: 403,
        message: 'Forbidder user',
      });
    }
  } catch (e) {
    next(e);
  }
};
