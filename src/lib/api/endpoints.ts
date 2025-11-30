export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },

  USERS: {
    LIST: "/users",
    BY_PHONE: (phone: string) => `/users/phone/${phone}`,
    BY_ID: (id: number) => `/users/${id}`,
    HEALTH: "/users/health/check",

    ADMIN: {
      CREATE: "/users/admin/create",
    },
  },

  PROFILE: {
    MY_PROFILE: "/profile",
    UPDATE_MY_PROFILE: "/profile",
    USER_PROFILE: (id: number) => `/profile/users/${id}`,
    UPDATE_USER_PROFILE: (id: number) => `/profile/users/${id}`,
  },

  APP: {
    HEALTH: "/health",
    TEST: "/test",
  },
} as const;
