export const colors = {
   primary: '#FF6B6B',    // Bright Red
   secondary: '#4ECDC4',  // Bright Teal
   accent: '#FFD93D',     // Bright Yellow
   muted: '#6A89CC',      // Bright Blue
   success: '#6BFF95',    // Bright Green
   warning: '#FF8E6B',    // Bright Orange
 };
 
 export const getRandomColor = () => {
   const brightColors = [
     '#FF6B6B', '#4ECDC4', '#FFD93D', '#6A89CC',
     '#6BFF95', '#FF8E6B', '#45AAF2', '#FDA7DF',
   ];
   return brightColors[Math.floor(Math.random() * brightColors.length)];
 };
 
 