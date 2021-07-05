import api from "./api";

const registerAccount = {
  register: async ({ name, email, password }) => {
    return await api
      .post("/api/auth/register", {
        name,
        email,
        password,
      })
      .then(({ data }) => {
        return data;
      });
  },
};

export default registerAccount;
