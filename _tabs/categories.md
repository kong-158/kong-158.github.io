---
layout: default
title: 分类
icon: fas fa-stream
order: 1
---

<style>
.category-page {
  max-width: 880px;
  margin: 0 auto;
  padding: 1rem 0 2rem;
}

.category-hero {
  margin-bottom: 1.5rem;
  padding: 1.6rem 1.5rem;
  border-radius: 24px;
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.16), transparent 36%),
    linear-gradient(135deg, #f8fbff 0%, #eef4ff 100%);
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.06);
}

.category-hero h1 {
  margin: 0 0 0.5rem;
  font-size: 1.8rem;
  font-weight: 850;
}

.category-hero p {
  margin: 0;
  color: #667085;
  line-height: 1.8;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.category-card {
  display: block;
  padding: 1.25rem 1.25rem;
  border-radius: 22px;
  background: var(--card-bg);
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.055);
  text-decoration: none;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.category-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 38px rgba(15, 23, 42, 0.09);
}

.category-card-top {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.75rem;
}

.category-icon {
  width: 46px;
  height: 46px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(37, 99, 235, 0.10);
  font-size: 1.45rem;
}

.category-card h2 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 820;
  color: var(--heading-color);
}

.category-card p {
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.75;
}

@media (max-width: 760px) {
  .category-grid {
    grid-template-columns: 1fr;
  }

  .category-hero {
    padding: 1.35rem 1.2rem;
  }
}
</style>

<div class="category-page">

  <section class="category-hero">
    <h1>文章分类</h1>
    <p>记录我的交易复盘、金融学习、编程笔记、随笔和做题区时刻。</p>
  </section>

  <section class="category-grid">

    <a class="category-card" href="{{ '/categories/交易/' | relative_url }}">
      <div class="category-card-top">
        <div class="category-icon">📈</div>
        <h2>交易</h2>
      </div>
      <p>交易复盘、市场观察、操作反思和交易系统搭建。</p>
    </a>

    <a class="category-card" href="{{ '/categories/金融/' | relative_url }}">
      <div class="category-card-top">
        <div class="category-icon">🏦</div>
        <h2>金融</h2>
      </div>
      <p>行业研究、公司分析、实习感想和金融学习笔记。</p>
    </a>

    <a class="category-card" href="{{ '/categories/编程/' | relative_url }}">
      <div class="category-card-top">
        <div class="category-icon">💻</div>
        <h2>编程</h2>
      </div>
      <p>编程学习、课程笔记和项目搭建。</p>
    </a>

    <a class="category-card" href="{{ '/categories/随笔/' | relative_url }}">
      <div class="category-card-top">
        <div class="category-icon">📝</div>
        <h2>随笔</h2>
      </div>
      <p>生活、成长、阶段复盘和一些当下的真实想法。</p>
    </a>

    <a class="category-card" href="{{ '/categories/做题区/' | relative_url }}">
      <div class="category-card-top">
        <div class="category-icon">🧩</div>
        <h2>做题区</h2>
      </div>
      <p>随机掉落高中、算法、cmc等题目和解答。</p>
    </a>

  </section>

</div>
