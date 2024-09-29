export default defineNuxtPlugin(async nuxtApp => {
  const { authUser } = useAuth();
  const headers = useRequestHeaders([`cookie`]);

  console.log(headers);

  try {
    const user = await $fetch(`/api/auth/me`, {
      headers,
    });

    authUser.value = user;
  } catch (error) {
    console.log(`ERROR  `, error);
    authUser.value = null;
  }
});
