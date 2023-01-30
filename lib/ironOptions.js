/* Setting configurations for ironSession. */
export const ironOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: "growhillSession",
  /* Setting the cookie to be secure (https) if the environment is production. */
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
