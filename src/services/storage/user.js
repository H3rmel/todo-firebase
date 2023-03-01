export const saveUserData = (user) => {
  const userData = {
    uId: user.uid,
    email: user.email,
  };

  localStorage.setItem("@detailUser", JSON.stringify(userData));
};
