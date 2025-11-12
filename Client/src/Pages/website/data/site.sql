-- -----------------------------------------------------
-- Table : hero_slide
-- -----------------------------------------------------
CREATE TABLE hero_slide (
  id_slide INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  soustitre TEXT,
  image VARCHAR(255),
  cta VARCHAR(255),
  cta_link VARCHAR(255),
  actif BOOLEAN DEFAULT TRUE
);

-- -----------------------------------------------------
-- Table : presentation
-- -----------------------------------------------------
CREATE TABLE presentation (
  id_presentation INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255),
  nombre_eleves INT DEFAULT 0,
  nombre_professeurs INT DEFAULT 0,
  annees_experience INT DEFAULT 0,
  taux_reussite DECIMAL(5,2) DEFAULT 0.00,
  actif BOOLEAN DEFAULT TRUE
);

-- -----------------------------------------------------
-- Table : slogan
-- -----------------------------------------------------
CREATE TABLE slogan (
  id_slogan INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  description TEXT,
  icone VARCHAR(100),
  actif BOOLEAN DEFAULT TRUE
);

-- -----------------------------------------------------
-- Table : notre_histoire
-- -----------------------------------------------------
CREATE TABLE notre_histoire (
  id_histoire INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  reconnaissance_par VARCHAR(255),
  image VARCHAR(255),
  actif BOOLEAN DEFAULT TRUE
);

-- -----------------------------------------------------
-- Table : valeur (anciennement vision_mission)
-- -----------------------------------------------------
CREATE TABLE valeur (
  id_valeur INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icone VARCHAR(100),
  actif BOOLEAN DEFAULT TRUE
);

-- -----------------------------------------------------
-- Table : pilier_educatif
-- -----------------------------------------------------
CREATE TABLE pilier_educatif (
  id_pilier INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icone VARCHAR(100),
  actif BOOLEAN DEFAULT TRUE
);

-- -----------------------------------------------------
-- Table : installation
-- -----------------------------------------------------
CREATE TABLE installation (
  id_installation INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255),
  actif BOOLEAN DEFAULT TRUE
);

-- -----------------------------------------------------
-- Table : programme_pedagogique
-- -----------------------------------------------------
CREATE TABLE programme_pedagogique (
  id_point INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  contenu VARCHAR(255) NOT NULL,
  ordre INT DEFAULT 0,
  actif BOOLEAN DEFAULT TRUE
);

-- -----------------------------------------------------
-- Table : activite_prescolaire
-- -----------------------------------------------------
CREATE TABLE activite_prescolaire (
  id_activite INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  icone VARCHAR(100),
  actif BOOLEAN DEFAULT TRUE
);

-- -----------------------------------------------------
-- Table : actualite
-- -----------------------------------------------------
CREATE TABLE actualite (
  id_actualite INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  contenu TEXT NOT NULL,
  date_publication DATE,
  image VARCHAR(255),
  publie BOOLEAN DEFAULT TRUE
);

-- -----------------------------------------------------
-- Table : evenement
-- -----------------------------------------------------
CREATE TABLE evenement (
  id_evenement INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  description TEXT,
  date_evenement DATE,
  lieu VARCHAR(255),
  image VARCHAR(255),
  publie BOOLEAN DEFAULT TRUE
);

-- -----------------------------------------------------
-- Table : galerie
-- -----------------------------------------------------
CREATE TABLE galerie (
  id_image INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255),
  url VARCHAR(255),
  categorie VARCHAR(100),
  id_evenement INT,
  publie BOOLEAN DEFAULT TRUE,
  CONSTRAINT fk_galerie_evenement
    FOREIGN KEY (id_evenement)
    REFERENCES evenement(id_evenement)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table : message_contact
-- -----------------------------------------------------
CREATE TABLE message_contact (
  id_message INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  date_message DATE,
  lu BOOLEAN DEFAULT FALSE
);
