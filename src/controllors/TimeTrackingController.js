import prisma from '../config/prisma.js';

// Fonction pour formater la date au format "DD/MM/YYYY HH:mm"
function formatDate(dateString) {
  const date = new Date(dateString); // Crée un objet Date à partir de la chaîne ISO 8601

  const day = String(date.getDate()).padStart(2, '0'); // Récupère le jour et le met sous format à deux chiffres
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Récupère le mois (en ajoutant 1, car les mois commencent à 0)
  const year = date.getFullYear(); // Récupère l'année
  const hours = String(date.getHours()).padStart(2, '0'); // Récupère l'heure en format 24h
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Récupère les minutes

  return `${day}/${month}/${year} ${hours}:${minutes}`; // Retourne la date formatée
}

// Créer un enregistrement de suivi du temps
const createTimeTracking = async (req, res) => {
  const { checkin_time, checkout_time } = req.body;

  try {
    // Validation des entrées
    if (!checkin_time) {
      return res.status(400).json({ error: 'Check-in time is required.' });
    }

    // Obtenir les limites de la journée actuelle
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    // Convertir les dates saisies
    const checkin = new Date(checkin_time);
    const checkout = checkout_time ? new Date(checkout_time) : null;

    // Vérification des plages horaires
    if (checkin < startOfDay || checkin > endOfDay) {
      return res.status(400).json({
        error: 'Check-in time must be within today\'s date.',
      });
    }
    if (checkout && (checkout < startOfDay || checkout > endOfDay)) {
      return res.status(400).json({
        error: 'Check-out time must be within today\'s date.',
      });
    }

    // Création du pointage
    const timeTracking = await prisma.timeTracking.create({
      data: {
        checkin_time: checkin,
        checkout_time: checkout,
        userId: req.user.userId, // Utilisation de l'ID utilisateur du token
      },
    });

    // Format des dates pour l'affichage
    const formattedCheckinTime = formatDate(timeTracking.checkin_time);
    const formattedCheckoutTime = timeTracking.checkout_time
      ? formatDate(timeTracking.checkout_time)
      : null;

    res.status(201).json({
      message: `Time tracking record created successfully.`,
      timeTracking: {
        ...timeTracking,
        checkin_time: formattedCheckinTime,
        checkout_time: formattedCheckoutTime,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error creating time tracking record. Please try again.',
    });
  }
};


// Récupérer tous les enregistrements de suivi du temps
const getAllTimeTrackings = async (req, res) => {
  try {
    const timeTrackings = await prisma.timeTracking.findMany({
      orderBy: {
        id: 'asc',
      },
      include: {
        user: true,
      },
    });

    // Format des dates pour chaque enregistrement
    const formattedTimeTrackings = timeTrackings.map((tracking) => ({
      ...tracking,
      checkin_time: formatDate(tracking.checkin_time),
      checkout_time: tracking.checkout_time
        ? formatDate(tracking.checkout_time)
        : null,
    }));

    res.status(200).json({
      message: `${timeTrackings.length} time tracking record(s) retrieved successfully.`,
      timeTrackings: formattedTimeTrackings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving time tracking records.' });
  }
};

// Récupérer un enregistrement de suivi du temps par ID
const getTimeTrackingById = async (req, res) => {
  const { id } = req.params;

  try {
    const timeTracking = await prisma.timeTracking.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
      },
    });

    if (!timeTracking) {
      return res
        .status(404)
        .json({ message: `Time tracking record with ID ${id} not found.` });
    }

    // Format des dates
    const formattedCheckinTime = formatDate(timeTracking.checkin_time);
    const formattedCheckoutTime = timeTracking.checkout_time
      ? formatDate(timeTracking.checkout_time)
      : null;

    res.status(200).json({
      message: `Time tracking record with ID ${id} retrieved successfully.`,
      timeTracking: {
        ...timeTracking,
        checkin_time: formattedCheckinTime,
        checkout_time: formattedCheckoutTime,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving time tracking record.' });
  }
};

// Mettre à jour un enregistrement de suivi du temps
const updateTimeTracking = async (req, res) => {
  const { id } = req.params;
  const { checkin_time, checkout_time } = req.body;

  // Récupération de l'utilisateur connecté (via le token)
  const userId = req.user.userId;
  const userRole = req.user.role; // Récupération du rôle (vous devez avoir ce rôle dans le token)

  // Validation que l'utilisateur ne tente de modifier que ses propres données
  try {
    const timeTrackingExists = await prisma.timeTracking.findUnique({
      where: { id: Number(id) },
    });

    if (!timeTrackingExists) {
      return res
        .status(404)
        .json({ message: `Time tracking record with ID ${id} not found.` });
    }

    // Si l'utilisateur est un EMPLOYE, il ne peut modifier que son propre enregistrement
    if (userRole === 'EMPLOYE' && timeTrackingExists.userId !== userId) {
      return res.status(403).json({
        message: 'You can only update your own time tracking records.',
      });
    }

    // Si tout est validé, procéder à la mise à jour de l'enregistrement
    const data = {
      checkin_time: new Date(checkin_time),
      checkout_time: checkout_time ? new Date(checkout_time) : null,
      userId: timeTrackingExists.userId, // Assurez-vous que l'ID de l'utilisateur reste le même
    };

    const updatedTimeTracking = await prisma.timeTracking.update({
      where: { id: Number(id) },
      data,
    });

    // Format des dates
    const formattedCheckinTime = formatDate(updatedTimeTracking.checkin_time);
    const formattedCheckoutTime = updatedTimeTracking.checkout_time
      ? formatDate(updatedTimeTracking.checkout_time)
      : null;

    res.status(200).json({
      message: `Time tracking record with ID ${id} updated successfully.`,
      timeTracking: {
        ...updatedTimeTracking,
        checkin_time: formattedCheckinTime,
        checkout_time: formattedCheckoutTime,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating time tracking record.' });
  }
};


// Supprimer un enregistrement de suivi du temps
const deleteTimeTracking = async (req, res) => {
  const { id } = req.params;

  try {
    const timeTrackingExists = await prisma.timeTracking.findUnique({
      where: { id: parseInt(id) },
    });

    if (!timeTrackingExists) {
      return res
        .status(404)
        .json({ message: `Time tracking record with ID ${id} not found.` });
    }

    await prisma.timeTracking.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      message: `Time tracking record with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res
        .status(404)
        .json({ message: `Time tracking record with ID ${id} not found.` });
    }
    res.status(500).json({ message: 'Error deleting time tracking record.' });
  }
};

// Exporter le contrôleur en tant qu'objet
const TimeTrackingController = {
  createTimeTracking,
  getAllTimeTrackings,
  getTimeTrackingById,
  updateTimeTracking,
  deleteTimeTracking,
};

export default TimeTrackingController;
