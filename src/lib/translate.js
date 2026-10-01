/**
 * WEBSITE TRANSLATION
 * ------------------------------------------------------------------
 * Translates every visible word on the site using the Google Website
 * Translator, driven by our own language menu (Google's banner is hidden).
 *
 * - Nothing is loaded for English visitors; the Google script is added only
 *   after someone picks another language (or returns with one saved).
 * - "Standard text" is protected: any element with translate="no" or the
 *   class "notranslate" stays exactly as written (brand, company and product
 *   names, technology names, people, emails, phone numbers, addresses).
 * - Translations are automatic (machine) translations.
 */

export const LANGUAGES = [
  // code = Google language code
  { code: 'en', name: 'English', native: 'English', region: 'Global' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', region: 'India' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', region: 'India' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', region: 'India' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', region: 'India' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', region: 'India' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', region: 'India' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', region: 'India' },
  { code: 'ar', name: 'Arabic', native: 'العربية', region: 'International', rtl: true },
  { code: 'zh-CN', name: 'Chinese (Simplified)', native: '简体中文', region: 'International' },
  { code: 'ja', name: 'Japanese', native: '日本語', region: 'International' },
  { code: 'ko', name: 'Korean', native: '한국어', region: 'International' },
  { code: 'fr', name: 'French', native: 'Français', region: 'International' },
  { code: 'de', name: 'German', native: 'Deutsch', region: 'International' },
  { code: 'es', name: 'Spanish', native: 'Español', region: 'International' },
  { code: 'pt', name: 'Portuguese', native: 'Português', region: 'International' },
  { code: 'it', name: 'Italian', native: 'Italiano', region: 'International' },
  { code: 'ru', name: 'Russian', native: 'Русский', region: 'International' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe', region: 'International' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', region: 'International' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu', region: 'International' },
  { code: 'th', name: 'Thai', native: 'ไทย', region: 'International' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', region: 'International' },
]

const STORE_KEY = 'site-lang'
const SCRIPT_ID = 'google-translate-script'

const byCode = (c) => LANGUAGES.find((l) => l.code === c)

function readCookieLang() {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/)
  return m ? decodeURIComponent(m[1]) : null
}

export function getLanguage() {
  if (typeof window === 'undefined') return 'en'
  let saved = null
  try { saved = localStorage.getItem(STORE_KEY) } catch { /* private mode */ }
  const c = saved || readCookieLang() || 'en'
  return byCode(c) ? c : 'en'
}

function setCookie(value) {
  const host = window.location.hostname
  const parts = host.split('.')
  const domains = ['', host]
  if (parts.length > 2) domains.push('.' + parts.slice(-2).join('.'))
  const expires = value ? '' : '; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  domains.forEach((d) => {
    document.cookie = `googtrans=${value || ''}; path=/${d ? `; domain=${d}` : ''}${expires}`
  })
}

function applyDocumentLang(code) {
  const l = byCode(code) || LANGUAGES[0]
  document.documentElement.setAttribute('data-lang', l.code)
  document.documentElement.dir = l.rtl ? 'rtl' : 'ltr'
}

function loadScript() {
  if (document.getElementById(SCRIPT_ID)) return
  if (!document.getElementById('google_translate_element')) {
    const holder = document.createElement('div')
    holder.id = 'google_translate_element'
    holder.setAttribute('aria-hidden', 'true')
    document.body.appendChild(holder)
  }
  window.googleTranslateElementInit = () => {
    // eslint-disable-next-line no-new
    new window.google.translate.TranslateElement(
      { pageLanguage: 'en', includedLanguages: LANGUAGES.map((l) => l.code).join(','), autoDisplay: false },
      'google_translate_element'
    )
  }
  const s = document.createElement('script')
  s.id = SCRIPT_ID
  s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  s.async = true
  document.body.appendChild(s)
}

/** Drive Google's hidden language <select>; retry until the widget is ready. */
function selectInWidget(code, tries = 0) {
  const combo = document.querySelector('select.goog-te-combo')
  if (combo) {
    combo.value = code
    combo.dispatchEvent(new Event('change'))
    return
  }
  if (tries < 40) setTimeout(() => selectInWidget(code, tries + 1), 150)
}

/** Call once at startup: restores a saved language. */
export function initTranslation() {
  const code = getLanguage()
  applyDocumentLang(code)
  if (code !== 'en') {
    setCookie(`/en/${code}`)
    loadScript()
  }
}

/** Switch the whole site to `code`. English restores the original text. */
export function setLanguage(code) {
  if (!byCode(code)) return
  try { localStorage.setItem(STORE_KEY, code) } catch { /* ignore */ }
  applyDocumentLang(code)
  window.dispatchEvent(new CustomEvent('site-language', { detail: code }))

  if (code === 'en') {
    setCookie(null)
    // Reload gives back the untouched original page reliably
    if (document.getElementById(SCRIPT_ID)) window.location.reload()
    return
  }
  setCookie(`/en/${code}`)
  if (document.getElementById(SCRIPT_ID)) selectInWidget(code)
  else { loadScript(); selectInWidget(code) }
}

export { byCode as findLanguage }
