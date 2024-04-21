// 项目所有的api接口
// 按模块
const apiHost = 'http://localhost:8080/api'

const AccountsApis = {
  loginUrl: '/accounts/user/api/login/',
  logoutUrl: '/accounts/user/api/logout/',
  userInfoUrl: '/accounts/user/api/info/',
  registerUrl: '/accounts/user/api/register/'
}

const SystemApis = {
  sliderListUrl: apiHost + '/system/slider/list/',
  smsCodeUrl: apiHost + '/system/send/sms/',
  unpaidInfoUrl: apiHost + '/system/unpaid/info/'
}

const SightApis = {
  sightListUrl: apiHost + '/sight/sight/list/',
  sightListCacheUrl: apiHost + '/sight/sight/list/cache/',
  sightDetailUrl: apiHost + '/sight/sight/detail/#{id}/',
  sightTicketListUrl: apiHost + '/sight/ticket/list/#{id}/',
  sightCommentListUrl: apiHost + '/sight/comment/list/#{id}/',
  sightImageUrl: apiHost + '/sight/image/list/#{id}/',
  sightInfoUrl: apiHost + '/sight/sight/info/#{id}/',
  sightTicketDetailUrl: apiHost + '/sight/ticket/detail/#{id}/',
  sightCollectUrl: apiHost + '/sight/collect/',
  sightCollectListUrl: apiHost + '/sight/collect/list/'
}

const OrderApis = {
  orderSubmitUrl: apiHost + '/order/submit/order/',
  orderDetailUrl: apiHost + '/order/order/detail/#{sn}/',
  orderListUrl: apiHost + '/order/order/list/'
}

export {
  AccountsApis,
  SystemApis,
  SightApis,
  OrderApis
}
