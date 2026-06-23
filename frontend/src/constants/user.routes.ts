export const USER_ROUTES = {
    PROFILE: "/users/profile" ,
    ALL_USERS: "/users" ,
    DELETE: (id: string) => `/users/${id}`
} as const 