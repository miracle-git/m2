"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetForm = resetForm;

// 重置表单，formRef为表单的ref值，excludeFields为要排除重新初始化值的属性
function resetForm(formRef) {
  for (var _len = arguments.length, excludeFields = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    excludeFields[_key - 1] = arguments[_key];
  }

  var $form = this.$refs[formRef];
  var $data = this.$data;
  var $options = this.$options.data.call(this);

  if (!excludeFields || excludeFields.length === 0) {
    excludeFields = ['ruleValidate'];
  }

  for (var attr in $data) {
    if (excludeFields && excludeFields.includes(attr)) {
      continue;
    }

    $data[attr] = $options[attr];
  }

  $form && this.$nextTick(function () {
    $form.resetFields() && $form.clearValidate();
  });
}