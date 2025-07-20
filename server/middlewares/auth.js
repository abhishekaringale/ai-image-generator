import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.json({ success: false, message: 'Not Authorized. Login Again' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: 'Not Authorized. Login Again',
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};
