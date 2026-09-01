---
title: "LeetCode 刷题笔记"
summary: "持续记录 LeetCode Hot 100 和其他算法题里值得记下来的思路、踩坑和优化。"
publishedAt: 2026-08-28
updatedAt: 2026-09-01
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

## 哈希

这三个题本身没有太多复杂的算法构造，对我来说更像是在熟悉 Python 里 `dict / set` 这一套语法。这里不分别写完整题解，直接把对应的语法和用法记下来。

### 1. 两数之和：`dict + enumerate`

最核心的是用字典保存：

```text
数字 -> 它出现的下标
```

```python
seen = {}

for i, num in enumerate(nums):
    need = target - num

    if need in seen:
        return [seen[need], i]

    seen[num] = i
```

这里需要记的语法：

```python
d = {}                  # 创建字典
d[key] = value          # 存 key -> value
key in d                # 判断 key 是否存在
d[key]                  # 取出对应 value

a, x = 0, nums[0]
for i, x in enumerate(nums):
    ...                  # 同时拿到下标 i 和元素 x
```

`enumerate(nums)` 可以直接理解成把原来的：

```text
10, 20, 30
```

变成：

```text
(0, 10), (1, 20), (2, 30)
```

---

### 49. 字母异位词分组：`defaultdict + sorted + join`

这题需要把“排序后相同”的字符串放到同一组里。比较方便的写法是：

```python
from collections import defaultdict

groups = defaultdict(list)

for s in strs:
    key = ''.join(sorted(s))
    groups[key].append(s)

return list(groups.values())
```

这里主要是几套语法：

```python
from collections import defaultdict

d = defaultdict(list)
```

和普通 `dict` 不同，`defaultdict(list)` 在第一次访问一个不存在的 `key` 时，会自动给它创建一个空列表，所以可以直接：

```python
d[key].append(x)
```

不需要提前写：

```python
if key not in d:
    d[key] = []
```

另外：

```python
sorted("eat")
# ['a', 'e', 't']
```

`sorted()` 返回的是列表，因此要重新拼成字符串：

```python
''.join(['a', 'e', 't'])
# 'aet'
```

最后：

```python
d.values()              # 取出字典中的所有 value
list(d.values())        # 转成列表
```

---

### 128. 最长连续序列：`set + in / not in`

这题主要就是集合的使用：

```python
nums_set = set(nums)
```

`set` 会自动去重，而且：

```python
x in nums_set
x not in nums_set
```

平均都可以做到 `O(1)` 查询。

代码里比较关键的一句是：

```python
if num - 1 not in nums_set:
```

它是在判断 `num` 是不是一段连续序列的起点。只有没有前驱的数才开始向后找：

```python
for num in nums_set:
    if num - 1 not in nums_set:
        current = num

        while current + 1 in nums_set:
            current += 1
```

所以这三个题我主要记下面这些就够了：

```text
dict：       d[key] = value / key in d / d[key]
enumerate：  同时拿下标和元素
defaultdict：给不存在的 key 自动创建默认 value
sorted：     排序后返回 list
''.join：    把字符列表重新拼成字符串
d.values()： 取所有 value
set：        去重 + O(1) 平均查询
in / not in：判断元素是否存在
```

## 双指针

### 11. 盛最多水的容器

这题是一个很经典的**双指针 + 贪心**。

容器的面积是：

```text
area = min(height[left], height[right]) * (right - left)
```

这里有一个很直接的“木桶效应”：无论较高的板有多高，真正决定水位的永远是两边里面较矮的那一块。

因此可以从数组两端开始放两个指针。随着指针不断向中间移动，宽度 `right - left` 一定会变小。既然宽度一定在损失，那么想让后面的面积还有可能变大，就必须尝试让限制水位的那块较矮木板变高。

所以每一步只移动较矮的一边：

- `height[left] < height[right]`，移动 `left`；
- 否则移动 `right`。

这个贪心为什么是安全的也比较直观。假设当前左边更矮，如果不动左边而只把右边往里移，那么宽度变小，同时新的高度上限仍然不会超过当前的 `height[left]`，面积不可能比当前这一对更大。因此当前较矮的左板已经可以直接排除；只有把它换掉，才有可能找到更高的短板来弥补宽度的下降。

代码：

```python
class Solution:
    def maxArea(self, height: List[int]) -> int:
        n = len(height)
        left, right = 0, n - 1
        max_area = 0

        while left < right:
            area = min(height[left], height[right]) * (right - left)
            max_area = max(max_area, area)

            if height[left] < height[right]:
                left += 1
            else:
                right -= 1

        return max_area
```

时间复杂度是 `O(n)`，额外空间是 `O(1)`。

这题最值得记的就是：**宽度随着双指针收缩必然越来越小，因此下一步想产生更优解，只能去替换当前限制面积的较短板。** 这也是为什么每次移动较矮的一边，而不是随便移动一边。

---

### 42. 接雨水

我最开始的想法是先找到一个全局最高峰，把整个问题拆成最高峰左边和右边两部分。

因为最高峰本身一定足够高，所以在最高峰左侧，从左往右扫描时，每个位置能接多少水只取决于左侧目前见过的最高柱子；同理，在最高峰右侧，从右往左扫描时，每个位置只取决于右侧目前见过的最高柱子。

也就是：

```text
最高峰左侧：water[i] = left_max - height[i]
最高峰右侧：water[i] = right_max - height[i]
```

如果当前柱子刷新了这一侧的最高值，就更新 `left_max / right_max`；否则就把高度差加入答案。

这其实已经是 `O(n)` 时间、`O(1)` 额外空间，从复杂度上并不差。只是标准的双指针写法可以把“先找最高峰，再左右各扫一次”进一步合并成一次从两端向中间的扫描。

双指针的核心和前面的「盛最多水的容器」非常像：**还是优先处理低的那一边。** 但这里更准确地说，比较的不是当前 `height[left]` 和 `height[right]`，而是两边到目前为止见过的最高墙：

```text
left_max
right_max
```

对于任意一个位置，真正决定水位的是：

```text
water[i] = min(左侧最高, 右侧最高) - height[i]
```

假设现在：

```text
left_max <= right_max
```

那么左边这个位置已经可以直接结算。因为右侧已经确定存在一堵高度至少为 `right_max` 的墙，而它又不低于 `left_max`，所以无论中间以后还会出现什么，左边这个位置的水位都只会由 `left_max` 决定：

```text
min(left_max, 至少 right_max) = left_max
```

因此可以直接：

```python
ans += left_max - height[left]
left += 1
```

反过来，如果 `right_max < left_max`，就先结算右边并移动 `right`。

代码：

```python
class Solution:
    def trap(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1
        left_max = 0
        right_max = 0
        ans = 0

        while left <= right:
            left_max = max(left_max, height[left])
            right_max = max(right_max, height[right])

            if left_max <= right_max:
                ans += left_max - height[left]
                left += 1
            else:
                ans += right_max - height[right]
                right -= 1

        return ans
```

时间复杂度是 `O(n)`，额外空间是 `O(1)`。

这题和「盛最多水的容器」可以放在一起记：**都是从两边往中间走，并优先处理受限制更严重的低侧。** 盛最多水比较的是当前两根柱子的高度；接雨水更准确地比较的是 `left_max` 和 `right_max`。我的“先找最高峰”其实也是同一个逻辑，只是先人为找出一堵肯定足够高的墙；双指针则是在扫描过程中动态判断哪一边已经可以放心结算。

---

### 15. 三数之和

这题第一步还是先排序。排序以后，`left` 和 `right` 才能根据三数之和的大小有方向地移动，而不是对所有组合做暴力枚举。

因为是“三数之和”，除了 `left` 和 `right` 之外还需要固定第三个位置。直观上第三个指针可以放在双指针左边、双指针中间或者双指针右边；左边和右边本质上是对称的。实际写的时候把 `i` 固定在 `left` 左边最自然：固定 `nums[i]` 以后，剩下待搜索的部分正好是一个连续区间 `[i+1, n-1]`，可以直接让 `left` 和 `right` 从两端向中间移动。如果把固定点放在中间，左右两个搜索区间被拆开，移动逻辑会麻烦很多。

因此整体结构就是：随着 `i` 从左到右遍历，每次令：

```text
left = i + 1
right = n - 1
```

然后不断计算：

```text
total = nums[i] + nums[left] + nums[right]
```

- `total < 0`，说明和太小，需要让它变大，所以 `left += 1`；
- `total > 0`，说明和太大，需要让它变小，所以 `right -= 1`；
- `total == 0`，找到一组三元组，加入答案。

这题真正容易漏的是**去重和找到答案以后继续移动指针**。

首先，代码里始终有 `i < left < right`，因此三个下标天然是两两不同的；真正需要额外处理的是题目要求**不能返回重复的三元组**。对于固定指针 `i`，如果当前 `nums[i]` 和上一个一样，那么这一轮能找到的组合和上一轮是重复的，所以直接跳过：

```python
if i > 0 and nums[i] == nums[i - 1]:
    continue
```

其次，当 `total == 0` 时不能只 `append` 就停在那里。我第一遍这里甚至忘了移动 `left` 和 `right`，这样下一轮还是同一组三个位置。正确做法是先让两边都向内移动，再继续跳过和刚才相同的值，避免同一个三元组被加入多次：

```python
left += 1
right -= 1

while left < right and nums[left] == nums[left - 1]:
    left += 1
while left < right and nums[right] == nums[right + 1]:
    right -= 1
```

代码：

```python
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        n = len(nums)

        for i in range(n):
            if i > 0 and nums[i] == nums[i - 1]:
                continue

            left, right = i + 1, n - 1

            while left < right:
                total = nums[i] + nums[left] + nums[right]

                if total < 0:
                    left += 1
                elif total > 0:
                    right -= 1
                else:
                    res.append([nums[i], nums[left], nums[right]])
                    left += 1
                    right -= 1

                    while left < right and nums[left] == nums[left - 1]:
                        left += 1
                    while left < right and nums[right] == nums[right + 1]:
                        right -= 1

        return res
```

排序需要 `O(n log n)`，之后固定一次 `i` 再做一次双指针，总时间复杂度是 `O(n^2)`；除返回结果外额外空间可以看作 `O(1)`。

这题比较值得记的是：**排序以后，可以把三数问题降成“固定一个数 + 剩下两个数用双指针”。真正容易出错的地方不是主体搜索，而是去重：`i` 要跳过重复值，找到一组答案后 `left/right` 也必须先移动，再跳过重复值。**

## 滑动窗口

### 3. 无重复字符的最长子串

这题就是比较标准的滑动窗口。用一个集合 `char_set` 保存当前窗口里已经出现的字符，然后从左到右不断把新字符加入窗口。

如果当前字符 `s[i]` 已经在集合里，说明窗口里出现了重复字符，这时就需要不断从左边删除字符，直到 `s[i]` 不再重复，然后再把它加入窗口。

这里边界处理要特别注意：**必须用 `while`，不能只写一个 `if`。** 因为当前字符可能和窗口中比较靠右的位置重复，只删掉最左边一个字符以后，重复字符仍然可能还在窗口里，需要继续缩小窗口。

代码：

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_set = set()
        ans = 0
        length = 0

        for i in range(len(s)):
            while s[i] in char_set:
                char_set.remove(s[i - length])
                length -= 1

            char_set.add(s[i])
            length = len(char_set)
            ans = max(ans, length)

        return ans
```

时间复杂度是 `O(n)`：虽然里面有一个 `while`，但每个字符最多被加入集合一次、移出集合一次。

这题主要就是：**右边界负责扩张窗口，一旦出现重复，就持续移动左边界，直到窗口重新满足“无重复字符”的条件。**

## 矩阵

### 73. 矩阵置零

这题最开始的思路比较自然：分别开两个数组，记录哪些行和哪些列出现过 `0`。

例如用：

```text
row_zero[i] = 第 i 行是否出现 0
col_zero[j] = 第 j 列是否出现 0
```

先完整扫描一次矩阵，把需要置零的行和列记录下来，再扫描一次，把对应位置改成 `0`。时间复杂度是 `O(mn)`，但是需要额外的 `O(m+n)` 空间。

题目进一步提示可以做到常数级额外空间以后，关键就是：**其实没有必要另外开两个数组，矩阵自己的第一行和第一列就可以拿来当标记数组。**

如果 `matrix[i][j] == 0`，就把：

```python
matrix[i][0] = 0
matrix[0][j] = 0
```

这样第一列记录“这一行之后要不要全部置零”，第一行记录“这一列之后要不要全部置零”。等标记全部做完，再根据第一行和第一列去处理内部的元素。

但这里会多出一个比较关键的边界问题：**`matrix[0][0]` 同时属于第一行和第一列，它不可能同时保存“第一行原本有没有 0”和“第一列原本有没有 0”这两个独立的信息。**

所以在拿第一行、第一列当标记之前，需要先额外用两个变量保存：

```text
first_row_zero = 第一行原本是否存在 0
first_col_zero = 第一列原本是否存在 0
```

之后的处理顺序也比较重要：先记住第一行、第一列原本是否含 `0`；再遍历矩阵，用第一行和第一列做标记；然后根据这些标记只处理内部区域；最后再根据两个变量单独处理第一行和第一列。

代码：

```python
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        m = len(matrix)
        n = len(matrix[0])

        first_row_zero = False
        first_col_zero = False

        for j in range(n):
            if matrix[0][j] == 0:
                first_row_zero = True
                break

        for i in range(m):
            if matrix[i][0] == 0:
                first_col_zero = True
                break

        for i in range(m):
            for j in range(n):
                if matrix[i][j] == 0:
                    matrix[i][0] = 0
                    matrix[0][j] = 0

        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][0] == 0 or matrix[0][j] == 0:
                    matrix[i][j] = 0

        if first_col_zero:
            for i in range(m):
                matrix[i][0] = 0

        if first_row_zero:
            for j in range(n):
                matrix[0][j] = 0
```

时间复杂度仍然是 `O(mn)`，但额外空间从最开始的 `O(m+n)` 压到了 `O(1)`。

这题比较值得记的是：**为了把额外标记数组压掉，可以直接借用输入矩阵本身存标记；真正麻烦的地方是第一行和第一列共用 `matrix[0][0]`，所以原始状态必须单独保存。**

---

### 54. 螺旋矩阵

这题基本没什么特别的算法思路，主要就是一个比较麻烦的边界条件题。

维护四个边界：

```text
top, bottom, left, right
```

每一圈按照“上 → 右 → 下 → 左”的顺序遍历，走完一条边以后就把对应边界向里面缩一格。

```python
class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        top = 0
        bottom = len(matrix) - 1
        left = 0
        right = len(matrix[0]) - 1
        ans = []

        while top <= bottom and left <= right:
            for j in range(left, right + 1):
                ans.append(matrix[top][j])
            top += 1

            for i in range(top, bottom + 1):
                ans.append(matrix[i][right])
            right -= 1

            if top <= bottom:
                for j in range(right, left - 1, -1):
                    ans.append(matrix[bottom][j])
                bottom -= 1

            if left <= right:
                for i in range(bottom, top - 1, -1):
                    ans.append(matrix[i][left])
                left += 1

        return ans
```

真正需要注意的只有后面两个判断。当矩阵不断缩小以后，剩余部分可能只有一行或者一列，如果不检查 `top <= bottom` 和 `left <= right`，就会把同一行或同一列重复加入答案。

所以这题对我来说基本没有什么额外的算法营养，主要就是练一下四个边界的维护，以及在矩阵退化成单行 / 单列时别重复处理。

---

### 48. 旋转图像

这题的构造比较有意思。顺时针旋转 90° 不需要真的去逐个计算每个元素最后应该搬到哪里，可以拆成两个很简单的原地操作：**先转置，再把每一行反转。**

例如：

```text
1 2 3        1 4 7        7 4 1
4 5 6   ->   2 5 8   ->   8 5 2
7 8 9        3 6 9        9 6 3
             转置          每行反转
```

转置时，只需要交换主对角线两侧的元素：

```python
for i in range(n):
    for j in range(i + 1, n):
        matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
```

然后把每一行原地反转：

```python
for row in matrix:
    row.reverse()
```

完整代码：

```python
class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        n = len(matrix)

        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

        for row in matrix:
            row.reverse()
```

这样时间复杂度是 `O(n^2)`，额外空间是 `O(1)`。

这题比较值得记的是，这类矩阵旋转可以拆成**转置 + 反转**这样的基本变换，而不用一个元素一个元素地追踪位置。顺时针 90° 是“转置 + 每行反转”；同理，**逆时针 90° 可以写成“转置 + 每列反转”**。

---

### 240. 搜索二维矩阵 II

这题最开始我的想法其实比较接近 DFS：根据当前位置和 `target` 的大小关系，继续往可能的方向搜索，再配一个 `visited` 防止重复访问。这个思路理论上可以做，但写起来明显有点重，而且没有真正利用这个矩阵“每行递增、每列递增”的特殊结构。

后面发现这题最关键的构造是**从右上角或者左下角开始**。以右上角为例，当前位置 `matrix[i][j]` 同时处在“这一行最大的方向”和“这一列最小的方向”，所以和 `target` 比较以后，下一步其实是唯一的：

- 如果 `matrix[i][j] == target`，直接找到；
- 如果 `matrix[i][j] < target`，当前这一行左边的数只会更小，因此这一整行都可以排除，直接向下走 `i += 1`；
- 如果 `matrix[i][j] > target`，当前这一列下面的数只会更大，因此这一整列都可以排除，直接向左走 `j -= 1`。

于是每比较一次，都至少能直接排除一整行或者一整列，不需要 DFS，也不需要 `visited`。

代码：

```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        m = len(matrix)
        n = len(matrix[0])
        i = 0
        j = n - 1

        while 0 <= i < m and 0 <= j < n:
            if matrix[i][j] == target:
                return True
            elif matrix[i][j] < target:
                i += 1
            else:
                j -= 1

        return False
```

时间复杂度是 `O(m+n)`，额外空间是 `O(1)`。

这题我觉得比较有意思的地方是：**同样是利用单调性，如果从普通位置出发，大于或小于 `target` 时往往仍然存在多个可能方向；但选到右上角 / 左下角这种特殊起点以后，每次比较都只剩一个合理方向。** 关键不是搜索本身，而是先找到一个能让决策变成唯一的起点。