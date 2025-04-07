import { UserProfileDto } from 'src/modules/users/dto/user-profile.dto';

export const dummyUsers: UserProfileDto[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'user',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: new Date('2025-03-01T00:00:00.000Z'),
    updatedAt: new Date('2025-03-01T00:00:00.000Z'),
  },
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    createdAt: new Date('2025-03-02T00:00:00.000Z'),
    updatedAt: new Date('2025-03-02T00:00:00.000Z'),
  },
  {
    id: 'bd1087ec-b7f5-4e5e-8452-2f23458f2a1a',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'user',
    createdAt: new Date('2025-03-03T00:00:00.000Z'),
    updatedAt: new Date('2025-03-03T00:00:00.000Z'),
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
];
