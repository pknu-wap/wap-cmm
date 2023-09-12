export default () => ({
  ACCESS_TOKEN: {
    SECRET: process.env.ACCESS_TOKEN_SECRET,
    DURATION: process.env.ACCESS_TOKEN_DURATION,
  },
  REFRESH_TOKEN: {
    SECRET: process.env.REFRESH_TOKEN_SECRET,
    DURATION: process.env.REFRESH_TOKEN_DURATION,
  },
});
