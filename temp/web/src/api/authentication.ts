import api from "./baseURL";
import router from "next/router";
import jwt_decode from "jwt-decode";

export class Authentication {
  static async register({ name, email, password }) {
    try {
      const { data } = await api.post("/api/auth/register", {
        name,
        email,
        password,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async logIn({ email, password }) {
    try {
      const { data } = await api.post("/api/auth/login", {
        email,
        password,
      });

      if (data.status === 200) {
        return data.token;
      }
      return;
    } catch (error) {
      console.error(error);
    }
  }

  static async logOut() {
    const token = localStorage.getItem("token");

    try {
      await api.post("/api/auth/logout", {
        token,
      });
      router.push("/home");
      localStorage.removeItem("token");
    } catch (err) {
      alert("Failed to Sign Out!");
    }
  }

  static checkUserSession(page: string) {
    /**
     * JWT token is needed in order to make a POST, PUT or DELETE request.
     * Also this token expires in 1 hour. So you will need to Sign in again to generate a new one.
     * The token is associated with the user that Signed in.
     * So if we decode this token we will be able to retrieve user ID and Email.
     */

    if (localStorage.getItem("token") === null) {
      alert("Your need to sign in to proceed!");
      router.push("/login");
      return;
    }

    const token = localStorage.getItem("token");
    const tokenDecoded: any = jwt_decode(token);
    const { id, exp } = tokenDecoded;

    // Check the session expiration with jwt.exp.
    const currentTimestamp = new Date().getTime() / 1000;
    if (exp < currentTimestamp) {
      alert("Your session expired, Sign in again to continue!");
      localStorage.removeItem("token");
      router.push("/login");
      return;
    }

    if (page) {
      router.push(`/${page}`);
      return id;
    }
    return id;
  }
}
