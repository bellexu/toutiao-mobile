<template>
  <div class="login-container">
    <van-nav-bar
     class="app-nav-bar"
      title="注册/登录"
      left-arrow
      @click-left="$router.back()"
    />
  <!--  登录表单  -->
    <van-form 
      :show-error = "false"
      :show-error-message = "false"
      :validate-first="true"
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed"
    >
     <!-- 手机号 -->
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        center
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <!-- 验证码 -->
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        center
        placeholder="请输入验证码"
        name="code"
        :rules="formRules.code"
      >
        <template #button>
         <div class="send-btn">
            <!-- 倒计时 -->
          <van-count-down 
            v-if="isCountDownShow"
            class="count-btn"
            :time="1000 * 5" 
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <!-- 验证码按钮 -->
          <van-button 
            v-else
            class="send-sms-btn" 
            native-type="button"
            size="small" 
            round
            :loading="isSendSmsLoading"
            @click.prevent="onSendSms"
            >发送验证码</van-button>
         </div>
        </template>
      </van-field>
      <!-- 登录按钮 -->
       <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
     </div>
    </van-form>
     
  </div>
</template>

<script>
import {login,sendSms} from '@/api/user'
import {Toast} from 'vant'
export default {
    name : 'my-login',
    data() {
    return {
      user : {
        mobile : '13911111111', //手机号
        code : '' //验证码
      },
      //表单验证规则
      formRules : {
        mobile : [
           { required: true, message: '请输入手机号' },
           { pattern : /^1[3|5|7|8|9]\d{9}$/,message:'手机号格式错误'}
         ],
         code : [
           { required: true, message: '请输入验证码' },
           { pattern : /^\d{6}$/,message:'验证码格式错误'}
         ]
      },
      //控制倒计时和发送按钮的显示状态
      isCountDownShow : false, 
      //控制发送验证码按钮的加载状态
      isSendSmsLoading : false


    }
  },
  methods : {
   async onLogin(){
     Toast.loading({
        message: '登录中...',
        forbidClick: true, //禁止背景点击
        duration : 0 //展示时长(ms)，值为 0 时，toast 不会消失
      });
        // 1. 找到数据接口
        // 2. 封装请求方法
        // 3. 请求调用登录
     try {
       const res = await login(this.user)
       console.log(res)
          // 4. 处理响应结果 
        Toast.success('登录成功')  
        //将后端返回的用户登录状态（token等数据放到 vuex 容器中）
        this.$store.commit('setUser', res.data.data)

        //登录成功，跳转回原来页面
        this.$router.back()  //先用这种方式，但是它不太好
     } catch(err) {
       Toast.fail('登录失败，手机号或验证码错误')
     }
    },

    onFailed(error){
      // console.log(error)
     if(error.errors[0]){
        this.$toast({
        message : error.errors[0].message,
        position: 'top',
      })
     }
    },

    async onSendSms(){
       try{
          //校验手机号码：
          await this.$refs['login-form'].validate('mobile')
          //验证通过，请求发送验证码
          this.isSendSmsLoading = true //展示按钮的 loading 状态，防止网络慢用户多次点击触发发送行为
          await sendSms(this.user.mobile)
         //短信发出去了，隐藏发送按钮，显示倒计时 
          this.isCountDownShow = true
         // 倒计时结束 -> 隐藏倒计时 ，显示发送按钮(倒计时的 finsh 事件处理)

       }catch(err) {
           //try 里面任何代码错误都会进入 catch
           //不同的错误 需要有不同的提示，那就需要判断了
            let message = ''
            if (err && err.response && err.response.status === 429) {
              // 发送短信失败的错误提示
              message = '发送太频繁，请稍后重试'
            } else if (err.name === 'mobile') {
              //表单验证失败的错误提示
              message = err.message
            }else {
              //未知错误
              message = '发送失败，请稍后重试'
            }
            this.$toast({
                message : err.message,
                position: 'top',
            })
            //提示用户
            console.dir(err)
             this.$toast({
                message,
                position: 'top',
            })
            
      }
      //无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
      this.isSendSmsLoading = false
    },
  }
}
</script>

<style scoped lang="less">
.login-container {
    .send-sms-btn{
        width: 76px;
        height: 23px;
        line-height: 23px;
        font-size: 11px;
        color: #666;

        }
      .van-button__text{
        font-size: 11px;
        color: #666;
      }
    .count-btn{
      font-size: 11px;
      color: #666;
      text-align: right;
      padding-right: 15px;
      padding-top: 5px;
    }
   }
 
  .login-btn-wrap{
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
    
  }
  


</style>