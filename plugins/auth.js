export default defineNuxtPlugin(async nuxtApp => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const { authUser } = useAuth();
  const headers = useRequestHeaders([`cookie`]);

  console.log(headers);

  try {
    const data = await $fetch(`${apiBase}/api/me`, {
      credentials: `include`,
      headers: {
        ...headers,
        Accept: 'application/json',
        Referer: 'http://localhost:3000',
      },
    });

    authUser.value = data.user;
  } catch (error) {
    console.log(`ERROR  `, error);
    authUser.value = null;
  }
});
