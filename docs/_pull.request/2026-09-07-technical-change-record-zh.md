# RakitWeb 导航页面与技术标识清理：完整技术变更说明

**文档日期：** 2026-09-07  
**文档类型：** 综合技术变更记录  
**项目：** RakitWeb  
**技术栈：** Nuxt 4、Vue 3、TypeScript、Nuxt UI、Tailwind CSS、GSAP、Nuxt Content

---

## 1. 文档目的

本文不是普通的提交摘要，而是对本次导航页面补全与技术标识清理工作的完整工程说明。文档记录以下内容：

1. 为什么需要新增页面，以及问题是如何从导航配置追溯到路由缺失的。
2. 新增页面的文件位置、路由职责、数据结构和页面组成。
3. 页面如何复用 RakitWeb 既有布局、颜色、排版、暗色模式和交互模式。
4. 页面中的 SEO、外链、可访问性和组件使用方式。
5. WordPress 技术标识从哪些位置被移除，以及哪些 TrapStack 相关代码被有意保留。
6. 验证结果、已知限制、提交边界和当前工作树状态。

本记录对应的实现范围是 RakitWeb 的公开网站页面，不涉及后端 API 协议、数据库结构或用户认证流程的重构。

---

## 2. 初始问题与定位过程

### 2.1 导航是问题入口

导航定义位于 [AppHeader.vue](../../app/components/AppHeader.vue)。其中的 `productLinks`、`resourcesCompany`、`resourcesLearn` 和 `resourcesConnect` 数组负责生成桌面端 Mega Menu 以及移动端菜单项。

导航中存在若干内部链接，但项目的 `app/pages` 目录中没有对应的页面文件：

| 导航名称 | 目标路由 | 页面职责 |
| --- | --- | --- |
| Testimoni | `/testimoni` | 展示客户反馈、交付方式和咨询入口 |
| Events | `/events` | 展示活动、促销、服务公告和 workshop |
| Tutorial | `/tutorial` | 提供 web development 学习内容入口 |
| Pusat Bantuan | `/bantuan` | 提供 FAQ、服务说明和快速联系入口 |
| Nuxt | `/nuxt` | 介绍 Nuxt 前端开发能力 |
| NestJS | `/nestjs` | 介绍 NestJS 后端开发能力 |

这些链接不是动态内容查询，而是 Nuxt 文件系统路由。因此，当缺少对应的 `.vue` 文件时，访问结果会落入 404 页面。修复方式应当是补充实际页面，而不是修改 404 页面的显示内容。

### 2.2 既有 UI 作为实现约束

新增页面参考了以下已有实现：

- [default.vue](../../app/layouts/default.vue)：提供全站外层容器、两侧条纹背景、最大宽度、顶部导航和页脚。
- [about.vue](../../app/pages/about.vue)：提供品牌介绍类页面的标题、段落、时间线和 CTA 结构。
- [partner.vue](../../app/pages/partner.vue)：提供卡片网格、细边框、合作内容和 WhatsApp CTA 的表现形式。
- [jasa/index.vue](../../app/pages/jasa/index.vue)：提供服务类页面的技术说明、网格分栏和服务导向信息。

因此，新增页面统一采用 RakitWeb 已有的视觉规则，而没有引入新的 UI 框架、全局主题或独立布局。

---

## 3. 新增页面的技术说明

所有新增页面均采用 Nuxt 页面组件形式：

```text
app/pages/<route>.vue
```

每个页面都包含以下共同层次：

1. `<script setup lang="ts">`：配置 SEO 元数据并定义页面所需的静态数据。
2. `<main>`：使用白色/黑色背景和全局文字颜色，分别适配亮色与暗色模式。
3. Hero 区域：使用 `UContainer`、大字号标题、辅助说明和必要的行动入口。
4. 分隔线：使用 `border-zinc-200` 与 `dark:border-zinc-800` 保持页面节奏。
5. 内容区域：使用细边框网格、列表、FAQ 或技术能力清单展示信息。
6. 外链或站内 CTA：使用 `NuxtLink`，外部 WhatsApp 链接使用新标签页打开。

页面没有复制 `AppHeader` 或 `AppFooter`。这些公共元素由 `layouts/default.vue` 自动包裹，避免产生重复导航和不一致的页脚。

### 3.1 `/testimoni`：客户反馈页

源文件：[testimoni.vue](../../app/pages/testimoni.vue)

页面用途是承接 Resources 菜单中的“Testimoni”入口，帮助潜在客户快速理解 RakitWeb 的交付体验。

#### 数据模型

页面定义了两个静态数组：

- `testimonials`：包含 `quote`、`name`、`role`、`project` 四个字段。
- `principles`：包含 `icon`、`title`、`desc` 三个字段，描述沟通、目标和持续支持。

这种数据驱动写法让模板只负责渲染结构，后续增加案例时只需添加数据项，不需要复制整段 HTML。

#### 页面结构

1. Hero：标题为“结果能够被客户感受到”，说明页面定位。
2. 客户反馈网格：桌面端三列，移动端单列；网格通过 `gap-px` 与背景色制造统一的细边框效果。
3. 工作原则区域：展示开放沟通、可衡量目标和持续支持。
4. WhatsApp CTA：引导用户直接描述项目需求。

#### 视觉与交互

- 使用 `i-lucide-quote`、`i-lucide-message-circle`、`i-lucide-timer` 和 `i-lucide-shield-check` 图标。
- 使用 `min-h-[300px]` 保证三张卡片在桌面端拥有稳定高度。
- 使用 `dark:bg-black`、`dark:text-zinc-50` 和暗色边框，确保暗色模式不产生独立视觉风格。
- 没有引入假的评分、轮播或外部评价 API；当前内容是静态展示数据，后续可替换为 CMS 数据源。

### 3.2 `/tutorial`：教程集合页

源文件：[tutorial.vue](../../app/pages/tutorial.vue)

页面用途是承接 Resources 菜单中的“Tutorial”入口，为开发者、业务人员和学习者提供技术内容入口。

#### 数据模型

`tutorials` 数组中的每个项目包含：

- `level`：学习难度，例如 `Dasar`、`Menengah`、`Lanjutan`。
- `title`：教程标题。
- `desc`：教程内容说明。
- `duration`：预计阅读或学习时间。
- `icon`：Nuxt UI/Iconify 使用的图标名称。

当前内容覆盖四个方向：Nuxt 项目初始化、production deployment、NestJS API 和 Core Web Vitals 优化。

#### 页面结构

1. Hero：说明教程页面是面向实际操作的学习入口。
2. 集合标题：显示内容集合名称和当前材料数量。
3. 教程卡片网格：桌面端两列，移动端单列。
4. 卡片底部：显示时长和“Baca tutorial”提示。

当前卡片是内容展示层，尚未绑定独立文章路由。这样可以先解决导航 404，并为后续接入 Nuxt Content 文章、分页或搜索保留清晰的扩展边界。

### 3.3 `/bantuan`：帮助中心页

源文件：[bantuan.vue](../../app/pages/bantuan.vue)

页面用途是承接 Resources 菜单中的“Pusat Bantuan”入口，回答用户在项目开始前后最常见的问题。

#### FAQ 实现

FAQ 数据放在 `faqs` 数组中，每项包含 `question` 和 `answer`。模板使用原生 HTML：

```html
<details>
  <summary>问题</summary>
  <p>答案</p>
</details>
```

使用原生 `details/summary` 的技术收益：

- 不需要额外的 Vue 状态管理。
- 不需要新增动画依赖。
- 浏览器原生支持展开和收起。
- 键盘用户能够访问并操作问题项。
- 结构语义清晰，适合搜索引擎读取。

#### 快速入口

`quickLinks` 数组提供三个入口：

- `/docs`：进入技术文档。
- `/pricing`：查看价格和服务套餐。
- WhatsApp 外链：直接联系团队。

外部 WhatsApp 链接通过 `:target="link.to.startsWith('http') ? '_blank' : undefined"` 区分内部路由和外部链接，避免所有链接都被错误地以新标签页打开。

### 3.4 `/events`：活动与公告页

源文件：[events.vue](../../app/pages/events.vue)

页面用途是承接 Resources 菜单中的“Events”入口，集中展示促销、服务活动和 workshop。

#### 数据模型

`events` 数组中的每项包含：

- `date`：面向用户的日期标签。
- `title`：活动名称。
- `desc`：活动内容说明。
- `tag`：活动分类，例如 `Promo`、`Layanan`、`Workshop`。
- `icon`：对应的 Lucide 图标。

#### 页面结构

活动列表使用 `divide-y` 和 `border-y` 形成纵向时间线式阅读节奏。桌面端采用三段式网格：

```text
日期列  |  活动信息列  |  询问详情入口
```

移动端通过 `grid-cols` 的响应式规则自动变成垂直结构，避免日期、标题和 CTA 发生横向挤压。每个活动都通过 WhatsApp 询问详情，没有伪造报名系统或不存在的活动 API。

### 3.5 `/nuxt`：Nuxt 技术服务页

源文件：[nuxt.vue](../../app/pages/nuxt.vue)

页面用途是承接 Product 菜单中的 Nuxt technology 入口，说明 RakitWeb 使用 Nuxt 建设现代网站的能力。

#### 内容模型

`capabilities` 数组列出四项能力：

- Server-side rendering 与 static generation。
- Routing 与结构化 content management。
- 图片优化与 Core Web Vitals。
- 带有独立 environment 的现代 deployment。

#### 页面结构

1. 技术标识区：使用 `i-simple-icons-nuxtdotjs`，并使用 Nuxt 生态常见的绿色作为局部强调色。
2. Hero：说明 Nuxt 在速度、SEO 和可扩展性方面的用途。
3. 两个 CTA：进入 `/jasa` 查看服务，进入 `/template/nuxtjs` 查看模板。
4. 双栏能力区域：左侧说明为什么使用 Nuxt，右侧以清单形式展示实现能力。

该页面只描述技术服务能力，不修改 Nuxt 配置，也不引入新的 Nuxt runtime module。

### 3.6 `/nestjs`：NestJS 技术服务页

源文件：[nestjs.vue](../../app/pages/nestjs.vue)

页面用途是承接 Product 菜单中的 NestJS technology 入口，说明 RakitWeb 使用 NestJS 构建 Node.js 后端的能力。

#### 内容模型

`capabilities` 数组列出四项后端能力：

- 基于 TypeScript 的模块化 API。
- 认证与角色管理。
- 数据库和外部服务集成。
- 面向测试和扩展的结构。

#### 页面结构

1. 技术标识区：使用 `i-simple-icons-nestjs`，采用 NestJS 生态常见的红色作为局部强调色。
2. Hero：说明模块化、可维护和可扩展的后端定位。
3. CTA：指向 `/jasa/pro`，连接到更高阶的定制开发服务。
4. 双栏架构说明：左侧介绍模块边界和维护性，右侧展示具体能力清单。

Nuxt 与 NestJS 页面都保持同一信息结构，但分别服务于前端和后端技术语境，避免两个页面看起来像同一份内容的换名版本。

---

## 4. 统一 UI 与前端工程约束

### 4.1 布局继承

所有新增路由都由 `layouts/default.vue` 自动承载，因此实际渲染层级为：

```text
default layout
├── AppHeader
├── UMain
│   └── 当前路由页面
└── AppFooter
```

布局本身提供：

- `max-w-7xl` 的主内容边界。
- 桌面端两侧条纹背景。
- 顶部 sticky header。
- 统一的页脚和页面最小高度。
- 亮色与暗色模式的全局背景。

页面自身只负责内容，不重复实现这些外层能力。

### 4.2 色彩体系

新增页面延续项目中的中性灰色体系：

- 亮色背景：`bg-white`。
- 暗色背景：`dark:bg-black`。
- 主文字：`text-black` 或 `dark:text-white`。
- 次要文字：`text-zinc-500`、`dark:text-zinc-400`。
- 普通边框：`border-zinc-200`、`dark:border-zinc-800`。
- hover 背景：`hover:bg-zinc-50`、`dark:hover:bg-zinc-900`。

只有 Nuxt 和 NestJS 技术标识使用品牌强调色，并限制在图标或小范围标识区域，不改变全站中性视觉方向。

### 4.3 响应式设计

新增页面主要使用 Tailwind 响应式断点：

- 移动端默认单列布局。
- `md:grid-cols-2` 用于教程、技术能力等双栏内容。
- `md:grid-cols-3` 用于客户反馈和原则卡片。
- 活动页使用 `md:grid-cols-[130px_1fr_auto]`，在桌面端明确划分日期、内容和操作列。
- Hero 标题使用 `md:text-6xl`，移动端使用 `text-4xl`，避免小屏幕溢出。

页面没有使用依赖 viewport 宽度计算字体的方案，也没有使用固定的整屏横向内容，从而与现有站点的移动端策略保持一致。

### 4.4 组件与依赖边界

新增页面复用了现有组件和能力：

- `UContainer`：统一内容宽度。
- `UIcon`：使用现有 Lucide 与 Simple Icons 图标集合。
- `NuxtLink`：处理内部路由和外部链接。
- `useSeoMeta`：设置页面级 SEO 元数据。

没有新增 npm 依赖、没有新增全局 CSS、没有复制第三方 UI 组件，也没有改动公共组件的 API。

---

## 5. SEO 与元数据实现

每个新增页面都调用 `useSeoMeta`，至少设置以下字段：

- `title`
- `description`
- `ogTitle`
- `ogDescription`
- `ogImage`

这样可以同时覆盖浏览器标题、搜索引擎摘要和社交分享卡片。图片统一使用现有的 `/rakitweb.jpeg`，避免新增无法保证部署存在的静态资源。

页面标题均包含路由主题和 `RakitWeb` 品牌语义，例如 `Nuxt Development - RakitWeb` 和 `Pusat Bantuan - RakitWeb`。

---

## 6. WordPress 技术标识清理

相关源码变更涉及：

- [app.vue](../../app/app.vue)
- [hosting.vue](../../app/pages/jasa/hosting.vue)
- [1.index.md](../../content/1.docs/1.getting-started/1.index.md)
- [4.domain.md](../../content/1.docs/2.jasa/4.domain.md)

### 6.1 全局元数据

从全局 `useHead` 的 `meta` 数组中移除了：

```ts
{ name: 'generator', content: 'WordPress 6.4.3' }
```

该字段会直接让浏览器、爬虫和技术识别工具把站点标记为 WordPress。RakitWeb 实际运行在 Nuxt/Vue 上，因此保留这个 generator 标识会产生错误技术信息。

### 6.2 Hosting 内容

在 hosting comparison 数据中移除了 WordPress 作为技术能力、适用场景和 hosting 类型的描述，改为更准确的 PHP、Laravel、Node.js、Python、VPS 和通用 shared/cloud hosting 表述。

这一步是内容语义修正，不是删除 hosting 产品本身：

- Cleavr 仍然描述为服务器管理工具。
- Hostinger 仍然描述为 shared/cloud/VPS hosting。
- PHP、Laravel、Node.js 等实际相关技术仍然保留。

### 6.3 Documentation 内容

getting-started 文档不再把 WordPress 列为技术栈示例；domain 文档不再使用 `.wordpress.com` 作为免费域名示例。

### 6.4 有意保留的代码

本次需求是移除 WordPress 标识，不是清理所有名为 TrapStack 的代码。以下现有 TrapStack/第三方 signature 逻辑没有被改动：

- Algolia、Twikoo、Prism、Ko-fi、Buy Me a Coffee 等 DOM signature。
- Angular、GSAP、Anime、LiveChat 等现有窗口或 DOM 标识。
- `nuxt.config.ts` 中与 `app-root` custom element 相关的现有配置。

这样可以保证本次变更范围只针对 WordPress，不误伤其他已有集成或用户明确保留的探测逻辑。

完整的原始维护记录见 [2026-09-07-remove-wordpress-references.md](./2026-09-07-remove-wordpress-references.md)。

---

## 7. 验证与质量检查

### 7.1 页面级 ESLint

新增的 6 个页面均执行了页面级 ESLint：

```bash
pnpm eslint app/pages/testimoni.vue app/pages/tutorial.vue app/pages/bantuan.vue app/pages/events.vue app/pages/nuxt.vue app/pages/nestjs.vue
```

结果：通过。执行过程中 pnpm 输出了项目现有的 TypeScript 版本兼容性警告，但没有产生阻塞性 lint error。

### 7.2 路由文件检查

以下文件均已存在并对应 navbar 内部链接：

- `app/pages/testimoni.vue`
- `app/pages/tutorial.vue`
- `app/pages/bantuan.vue`
- `app/pages/events.vue`
- `app/pages/nuxt.vue`
- `app/pages/nestjs.vue`

### 7.3 补丁格式检查

执行过：

```bash
git diff --check
```

没有发现 whitespace error。Git 对 CRLF/LF 的提示属于当前工作树的换行格式提示，不是代码语法错误。

### 7.4 全局 TypeScript 检查限制

执行 `pnpm typecheck` 时，项目报告了 25 个已有 TypeScript 错误，主要位于：

- `app/components/AppHeader.vue`
- `app/components/content/CardSwap.vue`
- `app/components/ImpactStats.vue`
- `app/components/LiveChat.vue`
- `app/pages/blog/[slug].vue`
- `app/pages/blog/index.vue`
- `app/pages/index.vue`
- `app/pages/jasa/business.vue`
- `server/middleware/bot-filter.ts`

这些错误不由本次新增页面引入，也不在本次页面补全任务的修改范围内。因此本次记录将全局 typecheck 标记为“受既有错误阻塞”，而不是误报为整个项目验证通过。

---

## 8. 提交历史与边界

页面实现按“每个页面一个 commit”的要求拆分：

| Commit | 内容 |
| --- | --- |
| `77c6e05` | 新增 `/testimoni` 页面及其页面记录 |
| `0a9f461` | 新增 `/tutorial` 页面及其页面记录 |
| `b3e36ee` | 新增 `/bantuan` 页面及其页面记录 |
| `37ae974` | 新增 `/events` 页面及其页面记录 |
| `e611a50` | 新增 `/nuxt` 页面及其页面记录 |
| `8bd36cd` | 新增 `/nestjs` 页面及其页面记录 |

每个页面 commit 只包含：

1. 对应的 `app/pages/<route>.vue`。
2. 对应的 `docs/_pull.request/2026-09-07-<route>-page.md`。

WordPress 清理文件和之前的源码修改没有被混入上述页面 commit。

### 当前工作树注意事项

在本综合文档生成前，以下页面文件显示为工作树修改状态：

- [testimoni.vue](../../app/pages/testimoni.vue)
- [tutorial.vue](../../app/pages/tutorial.vue)
- [bantuan.vue](../../app/pages/bantuan.vue)
- [events.vue](../../app/pages/events.vue)
- [nuxt.vue](../../app/pages/nuxt.vue)
- [nestjs.vue](../../app/pages/nestjs.vue)

这些文件的修改可能来自用户编辑或自动格式化工具。本文根据当前文件内容进行说明，没有回退这些改动，也没有擅自把它们重新提交。

此外，以下 WordPress 相关文件仍在工作树中等待后续独立提交：

- [app.vue](../../app/app.vue)
- [hosting.vue](../../app/pages/jasa/hosting.vue)
- [1.index.md](../../content/1.docs/1.getting-started/1.index.md)
- [4.domain.md](../../content/1.docs/2.jasa/4.domain.md)
- [2026-09-07-remove-wordpress-references.md](./2026-09-07-remove-wordpress-references.md)

---

## 9. 后续技术建议

本次页面主要解决路由缺失和基础内容展示问题。后续若继续产品化，建议按以下顺序演进：

1. 将教程内容迁移到 Nuxt Content，给每个教程绑定真实详情路由。
2. 将活动数据迁移到 content collection 或 CMS，并加入状态、报名截止时间和活动详情页。
3. 将客户案例替换为经过授权的真实客户内容，必要时增加项目链接或可验证成果。
4. 将帮助中心 FAQ 按服务分类，并补充搜索与结构化 FAQ schema。
5. 为 Nuxt 和 NestJS 页面增加技术案例、交付流程、架构图和咨询表单。
6. 单独处理项目已有的 TypeScript 错误，避免新增页面长期依赖全局 typecheck 失败状态。
7. 在 CI 中增加路由 smoke test，确保 navbar 中每个内部链接都能生成对应页面。

---

## 10. 结论

本次工作完成了导航中 6 个缺失内部页面的实际实现，并保持了 RakitWeb 既有的布局继承、黑白色彩、细边框网格、暗色模式和技术服务定位。同时，WordPress 的错误 generator 元数据、hosting 文案和文档示例已在源码层面移除。

页面实现没有新增依赖，没有修改公共布局 API，没有改变认证、API 或数据库行为。页面级 lint 和路由文件检查已完成；全局 typecheck 仍受项目原有的 25 个无关 TypeScript 错误影响，具体限制已在本文档中明确记录。