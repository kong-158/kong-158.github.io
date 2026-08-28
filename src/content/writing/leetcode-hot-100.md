---
title: "LeetCode 刷题笔记"
summary: "持续记录 LeetCode Hot 100 和其他算法题里值得记下来的思路、踩坑和优化。"
publishedAt: 2026-08-28
updatedAt: 2026-08-28
topic: cs-ai
kind: note
tags: ["LeetCode", "Hot 100", "算法", "Python"]
draft: false
visibility: public
recommended: false
---

这篇文章用来持续记录刷 LeetCode Hot 100 和其他算法题时的一些笔记。不会把每道题都写成完整题解，主要记录自己最开始怎么想、哪里卡住，以及最后从标答里学到了什么。

## 普通数组

### 53. 最大子数组和

最开始看到“连续子数组”，第一反应是滑动窗口。但这道题里存在负数，窗口并没有一个很自然的扩张和收缩条件，所以普通滑动窗口并不好处理。

后来换成从左到右考虑每一个位置。假设已经知道了**以上一个位置结尾的最大子数组和** `f`，那么到当前位置 `nums[i]` 时其实只有两种情况：

- 如果 `f > 0`，前面的部分对当前元素有正贡献，那么应该接着之前的子数组：

```text
f = f + nums[i]
```

- 如果 `f <= 0`，前面的部分只会拖累当前结果，还不如直接从当前位置重新开始：

```text
f = nums[i]
```

因此可以写成：

```python
f = max(f, 0) + nums[i]
```

如果按照最直接的 DP 思路，可以维护一个数组：

```text
f[i] = max(f[i - 1], 0) + nums[i]
```

但继续看会发现，计算 `f[i]` 时只需要 `f[i - 1]`，更早的状态已经没有用了。因此并不需要维护整个数组，只需要保存上一个状态 `f`，再用 `max_f` 记录目前为止出现过的最大值。

最终代码：

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        f = nums[0]
        max_f = f

        for i in range(1, len(nums)):
            f = max(f, 0) + nums[i]
            max_f = max(max_f, f)

        return max_f
```

这题比较值得记的是：**如果当前状态只依赖上一个状态，就不一定需要真的维护整个 DP 数组，可以直接用变量把空间压下来。**

---

### 189. 轮转数组

最开始的想法比较直接：维护一个长度为 `k` 或 `n-k` 的额外数组，暂时保存较短的那一部分，再完成剩余元素的移动。

这样时间复杂度可以做到 `O(n)`，但空间复杂度仍然是 `O(min(k, n-k))`。题目进一步要求空间复杂度为 `O(1)`，所以需要想办法直接在原数组上完成操作。

这时我最初想到的是，只维护一个临时变量，不断把当前元素放到它最终应该出现的位置。一个元素原本在 `i`，向右移动 `k` 位以后应该出现在：

```text
(i + k) % n
```

理论上可以沿着目标位置不断交换，但这样会碰到循环置换的问题：有些 `n` 和 `k` 的组合并不能通过一个循环遍历整个数组，还需要继续处理其他环，写起来会比较麻烦。

我当时也在想，**有没有什么办法可以不一个一个移动，而是直接成批地完成这种位置变化**，但自己没有找到合适的操作。标答给出的办法是 `reverse`：把轮转拆成三次区间反转。

例如：

```text
nums = [1,2,3,4,5,6,7]
k = 3
```

目标是：

```text
[5,6,7,1,2,3,4]
```

先整体反转：

```text
[7,6,5,4,3,2,1]
```

再反转前 `k` 个：

```text
[5,6,7,4,3,2,1]
```

最后反转剩余部分：

```text
[5,6,7,1,2,3,4]
```

只需要写一个原地反转函数：

```python
def reverse(left, right):
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1
```

然后：

```python
n = len(nums)
k %= n

reverse(0, n - 1)
reverse(0, k - 1)
reverse(k, n - 1)
```

最终时间复杂度为 `O(n)`，空间复杂度为 `O(1)`。

这题比较值得记的是：**当逐个移动元素很麻烦时，可以尝试找一种能够“成批改变位置”的操作。这里的 `reverse` 就把原本复杂的元素搬运，转化成了三次区间反转。**

---

### 41. 缺失的第一个正数

这题一开始基本没有什么特别好的思路。最容易想到的方法就是开一个哈希表，把数组中出现过的正整数全部记录下来，然后从 `1` 开始依次检查哪个数没有出现。

这个方法的时间复杂度可以做到 `O(n)`，但需要 `O(n)` 的额外空间，不符合题目要求的常数级额外空间。

想了大概十分钟以后还是没找到合适的做法，看了一下提示，关键的一步是：**既然不能额外开一个哈希表，那就直接把原数组本身当作哈希表来用。**

对于长度为 `n` 的数组，答案一定只可能出现在 `1` 到 `n + 1` 之间。因此数组里真正需要关心的值只有：

```text
1 <= x <= n
```

可以直接规定：

```text
数字 1 应该放在 nums[0]
数字 2 应该放在 nums[1]
...
数字 x 应该放在 nums[x - 1]
```

也就是说，数组的下标本身就可以充当哈希表的 bucket。

遍历数组时，取出当前位置的值 `tmp`。只要 `tmp` 仍然在 `[1, n]` 范围内，并且它应该去的位置上还不是它自己，就把它放到 `nums[tmp - 1]`，同时继续处理原来占据那个位置的值：

```python
while 1 <= tmp <= n and nums[tmp - 1] != tmp:
    nums[tmp - 1], tmp = tmp, nums[tmp - 1]
```

这样不断处理以后，所有能够放回正确位置的正整数都会满足：

```text
nums[i] == i + 1
```

最后再从头扫描一次，第一个不满足这个关系的位置 `i`，对应的 `i + 1` 就是缺失的第一个正数。如果前 `n` 个位置全部正确，那么答案就是 `n + 1`。

最终代码：

```python
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        n = len(nums)

        for i in range(n):
            tmp = nums[i]
            while 1 <= tmp <= n and nums[tmp - 1] != tmp:
                nums[tmp - 1], tmp = tmp, nums[tmp - 1]

        for i in range(n):
            if nums[i] != i + 1:
                return i + 1

        return n + 1
```

虽然代码里有一层 `while`，但每一次真正执行交换都会把至少一个合法数字放到它最终应该待的位置，而一个位置不会被反复“正确放置”，所以总操作次数仍然是 `O(n)`。

这题比较值得记的是：**题目要求 `O(n)` 时间和 `O(1)` 额外空间时，如果原本很自然地想开一个哈希表，可以考虑能不能直接利用输入数组的下标，把原数组改造成哈希表。**

---

### 238. 除了自身以外数组的乘积

这题感觉实际难度没有到 Medium。题目已经明确说了不能使用除法，而且提示里直接提到了前缀和后缀，因此思路比较直接：对于每个位置 `i`，答案就是它左边所有元素的乘积乘上右边所有元素的乘积。

也就是：

```text
answer[i] = left[i] * right[i]
```

其中 `left[i]` 表示 `i` 左侧所有元素的乘积，`right[i]` 表示 `i` 右侧所有元素的乘积。

因此只需要双向各扫一遍：从左往右维护前缀乘积，从右往左维护后缀乘积。

```python
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        left = [1] * len(nums)
        right = [1] * len(nums)

        for i in range(1, len(nums)):
            left[i] = left[i - 1] * nums[i - 1]

        for i in range(len(nums) - 2, -1, -1):
            right[i] = right[i + 1] * nums[i + 1]

        res = []
        for i in range(len(nums)):
            res.append(left[i] * right[i])

        return res
```

时间复杂度是 `O(n)`，这版写法额外使用了两个长度为 `n` 的数组，因此空间复杂度是 `O(n)`。

如果继续压空间，其实 `right` 数组也没有必要完整保存。可以先把前缀乘积直接写进答案数组，再从右向左只维护一个不断累乘的后缀变量，这样就能把额外空间压到 `O(1)`（不计算返回数组）。

这题比较值得记的是：**当某个位置的答案可以自然拆成“左边的贡献 × 右边的贡献”时，前缀 / 后缀往往就是最直接的处理方式。**

---

### 56. 合并区间

这题思路比较直接。先按照每个区间的 `start` 从小到大排序，这样后面的区间只需要和当前已经合并好的最后一个区间进行比较。

判断逻辑就是看当前区间的 `start` 是否小于等于上一个区间的 `end`：

- 如果 `interval[0] <= merged[-1][1]`，说明两个区间有重叠，直接合并，并把右端点更新为两者的最大值；
- 否则说明已经完全分开，直接 `append` 当前区间即可。

代码：

```python
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key=lambda x: x[0])
        merged = []
        merged.append(intervals[0])

        for interval in intervals:
            if merged[-1][1] >= interval[0]:
                merged[-1][1] = max(merged[-1][1], interval[1])
            else:
                merged.append(interval)

        return merged
```

排序需要 `O(n log n)`，排序之后的扫描是 `O(n)`。

这题主要就是：**先排序把区间的相对关系固定下来，再逐个判断当前区间能不能并入上一个区间。**
