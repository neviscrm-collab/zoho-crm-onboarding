import { OnboardingData } from '../store/onboardingStore';

export interface CRMRecommendation {
  modules: string[];
  pipelines: string[];
  automations: string[];
  dashboards: string[];
  headline: string;
  description: string;
}

const industryConfig: Record<string, CRMRecommendation> = {
  'Technology / SaaS': {
    headline: 'Built for SaaS growth',
    description: 'Track trials, manage subscriptions, and scale your pipeline.',
    modules: ['Leads', 'Contacts', 'Accounts', 'Deals', 'Products'],
    pipelines: ['Trial to Paid', 'Enterprise Sales', 'Renewal & Upsell'],
    automations: ['Trial expiry alerts', 'Churn risk notifications', 'Lead scoring'],
    dashboards: ['MRR Dashboard', 'Sales Pipeline', 'Churn Analytics'],
  },
  Education: {
    headline: 'Tailored for education',
    description: 'Manage admissions, enrollments, and student relationships.',
    modules: ['Leads', 'Contacts', 'Students', 'Institutions', 'Deals'],
    pipelines: ['Admissions', 'Enrollments', 'Renewals'],
    automations: ['Follow-up reminders', 'Lead assignment rules', 'Enrollment confirmations'],
    dashboards: ['Enrollment Funnel', 'Revenue Overview', 'Student Lifecycle'],
  },
  Healthcare: {
    headline: 'Optimized for healthcare',
    description: 'Manage patient relationships and healthcare partnerships.',
    modules: ['Contacts', 'Accounts', 'Deals', 'Cases', 'Appointments'],
    pipelines: ['Patient Acquisition', 'Partner Onboarding', 'Service Renewals'],
    automations: ['Appointment reminders', 'Follow-up sequences', 'Referral tracking'],
    dashboards: ['Patient Overview', 'Revenue by Service', 'Partner Performance'],
  },
  'Real Estate': {
    headline: 'Designed for real estate',
    description: 'Manage properties, leads, and close deals faster.',
    modules: ['Leads', 'Contacts', 'Properties', 'Deals', 'Listings'],
    pipelines: ['Buyer Journey', 'Seller Journey', 'Rental Pipeline'],
    automations: ['Property alerts', 'Follow-up sequences', 'Deal stage updates'],
    dashboards: ['Listings Overview', 'Deal Pipeline', 'Agent Performance'],
  },
  'Financial Services': {
    headline: 'Built for financial growth',
    description: 'Track clients, manage portfolios, and grow AUM.',
    modules: ['Contacts', 'Accounts', 'Deals', 'Portfolios', 'Cases'],
    pipelines: ['Client Onboarding', 'Investment Pipeline', 'Renewal Management'],
    automations: ['KYC reminders', 'Portfolio reviews', 'Compliance alerts'],
    dashboards: ['AUM Dashboard', 'Client Pipeline', 'Revenue Forecast'],
  },
  Manufacturing: {
    headline: 'Optimized for manufacturing',
    description: 'Manage distributors, track orders, and grow your network.',
    modules: ['Leads', 'Contacts', 'Accounts', 'Products', 'Orders'],
    pipelines: ['Distributor Onboarding', 'Order Pipeline', 'Service Contracts'],
    automations: ['Order status updates', 'Reorder reminders', 'Distributor follow-ups'],
    dashboards: ['Sales by Region', 'Product Performance', 'Distributor Network'],
  },
  Retail: {
    headline: 'Designed for retail growth',
    description: 'Track customers, manage loyalty, and boost repeat sales.',
    modules: ['Contacts', 'Accounts', 'Deals', 'Campaigns', 'Products'],
    pipelines: ['New Customer', 'Loyalty Program', 'Win-back Campaign'],
    automations: ['Purchase follow-ups', 'Loyalty rewards', 'Cart abandonment'],
    dashboards: ['Customer LTV', 'Sales by Channel', 'Campaign ROI'],
  },
  Consulting: {
    headline: 'Built for consulting firms',
    description: 'Manage engagements, track projects, and grow your client base.',
    modules: ['Leads', 'Contacts', 'Accounts', 'Projects', 'Deals'],
    pipelines: ['Proposal Pipeline', 'Engagement Pipeline', 'Renewal Pipeline'],
    automations: ['Proposal follow-ups', 'Project milestone alerts', 'Invoice reminders'],
    dashboards: ['Revenue Pipeline', 'Client Health', 'Project Profitability'],
  },
  'Marketing Agency': {
    headline: 'Tailored for agencies',
    description: 'Manage campaigns, track leads, and demonstrate client ROI.',
    modules: ['Leads', 'Contacts', 'Campaigns', 'Deals', 'Reports'],
    pipelines: ['New Client', 'Campaign Pipeline', 'Retainer Renewal'],
    automations: ['Lead nurturing', 'Campaign performance alerts', 'Client reporting'],
    dashboards: ['Campaign Performance', 'Client Portfolio', 'Lead Attribution'],
  },
};

const defaultRecommendation: CRMRecommendation = {
  headline: 'Your CRM, your way',
  description: 'A flexible setup ready for your unique business needs.',
  modules: ['Leads', 'Contacts', 'Accounts', 'Deals', 'Reports'],
  pipelines: ['Sales Pipeline', 'Follow-up Pipeline', 'Renewal Pipeline'],
  automations: ['Lead assignment', 'Follow-up reminders', 'Deal stage updates'],
  dashboards: ['Sales Overview', 'Pipeline Analytics', 'Activity Dashboard'],
};

export function generateRecommendation(data: OnboardingData): CRMRecommendation {
  const base = industryConfig[data.businessType] || defaultRecommendation;
  const rec = { ...base };

  // Add goal-based enhancements
  if (data.goals.includes('Marketing Campaigns')) {
    if (!rec.modules.includes('Campaigns')) rec.modules.push('Campaigns');
    if (!rec.automations.includes('Email sequences')) rec.automations.push('Email sequences');
  }
  if (data.goals.includes('Reporting & Analytics')) {
    if (!rec.modules.includes('Reports')) rec.modules.push('Reports');
    if (!rec.dashboards.includes('Custom Reports')) rec.dashboards.push('Custom Reports');
  }
  if (data.goals.includes('Revenue Forecasting')) {
    if (!rec.dashboards.includes('Revenue Forecast')) rec.dashboards.push('Revenue Forecast');
  }
  if (data.goals.includes('Customer Retention')) {
    if (!rec.automations.includes('Churn prevention alerts')) rec.automations.push('Churn prevention alerts');
  }
  if (data.goals.includes('Automate Follow-ups')) {
    if (!rec.automations.includes('Automated follow-up sequences')) rec.automations.push('Automated follow-up sequences');
  }

  // Team size based additions
  if (['51–200', '200+'].includes(data.teamSize)) {
    if (!rec.modules.includes('Territories')) rec.modules.push('Territories');
    if (!rec.automations.includes('Round-robin lead assignment')) rec.automations.push('Round-robin lead assignment');
  }

  return rec;
}

export const migrationCRMs = [
  'Salesforce', 'HubSpot', 'Microsoft Dynamics', 'Pipedrive',
  'Monday CRM', 'Freshsales', 'Spreadsheet', 'No CRM', 'Other',
];
