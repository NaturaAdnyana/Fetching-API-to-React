export const saveUser = (username) => {
  const CACHE_KEY = "USERNAME";
  localStorage.setItem(CACHE_KEY, username);
}