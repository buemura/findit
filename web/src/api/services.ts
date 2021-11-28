import api from "./baseURL";

export class Services {
  static async getServices(
    title?: string,
    category?: string,
    city?: string,
    state?: string,
    country?: string
  ) {
    try {
      const { data } = await api.get(
        `/api/services?title=${title}&category=${category}&city=${city}&state=${state}&country=${country}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getServiceByID(id: string) {
    try {
      const { data } = await api.get(`/api/services/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllServicesByUserID(id: string) {
    try {
      const { data } = await api.get(`/api/services/user/${id}/all`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getActiveServicesByUserID(id: string) {
    try {
      const { data } = await api.get(`/api/services/user/${id}/active`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getInactiveServicesByUserID(id: string) {
    try {
      const { data } = await api.get(`/api/services/user/${id}/inactive`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getServicesCount() {
    try {
      const { data } = await api.get("/api/services/all/count");
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async createService(
    user_id: string,
    title: string,
    category: string,
    description: string,
    price: string,
    city: string,
    state: string,
    country: string,
    token: string
  ): Promise<Boolean> {
    try {
      await api.post(
        "/api/services",
        {
          user_id,
          title,
          category,
          description,
          price,
          city,
          state,
          country,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async updateService(
    id: string,
    completed: boolean,
    title: string,
    category: string,
    description: string,
    price: string,
    city: string,
    state: string,
    country: string,
    token: string
  ): Promise<Boolean> {
    try {
      await api.put(
        `/api/services/${id}`,
        {
          completed,
          title,
          category,
          description,
          price,
          city,
          state,
          country,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async completeService(
    user_id: string,
    service_id: string,
    token: string
  ): Promise<Boolean> {
    try {
      await api.post(
        "/api/services/complete",
        {
          user_id,
          service_id,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async deleteService(id: string, token: string) {
    try {
      await api.delete(`/api/services/${id}`, {
        headers: {
          authorization: token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
