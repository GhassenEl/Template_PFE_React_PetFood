import { useState, useEffect, useCallback } from "react";
import { orderService } from "../services/orderService";

export const useOrders = (filters = {}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getOrders(filters);
      setOrders(data);
    } catch (err) {
      setError(err.message || "Erreur lors du chargement des commandes");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, loading, error, refetch: fetchOrders };
};
