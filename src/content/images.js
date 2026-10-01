/**
 * IMAGE REGISTRY — content files refer to images by key so they stay
 * plain data (CMS-friendly). Add new optimised images to src/assets/img
 * (WebP, ≤1600px wide) and register them here.
 */
import siteVg from '../assets/img/site-vg.webp'
import siteVmcl from '../assets/img/site-vmcl.webp'
import siteVipra from '../assets/img/site-vipra.webp'
import siteBliss from '../assets/img/site-bliss.webp'
import cmdPortrait from '../assets/img/leader-cmd-portrait.webp'
import cmdBanner from '../assets/img/leader-cmd-banner.webp'
import cmdBannerSm from '../assets/img/leader-cmd-banner-sm.webp'
import avatar from '../assets/img/avatar-placeholder.webp'
// Team photos (800×640 WebP)
import teamHema from '../assets/img/team-hema.webp'
import teamGirija from '../assets/img/team-girija.webp'
// Placeholder images for sample leadership profiles — replace with real photos
import directorPortrait from '../assets/img/leader-director-portrait.webp'
import directorBanner from '../assets/img/leader-director-banner.webp'
import directorBannerSm from '../assets/img/leader-director-banner-sm.webp'
import ceoPortrait from '../assets/img/leader-ceo-portrait.webp'
import ceoBanner from '../assets/img/leader-ceo-banner.webp'
import ceoBannerSm from '../assets/img/leader-ceo-banner-sm.webp'

export const IMAGES = {
  siteVg: { src: siteVg, w: 1000, h: 594 },
  siteVmcl: { src: siteVmcl, w: 1000, h: 598 },
  siteVipra: { src: siteVipra, w: 1000, h: 478 },
  siteBliss: { src: siteBliss, w: 1000, h: 489 },
  cmdPortrait: { src: cmdPortrait, w: 480, h: 600 },
  avatar: { src: avatar, w: 400, h: 400 }, // placeholder for team members without a photo
  teamHema: { src: teamHema, w: 800, h: 640 },
  teamGirija: { src: teamGirija, w: 800, h: 640 },
  cmdBanner: { src: cmdBanner, w: 1600, h: 780, srcSet: `${cmdBannerSm} 900w, ${cmdBanner} 1600w` },
  directorPortrait: { src: directorPortrait, w: 480, h: 600 },
  directorBanner: { src: directorBanner, w: 1600, h: 780, srcSet: `${directorBannerSm} 900w, ${directorBanner} 1600w` },
  ceoPortrait: { src: ceoPortrait, w: 480, h: 600 },
  ceoBanner: { src: ceoBanner, w: 1600, h: 780, srcSet: `${ceoBannerSm} 900w, ${ceoBanner} 1600w` },
}

export const img = (key) => (key ? IMAGES[key] || null : null)
