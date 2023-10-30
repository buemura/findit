import { IUserData } from "../config/interfaces";
import api from "./baseURL";

export class Users {
  static async getUserByID(id: string): Promise<IUserData> {
    try {
      const { data } = await api.get(`/api/users/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getUsersCount() {
    try {
      const { data } = await api.get("/api/users/all/count");
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserProfilePhoto(id: string) {
    try {
      const { data } = await api.get(`/api/users/${id}/profile-image`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserCompletedServices(id: string) {
    try {
      const { data } = await api.get(
        `/api/services/user/${id}/completed-services/count`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async updateUser(
    id: string,
    name: string,
    email: string,
    city: string,
    state: string,
    country: string,
    phone: string,
    occupation: string,
    about_me: string,
    token: string
  ) {
    try {
      await api.put(
        `/api/users/${id}`,
        {
          name,
          email,
          city,
          state,
          country,
          phone,
          occupation,
          about_me,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
    } catch (error) {
      console.log(error);
      alert("Failed to Update user!");
    }
  }

  static async updateProfilePhoto(
    id: string,
    data: FormData,
    token: string
  ): Promise<void> {
    try {
      await api.post(`/api/users/${id}/profile-image/upload`, data, {
        headers: {
          authorization: token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
