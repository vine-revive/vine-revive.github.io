const VINEAPP_API_URL = "https://api.vineapp.com/";

export const fetchUserByVanity = async (userName) => {
  const endpoint = `${VINEAPP_API_URL}users/profiles/vanity/${userName}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`failed fetching user vines - ${response.status}`);
  }

  const data = await response.json();
  alert(data);
};
