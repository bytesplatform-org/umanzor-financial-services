/**
 * Business content for Umanzor Financial Services.
 * Sourced from https://umanzorfinancialservices.com (home, /services, /about,
 * /clientsucessstories, /scheduleconsultation). Do not add claims that are
 * not supported by the client's own published material.
 */

/** Consultation booking lives on the existing site's form. Swap here when a new page exists. */
export const CONSULT_URL = "https://umanzorfinancialservices.com/scheduleconsultation";

export const CONTACT = {
  phoneDisplay: "+1 (832) 901-6044",
  phoneHref: "tel:+18329016044",
  email: "umanzorfinancial@gmail.com",
  location: "Houston, Texas",
  reach: "Serving businesses locally and nationwide",
  hours: [
    { days: "Monday to Saturday", time: "9 AM to 5 PM" },
    { days: "Sunday", time: "11 AM to 4 PM" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com/umanzorfinancialservices/" },
    { label: "Facebook", href: "https://facebook.com/profile.php?id=61593902005675" },
  ],
} as const;

export const NAV = [
  { label: "Home", href: "#top", id: "top" },
  { label: "Services", href: "#services", id: "services" },
  { label: "About", href: "#about", id: "about" },
  { label: "Success Stories", href: "#success-stories", id: "success-stories" },
  { label: "Contact", href: "#contact", id: "contact" },
] as const;

export type Service = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  includesLabel: "Includes" | "May include";
  includes: string[];
  bestFor: string;
};

export const SERVICES: Service[] = [
  {
    slug: "business-builder",
    name: "Business Builder",
    headline: "Start your business with a stronger financial foundation.",
    description:
      "For entrepreneurs ready to take the next step. We help with the initial steps of getting your company established and financially organized, so you start with the right structure and avoid costly mistakes.",
    includesLabel: "May include",
    includes: [
      "LLC formation support",
      "EIN assistance",
      "Basic financial organization",
      "Guidance on setting up your bookkeeping process",
    ],
    bestFor: "New entrepreneurs who want help getting their business organized from the beginning.",
  },
  {
    slug: "essential-bookkeeping",
    name: "Essential Bookkeeping",
    headline: "Keep your books accurate and up to date.",
    description:
      "We handle the day-to-day bookkeeping that keeps your financial records organized, so you can stay focused on running the business instead of doing the books yourself.",
    includesLabel: "Includes",
    includes: [
      "Transaction categorization",
      "Bank and credit card reconciliations",
      "Expense tracking",
      "Monthly financial statements",
      "Reconciliation review",
    ],
    bestFor: "Business owners who want reliable monthly bookkeeping without doing it themselves.",
  },
  {
    slug: "financial-management-reporting",
    name: "Financial Management & Reporting",
    headline: "Understand what your numbers are telling you.",
    description:
      "Knowing your numbers is one thing. Understanding what they mean for your business is another. This package pairs bookkeeping with clear reports that show where your money is going and how the business is performing.",
    includesLabel: "Includes",
    includes: [
      "Everything in Essential Bookkeeping",
      "Profit and Loss Statement",
      "Balance Sheet",
      "Statement of Cash Flows",
      "Executive financial summary",
      "Expense analysis",
      "Accounts receivable reporting",
    ],
    bestFor:
      "Business owners who want more visibility into profit, expenses, cash flow, and overall financial performance.",
  },
  {
    slug: "complete-financial-management-payroll",
    name: "Complete Financial Management & Payroll",
    headline: "Bookkeeping, reporting, and payroll support in one place.",
    description:
      "A more complete solution for growing businesses. We manage your ongoing financial records, support your payroll process, and keep an eye on the numbers month after month.",
    includesLabel: "Includes",
    includes: [
      "Everything in Financial Management & Reporting",
      "Payroll processing support",
      "Employee pay tracking",
      "Payroll coordination",
      "Ongoing financial organization",
      "KPI and financial insights",
    ],
    bestFor:
      "Growing businesses with employees that want more of their financial administration handled for them.",
  },
  {
    slug: "backlog-bookkeeping",
    name: "Backlog Bookkeeping",
    headline: "Behind on your books? We can help you catch up.",
    description:
      "We review and organize past transactions, reconcile accounts, correct bookkeeping issues, and bring your records up to date, whether you are a few months behind or a full year or more.",
    includesLabel: "May include",
    includes: [
      "Catching up previous months",
      "Bank and credit card reconciliations",
      "Duplicate transaction cleanup",
      "Correcting classifications",
      "Reviewing unmatched transactions",
      "Updating financial statements",
    ],
    bestFor:
      "Businesses that are months behind or no longer trust the accuracy of their QuickBooks records.",
  },
];

/** Problems verbatim from the client's "Does This Sound Familiar?" section, paired with outcomes. */
export const PROBLEMS = [
  {
    problem: "Your books are behind.",
    detail: "Transactions are piling up, months have gone unreconciled, and you are not sure where to start.",
    outcome: "Past months caught up, reconciled, and brought current.",
  },
  {
    problem: "QuickBooks does not match your bank.",
    detail: "Balances look different, transactions may be duplicated or missing, and you are not confident in the numbers.",
    outcome: "Every account reconciled to the statement, duplicates removed.",
  },
  {
    problem: "You are making money, but not sure where it is going.",
    detail: "Revenue comes in and bills get paid, but profit, expenses, and cash flow are still unclear.",
    outcome: "Monthly reports that show profit, spending, and cash plainly.",
  },
  {
    problem: "You are doing everything yourself.",
    detail: "Bookkeeping keeps getting pushed aside for customers, employees, jobs, and growth.",
    outcome: "The books handled for you, so your time goes back to the business.",
  },
  {
    problem: "Your business is growing faster than your financial system.",
    detail: "More transactions, employees, contractors, and responsibilities call for a more organized process.",
    outcome: "A financial process, including payroll, that scales with you.",
  },
] as const;

export const DIFFERENTIATORS = [
  {
    title: "Hands-on support",
    body: "Work directly with a team that gets to know how your business operates.",
  },
  {
    title: "Books you can understand",
    body: "Receive organized financial information designed to show where your business stands.",
  },
  {
    title: "Support beyond data entry",
    body: "We review your financial activity and help identify unusual trends, bookkeeping issues, and areas that deserve your attention.",
  },
] as const;

export const FOUNDER = {
  name: "Alder Umanzor",
  title: "Founder and CEO",
  facts: [
    { label: "Education", value: "Bachelor's degree in Accounting" },
    { label: "Experience", value: "Two years of professional accounting, including work on nine-figure projects" },
    {
      label: "Foundation",
      value: "Financial reporting, account reconciliation, project accounting, and expense management",
    },
  ],
};

export type CaseStudy = {
  id: string;
  client: string;
  sector: string;
  service: string;
  figure: string;
  figureCaption: string;
  situation: string;
  work: string[];
  outcome: string;
  quote?: { text: string; name: string; role: string };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "refyned",
    client: "Refyned Auto Solution",
    sector: "Mobile auto detailing, Houston",
    service: "Backlog Bookkeeping, then Complete Financial Management & Payroll",
    figure: "1,000+",
    figureCaption: "uncategorized transactions from eight months, organized in one month",
    situation:
      "More than 1,000 credit and debit transactions across eight months had never been categorized or reconciled. There were no financial reports, the owner was handling the books and payroll alone, and the records needed to be ready for a potential review.",
    work: [
      "Organized and categorized every transaction, reconciled the accounts, and corrected discrepancies",
      "Identified duplicate and miscategorized transactions and recorded transfers",
      "Prepared monthly Profit and Loss, Balance Sheet, and Cash Flow statements",
      "Moved to ongoing monthly bookkeeping, reporting, payroll, owner salary, and contractor payments",
    ],
    outcome:
      "From January through March 2026, the business saw a 10% increase in sales, while the owner gained more time for growth and a clearer understanding of the company's performance through consistent monthly reporting.",
    quote: {
      text: "Umanzor Financial Services has made managing my business finances a lot easier. They keep my books organized, handle payroll, and give me clear reports so I actually understand how my business is doing. It's saved me time and taken a lot of stress off my plate.",
      name: "Vladimir Nava",
      role: "Business Owner, Refyned Auto Solution",
    },
  },
  {
    id: "tama",
    client: "TAMA Innovation",
    sector: "General contracting",
    service: "Complete Financial Management & Payroll",
    figure: "~15 days",
    figureCaption: "average customer payment time, down from 30 to 60 days",
    situation:
      "The company needed its complete financial operations managed, with particular attention on how quickly customers were paying.",
    work: [
      "Managed the company's complete financial operations",
      "Streamlined accounts receivable and invoicing",
      "Set up consistent payment tracking and cash flow management",
    ],
    outcome:
      "Average customer payment time fell from 30 to 60 days to approximately 15 days, significantly improving cash flow and financial efficiency.",
  },
  {
    id: "hollys",
    client: "Holly's Garage",
    sector: "Mechanic shop, Houston",
    service: "Business Builder",
    figure: "LLC",
    figureCaption: "formed for an established, growing shop",
    situation:
      "A growing mechanic shop with an established physical location in Houston was operating without a formal legal structure.",
    work: ["Opened an LLC for the business"],
    outcome:
      "The business now has a formal legal structure to support its continued growth and operations.",
  },
];

export const PROCESS = [
  {
    title: "Schedule a free consultation",
    body: "The first consultation with our financial experts is free of charge. Tell us how your business runs and where the books stand today.",
  },
  {
    title: "Choose the right financial package",
    body: "We review your business, identify your current financial needs, and recommend the right service package. Pricing reflects your activity, accounts, and the condition of your books.",
  },
  {
    title: "Get organized and stay informed",
    body: "We begin the agreed bookkeeping, reporting, payroll, cleanup, or business support work, and keep you informed with clear reports every month.",
  },
] as const;
