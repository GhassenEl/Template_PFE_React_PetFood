import { useState, useEffect, useCallback, useRef } from "react";
import { productService } from "../services/productService";

export const useProducts = (filters = {}, options = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalProducts: 0,
    limit: 12,
  });

  const abortControllerRef = useRef(null);

  const fetchProducts = useCallback(
    async (page = 1) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      try {
        setLoading(true);
        setError(null);

        const params = {
          ...filters,
          page,
          limit: options.limit || pagination.limit,
        };

        const response = await productService.getProducts(params, {
          signal: abortControllerRef.current.signal,
        });

        if (response.data) {
          setProducts(response.data);
          setPagination({
            page: response.page || page,
            totalPages: response.totalPages || 1,
            totalProducts: response.total || response.data.length,
            limit: response.limit || pagination.limit,
          });
        } else {
          setProducts(response);
          setPagination((prev) => ({ ...prev, page }));
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Erreur lors du chargement des produits");
          console.error("Erreur useProducts:", err);
        }
      } finally {
        setLoading(false);
        abortControllerRef.current = null;
      }
    },
    [filters, options.limit, pagination.limit],
  );

  const changePage = useCallback(
    (newPage) => {
      if (newPage >= 1 && newPage <= pagination.totalPages) {
        fetchProducts(newPage);
      }
    },
    [fetchProducts, pagination.totalPages],
  );

  const refetch = useCallback(() => {
    fetchProducts(pagination.page);
  }, [fetchProducts, pagination.page]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    pagination,
    refetch,
    changePage,
    hasNextPage: pagination.page < pagination.totalPages,
    hasPrevPage: pagination.page > 1,
    totalProducts: pagination.totalProducts,
  };
};

export const usePopularProducts = (limit = 8) => {
  return useProducts({ sort: "popularity", limit }, { autoFetch: true });
};

export const useProductsByAnimalType = (animalType) => {
  return useProducts({ animalType }, { autoFetch: true });
};

export const useDiscountedProducts = () => {
  return useProducts({ discounted: true }, { autoFetch: true });
};
