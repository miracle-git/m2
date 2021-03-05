"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// 私有标记Symbol
var _st_i = Symbol('sorter instance member');

var Sorter = /*#__PURE__*/function () {
  function Sorter(items) {
    var _this = this;

    _classCallCheck(this, Sorter);

    this.items = items; // 私有实例成员

    this[_st_i] = {
      swap: function swap(a, b) {
        if (a === b) return;
        var temp = _this.items[a];
        _this.items[a] = _this.items[b];
        _this.items[b] = temp;
      },
      compare: function compare(a, b) {
        var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref$direction = _ref.direction,
            direction = _ref$direction === void 0 ? 'asc' : _ref$direction,
            _ref$mode = _ref.mode,
            mode = _ref$mode === void 0 ? 'index' : _ref$mode;

        if (mode.toLowerCase() === 'index') {
          return direction.toLowerCase() === 'asc' ? _this.items[a] > _this.items[b] : _this.items[a] < _this.items[b];
        } else {
          return direction.toLowerCase() === 'asc' ? a > b : a < b;
        }
      },
      partition: function partition(left, right, direction) {
        var pivot = left,
            index = pivot + 1;

        for (var i = index; i <= right; i++) {
          if (_this[_st_i].compare(pivot, i, {
            direction: direction
          })) {
            _this[_st_i].swap(i, index);

            index++;
          }
        }

        _this[_st_i].swap(pivot, index - 1);

        return index - 1;
      },
      merge: function merge(left, right, direction) {
        var res = [];

        while (left.length && right.length) {
          if (_this[_st_i].compare(left[0], right[0], {
            direction: direction,
            mode: 'value'
          })) {
            res.push(right.shift());
          } else {
            res.push(left.shift());
          }
        }

        while (left.length) {
          res.push(left.shift());
        }

        while (right.length) {
          res.push(right.shift());
        }

        return res;
      },
      heapify: function heapify(i, len, direction) {
        var left = 2 * i + 1,
            right = 2 * i + 2;
        var temp = i;

        if (left < len && _this[_st_i].compare(left, temp, {
          direction: direction
        })) {
          temp = left;
        }

        if (right < len && _this[_st_i].compare(right, temp, {
          direction: direction
        })) {
          temp = right;
        }

        if (temp !== i) {
          _this[_st_i].swap(temp, i);

          _this[_st_i].heapify(temp, len, direction);
        }
      }
    };
  } // 冒泡排序


  _createClass(Sorter, [{
    key: "bubbleSort",
    value: function bubbleSort() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'asc';
      var len = this.items.length;

      for (var i = len - 1; i >= 0; i--) {
        for (var j = 0; j < i; j++) {
          if (this[_st_i].compare(j, j + 1, {
            direction: direction
          })) {
            this[_st_i].swap(j, j + 1);
          }
        }
      }

      return this.items;
    } // 选择排序

  }, {
    key: "selectionSort",
    value: function selectionSort() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'asc';
      var len = this.items.length;

      for (var i = 0; i < len - 1; i++) {
        var index = i;

        for (var j = index + 1; j < len; j++) {
          if (this[_st_i].compare(index, j, {
            direction: direction
          })) {
            index = j;
          }
        }

        this[_st_i].swap(i, index);
      }

      return this.items;
    } // 插入排序

  }, {
    key: "insertionSort",
    value: function insertionSort() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'asc';
      var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.items;
      var len = arr.length;

      for (var i = 1; i < len; i++) {
        var temp = arr[i],
            j = i;

        while (this[_st_i].compare(arr[j - 1], temp, {
          direction: direction,
          mode: 'value'
        }) && j > 0) {
          arr[j] = arr[j - 1];
          j--;
        }

        arr[j] = temp;
      }

      return arr;
    } // 希尔排序

  }, {
    key: "shellSort",
    value: function shellSort() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'asc';
      var len = this.items.length;
      var delta = Math.floor(len / 2);

      while (delta >= 1) {
        for (var i = delta; i < len; i++) {
          var temp = this.items[i],
              j = i;

          while (this[_st_i].compare(this.items[j - delta], temp, {
            direction: direction,
            mode: 'value'
          }) && j > delta - 1) {
            this.items[j] = this.items[j - delta];
            j -= delta;
          }

          this.items[j] = temp;
        }

        delta = Math.floor(delta / 2);
      }

      return this.items;
    } // 快速排序

  }, {
    key: "quickSort",
    value: function quickSort() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'asc';
      var left = arguments.length > 1 ? arguments[1] : undefined;
      var right = arguments.length > 2 ? arguments[2] : undefined;
      var len = this.items.length;
      left = typeof left !== 'number' ? 0 : left;
      right = typeof right !== 'number' ? len - 1 : right;

      if (left < right) {
        var index = this[_st_i].partition(left, right, direction);

        this.quickSort(direction, left, index - 1);
        this.quickSort(direction, index + 1, right);
      }

      return this.items;
    } // 归并排序

  }, {
    key: "mergeSort",
    value: function mergeSort() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'asc';
      var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.items;
      var len = arr.length;
      if (len < 2) return arr;
      var mid = Math.floor(len / 2);
      var left = arr.slice(0, mid);
      var right = arr.slice(mid);
      return this[_st_i].merge(this.mergeSort(direction, left), this.mergeSort(direction, right), direction);
    } // 堆排序

  }, {
    key: "heapSort",
    value: function heapSort() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'asc';
      var len = this.items.length;
      var mid = Math.floor(len / 2); // 建立大顶堆

      for (var i = mid; i >= 0; i--) {
        this[_st_i].heapify(i, len, direction);
      }

      for (var _i = len - 1; _i > 0; _i--) {
        this[_st_i].swap(0, _i);

        len--;

        this[_st_i].heapify(0, len, direction);
      }

      return this.items;
    } // 桶排序

  }, {
    key: "bucketSort",
    value: function bucketSort() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'asc';
      var bucketSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var len = this.items.length;
      if (len <= 1) return this.items; // 寻找最大值和最小值

      var min = this.items[0],
          max = this.items[0];

      for (var i = 1; i < len; i++) {
        var item = this.items[i];

        if (item < min) {
          min = item;
        } else if (item > max) {
          max = item;
        }
      } // 初始化桶


      var bucketCount = Math.floor((max - min) / bucketSize) + 1;
      var buckets = new Array(bucketCount);

      for (var _i2 = 0; _i2 < bucketCount; _i2++) {
        buckets[_i2] = [];
      } // 利用映射函数将数据分配到各个桶中


      for (var _i3 = 0; _i3 < len; _i3++) {
        var _item = this.items[_i3];
        var delta = direction.toLowerCase() === 'asc' ? _item - min : max - _item;
        var index = Math.floor(delta / bucketSize);
        buckets[index].push(_item);
      } // 清空数组


      this.items = []; // 对每个桶进行插入排序

      for (var _i4 = 0; _i4 < bucketCount; _i4++) {
        var bucket = buckets[_i4];
        this.insertionSort(direction, bucket);

        for (var j = 0; j < bucket.length; j++) {
          this.items.push(bucket[j]);
        }
      }

      return this.items;
    } // 计数排序

  }, {
    key: "countingSort",
    value: function countingSort() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'asc';
      var len = this.items.length;
      if (len <= 1) return this.items;
      var asc = direction.toLowerCase() === 'asc';
      var max = this.items[0],
          index = asc ? 0 : len - 1; // 寻找最大值

      for (var i = 0; i < len; i++) {
        var item = this.items[i];

        if (item > max) {
          max = item;
        }
      } // 初始化桶


      var bucketCount = max + 1;
      var buckets = new Array(bucketCount); // 开始计数

      for (var _i5 = 0; _i5 < len; _i5++) {
        var _item2 = this.items[_i5];

        if (!buckets[_item2]) {
          buckets[_item2] = 0;
        }

        buckets[_item2]++;
      } // 反向填充


      for (var _i6 = 0; _i6 < bucketCount; _i6++) {
        while (buckets[_i6] > 0) {
          var current = asc ? index++ : index--;
          this.items[current] = _i6;
          buckets[_i6]--;
        }
      }

      return this.items;
    } // 基数排序

  }, {
    key: "radixSort",
    value: function radixSort() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'asc';
      var len = this.items.length;
      if (len <= 1) return this.items;
      var max = this.items[0],
          digit = 0; // 寻找最大值

      for (var i = 0; i < len; i++) {
        var item = this.items[i];

        if (item > max) {
          max = item;
        }
      } // 获取最大值的位数


      digit = max.toString().length;
      var buckets = [],
          div = 1,
          mod = 10;

      for (var _i7 = 0; _i7 < digit; _i7++, div *= 10, mod *= 10) {
        // 初始化桶
        for (var j = 0; j < len; j++) {
          var _item3 = this.items[j];
          var index = parseInt(_item3 % mod / div);

          if (buckets[index] == null) {
            buckets[index] = [];
          }

          buckets[index].push(_item3);
        }

        if (direction.toLowerCase() === 'asc') {
          for (var _j = 0, pos = 0; _j < buckets.length; _j++) {
            var _item4 = buckets[_j];
            if (_item4 == null) continue;
            var val = void 0;

            while (!!(val = _item4.shift())) {
              this.items[pos++] = val;
            }
          }
        } else {
          for (var _j2 = 0, _pos = len - 1; _j2 < buckets.length; _j2++) {
            var _item5 = buckets[_j2];
            if (_item5 == null) continue;

            var _val = void 0;

            while (!!(_val = _item5.pop())) {
              this.items[_pos--] = _val;
            }
          }
        }
      }

      return this.items;
    }
  }]);

  return Sorter;
}();

exports["default"] = Sorter;