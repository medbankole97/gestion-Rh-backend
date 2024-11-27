// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader); // Vérifiez le header Authorization

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token:', token); // Vérifiez le token extrait

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Loguez le contenu du token décrypté

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    console.log('Request User:', req.user); // Vérifiez si req.user est défini
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Invalid token.' });
  }
};


// Middleware pour autoriser les rôles spécifiques
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};

// Export des fonctions
export { authenticateToken, authorizeRole };
