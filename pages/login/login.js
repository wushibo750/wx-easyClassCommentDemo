// pages/login/login.js
import request from '../../utils/request'
import login from '../../utils/login'
import loginRequest from '../../utils/loginRequest'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneNum:'',
    password:'',
    code:'',
    sms:'',
    test:''

  },
  check(){
    console.log(this.data.sms);
  },
  test(){
    console.log("终于成功了");
  },
  onChangecode(event){
    this.setData({
      sms:event.detail
    })
  },
  onChangeiphonenumber(event){
    console.log(event.detail);
    this.setData({
      phoneNum:event.detail
    })
  },

  // 准备登录的回调
  async checkLogin(){
    // 1. 收集表单项数据
    let {phoneNum, password,code} = this.data;
    // 2. 前端验证
    /*
    * 手机号验证：
    *   1. 内容为空
    *   2. 手机号格式不正确
    *   3. 手机号格式正确，验证通过
    * */
    if(!phoneNum){
      // 提示用户
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return;
    }
    // 定义正则表达式
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if(!phoneReg.test(phoneNum)){
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return;
    }

    if(!password){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return;
    }
    // 后端验证
    //先给用于一个图片验证码
    let resultCode = await loginRequest('/user/loginByPhone', { phoneNum, password,code},'POST')
    if(resultCode.code==400){
      console.log("图片验证码发送成功",resultCode);
      this.setData({
        code:resultCode.data
      })
    }
    return;
  },
  //登录回调
  async login(){
    let {phoneNum, password} = this.data;
    let code="";
    code+=this.data.sms;
    console.log("输出值为",code);
    console.log("电话为",phoneNum);
    console.log("密码为",password);
    let result = await login('/user/loginByPhone', { phoneNum, password,code},'POST')
    console.log("返回数据为",result)
    if(result.code === 200){ // 登录成功
      console.log("登录成功");
      console.log("输出为",JSON.stringify(result.data))
      // wx.showToast({
      //   title: '登录成功'
      // })
      // // 将用户的信息存储至本地
      // wx.setStorageSync('userInfo', JSON.stringify(result.profile))

      // 跳转至个人中心personal页面
      // wx.reLaunch({
      //   url: '/pages/personal/personal'
      // })
    }else if(result.code === 400){
      wx.showToast({
        title: '验证码错误',
        icon: 'none'
      })
    }else if(result.code === 502){
      wx.showToast({
        title: '密码错误',
        icon: 'none'
      })
    }else {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon: 'none'
      })
    }


  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
