import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import UserService from '../services/UserService.js'; // Remplacez par le chemin correct

const prisma = new PrismaClient();

describe('UserService tests', () => {
  let userId = null;

  beforeAll(() => {
    spyOn(prisma.user, 'create').and.callFake(async (data) => {
      return {
        id: 1,
        fullname: data.data.fullname,
        email: data.data.email,
        password: await bcrypt.hash(data.data.password, 10),
        role: data.data.role,
        status: data.data.status,
      };
    });

    spyOn(prisma.user, 'findMany').and.callFake(async () => {
      return [{ id: 1, fullname: 'John Doe', email: 'john@example.com' }];
    });

    spyOn(prisma.user, 'findUnique').and.callFake(async (where) => {
      if (where.id === 1) {
        return { id: 1, fullname: 'John Doe', email: 'john@example.com' };
      }
      return null;
    });

    spyOn(prisma.user, 'update').and.callFake(async (data) => {
      if (data.where.id === 1) {
        return {
          id: 1,
          fullname: data.data.fullname,
          email: data.data.email,
          role: data.data.role,
          status: data.data.status,
        };
      }
      throw new Error('User not found');
    });

    spyOn(prisma.user, 'delete').and.callFake(async (data) => {
      if (data.where.id === 1) {
        return { id: 1 };
      }
      throw new Error('User not found');
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a user', async () => {
    const user = {
      fullname: 'John Doe',
      email: 'john@example.com',
      password: 'password',
      role: 'admin',
      status: 'active',
    };

    const createdUser = await UserService.createUser(user);
    userId = createdUser.id; // Sauvegarder l'ID pour les tests suivants

    expect(createdUser).toHaveProperty('id');
    expect(createdUser.fullname).toBe(user.fullname);
    expect(createdUser.email).toBe(user.email);
  });

  it('should get all users', async () => {
    const users = await UserService.getAllUsers();

    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty('fullname');
  });

  it('should get a user by ID', async () => {
    const user = await UserService.getUserById(userId);

    expect(user).toHaveProperty('id', userId);
    expect(user).toHaveProperty('fullname', 'John Doe');
  });

  it('should fail to get a user that does not exist', async () => {
    try {
      await UserService.getUserById(999);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('User not found');
    }
  });

  it('should update a user', async () => {
    const updatedUser = {
      fullname: 'Jane Doe',
      email: 'jane@example.com',
      role: 'user',
      status: 'active',
    };

    const result = await UserService.updateUser(userId, updatedUser);

    expect(result.fullname).toBe(updatedUser.fullname);
    expect(result.email).toBe(updatedUser.email);
  });

  it('should fail to update a user that does not exist', async () => {
    try {
      await UserService.updateUser(999, { fullname: 'Not Found' });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('User not found');
    }
  });

  it('should delete a user', async () => {
    const result = await UserService.deleteUser(userId);

    expect(result).toHaveProperty('id', userId);
  });

  it('should fail to delete a user that does not exist', async () => {
    try {
      await UserService.deleteUser(999);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('User not found');
    }
  });
});
