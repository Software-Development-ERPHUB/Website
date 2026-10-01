-- Voltech website — database schema
-- Run once:  mysql -u root -p < server/sql/schema.sql
-- (or: npm run db:init  inside /server, which runs this same file)

CREATE DATABASE IF NOT EXISTS voltech_website
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE voltech_website;

-- Contact Us / project enquiries
CREATE TABLE IF NOT EXISTS contact_enquiries (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name          VARCHAR(120)  NOT NULL,
  company       VARCHAR(160)  NULL,
  email         VARCHAR(190)  NOT NULL,
  phone         VARCHAR(30)   NULL,
  service       VARCHAR(120)  NOT NULL,
  budget        VARCHAR(60)   NULL,
  message       TEXT          NOT NULL,
  source_page   VARCHAR(500)  NULL,
  ip_address    VARCHAR(45)   NULL,
  user_agent    VARCHAR(500)  NULL,
  status        ENUM('new','in_progress','replied','closed','spam') NOT NULL DEFAULT 'new',
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_contact_email (email),
  KEY idx_contact_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Internship applications (CV file saved on disk, path stored here)
CREATE TABLE IF NOT EXISTS internship_applications (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name       VARCHAR(120)  NOT NULL,
  email           VARCHAR(190)  NOT NULL,
  phone           VARCHAR(30)   NOT NULL,
  college         VARCHAR(200)  NOT NULL,
  course          VARCHAR(160)  NOT NULL,
  year_of_study   VARCHAR(40)   NOT NULL,
  area_of_interest VARCHAR(80)  NOT NULL,
  duration        VARCHAR(40)   NULL,
  start_date      DATE          NULL,
  skills          VARCHAR(500)  NULL,
  portfolio_url   VARCHAR(300)  NULL,
  linkedin_url    VARCHAR(300)  NULL,
  message         TEXT          NULL,
  cv_original_name VARCHAR(255) NOT NULL,
  cv_stored_name  VARCHAR(255)  NOT NULL,
  cv_mime         VARCHAR(120)  NOT NULL,
  cv_size         INT UNSIGNED  NOT NULL,
  consent         TINYINT(1)    NOT NULL DEFAULT 0,
  ip_address      VARCHAR(45)   NULL,
  user_agent      VARCHAR(500)  NULL,
  status          ENUM('new','shortlisted','interview','selected','rejected') NOT NULL DEFAULT 'new',
  created_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_intern_email (email),
  KEY idx_intern_status_created (status, created_at),
  KEY idx_intern_area (area_of_interest)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ════════════════════════════════════════════════════════════════
-- CMS  (lightweight, built in — no WordPress)
-- ════════════════════════════════════════════════════════════════

-- Dashboard users. Create the first admin with:  npm run cms:create-admin
CREATE TABLE IF NOT EXISTS cms_users (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name           VARCHAR(120)  NOT NULL,
  email          VARCHAR(190)  NOT NULL,
  password_hash  VARCHAR(100)  NOT NULL,
  role           ENUM('admin','editor') NOT NULL DEFAULT 'editor',
  active         TINYINT(1)    NOT NULL DEFAULT 1,
  last_login_at  DATETIME      NULL,
  created_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_cms_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Content entries for every collection (news, jobs, faqs …).
-- draft_data     = what editors are working on (never shown publicly)
-- published_data = what the live website shows
-- Editing a published entry only changes draft_data until someone presses Publish.
CREATE TABLE IF NOT EXISTS cms_entries (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  collection      VARCHAR(40)   NOT NULL,
  slug            VARCHAR(160)  NOT NULL,
  title           VARCHAR(255)  NOT NULL,
  status          ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
  has_changes     TINYINT(1)    NOT NULL DEFAULT 0,
  sort_order      INT           NOT NULL DEFAULT 0,
  draft_data      LONGTEXT      NOT NULL,
  published_data  LONGTEXT      NULL,
  published_at    DATETIME      NULL,
  created_by      INT UNSIGNED  NULL,
  updated_by      INT UNSIGNED  NULL,
  created_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_cms_entry_slug (collection, slug),
  KEY idx_cms_entry_list (collection, status, published_at),
  KEY idx_cms_entry_order (collection, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Snapshot saved every time an entry is published (history / restore)
CREATE TABLE IF NOT EXISTS cms_revisions (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  entry_id    INT UNSIGNED NOT NULL,
  data        LONGTEXT     NOT NULL,
  action      VARCHAR(20)  NOT NULL DEFAULT 'publish',
  user_id     INT UNSIGNED NULL,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_cms_rev_entry (entry_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Media library (images / PDFs). `storage` lets files move to cloud storage later.
CREATE TABLE IF NOT EXISTS cms_media (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  storage        VARCHAR(20)   NOT NULL DEFAULT 'local',
  storage_key    VARCHAR(300)  NOT NULL,
  url            VARCHAR(500)  NOT NULL,
  original_name  VARCHAR(255)  NOT NULL,
  mime           VARCHAR(120)  NOT NULL,
  size           INT UNSIGNED  NOT NULL,
  alt            VARCHAR(255)  NULL,
  uploaded_by    INT UNSIGNED  NULL,
  created_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_cms_media_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
