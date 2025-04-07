// import { Injectable } from '@nestjs/common';
// import { UserProfileDto } from '../../modules/users/dto/user-profile.dto';
// import { dummyUsers } from './user-dummy';

// @Injectable()
// export class UserRepository {
//   private users: UserProfileDto[];

//   constructor() {
//     this.users = dummyUsers;
//   }

//   findAll(): UserProfileDto[] {
//     return this.users;
//   }

//   findOne(id: string): UserProfileDto | undefined {
//     return this.users.find((user) => user.id === id);
//   }

//   findByEmail(email: string): UserProfileDto | undefined {
//     return this.users.find((user) => user.email === email);
//   }

//   create(user: UserProfileDto): UserProfileDto {
//     this.users.push(user);
//     return user;
//   }

//   update(
//     id: string,
//     updateUser: Partial<UserProfileDto>,
//   ): UserProfileDto | undefined {
//     const userIndex = this.users.findIndex((user) => user.id === id);
//     if (userIndex === -1) return undefined;

//     this.users[userIndex] = {
//       ...this.users[userIndex],
//       ...updateUser,
//       updatedAt: new Date(),
//     };

//     return this.users[userIndex];
//   }

//   remove(id: string): boolean {
//     const initialLength = this.users.length;
//     this.users = this.users.filter((user) => user.id !== id);
//     return initialLength !== this.users.length;
//   }
// }
