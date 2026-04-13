// MFTI 题库 - 39道题，10个维度
// 题目顺序：日常篇→认同篇→关系篇→深入篇→未来篇

const QUESTIONS = [

  // ===== 日常篇 =====

  {
    id: 1,
    dimension: "PR",
    text: "你理想中的日常是什么状态？",
    textEn: "What's your ideal daily life like?",
    options: [
      { label: "A", text: "每天都是少女漫，出门有BGM，路上有人偷看，回家有自拍回顾今天有多美，完美。", textEn: "Every day is a shoujo manga—walking out with background music, people peeking at you on the street, taking selfies at home to recap how beautiful today was. Perfect.", score: { PR: 2 } },
      { label: "B", text: "正常过日子就好，偶尔会幻想一下另一种生活，但也没认真想过。", textEn: "Just living normally is fine. I occasionally fantasize about another life, but never really think about it seriously.", score: { PR: 0 } },
      { label: "C", text: "没什么特别理想的状态，过好眼前就行了。", textEn: "No particular ideal state. Just take it one day at a time.", score: { PR: -2 } }
    ]
  },
  {
    id: 2,
    dimension: "SH",
    text: "群里说要聚会，你去吗？",
    textEn: "The group chat says there's a gathering—are you going?",
    options: [
      { label: "A", text: "去！提前一周选好造型，活动当天第一个到，最后一个走，拍了三百张照片。", textEn: "Yes! Pick out an outfit a week in advance, first to arrive and last to leave on the day, took 300 photos.", score: { SH: 2 } },
      { label: "B", text: "看心情，可能去，可能到门口了掉头，看当天精神状态。", textEn: "Depends on my mood. Might go, might turn around at the door. Depends on how I feel that day.", score: { SH: 0 } },
      { label: "C", text: "不去，在家更舒服，出门还要收拾，算了。", textEn: "No. Staying home is more comfortable. Going out requires getting ready anyway. Never mind.", score: { SH: -2 } }
    ]
  },
  {
    id: 3,
    dimension: "CF",
    text: "你有护肤/保养/健康管理流程吗？",
    textEn: "Do you have a skincare/maintenance/health routine?",
    options: [
      { label: "A", text: "有，而且每个步骤都有依据和时间节点，不能乱，乱了效果打折。", textEn: "Yes, and every step has reasoning and timing. Can't mess it up—if you do, the effectiveness drops.", score: { CF: 2 } },
      { label: "B", text: "大概有，但有时候懒得做全套，看心情。", textEn: "Sort of, but sometimes I'm too lazy to do the whole thing. Depends on my mood.", score: { CF: 0 } },
      { label: "C", text: "没有固定流程，今天心情好就多做几步，心情差就简单处理。", textEn: "No fixed routine. If I'm in a good mood I do more steps, if I'm in a bad mood I keep it simple.", score: { CF: -2 } }
    ]
  },
  {
    id: 4,
    dimension: "PR",
    text: "你朋友圈最近发的是什么？",
    textEn: "What did you post on your social media recently?",
    options: [
      { label: "A", text: "滤镜+文案+位置打卡，评论区被'好美'淹没，完美结束这一天。", textEn: "Filters + caption + location check-in. Comments flooded with 'so beautiful'. Perfect end to the day.", score: { PR: 2 } },
      { label: "B", text: "偶尔看看别人的内容，自己不太发相关的东西。", textEn: "Occasionally look at other people's content, don't really post related stuff myself.", score: { PR: 0 } },
      { label: "C", text: "我的社交账号和这面完全无关，不会留下任何痕迹。", textEn: "My social media accounts are completely unrelated to this side of me. Won't leave any traces.", score: { PR: -2 } }
    ]
  },
  {
    id: 5,
    dimension: "SH",
    text: "你的主要社交战场在哪？",
    textEn: "Where is your main social battlefield?",
    options: [
      { label: "A", text: "线下活动、姐妹饭局、各种见面，认识新朋友让我充电。", textEn: "Offline events, girl dinners, all kinds of meetups. Meeting new people recharges me.", score: { SH: 2 } },
      { label: "B", text: "社交媒体为主，偶尔线下，线下结束了要花时间恢复元气。", textEn: "Mostly social media, occasionally offline. Need time to recover after offline events.", score: { SH: 0 } },
      { label: "C", text: "我的社交圈是两个固定的、高度精选的好友，其他一概不需要。", textEn: "My social circle is two fixed, highly curated friends. Don't need anything else.", score: { SH: -2 } }
    ]
  },
  {
    id: 6,
    dimension: "AI",
    text: "看到照片里自己的脸，你的第一反应是？",
    textEn: "Seeing your face in a photo, what's your first reaction?",
    options: [
      { label: "A", text: "立刻找角度问题、光线问题、修图问题——不是我长得不行，是这镜头不行。", textEn: "Immediately find issues with angle, lighting, editing—it's not that I look bad, it's that the camera is bad.", score: { AI: 2 } },
      { label: "B", text: "还行吧，有好有坏，不特别在意。", textEn: "It's okay. Some good, some bad. Don't really care that much.", score: { AI: 0 } },
      { label: "C", text: "无所谓，长什么样不是我能控制的，也不打算花精力在这上面。", textEn: "Whatever. How I look isn't something I can control, and I'm not going to spend energy on it.", score: { AI: -2 } }
    ]
  },
  {
    id: 7,
    dimension: "MB",
    text: "你的衣柜里有多少女孩子的衣服/东西？",
    textEn: "How many girl clothes/things do you have in your closet?",
    options: [
      { label: "A", text: "一整个区域都是，分类整理，比我的其他衣服还整齐。", textEn: "An entire section is dedicated to it, organized by category—neater than my other clothes.", score: { MB: 2 } },
      { label: "B", text: "有几件，放在不起眼的角落，偶尔看看。", textEn: "Have a few pieces, kept in an inconspicuous corner. Look at them occasionally.", score: { MB: 0 } },
      { label: "C", text: "几乎没有，或者目前没有在这上面投入的打算。", textEn: "Almost none, or currently no plans to invest in this.", score: { MB: -2 } }
    ]
  },
  {
    id: 8,
    dimension: "SH",
    text: "周末下午突然有人组局，说就差你了，你？",
    textEn: "Someone's putting together a last-minute weekend gathering and says they're just missing you—what do you do?",
    options: [
      { label: "A", text: "已经在换衣服了，地址发来，我马上到！", textEn: "Already changing clothes—send me the address, I'm on my way!", score: { SH: 2 } },
      { label: "B", text: "看是什么局，有认识的人就去，全是生面孔就算了。", textEn: "Depends on what kind of gathering—if I know people there I'll go, all strangers then never mind.", score: { SH: 0 } },
      { label: "C", text: "谢谢邀请，但我周末的安排就是没有安排，下次一定——永远没有下次。", textEn: "Thanks for the invite, but my weekend plan is having no plans—next time for sure. And there's never a next time.", score: { SH: -2 } }
    ]
  },

  // ===== 认同篇 =====

  {
    id: 9,
    dimension: "AI",
    text: "出门前发现今天状态特别差，你会？",
    textEn: "Realizing you look especially bad before going out—what do you do?",
    options: [
      { label: "A", text: "焦虑到不想出门，或者花一小时补救到勉强能接受，迟到了也无所谓。", textEn: "Too anxious to go out, or spend an hour fixing it until barely acceptable—being late doesn't matter.", score: { AI: 2 } },
      { label: "B", text: "叹口气，随便收拾一下，反正又不是第一天状态不好。", textEn: "Sigh, throw something on—it's not the first day I've looked bad anyway.", score: { AI: 0 } },
      { label: "C", text: "什么状态差？我不存在'状态差'这个概念，出门就是出门。", textEn: "What do you mean 'looking bad'? That concept doesn't exist for me. Going out is just going out.", score: { AI: -2 } }
    ]
  },
  {
    id: 10,
    dimension: "PR",
    text: "你对'少女感'这个词的第一反应是？",
    textEn: "What's your first reaction to the term 'girlish charm'?",
    options: [
      { label: "A", text: "这就是我的人生追求，越少女越好，谁规定只能年轻才能少女？", textEn: "That's my life goal—the more girlish the better. Who says only young people can be girlish?", score: { PR: 2 } },
      { label: "B", text: "可以理解，但不是我追求的核心，我有更在意的东西。", textEn: "Understandable, but not what I'm focused on. I have more important things to care about.", score: { PR: 0 } },
      { label: "C", text: "不太有感觉，我更关注实际的事情，或者这个概念和我关联不大。", textEn: "Don't really feel it. I care more about practical things, or this concept doesn't relate to me much.", score: { PR: -2 } }
    ]
  },
  {
    id: 11,
    dimension: "TN",
    text: "你是怎么确认自己内心真实想法的？",
    textEn: "How do you confirm your true inner feelings?",
    options: [
      { label: "A", text: "就是一种感觉，某天突然清楚了，没有想太多。", textEn: "It's just a feeling. One day it suddenly became clear. Didn't think too much about it.", score: { TN: -2 } },
      { label: "B", text: "一开始是感觉，后来也查了一些资料，两者结合。", textEn: "Started with a feeling, then looked up some info later—combining both.", score: { TN: 0 } },
      { label: "C", text: "看了很多书、做了很多分析、对比了各种说法，最后才确定——或者我目前还没想清楚。", textEn: "Read many books, did lots of analysis, compared various perspectives before deciding—or I still haven't figured it out.", score: { TN: 2 } }
    ]
  },
  {
    id: 12,
    dimension: "AI",
    text: "你手机相册里，关于'自己好看的样子'的照片有多少？",
    textEn: "How many photos of 'yourself looking good' are in your phone gallery?",
    options: [
      { label: "A", text: "一个专属相册，按穿搭和妆容分类，不好看的当场删，只留能见人的。", textEn: "A dedicated album, categorized by outfit and makeup—bad ones deleted on the spot, only the presentable ones stay.", score: { AI: 2 } },
      { label: "B", text: "有一些，但大部分是风景和截图，自拍不是主角。", textEn: "Some, but mostly landscapes and screenshots—selfies aren't the main feature.", score: { AI: 0 } },
      { label: "C", text: "几乎没有，我不太拍自己，或者手机里都是别的乱七八糟的东西。", textEn: "Almost none—I don't really take pictures of myself, or my phone is full of random other stuff.", score: { AI: -2 } }
    ]
  },
  {
    id: 13,
    dimension: "SH",
    text: "一个人在家待了一周，你感觉怎么样？",
    textEn: "Stayed home alone for a week—how do you feel?",
    options: [
      { label: "A", text: "快憋死了，赶紧找人出去，哪怕只是逛超市也行。", textEn: "Almost suffocating. Need to find someone to go out with immediately—even just grocery shopping is fine.", score: { SH: 2 } },
      { label: "B", text: "还好，但开始觉得有点空，偶尔刷刷群聊看看动态。", textEn: "It's okay, but starting to feel a bit empty. Occasionally check group chats for updates.", score: { SH: 0 } },
      { label: "C", text: "这才叫生活，关掉消息提醒，人均打扰降到零，天堂了。", textEn: "This is what life is about. Turn off notifications, zero interruptions—heaven.", score: { SH: -2 } }
    ]
  },
  {
    id: 14,
    dimension: "AI",
    text: "你觉得'颜值'这件事对你的影响有多大？",
    textEn: "How much do you think 'appearance' affects you?",
    options: [
      { label: "A", text: "非常大，我经常觉得自己不够好，别人的评价会直接改变我一天的心情。", textEn: "A lot. I often feel I'm not good enough. Other people's opinions can directly change my mood for the day.", score: { AI: 2 } },
      { label: "B", text: "有一些影响，但不是决定性的，我可以靠别的东西撑住自信。", textEn: "Some effect, but not decisive. I can rely on other things to maintain my confidence.", score: { AI: 0 } },
      { label: "C", text: "几乎没影响，我对自己的认知不建立在外表上，或者已经过了在意的阶段了。", textEn: "Almost no effect. My self-perception isn't based on appearance, or I've already passed the stage of caring.", score: { AI: -2 } }
    ]
  },
  {
    id: 15,
    dimension: "CF",
    text: "你有没有为'变成自己想要的样子'设立过具体的时间计划？",
    textEn: "Have you set specific timelines for 'becoming who you want to be'?",
    options: [
      { label: "A", text: "有，详细的计划表，每个阶段该做什么都写好了。", textEn: "Yes, detailed plan—what to do at each stage is all written down.", score: { CF: 2, XZ: 2 } },
      { label: "B", text: "有大概的方向，但不那么具体，比较灵活。", textEn: "Have a general direction, but not too specific—pretty flexible.", score: { CF: 1, XZ: 1 } },
      { label: "C", text: "没有，不喜欢给自己设框架，顺其自然吧。", textEn: "No. Don't like putting myself in boxes. Let it happen naturally.", score: { CF: -2, XZ: -1 } }
    ]
  },
  {
    id: 16,
    dimension: "PR",
    text: "别人说『你看起来不像女孩子』，你的第一反应是？",
    textEn: "Someone says 'You don't look like a girl'—what's your first reaction?",
    options: [
      { label: "A", text: "内心一震然后修炼更猛，我要让你再也说不出这句话。", textEn: "Shocked inside, then work even harder—I'll make sure you never say that again.", score: { PR: 2, AI: 1 } },
      { label: "B", text: "哦，无所谓，本来也不一定像，或者这话跟我关系不大。", textEn: "Oh, whatever. Didn't necessarily look like one anyway, or this doesn't concern me much.", score: { PR: 0 } },
      { label: "C", text: "这说明对方有刻板印象，我来解释一下……", textEn: "That means they have stereotypes. Let me break it down for them...", score: { PR: -2 } }
    ]
  },

  // ===== 关系篇 =====

  {
    id: 17,
    dimension: "SH",
    text: "一个人去一家从没去过的咖啡店，你会？",
    textEn: "Going to a new coffee shop alone—what do you do?",
    options: [
      { label: "A", text: "直接去，坐吧台，跟咖啡师聊两句，说不定能认识新朋友。", textEn: "Just go, sit at the bar, chat with the barista—might make new friends.", score: { SH: 2 } },
      { label: "B", text: "可以去，但会选角落的位子，戴上耳机，享受独处但不排斥环境。", textEn: "Can go, but will pick a corner seat, put on headphones—enjoy solitude but don't reject the environment.", score: { SH: 0 } },
      { label: "C", text: "不会一个人去，那种场合让我不太自在，更习惯在自己的空间里待着。", textEn: "Won't go alone. That kind of place makes me uncomfortable. More used to staying in my own space.", score: { SH: -2 } }
    ]
  },
  {
    id: 18,
    dimension: "TN",
    text: "别人说『你想太多了，跟着感觉走就好』，你觉得？",
    textEn: "Someone says 'You think too much, just go with your feelings'—what do you think?",
    options: [
      { label: "A", text: "有道理，感觉才是真实的，想太多只会让人更乱。", textEn: "Makes sense. Feelings are real. Thinking too much just confuses people more.", score: { TN: -2 } },
      { label: "B", text: "感觉和分析都需要，不矛盾。", textEn: "Both feelings and analysis are needed. No contradiction.", score: { TN: 0 } },
      { label: "C", text: "感觉是一种信息，但未经检验的信息不可靠，我需要验证。", textEn: "Feelings are information, but untested information isn't reliable. I need verification.", score: { TN: 2 } }
    ]
  },
  {
    id: 19,
    dimension: "EW",
    text: "你身边重要的人（家人/伴侣/挚友）了解真实的你吗？",
    textEn: "Do the important people in your life (family/partner/close friends) know the real you?",
    options: [
      { label: "A", text: "了解，而且他们的反应比我预期的要……复杂，但总之已经说了。", textEn: "Yes, and their reactions were... more complicated than I expected, but I've told them anyway.", score: { EW: 2 } },
      { label: "B", text: "部分人了解，或者暂时和他们没有关系，这是我自己的事。", textEn: "Some know, or it's not related to them right now—this is my own business.", score: { EW: 0 } },
      { label: "C", text: "没有人了解，或者目前没有打算告诉别人。", textEn: "No one knows, or I currently have no plans to tell anyone.", score: { EW: -2 } }
    ]
  },
  {
    id: 20,
    dimension: "DK",
    text: "你需要找到和你一样的'姐妹'吗？",
    textEn: "Do you need to find 'sisters' like you?",
    options: [
      { label: "A", text: "非常需要，姐妹是我的情感充电站，没有她们我会枯萎。", textEn: "Very much needed. Sisters are my emotional charging station—I'd wither without them.", score: { DK: 2 } },
      { label: "B", text: "有更好，没有也可以活，但确实有帮助。", textEn: "Better to have, can live without, but it definitely helps.", score: { DK: 0 } },
      { label: "C", text: "不需要，我自己就能搞定一切，或者目前没这个需求。", textEn: "Don't need. I can handle everything myself, or currently no need for this.", score: { DK: -2 } }
    ]
  },
  {
    id: 21,
    dimension: "MB",
    text: "你愿意为'变成自己想成为的样子'花多少钱？",
    textEn: "How much are you willing to spend to 'become who you want to be'?",
    options: [
      { label: "A", text: "不设上限，这是优先级最高的投入，钱是可以再赚的。", textEn: "No limit. This is the highest priority investment—money can be earned again.", score: { MB: 2 } },
      { label: "B", text: "在预算范围内尽量多投入，但会做取舍。", textEn: "Invest as much as possible within budget, but will make trade-offs.", score: { MB: 1 } },
      { label: "C", text: "能省则省，或者目前没什么需要大笔投入的。", textEn: "Save as much as possible, or currently nothing needs big investment.", score: { MB: -2 } }
    ]
  },
  {
    id: 22,
    dimension: "EW",
    text: "在工作或学校里，你展现女孩子一面的程度是？",
    textEn: "At work or school, how much do you show your feminine side?",
    options: [
      { label: "A", text: "完全展现，同事/同学都知道，我就是我。", textEn: "Fully show it. Colleagues/classmates all know—I am who I am.", score: { EW: 2, GL: 1 } },
      { label: "B", text: "看情况，部分圈子知道，部分保持低调。", textEn: "Depends. Some circles know, some keep low profile.", score: { EW: 0 } },
      { label: "C", text: "完全不展现，或者目前没有什么需要展现的。", textEn: "Don't show it at all, or currently nothing needs to be shown.", score: { EW: -2 } }
    ]
  },
  {
    id: 23,
    dimension: "DK",
    text: "有人在群里说了一件让你觉得理解错了的事，你会？",
    textEn: "Someone says something in a group chat that you think is misunderstood—what do you do?",
    options: [
      { label: "A", text: "发消息纠正，然后参与讨论，我喜欢这种交流。", textEn: "Send a message to correct it, then join the discussion—I like this kind of exchange.", score: { DK: 1, SH: 1 } },
      { label: "B", text: "看了看，觉得也许有道理，不想卷入讨论，退出了。", textEn: "Read it, think maybe they have a point, don't want to get involved, exit.", score: { DK: -1 } },
      { label: "C", text: "发了一篇两千字的分析文章，然后等着看有没有人能看完。", textEn: "Post a 2000-word analysis, then wait to see if anyone finishes reading it.", score: { TN: 1, DK: -1 } }
    ]
  },
  {
    id: 24,
    dimension: "EW",
    text: "如果有人在公开场合问你『你是男生还是女生』，你怎么回应？",
    textEn: "If someone asks you 'Are you a boy or a girl?' in public—how do you respond?",
    options: [
      { label: "A", text: "直接说我是女生，这有什么需要回避的。", textEn: "Directly say I'm a girl—nothing to hide here.", score: { EW: 2 } },
      { label: "B", text: "看情况，有时候直说，有时候打哈哈过去。", textEn: "Depends. Sometimes say it directly, sometimes joke it off.", score: { EW: 0 } },
      { label: "C", text: "反问他：你为什么需要知道这个？然后保持微笑。", textEn: "Ask back: Why do you need to know that? Then keep smiling.", score: { EW: -2 } }
    ]
  },

  // ===== 深入篇 =====

  {
    id: 25,
    dimension: "EW",
    text: "你的社交媒体账号，和你'这一面'的关系是？",
    textEn: "What's the relationship between your social media accounts and 'this side' of you?",
    options: [
      { label: "A", text: "就是同一个账号，我就是我，没什么好藏的。", textEn: "Same account—I am who I am, nothing to hide here.", score: { EW: 2, GL: 1 } },
      { label: "B", text: "有单独的账号，但也算是半公开的，不是特别怕被发现。", textEn: "Have a separate account, but it's semi-public—not particularly afraid of being found out.", score: { EW: 0 } },
      { label: "C", text: "严格隔离，或者我不在社交媒体上展示任何相关的部分。", textEn: "Strictly separated, or I don't show any related parts on social media.", score: { EW: -2 } }
    ]
  },
  {
    id: 26,
    dimension: "EW",
    text: "和新认识的朋友聊得很投缘，对方问起你有没有什么不为人知的一面，你怎么回？",
    textEn: "You're getting along well with a new friend, and they ask if you have a side that not many people know about—how do you respond?",
    options: [
      { label: "A", text: "会直接说我这方面的情况，对方愿意听的话也可以多聊一点。", textEn: "Will directly talk about this aspect of myself, and if they're willing to listen, can chat a bit more.", score: { EW: 2 } },
      { label: "B", text: "先含糊带过，如果对方继续问再考虑说多少，或者等更熟了再说。", textEn: "First be vague about it, and if they keep asking then consider how much to share, or wait until we're closer.", score: { EW: 0 } },
      { label: "C", text: "不会说，或者目前没有打算和刚认识的人聊这些。", textEn: "Won't say, or currently have no plans to talk about this with someone I just met.", score: { EW: -2 } }
    ]
  },
  {
    id: 27,
    dimension: "DK",
    text: "遇到困难的时候，你第一步是？",
    textEn: "When facing difficulties, what's your first step?",
    options: [
      { label: "A", text: "发给几个信任的朋友，寻求支持，群策群力。", textEn: "Send to a few trusted friends, seek support, brainstorm together.", score: { DK: 2, SH: 1 } },
      { label: "B", text: "先自己想，想不通了再问，不到最后不求人。", textEn: "Think by myself first, ask if can't figure it out—don't ask for help unless last resort.", score: { DK: -1 } },
      { label: "C", text: "查资料、找文献、自己研究，我就是自己的专家。", textEn: "Look up information, find literature, research by myself—I'm my own expert.", score: { DK: -2, TN: 1 } }
    ]
  },
  {
    id: 28,
    dimension: "TN",
    text: "你有没有研究过关于跨性别相关的学术文章或心理学资料？",
    textEn: "Have you researched academic articles or psychological materials about transgender topics?",
    options: [
      { label: "A", text: "没有，自己的感觉和经验就够了，不需要学术背书。", textEn: "No. My own feelings and experience are enough—don't need academic validation.", score: { TN: -2 } },
      { label: "B", text: "看过一些科普文章，没到学术文献的程度。", textEn: "Read some popular science articles, not to the level of academic literature.", score: { TN: 0 } },
      { label: "C", text: "深入研究过，有收藏夹和笔记，还能引用具体文献。", textEn: "Research thoroughly. Have bookmarks and notes, can cite specific literature.", score: { TN: 2 } }
    ]
  },
  {
    id: 29,
    dimension: "AI",
    text: "出门前照镜子，你通常会？",
    textEn: "Looking in the mirror before going out—what do you usually do?",
    options: [
      { label: "A", text: "反复确认每个细节，头发、妆容、穿搭，有一处不满意就浑身不自在，改到满意为止。", textEn: "Check every detail repeatedly—hair, makeup, outfit. One imperfection makes me uncomfortable, fix it until satisfied.", score: { AI: 2 } },
      { label: "B", text: "大概看一眼，差不多就行，又不是去选美。", textEn: "Quick glance—good enough, it's not a beauty pageant.", score: { AI: 0 } },
      { label: "C", text: "照镜子？出门前看一眼确认没把衣服穿反就行了。", textEn: "Mirror? Just check my clothes aren't inside out and I'm good.", score: { AI: -2 } }
    ]
  },
  {
    id: 30,
    dimension: "GL",
    text: "你以女孩子状态生活的频率是？",
    textEn: "How often do you live as your feminine self?",
    options: [
      { label: "A", text: "每天，这不是特殊模式，这就是我的正常生活。", textEn: "Every day. This isn't a special mode—this is my normal life.", score: { GL: 2 } },
      { label: "B", text: "有机会就是，没机会就等，不强求。", textEn: "When there's opportunity yes, no opportunity wait—don't force it.", score: { GL: 0 } },
      { label: "C", text: "很少或者没有，目前还没有这样的生活状态。", textEn: "Rarely or never—don't have this lifestyle yet.", score: { GL: -2 } }
    ]
  },
  {
    id: 31,
    dimension: "CF",
    text: "你对待'维护自己状态'这件事的态度？",
    textEn: "What's your attitude towards 'maintaining your state'?",
    options: [
      { label: "A", text: "长期投入，日复一日，没有假期，效果是积累出来的。", textEn: "Long-term investment, day after day, no days off—results come from accumulation.", score: { CF: 2, GL: 2 } },
      { label: "B", text: "尽量维护，但不会为了它牺牲太多，有比它更重要的事。", textEn: "Try to maintain, but won't sacrifice too much for it—there are more important things.", score: { CF: 0, GL: 0 } },
      { label: "C", text: "什么时候想起来什么时候弄，这件事不需要变成负担。", textEn: "Do it when I think of it—this doesn't need to become a burden.", score: { CF: -2, GL: -1 } }
    ]
  },
  {
    id: 32,
    dimension: "GL",
    text: "一整个月都没机会做自己理想中的样子，你会？",
    textEn: "A whole month without chance to be your ideal self—what do you do?",
    options: [
      { label: "A", text: "非常难受，我会感到心里空空的。", textEn: "Very uncomfortable. I feel empty inside.", score: { GL: 2 } },
      { label: "B", text: "有点难受，但还能接受，等有机会再说。", textEn: "A bit uncomfortable, but can accept it—wait for opportunity.", score: { GL: 0 } },
      { label: "C", text: "没什么，我心里知道我是谁，不需要靠外在表达。", textEn: "It's fine. I know who I am inside—don't need external expression.", score: { GL: -2 } }
    ]
  },

  // ===== 未来篇 =====

  {
    id: 33,
    dimension: "GL",
    text: "如果明天全世界都接受你了，你第一件事做什么？",
    textEn: "If the whole world accepts you tomorrow—what do you do first?",
    options: [
      { label: "A", text: "打扮成最想成为的样子出门，不用再顾虑任何人。", textEn: "Dress up as who I most want to be and go out—no more worrying about anyone.", score: { GL: 2, PR: 1 } },
      { label: "B", text: "大概还是照常过日子，但心里会轻松很多。", textEn: "Probably still live as usual, but feel much more relaxed inside.", score: { GL: 0 } },
      { label: "C", text: "不一定有变化，我本来就不太在意外界的看法，或者没什么特别需要被接受的事。", textEn: "Might not change. I don't really care about others' opinions anyway, or nothing special needs accepting.", score: { GL: -1 } }
    ]
  },
  {
    id: 34,
    dimension: "PR",
    text: "对你来说'做自己'最重要的是？",
    textEn: "For you, what's most important about 'being yourself'?",
    options: [
      { label: "A", text: "活出我内心的样子，不管外界标准，我想美就美，想梦幻就梦幻。", textEn: "Live as my inner self—regardless of external standards. Want to be beautiful, want to be dreamy.", score: { PR: 2 } },
      { label: "B", text: "在现实和内心之间找到平衡，不必走极端。", textEn: "Find balance between reality and inner self—don't need to go to extremes.", score: { PR: 0 } },
      { label: "C", text: "理性认识自己，不欺骗自己，也不给自己制造不必要的幻想。", textEn: "Know myself rationally—don't deceive myself, don't create unnecessary fantasies.", score: { PR: -2, TN: 1 } }
    ]
  },
  {
    id: 35,
    dimension: "XZ",
    text: "你有没有认真想过五年后你的状态是什么样的？",
    textEn: "Have you seriously thought about what your state will be like in five years?",
    options: [
      { label: "A", text: "有，而且有清晰的目标和路径，并定期回顾执行情况。", textEn: "Yes, and have clear goals and paths, regularly review progress.", score: { XZ: 2 } },
      { label: "B", text: "大概想过，但不会太具体，以后的事以后说。", textEn: "Thought about it roughly, but not too specific—future things future me will handle.", score: { XZ: 0 } },
      { label: "C", text: "没有，未来是不确定的，计划没有变化快，我不做这种规划。", textEn: "No. Future is uncertain, plans can't keep up with change—I don't make this kind of plans.", score: { XZ: -2 } }
    ]
  },
  {
    id: 36,
    dimension: "MB",
    text: "最近一次在'变美/变女孩子'这件事上的最大单笔消费是多少？",
    textEn: "What was your biggest single purchase recently for 'becoming more beautiful/becoming a girl'?",
    options: [
      { label: "A", text: "几千块以上，这算正常，不算什么特别的。", textEn: "Over a few thousand yuan—this is normal, nothing special.", score: { MB: 2 } },
      { label: "B", text: "几百块，有计划有节制，偶尔超一点。", textEn: "A few hundred yuan—planned and controlled, occasionally go over a bit.", score: { MB: 0 } },
      { label: "C", text: "没有这方面的消费，或者目前不在这上面花钱。", textEn: "No purchases in this area, or currently not spending money on this.", score: { MB: -2 } }
    ]
  },
  {
    id: 37,
    dimension: "XZ",
    text: "关于身体改变（吃糖、手术等），你的态度是？",
    textEn: "Regarding physical changes (HRT, surgery, etc.)—what's your attitude?",
    options: [
      { label: "A", text: "已经在进行/有计划，每个步骤都查好了资料、定好了时间。", textEn: "Already in progress/have plans—researched every step and set timelines.", score: { XZ: 2, CF: 1 } },
      { label: "B", text: "考虑过，但还没决定，还在收集信息。", textEn: "Thought about it, but haven't decided—still gathering information.", score: { XZ: 0 } },
      { label: "C", text: "不考虑，或者这不是我目前需要面对的问题。", textEn: "Not considering, or this isn't something I need to face right now.", score: { XZ: -2 } }
    ]
  },
  {
    id: 38,
    dimension: "XZ",
    text: "你对'现在的自己'的整体态度是？",
    textEn: "What's your overall attitude towards 'your current self'?",
    options: [
      { label: "A", text: "满意，我在按计划进行，阶段性成果可见。", textEn: "Satisfied. I'm progressing according to plan—phased results visible.", score: { XZ: 1, CF: 1 } },
      { label: "B", text: "还行，有些地方不满意但接受过程，慢慢来。", textEn: "It's okay. Some areas aren't satisfied but accept the process—take it slow.", score: { XZ: 0 } },
      { label: "C", text: "模糊，不想太具体地评价，评价了就要行动，行动了就要负责。", textEn: "Vague. Don't want to evaluate too specifically—once you evaluate, you must act; once you act, you must take responsibility.", score: { XZ: -2 } }
    ]
  },
  {
    id: 39,
    dimension: "PR",
    text: "最后一题：你做这个测试的原因是？",
    textEn: "Last question: Why are you taking this test?",
    options: [
      { label: "A", text: "我想了解自己是哪种类型，对自我探索很感兴趣。", textEn: "I want to know what type I am—very interested in self-exploration.", score: { PR: 1, TN: 1, EW: 1 } },
      { label: "B", text: "无聊，打发时间，朋友发来的，随便做做。", textEn: "Bored, killing time—friend sent it, just taking it casually.", score: { PR: 0, DK: 0 } },
      { label: "C", text: "只是好奇点进来的，感觉这些题跟我关系不大。（但你做到最后一题了）", textEn: "Just clicked in out of curiosity—feel these questions don't relate to me much. (But you made it to the last question)", score: { EW: -1, PR: -1 } }
    ]
  }

];

if (typeof module !== 'undefined') {
  module.exports = { QUESTIONS };
}
