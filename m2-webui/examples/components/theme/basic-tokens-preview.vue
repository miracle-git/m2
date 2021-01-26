<style lang="less">
.component-preview {
  .heading>div{
    margin-bottom: 15px;
  }
  .title {
    font-size: 18px;
    font-weight:400;
    padding: 0 20px
  }
  .paragraph {
    padding: 0 20px
  }
  .demo-color-box {
    margin: 0;
  }

}
</style>
<template>
  <div class="component-preview page-component">
    <h3>颜色</h3>
    <div class="color">
      <el-row :gutter="12">
        <el-col :span="4" v-for="(color, key) in themeColorLine" :key="key">
          <div class="demo-color-box demo-color-box-other" :style="{ background: color }">
            {{color}}
          </div>
        </el-col>
      </el-row>
      <el-row class="content">
        <table>
          <thead>
            <tr>
              <th>颜色</th>
              <th>色值</th>
              <th>用法</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>主题蓝</td>
              <td>#3464e0</td>
              <td>用于按钮、icon和部分高亮文字</td>
            </tr>
            <tr>
              <td>阳橙</td>
              <td>#ff7548</td>
              <td>颜色点缀，如标题色块，高亮文字</td>
            </tr>
            <tr>
              <td>碧青</td>
              <td>#0ad0b6</td>
              <td>辅助提示信息标识色</td>
            </tr>
            <tr>
              <td>正红</td>
              <td>#f81d22</td>
              <td>警告色，用于特别需要强调的文字或删除色块</td>
            </tr>
          </tbody>
        </table>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="4" v-for="(color, key) in textColorLine" :key="key">
          <div class="demo-color-box demo-color-box-other" :style="{ background: color }">
            {{color}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="4" v-for="(color, key) in borderColorLine" :key="key">
          <div class="demo-color-box demo-color-box-other demo-color-box-lite" :style="{ background: color }">
            {{color}}
          </div>
        </el-col>
      </el-row>
      <el-row class="content">
        <table>
          <thead>
            <tr>
              <th>颜色</th>
              <th>色值</th>
              <th>用法</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>一级文字</td>
              <td>#333333</td>
              <td>用于一级信息，主标题与正文</td>
            </tr>
            <tr>
              <td>次级文字1</td>
              <td>#666666</td>
              <td>用于二级信息，段落信息，引导词</td>
            </tr>
            <tr>
              <td>次级文字2</td>
              <td>#999999</td>
              <td>用于三级信息，按钮信息</td>
            </tr>
            <tr>
              <td>提示性</td>
              <td>#acacac</td>
              <td>用于辅助提示文字例如禁用文字</td>
            </tr>
            <tr>
              <td>背景色</td>
              <td>#f5f7f9</td>
              <td>用于标签、切换按钮背景底色</td>
            </tr>
            <tr>
              <td>背景色</td>
              <td>#f2f2f2</td>
              <td>禁用背景色</td>
            </tr>
            <tr>
              <td>边框线</td>
              <td>#dcdcdc</td>
              <td>用于输入框及其它控件边框等</td>
            </tr>
          </tbody>
        </table>
      </el-row>
    </div>
    <h3>字体</h3>
    <el-row class="content">
      <table>
        <thead>
          <tr>
            <th>字号</th>
            <th>示例</th>
            <th>用法</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>30px</td>
            <td style="font-size:30px">标准字</td>
            <td>用于数字信息展示</td>
          </tr>
          <tr>
            <td>20px</td>
            <td style="font-size:20px">标准字</td>
            <td>用于部分数字信息展示</td>
          </tr>
          <tr>
            <td>18px</td>
            <td style="font-size:18px">标准字</td>
            <td>用于文章类信息标题</td>
          </tr>
          <tr>
            <td>16px</td>
            <td style="font-size:16px">标准字</td>
            <td>用于标题、主功能标签</td>
          </tr>
          <tr>
            <td>14px</td>
            <td style="font-size:14px">标准字</td>
            <td>用于常规正文信息文字</td>
          </tr>
          <tr>
            <td>12px</td>
            <td style="font-size:12px">标准字</td>
            <td>用于卡片内信息文字及辅助文字</td>
          </tr>
        </tbody>
      </table>
    </el-row>
    <el-row class="content">
      <table>
        <thead>
          <tr>
            <th>字重</th>
            <th>代码</th>
            <th>示例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Regular</td>
            <td>400</td>
            <td style="font-weight:400">标准字</td>
          </tr>
          <tr>
            <td>Bold</td>
            <td>600</td>
            <td style="font-weight:600">标准字</td>
          </tr>
        </tbody>
      </table>
    </el-row>
    <h3>Font-family 代码</h3>
    <pre>
    <code class="language-css hljs">
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    </code>
    </pre>
  </div>
</template>

<script>
import { tintColor } from '../../color.js'
export default {
  mounted() {
  },
  methods: {
    tintColor(a, b) {
      return tintColor(a, b)
    },
    dataProxy(value) {
      return this[`color_${value.toLowerCase()}`]
    }
  },
  data() {
    return {
      themeColorLine: ['#3464e0', '#1890ff', '#0ad0b6', '#ffa948', '#ff7548', '#f81d22'],
      textColorLine: ['#333333', '#666666', '#999999', '#acacac'],
      borderColorLine: ['#f5f7f9', '#f2f2f2', '#dcdcdc']
    }
  }
}
</script>
