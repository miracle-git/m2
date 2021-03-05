## m2-sorter

[![](https://img.shields.io/badge/m2--sorter-v1.0.1-green.svg)](https://github.com/miracle-git/m2.git) <br/>
> M2前端排序算法(冒泡排序、选择排序、插入排序、希尔排序、快速排序、归并排序、堆排序、桶排序、计数排序、基数排序)。

### 用法
- 安装
```bash
npm install m2-sorter
```
### APIs
- **bubbleSort** 冒泡排序
- **selectionSort** 选择排序
- **insertionSort** 插入排序
- **shellSort** 希尔排序
- **quickSort** 快速排序
- **mergeSort** 归并排序
- **heapSort** 堆排序
- **bucketSort** 桶排序
- **countingSort** 计数排序
- **radixSort** 基数排序
```js
import Sorter from 'm2-sorter'
// 首先需要实例化一个排序对象(传入需要排序的数组)
const array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
const sorter = new Sorter(array)
// 调用对应的排序方法(默认是升序, 可以传入排序方式asc或desc)
console.log(sorter.bubbleSort())       // [2,3,4,5,15,19,26,27,36,38,44,46,47,48,50]
console.log(sorter.bubbleSort('desc')) // [50,48,47,46,44,38,36,27,26,19,15,5,4,3,2]
// 其他排序方法调用同上