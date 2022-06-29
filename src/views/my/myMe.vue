<template>
  <div class="my-container">
    <van-cell-group>
      <van-cell 
        title="单元格" 
        value="内容" 
        center
      >
        <van-image
          slot="icon"
          width="2rem"
          height="2rem"
          fit="cover"
          round
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <div slot="title">昵称</div>
         <van-button
          size="small"
          round
         >编辑资料</van-button>
      </van-cell>
       
      <van-grid>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
      
    </van-cell-group>
  </div>
</template>

<script>
export default {
    name : 'my-me'
}
</script>

<style>

</style>