export const config = {
  dev: {
    AUTH_URL: process.env.AUTH_BASE_URL + "/api/v0/users/auth/verification",
  },
  jwt: {
    secret: "hellowworld",
  },
  prod: {},
};
