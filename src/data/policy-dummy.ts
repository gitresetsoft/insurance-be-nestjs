import { CreatePolicyDto } from 'src/modules/policy/dto/create-policy.dto';

export const dummyPolicies: CreatePolicyDto[] = [
  {
    policyNumber: 'POL-0001',
    status: 'ACTIVE',
    startDate: new Date('2025-04-01T00:00:00.000Z'),
    endDate: new Date('2026-04-01T00:00:00.000Z'),
    premium: 1200,
    coverageLimit: 20000,
    userId: '82a76d36-ec46-40d0-a739-7ee18f35974b',
    insuranceProductId: '50847fd8-f14b-4a92-bd14-4b2eb88062be',
  },
  {
    policyNumber: 'POL-0002',
    status: 'ACTIVE',
    startDate: new Date('2025-04-03T00:00:00.000Z'),
    endDate: new Date('2026-04-03T00:00:00.000Z'),
    premium: 950,
    coverageLimit: 100000,
    userId: 'bd1087ec-b7f5-4e5e-8452-2f23458f2a1a',
    insuranceProductId: 'fe3bdde4-5e54-4756-90e1-804fa72fc15c',
  },
  {
    policyNumber: 'POL-0003',
    status: 'ACTIVE',
    startDate: new Date('2025-04-05T00:00:00.000Z'),
    endDate: new Date('2026-04-05T00:00:00.000Z'),
    premium: 300,
    coverageLimit: 50000,
    userId: 'bd1087ec-b7f5-4e5e-8452-2f23458f2a1a',
    insuranceProductId: '10f9ac5c-cb72-4f45-a543-261aee939f78',
  },
];
