export interface TokenDetails {
  token: string;
  expiresIn?: number;
}

function setToken(token: TokenDetails) {
  try {
    const tokenWithExpiry = {
      token: token.token,
      expiresIn: new Date().getTime() + 24 * 60 * 60 * 1000,
    };

    localStorage.setItem("token", JSON.stringify(tokenWithExpiry));
  } catch (e) {
    console.error("Error storing token", e);
  }
}

function getToken() {
  try {
    const tokenString = localStorage.getItem("token");
    if (!tokenString) return null;

    const tokenWithExpiry = JSON.parse(tokenString);
    if (Date.now() > tokenWithExpiry.expiresIn) {
      localStorage.removeItem("token");
      return null;
    }
    return {
      token: tokenWithExpiry.token,
    };
  } catch (e) {
    return null;
  }
}

function getTokenDetails() {
  try {
    const token = getToken();
    if (token) {
      return token ? JSON.parse(window.atob(token.token.split(".")[1])) : null;
    }
  } catch (e) {
    return null;
  }
}

function isAuthenticated() {
  const tokenDetails = getTokenDetails();
  if (tokenDetails) {
    return true;
  } else {
    return false;
  }
}

function clearToken() {
  localStorage.removeItem("token");
}

const TokenService = {
  clearToken,
  getToken,
  getTokenDetails,
  isAuthenticated,
  setToken,
};

export default TokenService;
