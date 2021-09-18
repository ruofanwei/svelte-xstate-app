/* eslint-disable no-unused-vars */
import { writable, derived } from "svelte/store"

export const newPassword = writable(null)

export const currentUser = writable({
  username: null,
  email: null,
  picture: null,
  accessToken: null,
  isLogin: false,
})

export const currentCompany = writable({
  CompanyName: null,
  CompanyUuid: null,
})

export const slug = writable({
  storeId: null,
  storeSlug: null,
  acceptTerms: true,
})
