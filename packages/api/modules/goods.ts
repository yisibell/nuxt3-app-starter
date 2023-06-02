import {
  IResponseInstance,
  IApiModuleContainer,
} from '~~/packages/types/apiRepository'

export interface IGetGoodsListParams {
  type: number
  keyword?: string
  topCategory: number
  secondaryCategory?: number
  page: number
  limit: number
}

export interface IGoodsInfoObject {
  // 商品 id
  goodsId: number
  // 图片地址
  img: string
  // 编号
  code: string
  // 款式
  style?: string
  // 颜色
  color?: string
  // 货币
  currency: string
  // 价格
  price: number
  // 单位
  unit: string
}

export interface IGoodsDetailColorObject {
  name: string
  enName: string
}

export interface IGoodsDetailAttrObject {
  name: string
  value: string
}

export interface IGoodsDetailSpecsObject {
  name: string
  value: number
}

export interface IGoodsDetailClothSeedObject {
  name: string
  id: number
}

export interface IGoodsDetailObject {
  primaryCategory: number
  secondaryCategory: number
  stockType: boolean // 是否为非常备款
  code: string
  // 款式
  style: {
    id: number
    name?: string
  }
  img: Array<{
    src: string
  }>
  unit: string
  price: number
  currency: string
  color?: IGoodsDetailColorObject[] // 可选颜色
  sizeList?: IGoodsDetailAttrObject[] // 可选尺码
  specsList?: IGoodsDetailSpecsObject[] // 可选规格
  clothSeedList?: IGoodsDetailClothSeedObject[] // 可选布种

  // 包装规格
  packSpec?: {
    num: number
    packUnit: string
    unit: string
  }

  bottomImg: Array<{
    src: string
  }>

  [propName: string]: any
}

export interface IGetGoodsPriceParams {
  goodsList: Array<{
    uniqueId?: number
    goodsId: number
    quantity: number
    color?: string
    size?: string
    specs?: number
    clothSeed?: number
  }>
}

export interface IDynamicGoodsPriceObject {
  uniqueId?: number
  goodsId: number
  stockType: boolean // 是否为非常备款
  price: number // 单价
  discountPrice: number // 折扣单价
  total: number // 小计
  discountTotalPrice: number // 折扣小计
  colorEn?: string
  size?: string
  specs?: number
  allPrice: number // 整（包，箱，...）单价
  allUnit: string // 整（包，箱，...）单位
  allNum: number // 每（包，箱，...）中的数量
}

export interface IGetGoodsPriceRes {
  totalPrice: number
  list: Array<IDynamicGoodsPriceObject>
}

export interface IGetGoodsAttributeParams {
  number: string
  // 1 根据尺码查询颜色 2 根据颜色查询尺码 3 根据规格查询颜色 4 根据颜色查询规格
  type: 1 | 2 | 3 | 4
  keyword?: string | number
  primaryCategory?: number
  secondaryCategory?: number
}

export interface IGetGoodsAttributeRes {
  list: Array<{
    name: string
    value: string
  }>
}

export interface IOptimalPriceParams {
  goodsId: number
  color: string
  quantity: number
}

export interface IOptimalPriceRes {
  type: 1 | 2 | 3 | 4 // 1 未超起订量 2 超起订量,500克以内 3 超起订量500克 4 不需展示
  add?: {
    num: number
    price: number
    unit: string
  }
  minus?: {
    num: number
    price: number
    unit: string
  }
}

export interface IGetGoodsMoqParams {
  goodsId: number
  color: string
}

export interface IGoodsMoqRes {
  num?: number
  price?: number
  unit?: string
}

export interface IGetGoodsStockParams {
  goodsId: number
  color?: string
  size?: string
  specs?: number
}

export interface IGoodsStockRes {
  inventory?: number
  shipTime?: number
  unit?: string
}

export interface IGoodsApiModuleInstance {
  // 获取全部商品编号
  getGoodsNumberAll: () => Promise<IResponseInstance<{ numberList: string[] }>>

  // 获取商品起订量信息
  getMoq: (data: IGetGoodsMoqParams) => Promise<IResponseInstance<IGoodsMoqRes>>

  // 获取商品列表
  list(
    data: IGetGoodsListParams
  ): Promise<IResponseInstance<{ list: IGoodsInfoObject[]; total: number }>>

  // 获取商品详情
  detail(data: {
    goodsId: number
  }): Promise<IResponseInstance<IGoodsDetailObject>>

  // 获取商品价格
  price(
    data: IGetGoodsPriceParams
  ): Promise<IResponseInstance<IGetGoodsPriceRes>>

  // 获取商品属性
  attribute(
    data: IGetGoodsAttributeParams
  ): Promise<IResponseInstance<IGetGoodsAttributeRes>>

  // 获取最优价格提示
  optimalPrice(
    data: IOptimalPriceParams
  ): Promise<IResponseInstance<IOptimalPriceRes>>

  // 获取商品库存，预计发货时间
  getStock(
    data: IGetGoodsStockParams
  ): Promise<IResponseInstance<IGoodsStockRes>>
}

const goodsApi: IApiModuleContainer<IGoodsApiModuleInstance> = (request) => ({
  getGoodsNumberAll() {
    return request({
      url: 'goods/number',
      method: 'POST',
    })
  },
  getMoq(data) {
    return request({
      url: '/goods/moq',
      method: 'POST',
      data,
    })
  },
  list(data) {
    return request({
      url: `/goods/list`,
      method: 'post',
      data,
    })
  },
  detail(data) {
    return request({
      url: '/goods/detail',
      method: 'post',
      data,
    })
  },
  price(data) {
    return request({
      url: `/goods/price`,
      method: 'post',
      data,
    })
  },
  attribute(data) {
    return request({
      url: `/goods/attribute`,
      method: 'POST',
      data,
    })
  },
  optimalPrice(data) {
    return request({
      url: '/goods/optimal',
      method: 'POST',
      data,
    })
  },
  getStock(data) {
    return request({
      url: '/goods/ship',
      method: 'POST',
      data,
    })
  },
})

export default goodsApi
