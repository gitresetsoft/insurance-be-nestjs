// import { UserProfileDto } from '../../modules/users/dto/user-profile.dto';

import { CreateClaimDto } from 'src/modules/claims/dto/create-claim.dto';

export const dummyClaims: CreateClaimDto[] = [
  {
    claimNumber: 'CLM-1001',
    description: 'Rear-end collision repair',
    amount: 3500,
    status: 'UNDER_REVIEW',
    userId: '82a76d36-ec46-40d0-a739-7ee18f35974b',
    policyId: 'a5f2c332-1a01-4a0a-bb8e-86c42c947861',
  },
  {
    claimNumber: 'CLM-1002',
    description: 'Emergency surgery reimbursement',
    amount: 12000,
    status: 'APPROVED',
    userId: 'bd1087ec-b7f5-4e5e-8452-2f23458f2a1a',
    policyId: 'f2237800-2e90-4b00-a7e4-39f62d15c4cc',
  },
];
