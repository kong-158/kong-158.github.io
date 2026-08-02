export const categories = [
  {
    slug: 'programming', index: '01', title: '编程与计算机', en: 'Programming',
    description: '课程笔记、教程实践、代码理解与工程基础。',
    examples: ['CS 课程', 'C++ / Python', '系统与工具']
  },
  {
    slug: 'ai-systems', index: '02', title: 'AI 与系统', en: 'AI & Systems',
    description: 'Agent、工作流、上下文管理与个人 AI Workspace。',
    examples: ['LLM / Agent', 'SJTUClaw', 'WorkBuddy']
  },
  {
    slug: 'finance', index: '03', title: '金融与投资', en: 'Finance',
    description: '金融课程、资产定价、金融工程与投资方法。',
    examples: ['公司金融', '资产定价', '策略评价']
  },
  {
    slug: 'mathematics', index: '04', title: '数学与统计', en: 'Mathematics',
    description: '数学基础、概率统计、计量与模型推导。',
    examples: ['概率统计', '计量经济学', '优化']
  },
  {
    slug: 'trading', index: '05', title: '交易复盘', en: 'Trading Journal',
    description: '记录决策、市场判断、错误来源与可复用规则。',
    examples: ['周度复盘', '交易随笔', '风险检查']
  },
  {
    slug: 'career', index: '06', title: '实习与成长', en: 'Career & Field Notes',
    description: '实习整理、求职准备、阶段总结与真实工作观察。',
    examples: ['实习复盘', '面试准备', '工作方法']
  }
] as const;

export const projects = [
  {
    title: 'SJTUClaw', eyebrow: 'PERSONAL AI WORKSPACE', status: 'BUILDING',
    description: '把学习、研究、文件、任务与多种 AI 工具组织进同一个长期工作空间。',
    tags: ['Agent', 'Workflow', 'Memory'], href: 'https://github.com/kong-158'
  },
  {
    title: '策略评价与风险审查', eyebrow: 'FINANCE × RESEARCH', status: 'RESEARCH',
    description: '面向主观多头与量化策略，拆解收益来源、风险暴露、技能与运气。',
    tags: ['Attribution', 'Risk', 'FOF'], href: '/projects/'
  },
  {
    title: 'NBA Playoff Prediction', eyebrow: 'MACHINE LEARNING', status: 'COMPLETED',
    description: '从球员贡献预测到球队结构特征，构建季后赛表现预测与解释框架。',
    tags: ['Python', 'ML', 'Feature Engineering'], href: '/projects/'
  },
  {
    title: 'WorkBuddy × Codex Bridge', eyebrow: 'AGENT INFRASTRUCTURE', status: 'BUILDING',
    description: '探索任务路由、会话连续性、结果缓存与安全执行边界。',
    tags: ['Harness', 'Bridge', 'Automation'], href: '/projects/'
  }
] as const;
