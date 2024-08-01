import { useEffect, useState } from "react";

// Définir les types pour les paramètres et le retour de la fonction
type UseDebounce = <T>(value: T, delay: number) => T;

// Implémenter la fonction useDebounce
const useDebounce: UseDebounce = (value, delay) => {
  // État et setters pour la valeur débouncée
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Mettre à jour la valeur débouncée après le délai
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Annuler le timeout si la valeur change (aussi si le délai change ou si le composant est démonté)
      // C'est ainsi que nous empêchons la valeur débouncée de se mettre à jour si la valeur change ...
      // .. pendant la période de délai. Le timeout est effacé et redémarré.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Ne ré-appeler l'effet que si la valeur ou le délai changent
  );

  return debouncedValue;
};

export default useDebounce;
