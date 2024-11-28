import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

// Fonction pour générer le token d'accès
const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, role: user.role, status: user.status },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Fonction pour générer le token de renouvellement
const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
};

// Enregistrement d'un nouvel utilisateur
const register = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;
    const validRoles = ['ADMIN', 'EMPLOYE', 'MANAGER'];

    // Vérification du rôle
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Role invalide.' });
    }

    // Vérification de l'existence de l'utilisateur
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "L'utilisateur existe déjà." });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du nouvel utilisateur
    const newUser = await prisma.user.create({
      data: { fullname, email, password: hashedPassword, role, status: true },
    });

    res.status(201).json({
      message: 'Utilisateur enregistré avec succès.',
      user: {
        id: newUser.id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Échec de l'enregistrement.", error });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    // If the email does not exist
    if (!user) {
      return res.status(404).json({ message: 'This account does not exist.' });
    }

    // If the account is inactive
    if (!user.status) {
      return res.status(403).json({ message: 'This account is inactive.' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect password.' });
    }

    // Generate access and refresh tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Send login success response
    res.json({
      message: 'Login successful.',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed.', error });
  }
};


// Renouvellement de l'accessToken
const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token manquant.' });
  }

  try {
    // Vérification du refreshToken
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Vérifier si l'utilisateur existe et que son compte est actif
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId, status: true },
    });

    if (!user) {
      return res
        .status(403)
        .json({ message: 'Utilisateur non trouvé ou inactif.' });
    }

    // Générer un nouveau token d'accès
    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Échec de la vérification du refresh token:', error);
    res.status(403).json({ message: 'Refresh token invalide.' });
  }
};

// Export par défaut des fonctions sous forme d'objet
export default {
  register,
  login,
  refreshAccessToken,
};
