import { DataType } from 'm2-core'

export default {
  name: 'permission',
  rule: (store) => ({
    // 指令已经添加到元素上，el-指令相关dom元素；binding-对象
    // binding: {name:'if', expression:'foo==1', value: true}
    // v-permission="['admin','editor']"
    inserted(el, binding) {
      // 获取指令的值：按钮要求的权限点数组value并取别名perms
      const { value: perms } = binding
      // 获取用户的权限点
      const accessPerms = store.getters && store.getters.perms
      if (!DataType.isEmptyArray(accessPerms)) {
        // 判断用户权限点中是否有按钮要求的权限
        const hasPermission = accessPerms.some(item => perms.includes(item))
        // 如果没有权限则删除当前dom
        if (!hasPermission) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      } else {
        throw new Error(`The permission code is required，eg: v-permission="['admin','editor']"`)
      }
    }
  })
}
