export const categories = [
  {
    slug: 'programming',
    index: '01',
    title: '编程与技术',
    description: '课程笔记、代码理解、工具使用与技术实践。'
  },
  {
    slug: 'finance',
    index: '02',
    title: '金融与投资',
    description: '金融课程、研究方法、市场理解与投资思考。'
  },
  {
    slug: 'mathematics',
    index: '03',
    title: '数学与统计',
    description: '数学基础、概率统计、计量方法与模型推导。'
  },
  {
    slug: 'trading',
    index: '04',
    title: '交易与复盘',
    description: '市场判断、决策过程、错误来源与事后复盘。'
  },
  {
    slug: 'learning',
    index: '05',
    title: '学习与记录',
    description: '课程整理、阅读记录、方法总结与阶段性笔记。'
  },
  {
    slug: 'career',
    index: '06',
    title: '实习与成长',
    description: '实习、求职、工作方法与个人阶段总结。'
  },
  {
    slug: 'essay',
    index: '07',
    title: '随笔与其他',
    description: '不适合归入固定学科，但值得公开保留的文字。'
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
