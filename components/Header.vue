<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid justify-content-between d-flex">
      <NuxtLink class="navbar-brand" to="/">webprog.io</NuxtLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <NuxtLink
              class="nav-link"
              activeClass="active"
              aria-current="page"
              to="/"
              >Home</NuxtLink
            >
          </li>
          <li class="nav-item">
            <nuxtLink class="nav-link" to="/posts" activeClass="active"
              >Posts</nuxtLink
            >
          </li>
        </ul>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <div class="d-flex" v-if="authUser">
            <li class="nav-item">
              <NuxtLink
                class="nav-link"
                aria-current="page"
                to="/profile"
                activeClass="active"
                >Profile</NuxtLink
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="logoutFn">Logout</a>
            </li>
          </div>
          <div class="d-flex" v-else>
            <li class="nav-item">
              <NuxtLink
                class="nav-link"
                to="/auth/register"
                activeClass="active"
                >Register</NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/auth/login" activeClass="active"
                >Login</NuxtLink
              >
            </li>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { useToast } from 'vue-toastification';
const { authUser } = useAuth();
const toast = useToast();

async function logoutFn() {
  const headers = useRequestHeaders([`cookie`]);

  await useFetch(`/api/auth/logout`, {
    method: `POST`,
    headers,
  });

  authUser.value = null;
  toast.warning(`You are logouted !`);
  return navigateTo(`/`);
}
</script>
<style></style>
