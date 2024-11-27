import prisma from '../config/prisma.js';

// Créer une demande de congé
const createRequestLeave = async (req, res) => {
  const { start_date, end_date, motif, status, typeLeaveId } = req.body;

  try {
    const requestLeave = await prisma.requestLeave.create({
      data: {
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        motif,
        status,
        typeLeaveId,
        userId: req.user.userId, // Utilisation de l'ID utilisateur du token
      },
    });

    res.status(201).json({
      message: `Request leave created successfully.`,
      requestLeave,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Error creating request leave. Please try again.' });
  }
};

// Récupérer toutes les demandes de congé
const getAllRequestLeaves = async (req, res) => {
  try {
    const requestLeaves = await prisma.requestLeave.findMany({
      orderBy: {
        id: 'asc',
      },
      include: {
        typeLeave: true,
        user: true,
      },
    });
    res.status(200).json({
      message: `${requestLeaves.length} request leave(s) retrieved successfully.`,
      requestLeaves,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving request leaves.' });
  }
};

// Récupérer une demande de congé par ID
const getRequestLeaveById = async (req, res) => {
  const { id } = req.params;

  try {
    const requestLeave = await prisma.requestLeave.findUnique({
      where: { id: Number(id) },
      include: {
        typeLeave: true,
        user: true,
      },
    });

    if (!requestLeave) {
      return res
        .status(404)
        .json({ message: `Request leave with ID ${id} not found.` });
    }

    res.status(200).json({
      message: `Request leave with ID ${id} retrieved successfully.`,
      requestLeave,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving request leave.' });
  }
};

// Mettre à jour une demande de congé
// const updateRequestLeave = async (req, res) => {
//   const { id } = req.params;
//   const { start_date, end_date, motif, status, typeLeaveId } = req.body;

//   const data = {
//     start_date: new Date(start_date),
//     end_date: new Date(end_date),
//     motif,
//     status,
//     typeLeaveId,
//     userId: req.user.userId, 
//   };

//   try {
//     const requestLeaveExists = await prisma.requestLeave.findUnique({
//       where: { id: Number(id) },
//     });

//     if (!requestLeaveExists) {
//       return res
//         .status(404)
//         .json({ message: `Request leave with ID ${id} not found.` });
//     }

//     const updatedRequestLeave = await prisma.requestLeave.update({
//       where: { id: Number(id) },
//       data,
//     });

//     res.status(200).json({
//       message: `Request leave with ID ${id} updated successfully.`,
//       requestLeave: updatedRequestLeave,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error updating request leave.' });
//   }
// };

// Mettre à jour uniquement le statut d'une demande de congé
const updateRequestLeave = async (req, res) => {
  const { id } = req.params; // ID de la demande de congé
  const { status } = req.body; // Nouveau statut fourni dans le corps de la requête

  try {
    // Vérifier si la demande existe
    const requestLeaveExists = await prisma.requestLeave.findUnique({
      where: { id: Number(id) },
    });

    if (!requestLeaveExists) {
      return res
        .status(404)
        .json({ message: `Request leave with ID ${id} not found.` });
    }

    // Mettre à jour uniquement le champ 'status'
    const updatedRequestLeave = await prisma.requestLeave.update({
      where: { id: Number(id) },
      data: { status }, // Mise à jour du statut uniquement
    });

    res.status(200).json({
      message: `Request leave with ID ${id} updated successfully.`,
      requestLeave: updatedRequestLeave,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating request leave.' });
  }
};



// Supprimer une demande de congé
const deleteRequestLeave = async (req, res) => {
  const { id } = req.params;

  try {
    const requestLeaveExists = await prisma.requestLeave.findUnique({
      where: { id: parseInt(id) },
    });

    if (!requestLeaveExists) {
      return res
        .status(404)
        .json({ message: `Request leave with ID ${id} not found.` });
    }

    await prisma.requestLeave.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      message: `Request leave with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res
        .status(404)
        .json({ message: `Request leave with ID ${id} not found.` });
    }
    res.status(500).json({ message: 'Error deleting request leave.' });
  }
};

// Exporter le contrôleur en tant qu'objet
const RequestLeaveController = {
  createRequestLeave,
  getAllRequestLeaves,
  getRequestLeaveById,
  updateRequestLeave,
  deleteRequestLeave,
};

export default RequestLeaveController;
