import api from "./api";

export const orderService = {
  getOrders: async (filters = {}) => {
    try {
      const mockOrders = [
        {
          id: "ORD-001",
          date: "2024-03-15",
          status: "delivered",
          items: 3,
          total: 89.99,
          deliveryAddress: "22 Rue des Animaux, Paris",
        },
        {
          id: "ORD-002",
          date: "2024-03-10",
          status: "shipped",
          items: 5,
          total: 149.5,
          deliveryAddress: "22 Rue des Animaux, Paris",
        },
        {
          id: "ORD-003",
          date: "2024-03-05",
          status: "processing",
          items: 2,
          total: 45.99,
          deliveryAddress: "22 Rue des Animaux, Paris",
        },
      ];

      let filtered = mockOrders;
      if (filters.status && filters.status !== "all") {
        filtered = filtered.filter((order) => order.status === filters.status);
      }

      return filtered;
    } catch (error) {
      throw error;
    }
  },

  getOrderDetails: async (orderId) => {},

  cancelOrder: async (orderId) => {},

  trackOrder: async (orderId) => {},
};
