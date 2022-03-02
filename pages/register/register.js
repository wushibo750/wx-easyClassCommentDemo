// pages/register/register.js
import request from "../../utils/request";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum:'',
    sms:'',
    code:'',
    password_t:'',
    password:'',
    phoneCode:''
  },
  getCode(){

  },
  onChangepassword(event){
    this.setData({
      password:event.detail
    })
  },
  onChangepassword_t(event){
    this.setData({
      password_t:event.detail
    })
  },
  // check(){
  //   console.log(this.data.sms);
  // },
  // test(){
  //   console.log("终于成功了");
  // },
  onChangecode(event){
    this.setData({
      phoneCode:event.detail
    })
  },
  onCode(event){
    this.setData({
      code:event.detail
    })
  },
  onChangeiphonenumber(event){
    console.log(event.detail);
    this.setData({
      phoneNum:event.detail
    })
  },
  //获取二维码
  async checkLogin(){
    let{phoneNum}=this.data;
    let code='';
    code=code+this.data.sms;
    let result=await request('/user/sendSMS',{phoneNum,code},'POST')
    if (result.code==400){
      console.log("获取图片验证码成功");
      this.setData({
        code:result.data
      })
    }else{
      console.log("获取图片验证码失败")
    }
  },
   //获取手机验证码
  async getPhoneCode(){
    let{phoneNum,code}=this.data;
    let result=await request('/user/sendSMS',{phoneNum,code},'POST')
    if (result.code==200){
      console.log("获取手机验证码成功");
    }else if(result.code==400) {
      console.log("手机号已被注册");
      wx.showToast({
        title: '手机号已被注册',
        icon: 'none'
      })
    }
  },
  //注册
  async register(){
    let{phoneNum,password,password_t,phoneCode}=this.data;
    let result=await request('/user/register',{phoneNum,password,password_t,phoneCode},'POST')
    if (result.code==200){
      console.log("注册成功");
      wx.navigateTo({
        url: '/pages/login/login'
      })
      wx.showToast({
        title: '注册成功',
        icon: 'none'
      })
    }else if(result.code==400) {
      console.log("注册失败");
      wx.showToast({
        title: '注册失败',
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
