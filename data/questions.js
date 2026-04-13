// MFTI 题库 - 37道题，10个维度
// 题目顺序：日常篇→认同篇→关系篇→深入篇→未来篇

const QUESTIONS = [

  // ===== 日常篇 =====

  {
    id: 1,
    dimension: "PR",
    text: "你理想中的日常是什么状态？",
    options: [
      { label: "A", text: "每天都是少女漫，出门有BGM，路上有人偷看，回家有自拍回顾今天有多美，完美。", score: { PR: 2 } },
      { label: "B", text: "正常过日子就好，偶尔会幻想一下另一种生活，但也没认真想过。", score: { PR: 0 } },
      { label: "C", text: "没什么特别理想的状态，过好眼前就行了。", score: { PR: -1 } }
    ]
  },
  {
    id: 2,
    dimension: "SH",
    text: "群里说要聚会，你去吗？",
    options: [
      { label: "A", text: "去！提前一周选好造型，活动当天第一个到，最后一个走，拍了三百张照片。", score: { SH: 2 } },
      { label: "B", text: "看心情，可能去，可能到门口了掉头，看当天精神状态。", score: { SH: 0 } },
      { label: "C", text: "不去，在家更舒服，出门还要收拾，算了。", score: { SH: -2 } }
    ]
  },
  {
    id: 3,
    dimension: "CF",
    text: "你有护肤/保养/健康管理流程吗？",
    options: [
      { label: "A", text: "有，而且每个步骤都有依据和时间节点，不能乱，乱了效果打折。", score: { CF: 2 } },
      { label: "B", text: "大概有，但有时候懒得做全套，看心情。", score: { CF: 0 } },
      { label: "C", text: "没有固定流程，今天心情好就多做几步，心情差就简单处理。", score: { CF: -2 } }
    ]
  },
  {
    id: 4,
    dimension: "PR",
    text: "你朋友圈最近发的是什么？",
    options: [
      { label: "A", text: "滤镜+文案+位置打卡，评论区被'好美'淹没，完美结束这一天。", score: { PR: 2 } },
      { label: "B", text: "偶尔看看别人的内容，自己不太发相关的东西。", score: { PR: -1 } },
      { label: "C", text: "我的社交账号和这面完全无关，不会留下任何痕迹。", score: { PR: -2 } }
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
    dimension: "AI",
    text: "看到照片里自己的脸，你的第一反应是？",
    options: [
      { label: "A", text: "立刻找角度问题、光线问题、修图问题——不是我长得不行，是这镜头不行。", score: { AI: 2 } },
      { label: "B", text: "还行吧，有好有坏，不特别在意。", score: { AI: 0 } },
      { label: "C", text: "无所谓，长什么样不是我能控制的，也不打算花精力在这上面。", score: { AI: -2 } }
    ]
  },
  {
    id: 7,
    dimension: "MB",
    text: "你的衣柜里有多少女孩子的衣服/东西？",
    options: [
      { label: "A", text: "一整个区域都是，分类整理，比我的其他衣服还整齐。", score: { MB: 2 } },
      { label: "B", text: "有几件，放在不起眼的角落，偶尔看看。", score: { MB: 0 } },
      { label: "C", text: "几乎没有，或者目前没有在这上面投入的打算。", score: { MB: -2 } }
    ]
  },
  {
    id: 8,
    dimension: "SH",
    text: "一个人在家待了一周，你感觉怎么样？",
    options: [
      { label: "A", text: "快憋死了，赶紧找人出去，哪怕只是逛超市也行。", score: { SH: 2 } },
      { label: "B", text: "还好，但开始觉得有点空，偶尔刷刷群聊看看动态。", score: { SH: 0 } },
      { label: "C", text: "这才叫生活，关掉消息提醒，人均打扰降到零，天堂了。", score: { SH: -2 } }
    ]
  },

  // ===== 认同篇 =====

  {
    id: 9,
    dimension: "AI",
    text: "出门前发现今天状态特别差，你会？",
    options: [
      { label: "A", text: "焦虑到不想出门，或者花一小时补救到勉强能接受，迟到了也无所谓。", score: { AI: 2 } },
      { label: "B", text: "叹口气，随便收拾一下，反正又不是第一天状态不好。", score: { AI: 0 } },
      { label: "C", text: "什么状态差？我不存在'状态差'这个概念，出门就是出门。", score: { AI: -2 } }
    ]
  },
  {
    id: 10,
    dimension: "TN",
    text: "你是怎么确认自己内心真实想法的？",
    options: [
      { label: "A", text: "就是一种感觉，某天突然清楚了，没有想太多。", score: { TN: -2 } },
      { label: "B", text: "一开始是感觉，后来也查了一些资料，两者结合。", score: { TN: 0 } },
      { label: "C", text: "看了很多书、做了很多分析、对比了各种说法，最后才确定——或者我目前还没想清楚。", score: { TN: 2 } }
    ]
  },
  {
    id: 11,
    dimension: "PR",
    text: "你对'少女感'这个词的第一反应是？",
    options: [
      { label: "A", text: "这就是我的人生追求，越少女越好，谁规定只能年轻才能少女？", score: { PR: 2 } },
      { label: "B", text: "可以理解，但不是我追求的核心，我有更在意的东西。", score: { PR: 0 } },
      { label: "C", text: "不太有感觉，我更关注实际的事情，或者这个概念和我关联不大。", score: { PR: -2 } }
    ]
  },
  {
    id: 12,
    dimension: "AI",
    text: "你觉得'颜值'这件事对你的影响有多大？",
    options: [
      { label: "A", text: "非常大，我经常觉得自己不够好，别人的评价会直接改变我一天的心情。", score: { AI: 2, PR: 1 } },
      { label: "B", text: "有一些影响，但不是决定性的，我可以靠别的东西撑住自信。", score: { AI: 0 } },
      { label: "C", text: "几乎没影响，我对自己的认知不建立在外表上，或者已经过了在意的阶段了。", score: { AI: -2 } }
    ]
  },
  {
    id: 13,
    dimension: "CF",
    text: "你有没有为'变成自己想要的样子'设立过具体的时间计划？",
    options: [
      { label: "A", text: "有，详细的计划表，每个阶段该做什么都写好了。", score: { CF: 2, XZ: 2 } },
      { label: "B", text: "有大概的方向，但不那么具体，比较灵活。", score: { CF: 1, XZ: 1 } },
      { label: "C", text: "没有，不喜欢给自己设框架，顺其自然吧。", score: { CF: -2, XZ: -1 } }
    ]
  },
  {
    id: 14,
    dimension: "PR",
    text: "别人说『你看起来不像女孩子』，你的第一反应是？",
    options: [
      { label: "A", text: "内心一震然后修炼更猛，我要让你再也说不出这句话。", score: { PR: 1, AI: 1 } },
      { label: "B", text: "哦，无所谓，本来也不一定像，或者这话跟我关系不大。", score: { PR: -1 } },
      { label: "C", text: "这说明对方有刻板印象，我来解释一下……", score: { TN: 2 } }
    ]
  },
  {
    id: 15,
    dimension: "SH",
    text: "一个人去一家从没去过的咖啡店，你会？",
    options: [
      { label: "A", text: "直接去，坐吧台，跟咖啡师聊两句，说不定能认识新朋友。", score: { SH: 2 } },
      { label: "B", text: "可以去，但会选角落的位子，戴上耳机，享受独处但不排斥环境。", score: { SH: 0 } },
      { label: "C", text: "不会一个人去，那种场合让我不太自在，更习惯在自己的空间里待着。", score: { SH: -2 } }
    ]
  },
  {
    id: 16,
    dimension: "TN",
    text: "别人说『你想太多了，跟着感觉走就好』，你觉得？",
    options: [
      { label: "A", text: "有道理，感觉才是真实的，想太多只会让人更乱。", score: { TN: -2 } },
      { label: "B", text: "感觉和分析都需要，不矛盾。", score: { TN: 0 } },
      { label: "C", text: "感觉是一种信息，但未经检验的信息不可靠，我需要验证。", score: { TN: 2 } }
    ]
  },

  // ===== 关系篇 =====

  {
    id: 17,
    dimension: "EW",
    text: "你身边重要的人（家人/伴侣/挚友）了解真实的你吗？",
    options: [
      { label: "A", text: "了解，而且他们的反应比我预期的要……复杂，但总之已经说了。", score: { EW: 2 } },
      { label: "B", text: "部分人了解，或者暂时和他们没有关系，这是我自己的事。", score: { EW: -1 } },
      { label: "C", text: "没有人了解，或者目前没有打算告诉别人。", score: { EW: -2 } }
    ]
  },
  {
    id: 18,
    dimension: "DK",
    text: "你需要找到和你一样的'姐妹'吗？",
    options: [
      { label: "A", text: "非常需要，姐妹是我的情感充电站，没有她们我会枯萎。", score: { DK: 2 } },
      { label: "B", text: "有更好，没有也可以活，但确实有帮助。", score: { DK: 0 } },
      { label: "C", text: "不需要，我自己就能搞定一切，或者目前没这个需求。", score: { DK: -2 } }
    ]
  },
  {
    id: 19,
    dimension: "MB",
    text: "你愿意为'变成自己想成为的样子'花多少钱？",
    options: [
      { label: "A", text: "不设上限，这是优先级最高的投入，钱是可以再赚的。", score: { MB: 2 } },
      { label: "B", text: "在预算范围内尽量多投入，但会做取舍。", score: { MB: 1 } },
      { label: "C", text: "能省则省，或者目前没什么需要大笔投入的。", score: { MB: -2 } }
    ]
  },
  {
    id: 20,
    dimension: "EW",
    text: "在工作或学校里，你展现女孩子一面的程度是？",
    options: [
      { label: "A", text: "完全展现，同事/同学都知道，我就是我。", score: { EW: 2, GL: 1 } },
      { label: "B", text: "看情况，部分圈子知道，部分保持低调。", score: { EW: 0 } },
      { label: "C", text: "完全不展现，或者目前没有什么需要展现的。", score: { EW: -2 } }
    ]
  },
  {
    id: 21,
    dimension: "DK",
    text: "有人在群里说了一件让你觉得理解错了的事，你会？",
    options: [
      { label: "A", text: "发消息纠正，然后参与讨论，我喜欢这种交流。", score: { DK: 1, SH: 1 } },
      { label: "B", text: "看了看，觉得也许有道理，不想卷入讨论，退出了。", score: { DK: -1 } },
      { label: "C", text: "发了一篇两千字的分析文章，然后等着看有没有人能看完。", score: { TN: 1, DK: 0 } }
    ]
  },
  {
    id: 22,
    dimension: "EW",
    text: "如果有人在公开场合问你『你是男生还是女生』，你怎么回应？",
    options: [
      { label: "A", text: "直接说我是女生，这有什么需要回避的。", score: { EW: 2 } },
      { label: "B", text: "看情况，有时候直说，有时候打哈哈过去。", score: { EW: 0 } },
      { label: "C", text: "反问他：你为什么需要知道这个？然后保持微笑。", score: { EW: -1, TN: 1 } }
    ]
  },
  {
    id: 23,
    dimension: "EW",
    text: "你的社交媒体账号，和你'这一面'的关系是？",
    options: [
      { label: "A", text: "就是同一个账号，我就是我，没什么好藏的。", score: { EW: 2, GL: 1 } },
      { label: "B", text: "有单独的账号，但也算是半公开的，不是特别怕被发现。", score: { EW: 0 } },
      { label: "C", text: "严格隔离，或者我不在社交媒体上展示任何相关的部分。", score: { EW: -2 } }
    ]
  },
  {
    id: 24,
    dimension: "DK",
    text: "遇到困难的时候，你第一步是？",
    options: [
      { label: "A", text: "发给几个信任的朋友，寻求支持，群策群力。", score: { DK: 2, SH: 1 } },
      { label: "B", text: "先自己想，想不通了再问，不到最后不求人。", score: { DK: -1 } },
      { label: "C", text: "查资料、找文献、自己研究，我就是自己的专家。", score: { DK: -2, TN: 1 } }
    ]
  },

  // ===== 深入篇 =====

  {
    id: 25,
    dimension: "TN",
    text: "你有没有研究过关于跨性别相关的学术文章或心理学资料？",
    options: [
      { label: "A", text: "没有，自己的感觉和经验就够了，不需要学术背书。", score: { TN: -2 } },
      { label: "B", text: "看过一些科普文章，没到学术文献的程度。", score: { TN: 0 } },
      { label: "C", text: "深入研究过，有收藏夹和笔记，还能引用具体文献。", score: { TN: 2 } }
    ]
  },
  {
    id: 26,
    dimension: "TN",
    text: "如果要向家人解释这件事，你会怎么准备？",
    options: [
      { label: "A", text: "跟着感觉走，到时候自然会知道怎么说的，准备了也没用。", score: { TN: -1 } },
      { label: "B", text: "想了想但还没做，也不知道他们会怎么反应，先看看吧。", score: { TN: 0, EW: 0 } },
      { label: "C", text: "我已经收集了相关资料、案例和话术策略，有了系统的沟通方案，只是还没找到合适的时机。", score: { TN: 2 } }
    ]
  },
  {
    id: 27,
    dimension: "GL",
    text: "你以女孩子状态生活的频率是？",
    options: [
      { label: "A", text: "每天，这不是特殊模式，这就是我的正常生活。", score: { GL: 2 } },
      { label: "B", text: "有机会就是，没机会就等，不强求。", score: { GL: 0 } },
      { label: "C", text: "很少或者没有，目前还没有这样的生活状态。", score: { GL: 0, CF: 1 } }
    ]
  },
  {
    id: 28,
    dimension: "CF",
    text: "你对待'维护自己状态'这件事的态度？",
    options: [
      { label: "A", text: "长期投入，日复一日，没有假期，效果是积累出来的。", score: { CF: 2, GL: 2 } },
      { label: "B", text: "尽量维护，但不会为了它牺牲太多，有比它更重要的事。", score: { CF: 0, GL: 0 } },
      { label: "C", text: "什么时候想起来什么时候弄，这件事不需要变成负担。", score: { CF: -2, GL: -1 } }
    ]
  },
  {
    id: 29,
    dimension: "PR",
    text: "你理想中的周末是怎样的？",
    options: [
      { label: "A", text: "穿上最爱的裙子，和朋友出去逛街拍照，每一家店都要进去看一下。", score: { PR: 2, SH: 1 } },
      { label: "B", text: "在家安静度过，可能做做自己的事，偶尔刷刷手机看看朋友在干嘛。", score: { PR: 0, SH: 0 } },
      { label: "C", text: "没什么特别的安排，平时干嘛周末就干嘛，不太会去想这种事。", score: { PR: -1, SH: -1 } }
    ]
  },
  {
    id: 30,
    dimension: "GL",
    text: "一整个月都没机会做自己理想中的样子，你会？",
    options: [
      { label: "A", text: "非常难受，我会感到心里空空的。", score: { GL: 2 } },
      { label: "B", text: "有点难受，但还能接受，等有机会再说。", score: { GL: 0 } },
      { label: "C", text: "没什么，我心里知道我是谁，不需要靠外在表达。", score: { GL: -2 } }
    ]
  },
  {
    id: 31,
    dimension: "GL",
    text: "如果明天全世界都接受你了，你第一件事做什么？",
    options: [
      { label: "A", text: "打扮成最想成为的样子出门，不用再顾虑任何人。", score: { GL: 2, PR: 1 } },
      { label: "B", text: "大概还是照常过日子，但心里会轻松很多。", score: { GL: 0 } },
      { label: "C", text: "不一定有变化，我本来就不太在意外界的看法，或者没什么特别需要被接受的事。", score: { GL: -1, EW: -1 } }
    ]
  },
  {
    id: 32,
    dimension: "PR",
    text: "对你来说'做自己'最重要的是？",
    options: [
      { label: "A", text: "活出我内心的样子，不管外界标准，我想美就美，想梦幻就梦幻。", score: { PR: 2 } },
      { label: "B", text: "在现实和内心之间找到平衡，不必走极端。", score: { PR: 0 } },
      { label: "C", text: "理性认识自己，不欺骗自己，也不给自己制造不必要的幻想。", score: { PR: -2, TN: 1 } }
    ]
  },

  // ===== 未来篇 =====

  {
    id: 33,
    dimension: "XZ",
    text: "你有没有认真想过五年后你的状态是什么样的？",
    options: [
      { label: "A", text: "有，而且有清晰的目标和路径，并定期回顾执行情况。", score: { XZ: 2 } },
      { label: "B", text: "大概想过，但不会太具体，以后的事以后说。", score: { XZ: 0 } },
      { label: "C", text: "没有，未来是不确定的，计划没有变化快，我不做这种规划。", score: { XZ: -2 } }
    ]
  },
  {
    id: 34,
    dimension: "MB",
    text: "最近一次在'变美/变女孩子'这件事上的最大单笔消费是多少？",
    options: [
      { label: "A", text: "几千块以上，这算正常，不算什么特别的。", score: { MB: 2 } },
      { label: "B", text: "几百块，有计划有节制，偶尔超一点。", score: { MB: 0 } },
      { label: "C", text: "没有这方面的消费，或者目前不在这上面花钱。", score: { MB: -2 } }
    ]
  },
  {
    id: 35,
    dimension: "XZ",
    text: "关于身体改变（吃糖、手术等），你的态度是？",
    options: [
      { label: "A", text: "已经在进行/有计划，每个步骤都查好了资料、定好了时间。", score: { XZ: 2, CF: 1 } },
      { label: "B", text: "考虑过，但还没决定，还在收集信息。", score: { XZ: 0 } },
      { label: "C", text: "不考虑，或者这不是我目前需要面对的问题。", score: { XZ: -2 } }
    ]
  },
  {
    id: 36,
    dimension: "XZ",
    text: "你对'现在的自己'的整体态度是？",
    options: [
      { label: "A", text: "满意，我在按计划进行，阶段性成果可见。", score: { XZ: 1, CF: 1 } },
      { label: "B", text: "还行，有些地方不满意但接受过程，慢慢来。", score: { XZ: 0 } },
      { label: "C", text: "模糊，不想太具体地评价，评价了就要行动，行动了就要负责。", score: { XZ: -2, EW: -1 } }
    ]
  },
  {
    id: 37,
    dimension: "PR",
    text: "最后一题：你做这个测试的原因是？",
    options: [
      { label: "A", text: "我想了解自己是哪种类型，对自我探索很感兴趣。", score: { PR: 1, TN: 1, EW: 1 } },
      { label: "B", text: "无聊，打发时间，朋友发来的，随便做做。", score: { PR: 0, DK: 0 } },
      { label: "C", text: "只是好奇点进来的，感觉这些题跟我关系不大。（但你做到第37题了）", score: { EW: -2, PR: -1 } }
    ]
  }

];

if (typeof module !== 'undefined') {
  module.exports = { QUESTIONS };
}
