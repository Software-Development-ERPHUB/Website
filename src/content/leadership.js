/**
 * LEADERSHIP
 * ------------------------------------------------------------------
 * `LEADERS` feed both the banner slider at the top of /leadership and the
 * profile cards below it — in this order: CMD → Director → CEO.
 *
 * Fields:
 *   name      display name (null shows "Name to be announced")
 *   role      designation
 *   photo     key from content/images.js (portrait, 4:5)
 *   banner    key from content/images.js (wide, ~2:1)
 *   intro     1–3 sentence text shown on the banner slide
 *   bio       longer biography for the profile card (array of paragraphs)
 *   linkedin  full URL or ''
 *   sample    true = placeholder profile. Shows a small "Sample profile"
 *             tag. Replace the details, then set to false.
 *
 * TODO(management): replace the Director and CEO sample profiles with
 * real names, photos and biographies before going live.
 */
export const LEADERS = [
  {
    id: 'cmd',
    name: 'Mr. M. Umapathi',
    role: 'Chairman & Managing Director',
    photo: 'cmdPortrait',
    banner: 'cmdBanner',
    intro:
      'Murugesan Umapathi founded Voltech in 1995 in a car shed with four young engineers. Today Voltech Group is a ₹600 crore organisation with a presence in 40+ countries and over 6,000 professionals.',
    bio: [
      'Murugesan Umapathi is the Chairman and Managing Director of the Voltech Group of Companies. He started the business in 1995 in a car shed with four young engineers.',
      'Under his leadership, Voltech Group has grown into a ₹600 crore organisation with a presence in 40+ countries, employing over 6,000 professionals across engineering, manufacturing, instrumentation, HR and facility management services.',
      'Voltech IT Services brings the group’s in-house software capability — built to run these businesses day to day — to clients outside the group.',
    ],
    linkedin: 'https://www.linkedin.com/in/murugesan-umapathi-75331b192/',
    sample: false,
  },
  {
    id: 'director',
    name: 'Director Name',
    role: 'Director',
    photo: 'directorPortrait',
    banner: 'directorBanner',
    intro:
      'Oversees company strategy, governance and client relationships, making sure every engagement is delivered with the same discipline as Voltech’s engineering businesses.',
    bio: [
      'The Director guides the company’s strategy, governance and growth, and works closely with clients on long-term technology partnerships.',
      'Sample profile — replace with the Director’s professional background, areas of responsibility and experience.',
    ],
    linkedin: '',
    sample: true,
  },
  {
    id: 'ceo',
    name: 'CEO Name',
    role: 'Chief Executive Officer',
    photo: 'ceoPortrait',
    banner: 'ceoBanner',
    intro:
      'Leads day-to-day operations, delivery and the engineering team — turning client requirements into dependable software that is supported long after launch.',
    bio: [
      'The Chief Executive Officer leads operations, project delivery and the engineering team, with a focus on quality, clear communication and long-term client support.',
      'Sample profile — replace with the CEO’s professional background, areas of responsibility and experience.',
    ],
    linkedin: '',
    sample: true,
  },
]

/** Technical leadership — add entries in the same shape as LEADERS. */
export const TECH_LEADERS = []

export const LEADERSHIP_PLACEHOLDERS = {
  name: 'Name to be announced',
  intro: 'A short introduction will appear here.',
  bio: 'Professional biography to be provided.',
}
