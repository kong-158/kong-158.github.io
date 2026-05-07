---
title: "计量经济学总复习笔记：Wooldridge《计量经济学导论》"
date: 2026-05-07 +0800
categories: ["金融"]
description: "长期更新的计量经济学学习笔记，整理 Wooldridge《计量经济学导论》的核心模型、假设、公式和个人的一些思考。"
math: true
pin: true
---

<style>
.econ-note {
  margin: 2rem 0;
}

.econ-title {
  font-size: 1.65rem;
  font-weight: 800;
  margin: 1.8rem 0 1.2rem;
  padding-left: 0.9rem;
  border-left: 6px solid #2f6fdd;
  color: #1f2937;
}

.econ-card {
  margin: 1.2rem 0;
  padding: 1.2rem 1.3rem;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.06);
}

.econ-card-title {
  font-size: 1.08rem;
  font-weight: 750;
  color: #1e293b;
  margin-bottom: 0.8rem;
}

.econ-card p {
  line-height: 1.9;
  color: #334155;
  margin: 0.7rem 0;
}

.eq {
  margin: 0.9rem 0;
  padding: 0.9rem 1rem;
  text-align: center;
  font-family: "Times New Roman", "Cambria Math", serif;
  font-size: 1.25rem;
  line-height: 2;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  color: #020617;
  overflow-x: auto;
}

.eq-chain {
  margin: 0.9rem 0;
  padding: 0.9rem 1rem;
  font-family: "Times New Roman", "Cambria Math", serif;
  font-size: 1.2rem;
  line-height: 2.1;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  color: #020617;
  overflow-x: auto;
}

.eq-chain div {
  text-align: center;
}

.frac {
  display: inline-flex;
  flex-direction: column;
  vertical-align: middle;
  text-align: center;
  line-height: 1.25;
  margin: 0 0.3rem;
}

.frac .top {
  border-bottom: 1.6px solid #020617;
  padding: 0 0.45rem 0.25rem;
}

.frac .bottom {
  padding: 0.25rem 0.45rem 0;
}

.bar {
  text-decoration: overline;
  text-decoration-thickness: 1px;
}

.econ-note-box {
  margin-top: 0.9rem;
  padding: 0.85rem 1rem;
  background: #eff6ff;
  border-left: 4px solid #2f6fdd;
  border-radius: 10px;
  color: #334155;
  line-height: 1.85;
}

.econ-final {
  background: linear-gradient(135deg, #eff6ff, #f8fafc);
  border-color: #bfdbfe;
}
</style>

## 使用说明

这是一篇长期更新的计量经济学学习笔记。

每读完一章，我会添加对应内容。  
这篇笔记的目标不是完整复述教材，而是期末快速复习和记录学习。

---

## 第一章

### 数据类型：

#### 1.横截面数据

**定义：**

**给定时点**对个人、家庭、企业、城市、州、国家或一系列其他单位采集样本,即**不同个体**所构成的数据集。

这意味着我们会忽略一些细小差别，如在一年内的几个不同星期采集的样本。

**特征：**

我们假定其通过随机抽样得到。

however，这一假定有时并不恰当。

**eg**:

(1)样本选择：例如富裕家庭不愿意报告财富，样本可能不再随机。

(2)观测值不独立：例如相邻州之间经济活动可能互相影响。

#### 2.时间序列数据

**定义：**

对一个或几个变量**不同时间**的观测值所构成的。

**特征：**

数据搜集时的数据频率，常见的有每天、每周、每月、每季度、每年。

时间是时间序列数据中的重要维度。
和横截面数据不同，时间序列数据的排序不能随便打乱，因为先后顺序本身包含信息。

这也意味着我们并不是随机抽样，因为观测变量之间往往并不是相互独立的。

#### 3.混合横截面数据

**定义：**

兼具横截面数据和时间序列数据的特点。

**eg：**

将两次不同时间的横截面数据合并起来。

横截面数据追踪**不同个体**。

#### 4.面板/纵列数据

**定义：**

由数据集中每个**横截面**单位的一个时间序列组成。

**eg：**

对一群人的工资、受教育状况和就业跟踪十年的数据整合。

**特征：**

与混合横截面数据不同，**同一**横截面数据的数据单位都被跟踪了一段特定的时期。

## 第二章 简单回归模型

### 定义：

**（2.1）**

$$
y = \beta_0 + \beta_1 x + u
$$

| $y$ | $x$ |
|---|---|
| 因变量 | 自变量 |
| 被解释变量 | 解释变量 |
| 响应变量 | 控制变量 |
| 被预测变量 | 预测变量 |
| 回归子 | 回归元 |

| $\beta_0$ | $\beta_1$ | $u$ |
|---|---|---|
| 截距参数 | 斜率参数 | 误差项 / 干扰项 |

从公式（2.1）出发，我们可以得到，当u不变时，β₁能够度量x对y的影响，这就让我们可以得到:

**（2.2）**

$$
\Delta y = \beta_1 \Delta x+\Delta u=\beta_1 \Delta x+0=\beta_1 \Delta x
$$

这意味着，β₁ 可以表示 x 对 y 的影响。

但是，在现实数据中，我们很难要求每一个个体的误差项 uᵢ 都完全不随 x 变化。因为误差项 uᵢ 本来就包含了很多模型没有直接控制的因素，比如能力、家庭背景、学校质量、运气、地区差异等。这些因素在不同个体之间不可能完全一样，所以要求每一个 uᵢ 都不变，显然太强了。

因此，我们选择把这个要求放到统计平均意义下理解：我们不要求每一个个体的误差项都不变，而是要求在不同的 x 水平下，误差项 u 的平均值不变。

一个自然的想法是要求 u 与 x 不相关，即：

$$
\mathrm{Cov}(u,x)=0
$$

但这还不够。因为“不相关”通常只是排除了 u 和 x 之间的线性关系，并不排除非线性关系。比如，u 可能和 x² 有关。此时，即使 u 和 x 在线性意义下不相关，u 仍然可能随着 x 的变化而发生系统性的平均变化。

所以，我们需要一个更强的条件：

**（2.3）：**

$$
E(u \mid x)=E(u)
$$

这个条件的意思是：无论 x 取什么值，误差项 u 的平均值都保持不变。换句话说，不同 x 水平下的样本组，虽然每个个体的误差项可能不同，但这些误差项的平均值不应该随着 x 的变化而变化。

同时，由于β₀的存在，我们可以进一步把误差项的总体均值标准化为 0，即：

$$
E(u)=0
$$

那么上式就可以写成：

$$
E(u \mid x)=0
$$

这就是简单回归模型中的零条件均值假设。

之后，我们以 $x$ 为条件，对方程 $(2.1)$ 取期望，并利用：

**（2.4）**

$$
E(u \mid x)=0
$$

可以得到：

**（2.5）**

$$
E(y \mid x)=\beta_0+\beta_1x
$$

方程 $(2.5 )$ 表明，总体回归函数E(y | x) 是 $x$ 的一个线性函数。

这里的“线性”意味着：当 x 增加 1 个单位时，y 的期望值会改变 $\beta_1$ 个单位。

对于任意给定的 $x$ 值，y 的分布都以 $E(y \mid x)$ 为中心。

所以我们也可以将y看成两部分，即E(y | x) 代表的系统部分和u代表的非系统部分。

### 最小二乘估计量的推导

我们从简单线性回归模型出发：

$$
y_i=\beta_0+\beta_1x_i+u_i
$$

由假设可知：

$$
E(u)=0
$$

并且解释变量 $x$ 与误差项 $u$ 不相关：

$$
\mathrm{Cov}(x,u)=0
$$

根据协方差定义：

$$
\mathrm{Cov}(x,u)=E(xu)-E(x)E(u)
$$

由于 $E(u)=0$，所以：

$$
\mathrm{Cov}(x,u)=E(xu)
$$

又因为 $\mathrm{Cov}(x,u)=0$，所以：

$$
E(xu)=0
$$

因此总体中有两个条件：

**(2.6)**

$$
E(y-\beta_0-\beta_1x)=0
$$

**(2.7)**

$$
E[x(y-\beta_0-\beta_1x)]=0
$$

---

在样本中，用 $\hat{\beta}_0$ 和 $\hat{\beta}_1$ 估计 $\beta_0$ 和 $\beta_1$。

于是有：

**(2.8)**

$$
\frac{1}{n}\sum_{i=1}^{n}(y_i-\hat{\beta}_0-\hat{\beta}_1x_i)=0
$$

**(2.9)**

$$
\frac{1}{n}\sum_{i=1}^{n}x_i(y_i-\hat{\beta}_0-\hat{\beta}_1x_i)=0
$$

即：

$$
\sum_{i=1}^{n}(y_i-\hat{\beta}_0-\hat{\beta}_1x_i)=0
$$

$$
\sum_{i=1}^{n}x_i(y_i-\hat{\beta}_0-\hat{\beta}_1x_i)=0
$$

---

由第一个样本条件：

$$
\sum_{i=1}^{n}(y_i-\hat{\beta}_0-\hat{\beta}_1x_i)=0
$$

展开得到：

$$
\sum_{i=1}^{n}y_i-n\hat{\beta}_0-\hat{\beta}_1\sum_{i=1}^{n}x_i=0
$$

因为：

$$
\sum_{i=1}^{n}y_i=n\bar{y}
$$

$$
\sum_{i=1}^{n}x_i=n\bar{x}
$$

所以：

$$
n\bar{y}-n\hat{\beta}_0-\hat{\beta}_1n\bar{x}=0
$$

两边同时除以 $n$：

$$
\bar{y}-\hat{\beta}_0-\hat{\beta}_1\bar{x}=0
$$

因此：

**（2.10）**

$$
\hat{\beta}_0=\bar{y}-\hat{\beta}_1\bar{x}
$$

这说明最小二乘回归线一定经过**样本均值点**：

$$
(\bar{x},\bar{y})
$$

---

第二个样本条件为：

$$
\sum_{i=1}^{n}x_i(y_i-\hat{\beta}_0-\hat{\beta}_1x_i)=0
$$

将：

$$
\hat{\beta}_0=\bar{y}-\hat{\beta}_1\bar{x}
$$

代入，得到：

$$
\sum_{i=1}^{n}x_i[y_i-(\bar{y}-\hat{\beta}_1\bar{x})-\hat{\beta}_1x_i]=0
$$

括号内整理为：

$$
y_i-\bar{y}+\hat{\beta}_1\bar{x}-\hat{\beta}_1x_i
$$

也就是：

$$
(y_i-\bar{y})-\hat{\beta}_1(x_i-\bar{x})
$$

所以：

$$
\sum_{i=1}^{n}x_i[(y_i-\bar{y})-\hat{\beta}_1(x_i-\bar{x})]=0
$$

展开：

$$
\sum_{i=1}^{n}x_i(y_i-\bar{y})
-\hat{\beta}_1\sum_{i=1}^{n}x_i(x_i-\bar{x})=0
$$

移项得到：

$$
\sum_{i=1}^{n}x_i(y_i-\bar{y})
=
\hat{\beta}_1\sum_{i=1}^{n}x_i(x_i-\bar{x})
$$

所以：

**(2.11)**

$$
\hat{\beta}_1
=
\frac{\sum_{i=1}^{n}x_i(y_i-\bar{y})}
{\sum_{i=1}^{n}x_i(x_i-\bar{x})}
$$

---

先看分母：

$$
\sum_{i=1}^{n}x_i(x_i-\bar{x})
$$

因为：

$$
x_i=(x_i-\bar{x})+\bar{x}
$$

所以：

$$
\sum_{i=1}^{n}x_i(x_i-\bar{x})
=
\sum_{i=1}^{n}[(x_i-\bar{x})+\bar{x}](x_i-\bar{x})
$$

展开得到：

$$
\sum_{i=1}^{n}x_i(x_i-\bar{x})
=
\sum_{i=1}^{n}(x_i-\bar{x})^2
+
\bar{x}\sum_{i=1}^{n}(x_i-\bar{x})
$$

又因为：

$$
\sum_{i=1}^{n}(x_i-\bar{x})=0
$$

所以：

**(2.12)**

$$
\sum_{i=1}^{n}x_i(x_i-\bar{x})
=
\sum_{i=1}^{n}(x_i-\bar{x})^2
$$

---

同理：

**(2.13)**

$$
\sum_{i=1}^{n}x_i(y_i-\bar{y})
=
\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})
$$

---

因此：

**(2.14)**

$$
\hat{\beta}_1
=
\frac{\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})}
{\sum_{i=1}^{n}(x_i-\bar{x})^2}
$$

这就是简单线性回归中斜率系数的最小二乘估计量。

截距估计量为：

$$
\hat{\beta}_0=\bar{y}-\hat{\beta}_1\bar{x}
$$

另外，斜率也可以写成相关系数与标准差之比的形式：

**(2.15)**

$$
\hat{\beta}_1
=
r_{xy}\cdot\frac{s_y}{s_x}
$$

(2.14)和(2.10)给出了我们通过普通最小二乘法（OLS）得到的$\beta_0$和$\beta_1$的估计值$\hat{\beta}_0$和$\hat{\beta}_1$。

随后，我们根据估计值得到了y在x=$x_i$时的拟合值：

**（2.16）**

$$
\hat{y}_i=\hat{\beta}_0+\hat{\beta}_1x_i
$$

同时，我们给出残差$u_i$的定义：

**（2.17）**

$$
\hat{u}_i=y_i-\hat{y}_i=y_i-\hat{\beta}_0-\hat{\beta}_1x_i
$$

为了保证拟合效果的优度，我们定义残差平方和为：

**（2.18）**

$$
\mathrm{SSR}
=
\sum_{i=1}^{n}\hat{u}_i^2
=
\sum_{i=1}^{n}
(y_i-\hat{\beta}_0-\hat{\beta}_1x_i)^2
$$

事实上，OLS就是要选择残差平方和最小的OLS回归线（2.16）

### OLS对样本数据的性质

(1)$\hat{u}_i$往往不为零，这意味着所有数据点可能都不在OLS线上。

（2）OLS残差和和样本均值均为零，即：

$$
\sum_{i=1}^{n}\hat{u}_i
=0
$$

(3)回归元和OLS残差的协方差为零，即：

$$
\sum_{i=1}^{n}\hat{u}_ix_i
=0
$$

(4)点 $(\bar{x},\bar{y})$ 总在 OLS 回归线上。

**需注意，这里使用的残差$\hat{u}_i$而非误差项u**

#### 平方和分解：SST、SSE 与 SSR

为了衡量回归模型对 $y$ 的解释程度，我们定义三个平方和。

总平方和：

**（2.19）**

$$
\mathrm{SST}=\sum_{i=1}^{n}(y_i-\bar{y})^2
$$

它表示 $y_i$ 相对于样本均值 $\bar{y}$ 的总波动。

解释平方和：

**（2.20）**

$$
\mathrm{SSE}=\sum_{i=1}^{n}(\hat{y}_i-\bar{y})^2
$$

它表示回归模型解释掉的那部分波动。

残差平方和：

**（2.21）**

$$
\mathrm{SSR}=\sum_{i=1}^{n}\hat{u}_i^2
$$

它表示回归模型没有解释掉的那部分波动。

其中：

$$
\hat{u}_i=y_i-\hat{y}_i
$$

因此，$y_i$ 相对于均值的偏离可以分解为两部分：

$$
y_i-\bar{y}
=
(\hat{y}_i-\bar{y})+\hat{u}_i
$$

也就是说，实际值的总偏离可以看成：

$$
\text{总偏离}
=
\text{模型解释的偏离}
+
\text{残差}
$$

进一步可以得到平方和分解：

$$
\mathrm{SST}=\mathrm{SSE}+\mathrm{SSR}
$$

也就是：

$$
\sum_{i=1}^{n}(y_i-\bar{y})^2
=
\sum_{i=1}^{n}(\hat{y}_i-\bar{y})^2
+
\sum_{i=1}^{n}\hat{u}_i^2
$$

这个式子的含义是：

总波动 = 模型解释的波动 + 模型没有解释的波动。

因此，我们给出判定系数$R^2$的定义：

**（2.22）**

$$
R^2=\frac{\mathrm{SSE}}{\mathrm{SST}}
=
1-\frac{\mathrm{SSR}}{\mathrm{SST}}
$$

显然，$R^2$越接近1，模型效果越好。

### 度量单位和函数形式

这一节主要讨论两个问题：变量单位改变时，OLS 估计值如何变化；以及如何用对数形式处理非线性关系。:contentReference[oaicite:0]{index=0}

#### 1. 改变度量单位

变量单位变化只会改变系数的数值单位，不改变经济含义；$y$ 的单位放大时，截距和斜率同比例缩小，$x$ 的单位放大时，斜率同比例放大，而 $R^2$ 不变。

---

#### 2. 常见函数形式

| 模型形式 | 方程 | $\beta_1$ 的解释 |
|---|---|---|
| 水平值-水平值 | $y=\beta_0+\beta_1x+u$ | $x$ 增加 1 单位，$y$ 改变 $\beta_1$ 单位 |
| 对数-水平值 | $\log(y)=\beta_0+\beta_1x+u$ | $x$ 增加 1 单位，$y$ 约改变 $100\beta_1\%$ |
| 水平值-对数 | $y=\beta_0+\beta_1\log(x)+u$ | $x$ 增加 1%，$y$ 约改变 $\beta_1/100$ 单位 |
| 对数-对数 | $\log(y)=\beta_0+\beta_1\log(x)+u$ | $x$ 增加 1%，$y$ 约改变 $\beta_1\%$ |

---

#### 3. 对数模型的例子

如果：

$$
\log(wage)=0.584+0.083educ
$$

那么教育年限每增加 1 年，工资大约提高：

$$
100\times0.083=8.3\%
$$

如果：

$$
\log(salary)=4.822+0.257\log(sales)
$$

那么销售额增加 $1\%$，CEO 薪水大约增加 $0.257\%$。

---

#### 4. “线性”回归的含义

简单线性回归中的“线性”，指的是参数线性，而不是变量本身一定线性。

例如：

$$
\log(wage)=\beta_0+\beta_1educ+u
$$

虽然 $wage$ 被取了对数，但参数 $\beta_0$ 和 $\beta_1$ 仍然是线性的，所以它仍然属于线性回归模型。

真正不属于线性回归的是参数非线性的模型，例如：

$$
y=\frac{1}{\beta_0+\beta_1x}+u
$$

**线性针对的是参数，要求参数必须为一次**

### OLS估计量的期望和方差

我们不再只把 $\hat{\beta}_0$ 和 $\hat{\beta}_1$ 看成由样本算出来的两个数，而是把它们看成总体参数 $\beta_0$ 和 $\beta_1$ 的估计量，并研究它们在重复抽样中的表现。

---

#### 1. OLS 无偏性的基本假定

为了说明 OLS 估计量什么时候是无偏的，需要引入四个基本假定。

##### SLR.1 线性于参数

总体模型为：

$$
y=\beta_0+\beta_1x+u
$$

其中，$\beta_0$ 是总体截距参数，$\beta_1$ 是总体斜率参数，$u$ 是误差项。

这里的“线性”指的是模型对**参数** $\beta_0$ 和 $\beta_1$ 是线性的，而不是要求变量本身一定以原始形式出现。

---

##### SLR.2 随机抽样

我们拥有来自总体的随机样本：

$$
\{(x_i,y_i):i=1,2,\dots,n\}
$$

对于每一个样本观测，都有：

$$
y_i=\beta_0+\beta_1x_i+u_i
$$

这里的 $u_i$ 是第 $i$ 个观测的真实误差项。

注意，$u_i$ 和残差 $\hat{u}_i$ 不一样。$u_i$ 是总体中的真实误差项，通常无法观测；$\hat{u}_i$ 是用样本估计结果计算出来的残差。

---

##### SLR.3 解释变量有样本波动

样本中的 $x_i$ 不能全部相等，即：

$$
\sum_{i=1}^{n}(x_i-\bar{x})^2>0
$$

显然，全都一样就没法求斜率了。

---

##### SLR.4 零条件均值

给定解释变量 $x$ 的任何值，误差项 $u$ 的期望值都为 0：

$$
E(u\mid x)=0
$$

这个假定是 OLS 无偏性的关键。

它的含义是：影响 $y$ 但没有放进模型的因素，不能和 $x$ 系统性相关。

如果 $u$ 中包含的遗漏因素与 $x$ 相关，那么 OLS 一般会有偏。

---

#### 2. OLS 斜率估计量的无偏性证明

OLS 斜率估计量可以写成：

$$
\hat{\beta}_1
=
\frac{
\sum_{i=1}^{n}(x_i-\bar{x})y_i
}{
\sum_{i=1}^{n}(x_i-\bar{x})^2
}
$$

令：

$$
d_i=x_i-\bar{x}
$$

以及：

$$
SST_x=\sum_{i=1}^{n}(x_i-\bar{x})^2
=
\sum_{i=1}^{n}d_i^2
$$

则：

$$
\hat{\beta}_1
=
\frac{
\sum_{i=1}^{n}d_i y_i
}{
SST_x
}
$$

将总体模型：

$$
y_i=\beta_0+\beta_1x_i+u_i
$$

代入上式：

$$
\hat{\beta}_1
=
\frac{
\sum_{i=1}^{n}d_i(\beta_0+\beta_1x_i+u_i)
}{
SST_x
}
$$

展开分子：

$$
\hat{\beta}_1
=
\frac{
\beta_0\sum_{i=1}^{n}d_i
+
\beta_1\sum_{i=1}^{n}d_ix_i
+
\sum_{i=1}^{n}d_iu_i
}{
SST_x
}
$$

因为：

$$
\sum_{i=1}^{n}d_i=0
$$

并且：

$$
\sum_{i=1}^{n}d_ix_i=SST_x
$$

所以：

$$
\hat{\beta}_1
=
\beta_1
+
\frac{1}{SST_x}
\sum_{i=1}^{n}d_iu_i
$$

因此：

$$
\hat{\beta}_1-\beta_1
=
\frac{1}{SST_x}
\sum_{i=1}^{n}d_iu_i
$$

这个式子说明，$\hat{\beta}_1$ 与真实参数 $\beta_1$ 的差异来自误差项 $u_i$。

---

#### 3. 为什么是在求条件期望？

证明无偏性时，我们先给定样本中的解释变量：

$$
x_1,x_2,\dots,x_n
$$

也就是先研究：

$$
E(\hat{\beta}_1\mid x_1,x_2,\dots,x_n)
$$

在给定这一组 $x_i$ 后，$\bar{x}$、$d_i$ 和 $SST_x$ 都变成了确定的常数。

所以：

$$
E(d_iu_i\mid x_1,\dots,x_n)
=
d_iE(u_i\mid x_1,\dots,x_n)
$$

这里真正被求期望的是误差项 $u_i$。

由零条件均值假定：

$$
E(u_i\mid x_i)=0
$$

在随机抽样条件下，可以推出：

$$
E(u_i\mid x_1,\dots,x_n)=0
$$

因此：

$$
E(d_iu_i\mid x_1,\dots,x_n)=0
$$

于是：

$$
E(\hat{\beta}_1\mid x_1,\dots,x_n)
=
\beta_1
$$

进一步得到：

$$
E(\hat{\beta}_1)=\beta_1
$$

所以，$\hat{\beta}_1$ 是 $\beta_1$ 的无偏估计量。

同理也可以证明：

$$
E(\hat{\beta}_0)=\beta_0
$$

因此，在 SLR.1 至 SLR.4 成立时，OLS 的截距和斜率估计量都是无偏的。

---

#### 4. 无偏性的含义

无偏性是估计量在重复抽样中的平均性质。

$$
E(\hat{\beta}_1)=\beta_1
$$

并不是说某一次样本算出来的 $\hat{\beta}_1$ 一定等于 $\beta_1$。

它的意思是：如果我们不断从总体中抽样，并且每次都计算 $\hat{\beta}_1$，那么这些估计值的平均数会等于真实参数 $\beta_1$。

因此，某一次具体样本的估计值仍然可能高于或低于真实值。

---

#### 5. 零条件均值为什么重要？

如果：

$$
E(u\mid x)=0
$$

成立，那么遗漏因素和解释变量 $x$ 没有系统性关系，OLS 可以无偏。

但如果：

$$
E(u\mid x)\neq 0
$$

那么 OLS 通常会有偏。

例如，用学校午餐项目参与率解释数学成绩：

$$
math10=\beta_0+\beta_1lunchprg+u
$$

如果贫困率、学校资源、家庭背景等因素被放进 $u$ 中，而这些因素又和 $lunchprg$ 相关，那么 $lunchprg$ 就会和误差项 $u$ 相关。

这时，简单回归估计出来的关系就可能只是相关关系，不能直接解释为因果关系。

---

#### 6. 同方差假定

为了研究 OLS 估计量的方差，需要进一步加入同方差假定。

##### SLR.5 同方差性

给定解释变量 $x$ 的任何值，误差项 $u$ 的方差都相同：

$$
\mathrm{Var}(u\mid x)=\sigma^2
$$

这表示误差项的波动大小不随着 $x$ 的变化而变化。

注意，零条件均值和同方差性不是一回事。

零条件均值：

$$
E(u\mid x)=0
$$

关心的是误差项的条件均值。

同方差性：

$$
\mathrm{Var}(u\mid x)=\sigma^2
$$

关心的是误差项的条件方差。

无偏性只需要 SLR.1 至 SLR.4；同方差性不是无偏性的必要条件。

---

#### 7. OLS 估计量的方差

在 SLR.1 至 SLR.5 成立时，可以推导出 OLS 估计量 $\hat{\beta}_1$ 和 $\hat{\beta}_0$ 的方差。

其中，SLR.5 是同方差假定：

$$
\mathrm{Var}(u\mid x)=\sigma^2
$$

这表示在给定任意 $x$ 的情况下，误差项 $u$ 的方差都相同。

---

##### 1. 斜率估计量 $\hat{\beta}_1$ 的方差

前面已经得到：

$$
\hat{\beta}_1
=
\beta_1
+
\frac{1}{SST_x}
\sum_{i=1}^{n}d_i u_i
$$

其中：

$$
d_i=x_i-\bar{x}
$$

并且：

$$
SST_x
=
\sum_{i=1}^{n}(x_i-\bar{x})^2
=
\sum_{i=1}^{n}d_i^2
$$

因为 $\beta_1$ 是总体参数，是常数，所以：

$$
\mathrm{Var}(\hat{\beta}_1)
=
\mathrm{Var}
\left(
\frac{1}{SST_x}
\sum_{i=1}^{n}d_i u_i
\right)
$$

在给定 $x_1,x_2,\dots,x_n$ 的条件下，$d_i$ 和 $SST_x$ 都是常数，因此：

$$
\mathrm{Var}(\hat{\beta}_1)
=
\frac{1}{SST_x^2}
\mathrm{Var}
\left(
\sum_{i=1}^{n}d_i u_i
\right)
$$

由于随机抽样下不同观测的误差项相互独立，有：

$$
\mathrm{Var}
\left(
\sum_{i=1}^{n}d_i u_i
\right)
=
\sum_{i=1}^{n}
\mathrm{Var}(d_i u_i)
$$

又因为 $d_i$ 是常数，所以：

$$
\mathrm{Var}(d_i u_i)
=
d_i^2\mathrm{Var}(u_i)
$$

根据同方差假定：

$$
\mathrm{Var}(u_i\mid x_i)=\sigma^2
$$

因此：

$$
\mathrm{Var}(d_i u_i)
=
d_i^2\sigma^2
$$

代回可得：

$$
\mathrm{Var}(\hat{\beta}_1)
=
\frac{1}{SST_x^2}
\sum_{i=1}^{n}d_i^2\sigma^2
$$

将 $\sigma^2$ 提出：

$$
\mathrm{Var}(\hat{\beta}_1)
=
\frac{\sigma^2}{SST_x^2}
\sum_{i=1}^{n}d_i^2
$$

又因为：

$$
\sum_{i=1}^{n}d_i^2=SST_x
$$

所以：

$$
\mathrm{Var}(\hat{\beta}_1)
=
\frac{\sigma^2}{SST_x^2}SST_x
$$

最终得到：

$$
\mathrm{Var}(\hat{\beta}_1)
=
\frac{\sigma^2}{SST_x}
$$

也就是：

$$
\mathrm{Var}(\hat{\beta}_1)
=
\frac{
\sigma^2
}{
\sum_{i=1}^{n}(x_i-\bar{x})^2
}
$$

这个公式说明，$\hat{\beta}_1$ 的方差与误差方差 $\sigma^2$ 正相关，与解释变量的样本波动 $SST_x$ 负相关。

---

##### 2. 截距估计量 $\hat{\beta}_0$ 的方差

OLS 截距估计量为：

$$
\hat{\beta}_0
=
\bar{y}-\hat{\beta}_1\bar{x}
$$

由总体模型：

$$
y_i=\beta_0+\beta_1x_i+u_i
$$

对样本取平均，得到：

$$
\bar{y}
=
\beta_0+\beta_1\bar{x}+\bar{u}
$$

将其代入 $\hat{\beta}_0=\bar{y}-\hat{\beta}_1\bar{x}$：

$$
\hat{\beta}_0
=
\beta_0+\beta_1\bar{x}+\bar{u}
-
\hat{\beta}_1\bar{x}
$$

整理得：

$$
\hat{\beta}_0
=
\beta_0+\bar{u}-(\hat{\beta}_1-\beta_1)\bar{x}
$$

因此：

$$
\hat{\beta}_0-\beta_0
=
\bar{u}-(\hat{\beta}_1-\beta_1)\bar{x}
$$

所以：

$$
\mathrm{Var}(\hat{\beta}_0)
=
\mathrm{Var}
\left[
\bar{u}-(\hat{\beta}_1-\beta_1)\bar{x}
\right]
$$

在给定 $x_1,x_2,\dots,x_n$ 的条件下，$\bar{x}$ 是常数，因此：

$$
\mathrm{Var}(\hat{\beta}_0)
=
\mathrm{Var}(\bar{u})
+
\bar{x}^2\mathrm{Var}(\hat{\beta}_1-\beta_1)
-
2\bar{x}\mathrm{Cov}(\bar{u},\hat{\beta}_1-\beta_1)
$$

首先：

$$
\bar{u}
=
\frac{1}{n}\sum_{i=1}^{n}u_i
$$

在同方差和随机抽样假定下：

$$
\mathrm{Var}(\bar{u})
=
\frac{\sigma^2}{n}
$$

又因为：

$$
\mathrm{Var}(\hat{\beta}_1-\beta_1)
=
\mathrm{Var}(\hat{\beta}_1)
=
\frac{\sigma^2}{SST_x}
$$

接下来计算协方差项。

由前面结论：

$$
\hat{\beta}_1-\beta_1
=
\frac{1}{SST_x}
\sum_{i=1}^{n}d_i u_i
$$

所以：

$$
\mathrm{Cov}(\bar{u},\hat{\beta}_1-\beta_1)
=
\mathrm{Cov}
\left(
\frac{1}{n}\sum_{i=1}^{n}u_i,
\frac{1}{SST_x}\sum_{i=1}^{n}d_i u_i
\right)
$$

由于不同观测的误差项相互独立，且 $\mathrm{Var}(u_i)=\sigma^2$，因此：

$$
\mathrm{Cov}(\bar{u},\hat{\beta}_1-\beta_1)
=
\frac{1}{nSST_x}
\sum_{i=1}^{n}d_i\sigma^2
$$

又因为：

$$
\sum_{i=1}^{n}d_i
=
\sum_{i=1}^{n}(x_i-\bar{x})
=
0
$$

所以：

$$
\mathrm{Cov}(\bar{u},\hat{\beta}_1-\beta_1)=0
$$

因此：

$$
\mathrm{Var}(\hat{\beta}_0)
=
\frac{\sigma^2}{n}
+
\bar{x}^2
\frac{\sigma^2}{SST_x}
$$

即：

$$
\mathrm{Var}(\hat{\beta}_0)
=
\sigma^2
\left(
\frac{1}{n}
+
\frac{\bar{x}^2}{SST_x}
\right)
$$

这就是截距估计量的方差公式。

---

##### 3. 截距方差的另一种写法

由于：

$$
SST_x
=
\sum_{i=1}^{n}(x_i-\bar{x})^2
=
\sum_{i=1}^{n}x_i^2-n\bar{x}^2
$$

所以：

$$
\sum_{i=1}^{n}x_i^2
=
SST_x+n\bar{x}^2
$$

因此：

$$
\sigma^2
\left(
\frac{1}{n}
+
\frac{\bar{x}^2}{SST_x}
\right)
=
\frac{
\sigma^2\sum_{i=1}^{n}x_i^2
}{
nSST_x
}
$$

所以截距方差也可以写成：

$$
\mathrm{Var}(\hat{\beta}_0)
=
\frac{
\sigma^2\sum_{i=1}^{n}x_i^2
}{
nSST_x
}
$$

---

##### 4. 小结

在 SLR.1 至 SLR.5 下：

$$
\mathrm{Var}(\hat{\beta}_1)
=
\frac{\sigma^2}{SST_x}
$$

$$
\mathrm{Var}(\hat{\beta}_0)
=
\sigma^2
\left(
\frac{1}{n}
+
\frac{\bar{x}^2}{SST_x}
\right)
$$

其中：

$$
SST_x=\sum_{i=1}^{n}(x_i-\bar{x})^2
$$

所以，$\hat{\beta}_1$ 的方差取决于误差方差 $\sigma^2$ 和解释变量的样本波动 $SST_x$。

#### 8. 误差项与残差的区别

总体模型中：

$$
y_i=\beta_0+\beta_1x_i+u_i
$$

这里的 $u_i$ 是真实误差项，通常无法观测。

OLS 估计方程中：

$$
y_i=\hat{\beta}_0+\hat{\beta}_1x_i+\hat{u}_i
$$

这里的 $\hat{u}_i$ 是残差，可以由样本数据计算：

$$
\hat{u}_i
=
y_i-\hat{\beta}_0-\hat{\beta}_1x_i
$$

二者的区别是：

| 符号 | 名称 | 含义 | 是否可观测 |
|---|---|---|---|
| $u_i$ | 误差项 | 总体真实误差 | 不可观测 |
| $\hat{u}_i$ | 残差 | 样本实际值与拟合值的差 | 可计算 |

残差可以看成误差项的样本替代品，但二者并不相同。

---

#### 9. 误差方差的估计

误差方差定义为：

$$
\sigma^2=\mathrm{Var}(u)
$$

由于真实误差项 $u_i$ 无法观测，所以不能直接用 $u_i^2$ 估计 $\sigma^2$。

我们用残差 $\hat{u}_i$ 代替误差项，定义残差平方和：

$$
SSR=\sum_{i=1}^{n}\hat{u}_i^2
$$

误差方差的无偏估计量为：

$$
\hat{\sigma}^2
=
\frac{SSR}{n-2}
=
\frac{
\sum_{i=1}^{n}\hat{u}_i^2
}{
n-2
}
$$

这里分母是 $n-2$，不是 $n$。

原因是简单回归中估计了两个参数 $\hat{\beta}_0$ 和 $\hat{\beta}_1$，因此残差只有 $n-2$ 个自由度。

---

#### 10. 回归标准误

误差标准差 $\sigma$ 的估计量为：

$$
\hat{\sigma}
=
\sqrt{
\frac{SSR}{n-2}
}
$$

它被称为回归标准误，也可以理解为模型中不可观测因素标准差的估计。

---

#### 11. 斜率估计量的标准误

由于：

$$
\mathrm{Var}(\hat{\beta}_1)
=
\frac{\sigma^2}{SST_x}
$$

而 $\sigma$ 通常未知，所以用 $\hat{\sigma}$ 代替 $\sigma$，得到斜率估计量的标准误：

$$
se(\hat{\beta}_1)
=
\frac{
\hat{\sigma}
}{
\sqrt{SST_x}
}
$$

也就是：

$$
se(\hat{\beta}_1)
=
\frac{
\hat{\sigma}
}{
\sqrt{
\sum_{i=1}^{n}(x_i-\bar{x})^2
}
}
$$

标准误越小，说明估计量越精确；标准误越大，说明估计量越不精确。

---
### 过原点回归及对常数回归

在普通简单回归中，我们通常估计：

$$
y=\beta_0+\beta_1x+u
$$

也就是同时估计截距和斜率。

但在少数情况下，我们可能希望强制要求：

$$
E(y\mid x=0)=0
$$

也就是说，当 $x=0$ 时，$y$ 的期望值也必须为 0。

例如，如果收入为 0，那么所得税也应该为 0。这类情形下，可以考虑使用过原点回归。

---

#### 1. 过原点回归

过原点回归不估计截距，而是直接设定截距为 0：

$$
\tilde{y}=\tilde{\beta}_1x
$$

这里用波浪号 $\tilde{\beta}_1$ 是为了和普通 OLS 中的 $\hat{\beta}_1$ 区分开。

由于这条回归线经过点 $(0,0)$，所以称为过原点回归。

---

#### 2. 过原点回归的估计量

过原点回归仍然使用最小二乘思想，最小化残差平方和：

$$
\sum_{i=1}^{n}(y_i-\tilde{\beta}_1x_i)^2
$$

对 $\tilde{\beta}_1$ 求一阶条件，可以得到：

$$
\sum_{i=1}^{n}x_i(y_i-\tilde{\beta}_1x_i)=0
$$

展开：

$$
\sum_{i=1}^{n}x_iy_i
-
\tilde{\beta}_1\sum_{i=1}^{n}x_i^2
=
0
$$

因此：

$$
\tilde{\beta}_1
=
\frac{
\sum_{i=1}^{n}x_iy_i
}{
\sum_{i=1}^{n}x_i^2
}
$$

只要并非所有 $x_i$ 都等于 0，这个估计量就可以计算。

---

#### 3. 与普通 OLS 斜率的区别

普通 OLS 斜率为：

$$
\hat{\beta}_1
=
\frac{
\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})
}{
\sum_{i=1}^{n}(x_i-\bar{x})^2
}
$$

而过原点回归斜率为：

$$
\tilde{\beta}_1
=
\frac{
\sum_{i=1}^{n}x_iy_i
}{
\sum_{i=1}^{n}x_i^2
}
$$

二者一般不相同。

只有在特殊情况下，例如 $\bar{x}=0$ 时，二者才可能相同。

因此，如果真实模型本来有非零截距，却强行使用过原点回归，那么斜率估计量通常会有偏。

---

#### 4. 过原点回归中的 $R^2$

过原点回归中，$R^2$ 的解释需要谨慎。

有些软件会使用如下形式：

$$
R^2
=
1-
\frac{
\sum_{i=1}^{n}(y_i-\tilde{\beta}_1x_i)^2
}{
\sum_{i=1}^{n}y_i^2
}
$$

这里分母使用的是 $\sum y_i^2$，而不是普通回归中的：

$$
\sum_{i=1}^{n}(y_i-\bar{y})^2
$$

这种做法相当于默认总体均值为 0。

但如果仍然使用普通定义：

$$
R^2
=
1-
\frac{
\sum_{i=1}^{n}(y_i-\tilde{\beta}_1x_i)^2
}{
\sum_{i=1}^{n}(y_i-\bar{y})^2
}
$$

那么 $R^2$ 甚至可能为负。

这表示：用过原点回归进行预测，可能还不如直接用样本均值 $\bar{y}$ 来预测。

---

#### 5. 对常数回归

另一种极端情况是只估计一个常数，也就是设定斜率为 0：

$$
y=\beta_0+u
$$

此时 OLS 估计出来的截距就是样本均值：

$$
\hat{\beta}_0=\bar{y}
$$

也就是说，如果完全不使用 $x$ 来解释 $y$，那么最好的常数预测值就是 $\bar{y}$。
