export const categories = [
  {
    slug: 'research',
    index: '01',
    title: 'Research',
    description: '研究框架、方法论、论文阅读与阶段性结论。'
  },
  {
    slug: 'cs-ai',
    index: '02',
    title: 'CS & AI',
    description: '算法、系统、机器学习、深度学习与工程实践。'
  },
  {
    slug: 'finance',
    index: '03',
    title: 'Finance',
    description: '金融、投资、量化方法、市场观察与交易思考。'
  },
  {
    slug: 'notes',
    index: '04',
    title: 'Notes',
    description: '课程、阅读、工具使用与持续学习记录。'
  },
  {
    slug: 'life',
    index: '05',
    title: 'Life',
    description: '阶段总结、随笔以及不必被严格分类的内容。'
  }
] as const;

export const topicLabels: Record<string, string> = Object.fromEntries(
  categories.map((category) => [category.slug, category.title])
);

export const kindLabels: Record<string, string> = {
  note: '笔记',
  tutorial: '教程',
  review: '复盘',
  essay: '随笔',
  report: '研究整理',
  'field-note': '实践记录'
};

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}
