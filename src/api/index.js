import ajax from './ajax'
// import json from 'jsonp'
// import {
//     message
// } from 'antd';

const BASE = 'http://127.0.0.1:5000'

// 注册
export const reqRegister = (userName, password, phone) => ajax(BASE + '/register', {
    userName,
    password,
    phone
}, 'POST');

// 登录
export const reqLogin = (userName, password) => ajax(BASE + '/login', {
    userName,
    password
}, 'POST');

// 修改用户信息
export const reqUpdateUserInfo = (user) => ajax(BASE + '/user/updateInfo', user, 'POST');

// 修改用户密码
export const reqResetPwd = (user) => ajax(BASE + '/user/resetPwd', user, 'POST')

// 找回密码
export const reqFindPwd = (user) => ajax(BASE + '/user/findPwd', user, 'POST')

// 获取用户送货地址
export const reqAddress = (_id) => ajax(BASE + '/getAddress', { _id })

// 添加送货地址
export const reqAddAddress = (info) => ajax(BASE + '/addAddress', info, 'POST')

// 修改送货地址
export const reqUpdateAddress = (info) => ajax(BASE + '/updateAddress', info, 'POST')

// 删除送货地址
export const reqDeleteAddress = (userId, addressId) => ajax(BASE + '/deleteAddress', { userId, addressId }, 'POST')

// 获取省市区 高德地图API
export const reqAliMap = (key, keywords) => ajax('https://restapi.amap.com/v3/config/district', {key, keywords})




/**======================================================================== */
// 获取一级或某个二级分类列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', {
    parentId
})

// 添加分类
export const reqAddCategory = (parentId, categoryName) => ajax(BASE + '/manage/category/add', {
    parentId,
    categoryName
}, 'POST')

// 获取一个分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', {
    categoryId
})

// 更新品类名称
export const reqUpdateCategory = ({
    categoryId,
    categoryName
}) => ajax(BASE + '/manage/category/update', {
    categoryId,
    categoryName
}, 'POST')

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', {
    pageNum,
    pageSize
})

// 根据ID/Name搜索产品分页列表
export const reqSearchProducts = ({
    pageNum,
    pageSize,
    searchName,
    searchType
}) => ajax(BASE + '/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName
})

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', {
    productId,
    status
}, 'POST')

// 删除图片
export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete', {
    name
}, 'POST')

// 添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST')

// 添加商品
export const reqAddProduct = (product) => ajax(BASE + '/manage/product/add', product, 'POST')

// 修改商品 
export const reqUpdateProduct = (product) => ajax(BASE + '/manage/product/update', product, 'POST')

// 获取角色列表
export const reqRoleList = () => ajax(BASE + '/manage/role/list')

// 添加角色
export const reqAddRole = (roleName) => ajax(BASE + '/manage/role/add', {
    roleName
}, 'POST')

// 更新角色
export const reqUpdateRole = (role) => ajax(BASE + '/manage/role/update', role, 'POST')

// 获取所有用户列表
export const reqUsers = () => ajax(BASE + '/manage/user/list')

// 删除用户
export const reqDeleteUser = (userId) => ajax(BASE + '/manage/user/delete', {
    userId
}, 'POST')

// 添加/修改用户
export const reqAddOrUpdateUser = (user) => ajax(BASE + '/manage/user/' + (user._id ? 'update' : 'add'), user, 'POST')

/**
 * mock
 */
export const reqCartList = () => ajax(BASE + '/cartList')

export const reqCate = () => ajax(BASE + '/cate')