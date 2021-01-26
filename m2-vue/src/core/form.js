// 重置表单，formRef为表单的ref值，excludeFields为要排除重新初始化值的属性
export function resetForm(formRef, ...excludeFields) {
  const $form = this.$refs[formRef]
  const $data = this.$data
  const $options = this.$options.data.call(this)
  if (!excludeFields || excludeFields.length === 0) {
    excludeFields = ['ruleValidate']
  }
  for (const attr in $data) {
    if (excludeFields && excludeFields.includes(attr)) {
      continue
    }
    $data[attr] = $options[attr]
  }
  $form && this.$nextTick(() => {
    $form.resetFields() && $form.clearValidate()
  })
}
