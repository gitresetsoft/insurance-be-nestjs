import { UserProfileDto } from '../dto/user-profile.dto';

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
];
