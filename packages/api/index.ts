import user, { IUserApiModuleInstance } from './modules/user'

import { IRequestInstance } from '~~/packages/types/apiRepository'

/**
 * api 仓库
 */
export interface IApiRepository {
  user: IUserApiModuleInstance
}

export let $api: IApiRepository

export interface IApiRepositoryFactory {
  (fn: IRequestInstance): IApiRepository
}

const apiRepositoryFactory: IApiRepositoryFactory = (request) => {
  $api = {
    user: user(request),
  }

  return $api
}

export default apiRepositoryFactory
