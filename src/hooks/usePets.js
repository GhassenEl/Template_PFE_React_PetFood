import { useState, useEffect, useCallback } from "react";
import { petService } from "../services/petService";

export const usePets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await petService.getPets();
      setPets(data);
    } catch (err) {
      setError(err.message || "Erreur lors du chargement des animaux");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  return { pets, loading, error, refetch: fetchPets };
};
