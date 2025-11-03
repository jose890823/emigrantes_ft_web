/**
 * Composable genérico para hacer peticiones al API
 * Maneja automáticamente:
 * - Autenticación con JWT
 * - Manejo de errores
 * - Transformación de respuestas
 * - Loading states
 */

import type { UseFetchOptions } from 'nuxt/app'
import type { ApiResponse, ApiSuccessResponse, ApiErrorResponse } from '~/types/api'

export const useApi = () => {
  const config = useRuntimeConfig()
  const authToken = useCookie('auth_token')

  /**
   * Función genérica para hacer peticiones HTTP
   */
  const makeRequest = async <T = any>(
    endpoint: string,
    options: UseFetchOptions<T> = {}
  ): Promise<ApiSuccessResponse<T>> => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    // Agregar token de autenticación si existe
    if (authToken.value) {
      headers['Authorization'] = `Bearer ${authToken.value}`
    }

    try {
      const response = await $fetch<ApiResponse<T>>(endpoint, {
        baseURL: config.public.apiBaseUrl as string,
        ...options,
        headers,
      })

      // Si la respuesta es exitosa
      if (response.success) {
        return response as ApiSuccessResponse<T>
      }

      // Si la respuesta es de error
      const errorResponse = response as ApiErrorResponse
      throw new Error(errorResponse.error.message)
    } catch (error: any) {
      // Manejar errores de red o del servidor
      console.error('API Error:', error)
      throw error
    }
  }

  /**
   * Métodos HTTP específicos
   */
  const get = <T = any>(endpoint: string, options?: UseFetchOptions<T>) => {
    return makeRequest<T>(endpoint, { ...options, method: 'GET' })
  }

  const post = <T = any>(endpoint: string, body?: any, options?: UseFetchOptions<T>) => {
    return makeRequest<T>(endpoint, { ...options, method: 'POST', body })
  }

  const put = <T = any>(endpoint: string, body?: any, options?: UseFetchOptions<T>) => {
    return makeRequest<T>(endpoint, { ...options, method: 'PUT', body })
  }

  const patch = <T = any>(endpoint: string, body?: any, options?: UseFetchOptions<T>) => {
    return makeRequest<T>(endpoint, { ...options, method: 'PATCH', body })
  }

  const del = <T = any>(endpoint: string, options?: UseFetchOptions<T>) => {
    return makeRequest<T>(endpoint, { ...options, method: 'DELETE' })
  }

  return {
    get,
    post,
    put,
    patch,
    delete: del,
    makeRequest,
  }
}

/**
 * Composable con loading state automático
 */
export const useApiWithLoading = () => {
  const api = useApi()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const execute = async <T = any>(
    apiCall: () => Promise<ApiSuccessResponse<T>>
  ): Promise<T | null> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiCall()
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Error en la petición'
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    ...api,
    isLoading: readonly(isLoading),
    error: readonly(error),
    execute,
  }
}
