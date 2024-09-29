<template>
  <div class="container">
    <div class="row justify-content-center my-4">
      <div class="col-md-4">
        <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
          <ul class="mb-0">
            <li v-for="(error, index) in errors" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>

        <form @submit.prevent="registerFn">
          <div class="mb-3">
            <label htmlFor="name" class="form-label">Name</label>
            <input
              type="text"
              v-model="formData.name"
              class="form-control"
              id="name"
            />
          </div>
          <div class="mb-3">
            <label htmlFor="email" class="form-label">Email address</label>
            <input
              type="email"
              v-model="formData.email"
              class="form-control"
              id="email"
            />
          </div>
          <div class="mb-3">
            <label htmlFor="password" class="form-label">Password</label>
            <input
              type="password"
              v-model="formData.password"
              class="form-control"
              id="password"
            />
          </div>
          <div class="mb-3">
            <label htmlFor="c_password" class="form-label"
              >Confirm Password</label
            >
            <input
              type="password"
              v-model="formData.c_password"
              class="form-control"
              id="c_password"
            />
          </div>
          <button class="btn btn-primary" :disabled="loading">
            Register
            <div
              v-if="loading"
              class="spinner-border spinner-border-sm ms-2"
            ></div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: `guest`,
});

const {
  public: { apiBase },
} = useRuntimeConfig();

import { useToast } from 'vue-toastification';
const { authUser } = useAuth();
const errors = ref([]);
const loading = ref(false);
const toast = useToast();

const formData = reactive({
  name: '',
  email: '',
  password: '',
  c_password: '',
});

async function registerFn() {
  await $fetch(`${apiBase}/sanctum/csrf-cookie`, {
    credentials: `include`,
  });

  const XSRF_TOKEN = useCookie(`XSRF-TOKEN`);

  try {
    loading.value = true;
    const data = await $fetch(`${apiBase}/register`, {
      method: `POST`,
      body: formData,
      credentials: `include`,
      headers: {
        Accept: 'application/json',
        'X-XSRF-TOKEN': XSRF_TOKEN.value,
      },
    });

    authUser.value = data.user;
    toast.success(`You are registered !`);
    return navigateTo(`/`);
  } catch (error) {
    errors.value = Object.values(error.data).flat();
    console.error(error.data);
  } finally {
    loading.value = false;
  }
}
</script>
