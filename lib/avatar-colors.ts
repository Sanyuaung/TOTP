// Utility function to generate consistent avatar colors that work in both light and dark modes
export function getAvatarColors(name: string) {
  // Generate a consistent color based on the name hash
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Predefined colors that work well in both light and dark themes
  const colors = [
    { bg: "6366f1", text: "fff" }, // Indigo with white text
    { bg: "059669", text: "fff" }, // Emerald with white text
    { bg: "dc2626", text: "fff" }, // Red with white text
    { bg: "d97706", text: "fff" }, // Amber with white text
    { bg: "7c3aed", text: "fff" }, // Violet with white text
    { bg: "0891b2", text: "fff" }, // Cyan with white text
    { bg: "be123c", text: "fff" }, // Rose with white text
    { bg: "0d9488", text: "fff" }, // Teal with white text
  ];

  return colors[Math.abs(hash) % colors.length];
}
