/**
 * DEVELOPMENT TEAM — shown on /team.
 *
 * Fields:
 *   name, role, email, phone
 *   photo  key from content/images.js ('avatar' = placeholder).
 *          To add a real photo: save a WebP (800×640, face near the top) in
 *          src/assets/img/, register it in images.js, then set the key here.
 *   group  'lead' = Team management row at the top, 'dev' = Developers row
 */
export const TEAM = [
  {
    id: 'santhosh-kumar',
    name: 'Santhosh Kumar',
    role: 'Assistant General Manager (AGM)',
    email: 'g.santhoshkumar@voltechgroup.com',
    phone: '9941283869',
    photo: 'avatar',
    group: 'lead',
  },
  {
    id: 'hema-preethi',
    name: 'Hema Preethi',
    role: 'Team Lead',
    email: 'hemapreethi.k@voltechgroup.com',
    phone: '87653340977', // TODO: 11 digits as supplied — please verify
    photo: 'teamHema',
    group: 'dev',
  },
  {
    id: 'girija',
    name: 'Girija',
    role: 'Software Developer',
    email: 'girija.r@voltechgroup.com',
    phone: '8743320977',
    photo: 'teamGirija',
    group: 'dev',
  },
  {
    id: 'rajkiran',
    name: 'Rajkiran',
    role: 'Software Developer',
    email: 'rajkiran.s@voltechgroup.com',
    phone: '9754430977',
    photo: 'avatar',
    group: 'dev',
  },
  {
    id: 'govardhan-achary',
    name: 'Govardhan Achary',
    role: 'Mobile Developer',
    email: 'govardhan.k@voltechgroup.com',
    phone: '987665409', // TODO: 9 digits as supplied — please verify
    photo: 'avatar',
    group: 'dev',
  },
]

/**
 * Set to false to hide personal phone numbers / emails on the public page
 * (cards then show name and role only).
 */
export const TEAM_SHOW_CONTACT = { email: true, phone: true }
