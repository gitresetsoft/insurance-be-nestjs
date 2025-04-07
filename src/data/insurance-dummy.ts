import { CreateInsuranceProductDto } from 'src/modules/insurance/dto/create-insurance-product.dto';

export const dummyInsurance: CreateInsuranceProductDto[] = [
  {
    name: 'Car Insurance',
    type: 'CAR',
    description: 'Protects your vehicle against accidents and theft.',
    basePrice: 1200.0,
    coverageDetails:
      'Covers collisions, theft, third-party liabilities, and repairs.',
    isActive: true,
  },
  {
    name: 'Home Insurance',
    type: 'HOME',
    description: 'Comprehensive coverage for your home and belongings.',
    basePrice: 1500.0,
    coverageDetails: 'Covers fire, theft, flood, and natural disasters.',
    isActive: true,
  },
  {
    name: 'Health Insurance',
    type: 'HEALTH',
    description: 'Covers medical expenses and hospitalization.',
    basePrice: 950.0,
    coverageDetails:
      'Covers inpatient, outpatient, surgery, and specialist visits.',
    isActive: true,
  },
  {
    name: 'Life Insurance',
    type: 'LIFE',
    description: 'Provides financial protection to your loved ones.',
    basePrice: 800.0,
    coverageDetails:
      'Covers death, critical illness, and permanent disability.',
    isActive: true,
  },
  {
    name: 'Travel Insurance',
    type: 'TRAVEL',
    description: 'Protects you during domestic and international travel.',
    basePrice: 300.0,
    coverageDetails:
      'Covers trip cancellations, lost baggage, and medical emergencies.',
    isActive: true,
  },
  {
    name: 'Business Insurance',
    type: 'BUSINESS',
    description: 'Coverage for businesses against operational risks.',
    basePrice: 2500.0,
    coverageDetails:
      'Covers property damage, legal liability, and employee-related risks.',
    isActive: true,
  },
];
