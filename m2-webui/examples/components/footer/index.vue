<template>
  <div class="footer-nav">
    <el-row justify="space-around" >
      <el-col :offset="18" :span="6" class="footer-link">
        <a target="_blank" :href="gitURL">
          <svg aria-hidden="true" class="svg-icon" style="color: rgb(240, 79, 51);">
            <use xlink:href="#icon-git">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="icon" viewBox="0 0 1025 1024" id="icon-git"><path d="M1004.728 466.4l-447.104-447.072c-25.728-25.76-67.488-25.76-93.28 0l-103.872 103.872 78.176 78.176c12.544-5.984 26.56-9.376 41.376-9.376 53.024 0 96 42.976 96 96 0 14.816-3.36 28.864-9.376 41.376l127.968 127.968c12.544-5.984 26.56-9.376 41.376-9.376 53.024 0 96 42.976 96 96s-42.976 96-96 96-96-42.976-96-96c0-14.816 3.36-28.864 9.376-41.376l-127.968-127.968c-3.04 1.472-6.176 2.752-9.376 3.872l0 266.976c37.28 13.184 64 48.704 64 90.528 0 53.024-42.976 96-96 96s-96-42.976-96-96c0-41.792 26.72-77.344 64-90.528l0-266.976c-37.28-13.184-64-48.704-64-90.528 0-14.816 3.36-28.864 9.376-41.376l-78.176-78.176-295.904 295.872c-25.76 25.792-25.76 67.52 0 93.28l447.136 447.072c25.728 25.76 67.488 25.76 93.28 0l444.992-444.992c25.76-25.76 25.76-67.552 0-93.28z" p-id="2500"></path></svg>
            </use>
          </svg>
        </a>
        <a target="_blank" :href="npmURL">
          <svg aria-hidden="true" class="svg-icon" style="color: rgb(197, 73, 69);">
            <use xlink:href="#icon-npm">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="icon" viewBox="0 0 1024 1024" id="icon-npm"><path d="M0 0v1024h1024V0H0z m832 832h-128V320H512v512H192V192h640v640z" p-id="1527"></path></svg>
            </use>
          </svg>
        </a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        gitURL: 'https://github.com/miracle-git/m2/tree/master/m2-webui',
        npmURL: 'https://www.npmjs.com/package/m2-webui'
      }
    }
  }
</script>

<style lang="less">
  @import "./index.less";
</style>
