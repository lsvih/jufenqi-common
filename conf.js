// const server = 'http://wx.jufenqi.com:8080/';
// const Rxports = {
//     appname: '居分期',
//     server: server,
//     userApi: `${server}user/api/`,
//     walletApi: `${server}wallet/api/`,
//     orderApi: `${server}decorationorder/api/`,
//     mOrderApi: `${server}materialorder/api/`,
//     merApi: `${server}merchant/api/`,
//     loanApi: `${server}loanapplicant/api/`,
//     wxApi: `${server}wechat/api/`,
//     payApi: `${server}payment/api/`,
//     serverUrl: 'http://101.200.78.103:90/',
//     apiUrl: 'http://101.200.78.103:90/jfq/api/web/',
//     imgUrl: 'http://ohej1hvbm.bkt.clouddn.com/',
//     notifyUrl: 'http://materialorder/api/materialAppts/noticePaymentResult',
//     picpApi: `${server}picprice/api/`,
//     homeApi: `${server}homepage/api/`
// };

// module.exports = Rxports

var server = 'http://wx.jufenqi.com:8080/'
var Rxports = {
    appname: '居分期',
    server: server,
    userApi: server + 'user/api/',
    walletApi: server + 'wallet/api/',
    orderApi: server + 'decorationorder/api/',
    mOrderApi: server + 'materialorder/api/',
    merApi: server + 'merchant/api/',
    loanApi: server + 'loanapplicant/api/',
    wxApi: server + 'wechat/api/',
    payApi: server + 'payment/api/',
    serverUrl: 'http://101.200.78.103:90/',
    apiUrl: 'http://101.200.78.103:90/jfq/api/web/',
    imgUrl: 'http://ohej1hvbm.bkt.clouddn.com/',
    notifyUrl: 'http://materialorder/api/materialAppts/noticePaymentResult',
    picpApi: server + 'picprice/api/',
    homeApi: server + 'homepage/api/'
}

module.exports = Rxports

