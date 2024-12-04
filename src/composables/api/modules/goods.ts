import useRequest from '../request'
import type {
  IGetGoodsMoqParams,
  IGoodsMoqRes,
  IGetGoodsListParams,
  IGoodsInfoObject,
  IGoodsDetailObject,
  IGetGoodsPriceParams,
  IGetGoodsPriceRes,
  IGetGoodsAttributeParams,
  IGetGoodsAttributeRes,
  IOptimalPriceParams,
  IOptimalPriceRes,
  IGetGoodsStockParams,
  IGoodsStockRes,
} from '~/composables/api/interfaces/goods'

export const useGoodsApi = () => {
  const { request } = useRequest()

  /** 获取全部商品编号 */
  const getGoodsNumberAll = () => {
    return request<{ numberList: string[] }>('/goods/number', {
      method: 'POST',
    })
  }

  /** 获取商品起订量信息 */
  const getMoq = (body: IGetGoodsMoqParams) => {
    return request<IGoodsMoqRes>('/goods/moq', {
      method: 'POST',
      body,
    })
  }

  /** 获取商品列表 */
  const list = (body: IGetGoodsListParams) => {
    return request<{ list: IGoodsInfoObject[], total: number }>(`/goods/list`, {
      method: 'post',
      body,
    })
  }

  /** 获取商品详情 */
  const detail = (body: {
    goodsId: number
  }) => {
    return request<IGoodsDetailObject>('/goods/detail', {
      method: 'post',
      body,
    })
  }

  /** 获取商品价格 */
  const price = (body: IGetGoodsPriceParams) => {
    return request<IGetGoodsPriceRes>(`/goods/price`, {
      method: 'post',
      body,
    })
  }

  /** 获取商品属性 */
  const attribute = (body: IGetGoodsAttributeParams) => {
    return request<IGetGoodsAttributeRes>(`/goods/attribute`, {
      method: 'POST',
      body,
    })
  }

  /** 获取最优价格提示 */
  const optimalPrice = (body: IOptimalPriceParams) => {
    return request<IOptimalPriceRes>('/goods/optimal', {
      method: 'POST',
      body,
    })
  }

  /** 获取商品库存，预计发货时间 */
  const getStock = (body: IGetGoodsStockParams) => {
    return request<IGoodsStockRes>('/goods/ship', {
      method: 'POST',
      body,
    })
  }

  return {
    getGoodsNumberAll,
    getMoq,
    list,
    detail,
    price,
    attribute,
    optimalPrice,
    getStock,
  }
}
