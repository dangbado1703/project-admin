const useAuth = () => {
  const auth = localStorage.getItem("auth");
  if (!auth) {
    return false;
  }
  return true;
};

export default useAuth;
