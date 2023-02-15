import jwtDecode from "jwt-decode";

type JWTPayload = {
  email: string;
  level: number;
  name: string;
};

function getLocalStorage() {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;

  if (token) {
    let decode: JWTPayload = jwtDecode(token);
    let user = {
      email: decode.email,
      level: decode.level,
      name: decode.name,
    };
    return user;
  } else {
    return null;
  }
}
