import { COMPANIES, COMMON_APPS } from '../data/companies'
import { ERP_CONFIG } from '../content/erp'

/**
 * Login links for a project/case study.
 * Reads the URL from src/data/companies.js using the project's `apps` list
 * ([companyId, appId] pairs), so every login link lives in ONE place.
 * Returns [{ url, company, code }] — empty when ERP_CONFIG.showLoginLinks is false.
 */
export function projectLogins(project) {
  if (!ERP_CONFIG.showLoginLinks || !project?.apps) return []
  return project.apps
    .map(([companyId, appId]) => {
      if (companyId === 'common') {
        const app = COMMON_APPS.find((a) => a.id === appId)
        return app?.url ? { url: app.url, company: 'All companies', code: app.code } : null
      }
      const co = COMPANIES.find((c) => c.id === companyId)
      const app = co?.apps.find((a) => a.id === appId)
      return app?.url ? { url: app.url, company: co.name, code: app.code } : null
    })
    .filter(Boolean)
}
