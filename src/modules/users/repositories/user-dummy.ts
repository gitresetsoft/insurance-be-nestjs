import { UserProfileDto } from '../dto/user-profile.dto';

export const dummyUsers: UserProfileDto[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'user',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: '2025-03-01T00:00:00.000Z',
    updatedAt: '2025-03-01T00:00:00.000Z',
  },
  {
    id: '3',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    createdAt: '2025-03-03T00:00:00.000Z',
    updatedAt: '2025-03-03T00:00:00.000Z',
  },
];
