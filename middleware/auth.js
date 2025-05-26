const jwt = require('jsonwebtoken');
const { User, UserBan } = require('../db/index');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Check if the user is banned
    const banRecord = await UserBan.findOne({ where: { userId: user.id } });
    if (banRecord) {
      return res.status(403).json({ message: 'User is banned' });
    }

    if (user.jwtTokenVersion !== decoded.jwtTokenVersion) {

      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();

  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
