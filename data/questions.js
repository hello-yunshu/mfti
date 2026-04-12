// MFTI 题库 - 30道题，10个维度

const QUESTIONS = [

  // ===== 维度1: P/R 粉色梦境指数 =====
  {
    id: 1,
    dimension: "PR",
    text: "你理想中的日常是什么状态？",
    options: [
      { label: "A", text: "每天都是少女漫，出门有BGM，路上有人偷看，回家有自拍回顾今天有多美，完美。", score: { PR: 2 } },
      { label: "B", text: "正常过日子，偶尔喘口气换件裙子，然后继续上班还贷款。", score: { PR: 0 } },
      { label: "C", text: "我有详细的计划，包含时间表和具体目标，梦想是用来执行的不是用来做的。", score: { PR: -1 } }
    ]
  },
  {
    id: 2,
    dimension: "PR",
    text: "你朋友圈最近发的是什么？",
    options: [
      { label: "A", text: "滤镜+文案+位置打卡，评论区被'好美'淹没，完美结束这一天。", score: { PR: 2 } },
      { label: "B", text: "三天不发一条，发了也是转发的文章或者『在吃饭』。", score: { PR: -1 } },
      { label: "C", text: "朋友圈设置仅三天可见，过去的已经不重要了，我在执行下一阶段。", score: { PR: -2 } }
    ]
  },
  {
    id: 3,
    dimension: "PR",
    text: "别人说『你看起来不像女孩子』，你的第一反应是？",
    options: [
      { label: "A", text: "内心一震然后修炼更猛，我要让你再也说不出这句话。", score: { PR: 1, AI: 1 } },
      { label: "B", text: "哦，谢谢你的观察，然后结束这个话题。", score: { PR: -1 } },
      { label: "C", text: "这说明对方有刻板印象，我来解释一下……", score: { TN: 2 } }
    ]
  },

  // ===== 维度2: S/H 社交活跃度 =====
  {
    id: 4,
    dimension: "SH",
    text: "姐妹群里说要聚会，你去吗？",
    options: [
      { label: "A", text: "去！提前一周选好造型，活动当天第一个到，最后一个走，拍了三百张照片。", score: { SH: 2 } },
      { label: "B", text: "看心情，可能去，可能到门口了掉头，看当天精神状态。", score: { SH: 0 } },
      { label: "C", text: "不去，在家更舒服，而且我有一套裙子还没拍完。", score: { SH: -2 } }
    ]
  },
  {
    id: 5,
    dimension: "SH",
    text: "你的主要社交战场在哪？",
    options: [
      { label: "A", text: "线下活动、姐妹饭局、各种见面，认识新朋友让我充电。", score: { SH: 2 } },
      { label: "B", text: "社交媒体为主，偶尔线下，线下结束了要花时间恢复元气。", score: { SH: 1 } },
      { label: "C", text: "我的社交圈是两个固定的、高度精选的好友，其他一概不需要。", score: { SH: -2 } }
    ]
  },
  {
    id: 6,
    dimension: "SH",
    text: "一个人在家待了一周，你感觉怎么样？",
    options: [
      { label: "A", text: "快憋死了，赶紧找人出去，哪怕只是逛超市也行。", score: { SH: 2 } },
      { label: "B", text: "还好，但开始觉得有点空，偶尔刷刷群聊看看动态。", score: { SH: 0 } },
      { label: "C", text: "这才叫生活，关掉消息提醒，人均打扰降到零，天堂了。", score: { SH: -2 } }
    ]
  },

  // ===== 维度3: A/I 颜值焦虑度 =====
  {
    id: 7,
    dimension: "AI",
    text: "你钱包的主要用途是什么方面？",
    options: [
      { label: "A", text: "护肤、化妆、衣服、配件、形体管理——我对自己的投入从不手软。", score: { AI: 2, MB: 2 } },
      { label: "B", text: "生活必需品居多，偶尔给自己买个小东西，主要花在精神层面。", score: { AI: -1, MB: 0 } },
      { label: "C", text: "书、课程、学习资料，顺便买了一些用于分析自身情况的检测项目。", score: { TN: 2, MB: 1 } }
    ]
  },
  {
    id: 8,
    dimension: "AI",
    text: "照镜子的频率大概是？",
    options: [
      { label: "A", text: "每次经过都会看，手机前置摄像头是我的移动镜子，此外还有一面专用大镜。", score: { AI: 2 } },
      { label: "B", text: "早上梳洗的时候，出门之前，其他时候不怎么在意。", score: { AI: 0 } },
      { label: "C", text: "我知道今天的状态，不需要镜子反复确认，数据在我心里。", score: { AI: -1, CF: 1 } }
    ]
  },
  {
    id: 9,
    dimension: "AI",
    text: "你觉得'变得更像自己理想的样子'这件事，核心是什么？",
    options: [
      { label: "A", text: "外表，外表，还是外表。内心已经是了，现在要让眼睛能看到的也是。", score: { AI: 2 } },
      { label: "B", text: "内心认同最重要，外表是可选项，但我也不排斥打扮。", score: { AI: -1 } },
      { label: "C", text: "这个命题本身就值得拆解，'理想样子'的判准是什么，谁在定义？", score: { TN: 2, AI: -2 } }
    ]
  },

  // ===== 维度4: E/W 公开度 =====
  {
    id: 10,
    dimension: "EW",
    text: "你身边重要的人（家人/伴侣/挚友）知道你想做女孩子这件事吗？",
    options: [
      { label: "A", text: "知道，而且他们的反应比我预期的要……复杂，但总之已经说了。", score: { EW: 2 } },
      { label: "B", text: "部分人知道，或者暂时和他们没有关系，这是我自己的事。", score: { EW: -1 } },
      { label: "C", text: "这个问题本身就有问题。（不想回答）", score: { EW: -2, TN: 1 } }
    ]
  },
  {
    id: 11,
    dimension: "EW",
    text: "在工作或学校里，你展现女孩子一面的程度是？",
    options: [
      { label: "A", text: "完全展现，同事/同学都知道，我就是我。", score: { EW: 2, GL: 1 } },
      { label: "B", text: "看情况，部分圈子知道，部分保持低调。", score: { EW: 0 } },
      { label: "C", text: "完全不展现，这是私事，和工作/学习无关。", score: { EW: -2 } }
    ]
  },
  {
    id: 12,
    dimension: "EW",
    text: "如果有人在公开场合问你『你是男生还是女生』，你怎么回应？",
    options: [
      { label: "A", text: "直接说我是女生，这有什么需要回避的。", score: { EW: 2 } },
      { label: "B", text: "看情况，有时候直说，有时候打哈哈过去。", score: { EW: 0 } },
      { label: "C", text: "反问他：你为什么需要知道这个？然后保持微笑。", score: { EW: -1, TN: 1 } }
    ]
  },

  // ===== 维度5: C/F 自律指数 =====
  {
    id: 13,
    dimension: "CF",
    text: "你有护肤/保养/健康管理流程吗？",
    options: [
      { label: "A", text: "有，而且每个步骤都有依据和时间节点，不能乱，乱了效果打折。", score: { CF: 2 } },
      { label: "B", text: "大概有，但有时候懒得做全套，看心情。", score: { CF: 0 } },
      { label: "C", text: "没有固定流程，今天心情好就多做几步，心情差就简单处理。", score: { CF: -2 } }
    ]
  },
  {
    id: 14,
    dimension: "CF",
    text: "你有没有为『变成自己想要的样子』设立过具体的时间计划？",
    options: [
      { label: "A", text: "有，详细的计划表，每个阶段该做什么都写好了。", score: { CF: 2, XZ: 2 } },
      { label: "B", text: "有大概的方向，但不那么具体，比较灵活。", score: { CF: 1, XZ: 1 } },
      { label: "C", text: "没有，给这种事设时间表很奇怪，顺其自然吧。", score: { CF: -2, XZ: -1 } }
    ]
  },
  {
    id: 15,
    dimension: "CF",
    text: "你对待'维护自己状态'这件事的态度？",
    options: [
      { label: "A", text: "长期投入，日复一日，没有假期，效果是积累出来的。", score: { CF: 2, GL: 2 } },
      { label: "B", text: "尽量维护，但不会为了它牺牲太多，有比它更重要的事。", score: { CF: 0, GL: 0 } },
      { label: "C", text: "什么时候想起来什么时候弄，这件事不需要变成负担。", score: { CF: -2, GL: -1 } }
    ]
  },

  // ===== 维度6: D/K 社群归属感 =====
  {
    id: 16,
    dimension: "DK",
    text: "你需要找到和你一样的『姐妹』吗？",
    options: [
      { label: "A", text: "非常需要，姐妹是我的情感充电站，没有她们我会枯萎。", score: { DK: 2 } },
      { label: "B", text: "有更好，没有也可以活，但确实有帮助。", score: { DK: 0 } },
      { label: "C", text: "不需要，我自己就能搞定一切。", score: { DK: -2 } }
    ]
  },
  {
    id: 17,
    dimension: "DK",
    text: "有人在群里说了一件让你觉得她理解错了的事，你会？",
    options: [
      { label: "A", text: "发消息纠正，然后参与讨论，我喜欢这种交流。", score: { DK: 1, SH: 1 } },
      { label: "B", text: "看了看，觉得也许她有她的道理，不想卷入讨论，退出了。", score: { DK: -1 } },
      { label: "C", text: "发了一篇两千字的分析文章，然后等着看有没有人能看完。", score: { TN: 2, DK: 0 } }
    ]
  },
  {
    id: 18,
    dimension: "DK",
    text: "遇到困难的时候，你第一步是？",
    options: [
      { label: "A", text: "发给几个信任的朋友，寻求支持，群策群力。", score: { DK: 2, SH: 1 } },
      { label: "B", text: "先自己想，想不通了再问，不到最后不求人。", score: { DK: -1 } },
      { label: "C", text: "查资料、找文献、自己研究，我就是自己的专家。", score: { DK: -2, TN: 2 } }
    ]
  },

  // ===== 维度7: T/N 理性分析度 =====
  {
    id: 19,
    dimension: "TN",
    text: "你是怎么认识到自己想成为女孩子的？",
    options: [
      { label: "A", text: "就是一种感觉，某天突然清楚了，没有想太多。", score: { TN: -2 } },
      { label: "B", text: "一开始是感觉，后来查了一些资料，两者结合。", score: { TN: 0 } },
      { label: "C", text: "看了很多书、做了很多分析、对比了各种说法，最后才确定。", score: { TN: 2 } }
    ]
  },
  {
    id: 20,
    dimension: "TN",
    text: "别人说『你想太多了，跟着感觉走就好』，你觉得？",
    options: [
      { label: "A", text: "有道理，感觉才是真实的，想太多只会让人更乱。", score: { TN: -2 } },
      { label: "B", text: "感觉和分析都需要，不矛盾。", score: { TN: 0 } },
      { label: "C", text: "感觉是一种信息，但未经检验的信息不可靠，我需要验证。", score: { TN: 2 } }
    ]
  },
  {
    id: 21,
    dimension: "TN",
    text: "你有没有研究过关于跨性别相关的学术文章或心理学资料？",
    options: [
      { label: "A", text: "没有，自己的感觉和经验就够了，不需要学术背书。", score: { TN: -2 } },
      { label: "B", text: "看过一些科普文章，没到学术文献的程度。", score: { TN: 0 } },
      { label: "C", text: "深入研究过，有收藏夹和笔记，还能引用具体文献。", score: { TN: 2 } }
    ]
  },

  // ===== 维度8: M/B 物质投入度 =====
  {
    id: 22,
    dimension: "MB",
    text: "你的衣柜里有多少女孩子的衣服/东西？",
    options: [
      { label: "A", text: "一整个区域都是，分类整理，比我的其他衣服还整齐。", score: { MB: 2 } },
      { label: "B", text: "有几件，放在不起眼的角落，也没有特别藏着。", score: { MB: 0 } },
      { label: "C", text: "几乎没有，我不靠这些外在的东西来表达自己。", score: { MB: -2 } }
    ]
  },
  {
    id: 23,
    dimension: "MB",
    text: "你愿意为『变成自己想成为的样子』花多少钱？",
    options: [
      { label: "A", text: "不设上限，这是优先级最高的投入，钱是可以再赚的。", score: { MB: 2 } },
      { label: "B", text: "在预算范围内尽量多投入，但会做取舍。", score: { MB: 1 } },
      { label: "C", text: "能省则省，心里认同自己就够了，不需要靠买东西来证明。", score: { MB: -2 } }
    ]
  },
  {
    id: 24,
    dimension: "MB",
    text: "最近一次在『变美/变女孩子』这件事上的最大单笔消费是多少？",
    options: [
      { label: "A", text: "几千块以上，这算正常，不算什么特别的。", score: { MB: 2 } },
      { label: "B", text: "几百块，有计划有节制，偶尔超一点。", score: { MB: 0 } },
      { label: "C", text: "我还没到花这种钱的阶段，或者我不在这上面花钱。", score: { MB: -2 } }
    ]
  },

  // ===== 维度9: G/L 表达一致性 =====
  {
    id: 25,
    dimension: "GL",
    text: "你以女孩子状态生活的频率是？",
    options: [
      { label: "A", text: "每天，这不是特殊模式，这就是我的正常生活。", score: { GL: 2 } },
      { label: "B", text: "有机会就是，没机会就等，不强求。", score: { GL: 0 } },
      { label: "C", text: "固定时间段，其他时间正常过日子，有安排有分工。", score: { GL: -1, CF: 1 } }
    ]
  },
  {
    id: 26,
    dimension: "GL",
    text: "一整个月都没机会做女孩子，你会？",
    options: [
      { label: "A", text: "非常难受，我会感到心里空空的。", score: { GL: 2 } },
      { label: "B", text: "有点难受，但还能接受，等有机会再说。", score: { GL: 0 } },
      { label: "C", text: "没什么，我心里知道我是谁，不需要靠外在表达。", score: { GL: -2 } }
    ]
  },

  // ===== 维度10: X/Z 未来规划度 =====
  {
    id: 27,
    dimension: "XZ",
    text: "你有没有认真想过五年后你的状态是什么样的？",
    options: [
      { label: "A", text: "有，而且有清晰的目标和路径，并定期回顾执行情况。", score: { XZ: 2 } },
      { label: "B", text: "大概想过，但不会太具体，以后的事以后说。", score: { XZ: 0 } },
      { label: "C", text: "没有，未来是不确定的，计划没有变化快，我不做这种规划。", score: { XZ: -2 } }
    ]
  },
  {
    id: 28,
    dimension: "XZ",
    text: "关于身体改变（吃糖、手术等），你的态度是？",
    options: [
      { label: "A", text: "已经在进行/有计划，每个步骤都查好了资料、定好了时间。", score: { XZ: 2, CF: 1 } },
      { label: "B", text: "考虑过，但还没决定，还在收集信息。", score: { XZ: 0 } },
      { label: "C", text: "不考虑这个，或者我已经做完了/不需要。", score: { XZ: -2, EW: 1 } }
    ]
  },
  {
    id: 29,
    dimension: "XZ",
    text: "你对'现在的自己'的整体态度是？",
    options: [
      { label: "A", text: "满意，我在按计划进行，阶段性成果可见。", score: { XZ: 1, CF: 1 } },
      { label: "B", text: "还行，有些地方不满意但接受过程，慢慢来。", score: { XZ: 0 } },
      { label: "C", text: "模糊，不想太具体地评价，评价了就要行动，行动了就要负责。", score: { XZ: -2, EW: -1 } }
    ]
  },
  {
    id: 30,
    dimension: "PR",
    text: "最后一题：你做这个测试的原因是？",
    options: [
      { label: "A", text: "我想了解自己是哪种类型，对自我探索很感兴趣。", score: { PR: 1, TN: 1, EW: 1 } },
      { label: "B", text: "无聊，打发时间，朋友发来的，随便做做。", score: { PR: 0, DK: 0 } },
      { label: "C", text: "我只是路过的，这道题不适合我。（但你做到第30题了）", score: { EW: -2, PR: -1 } }
    ]
  }

];

// 维度权重配置（用于人格匹配计算）
const DIMENSION_WEIGHTS = {
  PR: 1.0,  // 粉色梦境
  SH: 1.2,  // 社交活跃
  AI: 1.0,  // 颜值焦虑
  EW: 1.5,  // 公开度（权重最高，最核心）
  CF: 0.8,  // 自律指数
  DK: 0.8,  // 社群归属
  TN: 1.0,  // 理性分析
  MB: 0.7,  // 物质投入
  GL: 0.9,  // 表达一致性
  XZ: 0.8   // 未来规划
};

if (typeof module !== 'undefined') {
  module.exports = { QUESTIONS, DIMENSION_WEIGHTS };
}
