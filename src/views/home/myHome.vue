<template>
  <div class="home-container">
     <van-nav-bar class="app-nav-bar">
       <van-button 
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        round
        size="small"
        >搜索</van-button>
     </van-nav-bar>

    <!-- 标签页组件有一个功能，只有你第一次查看标签页的时候才会渲染里面的内容 -->
    <!-- 文章频道列表 -->
     <van-tabs class="channel-tabs" v-model="active">
        <van-tab 
          v-for="channel in channels"
          :key="channel.id"
          :title="channel.name"
          >
            <!-- 文章列表 -->
            <article-list :channel="channel"/>

          </van-tab>
      </van-tabs>
    <!-- 文章频道列表 -->

  </div>
</template>

<script>
import {getUserChannels} from '@/api/user'
import ArticleList from './components/article-list'

export default {
    name : 'my-home',
    components : {
      ArticleList
    },
    data() {
    return {
      active: 0,
      channels : []
     }
    },
    created() {
      this.loadChannels()
    },
    methods : {
     async loadChannels(){
        //请求获取频道数据
        const { data } = await getUserChannels()
        console.log(data)
        this.channels = data.data.channels
      }
    }
}
</script>

<style scoped lang="less">

 .home-container {
  /deep/ .van-nav-bar__title {
     max-width: unset;
   }
   .search-btn {
     width: 277px;
     height: 32px;
     background: #5babfb;
     border: none;
   }
   .van-button__text {
     font-size: 14px;
   }
   .channel-tabs {
     /deep/ .van-tab {
       border-right: 1px solid #edeff3;
       border-bottom: 1px solid #edeff3;
     }
    /deep/ .van-tabs__line {
       width: 15px;
       height: 3px;
       background: #3296fa;
       bottom: 20px;
     }
   }
 }

</style>