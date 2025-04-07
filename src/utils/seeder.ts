import { dummyUsers } from 'src/data/user-dummy';
import { dummyInsurance } from 'src/data/insurance-dummy';
import { dummyPolicies } from 'src/data/policy-dummy';
import { dummyClaims } from 'src/data/claim-dummy';

export async function seedUser(prisma) {
  const userCount = await prisma.user.count();
  if (userCount === 0) {
    await prisma.user.createMany({ data: dummyUsers });
    console.log('✅ Seeded dummy users');
  } else {
    console.log('User count: ', userCount);
  }
}

export async function seedInsurance(prisma) {
  const insuranceCount = await prisma.insuranceProduct.count();
  if (insuranceCount === 0) {
    await prisma.insuranceProduct.createMany({ data: dummyInsurance });
    console.log('✅ Seeded dummy insurance products');
  } else {
    console.log('Insurance product count: ', insuranceCount);
  }
}

export async function seedPolicy(prisma) {
  const policyCount = await prisma.policy.count();
  if (policyCount === 0) {
    await prisma.policy.createMany({ data: dummyPolicies });
    console.log('✅ Seeded dummy policies');
  } else {
    console.log('Policy count: ', policyCount);
  }
}

export async function seedClaim(prisma) {
  const claimCount = await prisma.claim.count();
  if (claimCount === 0) {
    await prisma.claim.createMany({ data: dummyClaims });
    console.log('✅ Seeded dummy claims');
  } else {
    console.log('Claim count: ', claimCount);
  }
}
