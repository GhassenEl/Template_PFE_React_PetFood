export const petService = {
  getPets: async () => {
    return [
      {
        id: 1,
        name: "Max",
        type: "dog",
        breed: "Golden Retriever",
        age: 3,
        weight: 25,
        image: "/assets/pets/dog1.jpg",
        lastVaccination: "2024-01-15",
        nextVaccination: "2024-07-15",
        specialNeeds: ["allergie poulet", "arthrose"],
        foodBrand: "Royal Canin",
        dailyPortion: 350,
      },
      {
        id: 2,
        name: "Misty",
        type: "cat",
        breed: "Persan",
        age: 5,
        weight: 4.5,
        image: "/assets/pets/cat1.jpg",
        lastVaccination: "2024-02-20",
        nextVaccination: "2024-08-20",
        specialNeeds: ["poils longs", "sensible digestif"],
        foodBrand: "Hills",
        dailyPortion: 60,
      },
    ];
  },

  createPet: async (petData) => {},

  updatePet: async (id, petData) => {},

  deletePet: async (id) => {},
};
