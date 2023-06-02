import { defineNuxtPlugin, navigateTo } from '#app'
import qs from 'qs'
import apiRepositoryFactory from '~~/packages/api'
import axios from 'axios'
import { useSiteStore } from '~/store/site'
import { $layer } from '~/plugins/layer'
import type { ICreateRequestApi } from '~~/packages/types/apiRepository'

const assign = (obj: {}, def: {}) => {
  return Object.assign({}, obj, def)
}

export default defineNuxtPlugin(() => {
  const appConifg = useAppConfig()
  const SiteStore = useSiteStore()

  const createAxiosInstance = () => {
    const { NUXT_APP_BASE_API } = appConifg

    const axiosInstance = axios.create({
      baseURL: NUXT_APP_BASE_API,
      timeout: 50000,
    })

    // 请求拦截
    axiosInstance.interceptors.request.use(
      (config) => {
        // set access token for JWT
        config.headers['Authorization'] = SiteStore.accessToken

        return config
      },
      (err) => {
        // 请求错误处理
        console.error('[Request Error]：', err)

        return Promise.reject(err)
      }
    )

    // 响应拦截
    axiosInstance.interceptors.response.use(
      (resp) => {
        const { code, data } = resp.data

        if (![200, 201, 0].includes(code)) {
          // 重定向处理
          if ([301, 302].includes(code)) {
            const { location } = data

            navigateTo(location)
          } else {
            console.error('[Response Error Data]:', resp)
          }
        }

        return resp.data
      },
      (err) => {
        // 响应错误处理
        const code = err.response?.status

        console.error('[HTTP Response Error Code]:', code)
        console.error('[HTTP Response Error Info]:', err)

        if (code === 401) {
          // token 失效
          navigateTo('/login')
        }

        if (err.isAxiosError) {
          console.error('[Axios Response Error Info]:', err)
        }

        return Promise.reject(err)
      }
    )

    return axiosInstance
  }

  // 创建请求api
  const createRequestApi: ICreateRequestApi =
    (axiosInstance) =>
    (option, extraOption = {}) => {
      const { dataType = 'json', mock = false, loading = false } = extraOption

      const { NUXT_APP_MOCK_API } = appConifg

      // 是否 mock 数据模式
      if (mock && NUXT_APP_MOCK_API) {
        option.url = `${NUXT_APP_MOCK_API}${option.url}`
      }

      if (dataType === 'formData') {
        // 发送 formData 数据格式
        option.headers = assign(
          {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          option.headers || {}
        )
        option.data = qs.stringify(option.data)
      } else if (dataType === 'formData2') {
        // 含文件
        option.headers = assign(
          {
            'Content-Type': 'multipart/form-data',
          },
          option.headers || {}
        )
      }

      return new Promise((resolve, reject) => {
        if (process.client && loading) {
          $layer.showLoading()
        }

        axiosInstance(option)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            if (process.client && loading) $layer.closeLoading()
          })
      })
    }

  // axios instance
  const axiosInstance = createAxiosInstance()

  // 二次包装请求方法
  const request = createRequestApi(axiosInstance)

  return {
    provide: {
      api: apiRepositoryFactory(request),
    },
  }
})
