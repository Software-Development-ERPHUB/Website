/**
 * APP_SCREEN — which real application screenshot represents each in-house
 * application from data/companies.js. Keys are app ids; values are screen
 * keys from content/screens.js. Apps without a matching screen fall back to
 * the drawn scene so no card is ever left blank.
 */
export const APP_SCREEN = {
  // Voltech Engineering (VEPL)
  'vepl-hrms': 'hr-dashboard',
  vdms: 'hr-shifts',
  vefm: 'fin-accounts',
  expenseflow: 'fin-expenses',
  vpmt: 'fin-budget',
  ehs: 'ehs-dashboard',
  vevp: 'hr-statutory',
  vbms: 'hr-attendance',
  // Voltech Manufacturing (VMCL)
  prime: 'pr-dashboard',
  'vmcl-erp': 'pr-orders',
  'vmcl-hrms': 'hr-payroll',
  // Vipra
  vvep: 'pr-vendors',
  'vipra-hrms': 'hr-employees',
  // Voltech HR Services (VHRS)
  crm: 'pr-compare',
  ims: 'fin-billing',
  ems: 'hr-ess',
  'vhrs-hrms': 'hr-attendance',
  // Bliss
  'bliss-hrms': 'hr-leave',
  vams: 'kra-dashboard',
  voms: 'kra-analytics',
  'voms-future': 'pr-dashboard',
  // Asia Power
  audit: 'ehs-incidents',
}

/** Screen key for an app, or undefined when the app has no mapped screen. */
export const appScreenKey = (app) => (app && APP_SCREEN[app.id]) || undefined
