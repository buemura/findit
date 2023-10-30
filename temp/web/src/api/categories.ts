import api from "./baseURL";

export class Categories {
  static async getAllCategories() {
    try {
      const { data } = await api.get("/api/categories");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
