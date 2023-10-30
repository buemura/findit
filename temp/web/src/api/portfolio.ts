import api from "./baseURL";

export class Portfolios {
  static async getUserPortfolios(id: string) {
    try {
      const { data } = await api.get(`/api/users/${id}/portfolios`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async uploadPortfolioImages(
    id: string,
    files: FormData,
    token: string
  ) {
    try {
      await api.post(`/api/users/${id}/portfolios/upload`, files, {
        headers: {
          authorization: token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async editPortfolioDescription(
    id: string,
    image_id: string,
    description: string,
    token: string
  ) {
    try {
      await api.put(
        `/api/users/${id}/portfolios/${image_id}`,
        { description: description },
        {
          headers: {
            authorization: token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async deletePortfolioImages(
    id: string,
    image_id: string,
    token: string
  ) {
    try {
      await api.delete(`/api/users/${id}/portfolios/${image_id}`, {
        headers: {
          authorization: token,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
