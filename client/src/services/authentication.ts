import api from "./api";

const authentication = {
  autheticate: async ({ email, password }) => {
    return await api
      .post("/api/auth/login", {
        email,
        password,
      })
      .then(({ data }) => {
        if (data.auth) {
          return data.token;
        }
        return;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

export default authentication;
