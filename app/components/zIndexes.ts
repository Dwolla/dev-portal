// Variables for managing z-indexes
// Internal variables to increment or decrement z-index
const BASE = 10;
const ABOVE = 10; // Use to increment

export const Z_HERO_CARD = ABOVE + BASE; // Applies to HeroCard which sits above the BASE
export const Z_TOB_BAR = ABOVE + Z_HERO_CARD; // Applies to TopBar which sits above everything else
export const Z_SIDENAV_STICKY_SECTION_WRAP = ABOVE + BASE;

// Example for adding a new z-index below Z_TOB_BAR and above Z_HERO_CARD
// export const Z_SOMETHING = ABOVE + Z_HERO_CARD
// export const Z_TOB_BAR = ABOVE + Z_SOMETHING
