/**
 * The homepage's editorial sections, in document order.
 *
 * The index numbers here are the same ones printed in each section's eyebrow
 * ("No. 01 Portfolio", "No. 02 Selected work", …), so the scroll rail reads as
 * the table of contents for those marks rather than as a separate widget.
 */
export const SECTIONS = [
  { id: 'hero', num: '01', label: 'Portfolio' },
  { id: 'work', num: '02', label: 'Selected work' },
  { id: 'experience', num: '03', label: 'Experience' },
  { id: 'contact', num: '04', label: 'Contact' },
] as const;

export const SECTION_IDS = SECTIONS.map((section) => section.id);

/** Sections that paint a dark ground, so overlaying UI has to invert on them. */
export const DARK_SECTION_IDS: readonly string[] = ['contact'];
