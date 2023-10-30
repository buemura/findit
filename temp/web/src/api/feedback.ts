import api from "./baseURL";

export class Feedback {
  static async getUserAverageScore(user_id: string) {
    try {
      const { data } = await api.get(`/api/users/${user_id}/feedbacks/average`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async postFeedback(
    user_id: string,
    reviewer_id: string,
    score: string,
    token: string
  ) {
    try {
      await api.post(
        `/api/users/${user_id}/send-feedback`,
        {
          user_id,
          reviewer_id,
          score,
        },
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
}
