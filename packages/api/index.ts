import category, { ICategoryApiModuleInstance } from './modules/category'
import goods, { IGoodsApiModuleInstance } from './modules/goods'
import user, { IUserApiModuleInstance } from './modules/user'
import cart, { ICartApiModuleInstance } from './modules/cart'
import order, { IOrderApiModuleInstance } from './modules/order'
import refund, { IRefundApiModuleInstance } from './modules/refund'
import notice, { INoticeApiModuleInstance } from './modules/notice'
import { IRequestInstance } from '~~/packages/types/apiRepository'

/**
 * api 仓库
 */
export interface IApiRepository {
  category: ICategoryApiModuleInstance
  goods: IGoodsApiModuleInstance
  user: IUserApiModuleInstance
  cart: ICartApiModuleInstance
  order: IOrderApiModuleInstance
  refund: IRefundApiModuleInstance
  notice: INoticeApiModuleInstance
}

export let $api: IApiRepository

export interface IApiRepositoryFactory {
  (fn: IRequestInstance): IApiRepository
}

const apiRepositoryFactory: IApiRepositoryFactory = (request) => {
  $api = {
    category: category(request),
    goods: goods(request),
    user: user(request),
    cart: cart(request),
    order: order(request),
    refund: refund(request),
    notice: notice(request),
  }

  return $api
}

export default apiRepositoryFactory
