// pages/personInformation/personInformation.js
import requestToken from "../../utils/requestToken";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    occupation:'12',
    education:'',
    school:'',
    qqNum:'',
    avatar:'',   //头像地址
    briefIntroduction:'',
    username:''
 },
    async onClickLeft(){
        let result= await requestToken('/profile/query')
        console.log("返回结果为：",result);

    },
    async getInformation(){
        let result= await requestToken('/profile/query')
        console.log("返回结果为：",result);
        this.setData({
            occupation:result.data.occupation,
            education:result.data.education,
            username:result.data.username,
            school:result.data.school,
            qqNum:result.data.qqNum,
            briefIntroduction:result.data.briefIntroduction
        })
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
