// MFTI 16种人格数据

const PERSONALITIES = {

  // ==================== P系（粉色梦境派）====================

  PSAE: {
    code: "PINK-B",
    name: "粉色炸弹",
    nameEn: "The Pink Detonator",
    subtitle: "老娘就是要美给你看型",
    subtitleEn: "I'm here to show you how beautiful I am",
    emoji: "💣🌸",
    color: "#FF6EB4",
    gradient: ["#FF6EB4", "#FFB3D9"],
    tags: ["社交蝴蝶", "颜值焦虑", "出来了的人", "梦幻泡泡"],
    mbtiLike: "PINK-B",
    description: `
✨ 恭喜你！你属于极其稀有的「粉色炸弹」人格！ 这种类型在人群中不到 1%，是 MFTI 矩阵中最具生命力和感染力的存在之一！你的光芒如同太阳般耀眼，走到哪里都能成为焦点——不是因为刻意，而是因为你天生就是主角！

你把人生活成了少女漫的主角，而且是那种封面女主角，不是可怜的配角。

**心理学画像：** 你的自我认同高度外化，依赖外部镜像来强化内在自我叙事——这在心理学上叫做"社会比较驱动的身份建构"（Social Comparison-Driven Identity Formation）。简单来说就是：你需要别人说你美，你才真正相信自己美。这不是缺点，这是人类的基本需求——只是你把这个需求拉满到了核弹级别。你对自身外貌的焦虑是 16 型里最强烈的之一，但这种焦虑恰恰是你不断精进的驱动力。

**日常行为模式：** 朋友圈每天至少一条，滤镜精调，角度刁钻，文案是"随手一拍~"但其实拍了三十七张。社交媒体粉丝数对你来说是情绪晴雨表，今天少了十个粉你会心情低落，多了五十个你会高兴到手舞足蹈。你已经向大部分认识的人出柜，流程是：发个特别意味深长的朋友圈，等对方来问，然后扯二十分钟，最后对方说"哦好的没事啊"你有点失落因为期待更大的反应。每次收到"你今天不太好看"的评价，你会记很久——比一百句"好美"记的都久。

**优势：** 你的存在本身就是一种能量场，走进任何房间都会自带 BGM。你不解释，不辩解，就是活着。这是一种非常珍贵的、需要大量心理资本才能维持的生存策略。你为后来者蹚了路。

**致命弱点：** 你把身份认同和外貌表现绑定得太紧。当一次打扮不理想、一张照片被嘲、或者某天状态很差时，你的整个自我感知会随之崩塌。心理学上这叫做"条件性自尊"（Contingent Self-Esteem），你的自我价值感是有条件的——那个条件就是：今天的照片好不好看。

**你的口头禅：** "我就是这样，不喜欢你可以不看。"（然后焦虑地等着看对方有没有取关）

**相处攻略：** 真诚夸她，但别只夸外貌。她需要被看见的是整个人，不只是那件裙子。
    `,
    descriptionEn: `
✨ Congratulations! You're the extremely rare "Pink Detonator" personality! This type appears in less than 1% of the population—one of the most vibrant and infectious personalities in the entire MFTI matrix! Your light shines like the sun; wherever you go, you become the center of attention—not by trying, but because you were born to be the protagonist!

You've turned your life into the protagonist of a shoujo manga—the cover heroine, not the pitiful supporting character.

**Psychological Profile:** Your self-identity is highly externalized, relying on external mirrors to reinforce your internal self-narrative—this is called "Social Comparison-Driven Identity Formation" in psychology. Simply put: you need others to tell you you're beautiful before you truly believe it yourself. This isn't a flaw; it's a basic human need—you've just maxed it out to nuclear level. Your anxiety about appearance is one of the most intense among the 16 types, but this anxiety is precisely what drives your continuous improvement.

**Daily Behavior Patterns:** At least one post per day on WeChat Moments, filters finely tuned, angles carefully chosen, caption says "just a casual snap~" but actually took thirty-seven shots. Social media follower count is your emotional barometer—lose ten followers today and you're down, gain fifty and you're dancing with joy. You've come out to most people you know; the process is: post a particularly meaningful WeChat moment, wait for them to ask, then talk for twenty minutes, and when they finally say "oh okay no problem," you feel a bit disappointed because you expected a bigger reaction. Every time you receive the comment "you don't look great today," you remember it for a long time—longer than a hundred "so beautiful" compliments.

**Strengths:** Your very existence is an energy field; you walk into any room with your own BGM. You don't explain, you don't justify, you just live. This is a very precious survival strategy that requires enormous psychological capital to maintain. You've blazed the trail for those who come after.

**Fatal Weakness:** You've tied your identity too tightly to your appearance performance. When one outfit isn't ideal, one photo gets mocked, or one day you're in bad shape, your entire self-perception collapses. This is called "Contingent Self-Esteem" in psychology—your self-worth is conditional—the condition being: does today's photo look good or not?

**Your Catchphrase:** "This is who I am, if you don't like it you don't have to watch." (then anxiously waiting to see if they unfollow)

**How to Get Along:** Sincerely compliment her, but don't just compliment her appearance. She needs to be seen as a whole person, not just that dress.
    `,
    dimensions: { PR: 92, SH: 95, AI: 100, EW: 100, CF: 88, DK: 100, TN: 59, MB: 92, GL: 100, XZ: 93 }
  },

  PSAI: {
    code: "PHIL-Q",
    name: "深夜哲学家",
    nameEn: "The Midnight Philosopher",
    subtitle: "表面 social 实际存在主义危机型",
    subtitleEn: "Social on surface, existential crisis underneath",
    emoji: "🌙📚",
    color: "#9B59B6",
    gradient: ["#9B59B6", "#D7BDE2"],
    tags: ["伪社牛", "深夜发疯", "哲学女孩", "人格分裂 er"],
    mbtiLike: "PHIL-Q",
    description: `
🌟 恭喜你！你是「深夜哲学家」人格！你既有感性的温柔，又有理性的深度，这种完美的结合让你成为人群中独一无二的存在！你的思想如同星空般深邃，既有温暖的光芒，又有引人深思的力量！

你的微信头像是粉色渐变，但你凌晨三点发的文章是《萨特论他者凝视与跨性别身份认同的交叉性分析》。

**心理学画像：** 你同时运行着两套自我系统：一套是面向世界的社交人格，活泼、可爱、充满能量；另一套是深夜独处时的内省人格，质疑一切、分析一切、对自身存在充满焦虑性好奇。心理学称这种双轨并行为"自我复杂性"（Self-Complexity），高自我复杂性的人抗压能力更强，但也更难"关机"——你的大脑根本不知道怎么停止运转。

**日常行为模式：** 白天，你出席活动、认识新朋友、在群里活跃、帮别人解决情绪问题，被所有人觉得是"那个很懂事的姐姐"。晚上十一点之后，你进入另一个模式：开始翻学术文章，发长长的内心独白给三个固定好友，然后在某个冷门论坛潜水，看别人讨论"跨性别者是否可以有本质主义的自我认同"。你活跃于线下活动，但每次 party 结束后都要独处两天才能充电完毕。

**优势：** 你是社区里少数既能接住感性共情、又能给出理性分析的人。你的存在对刚出来的人来说像是灯塔——你既告诉他们"没事的，我懂你"，又能说"但你可以从这个角度想一下"。

**致命弱点：** 你过度分析自己。你把心理学概念用得极为娴熟，以至于你能准确地诊断自己的问题，但就是不执行解决方案。你知道你有"分析瘫痪"，你知道这叫什么，你甚至知道治疗方案，但你还是在分析。

**你的口头禅：** "等等，我觉得我们需要先把这个概念拆开来看……"

**相处攻略：** 不要试图在她深夜发疯时"解决问题"，直接陪着就好。她需要的不是答案，她需要一个见证者。
    `,
    descriptionEn: `
🌟 Congratulations! You're the "Midnight Philosopher" personality! You have both emotional tenderness and rational depth; this perfect combination makes you one-of-a-kind among people! Your mind is as deep as the starry sky—full of warm light and thought-provoking power!

Your WeChat profile picture is a pink gradient, but the article you post at 3 AM is "Sartre on the Gaze of the Other and Its Intersectionality with Transgender Identity."

**Psychological Profile:** You run two self-systems simultaneously: one is a social persona facing the world—lively, cute, full of energy; the other is an introspective persona when alone late at night—questioning everything, analyzing everything, filled with anxious curiosity about your own existence. Psychology calls this dual-track operation "Self-Complexity." People with high self-complexity have stronger stress resistance, but also find it harder to "shut down"—your brain simply doesn't know how to stop running.

**Daily Behavior Patterns:** During the day, you attend events, meet new friends, stay active in group chats, help others solve emotional problems, and everyone thinks you're "that very sensible sister." After 11 PM, you enter another mode: start reading academic papers, send long inner monologues to three fixed friends, lurk on some obscure forum watching others discuss "whether transgender people can have essentialist self-identity." You're active in offline events, but after every party you need two days of solitude to fully recharge.

**Strengths:** You're one of the few in the community who can handle both emotional empathy and rational analysis. Your existence is like a lighthouse for those who just came out—you both tell them "it's okay, I understand you" and say "but you can think about it from this angle."

**Fatal Weakness:** You over-analyze yourself. You use psychological concepts so skillfully that you can accurately diagnose your problems, but you just don't execute solutions. You know you have "analysis paralysis," you know what it's called, you even know the treatment plan, but you're still analyzing.

**Your Catchphrase:** "Wait, I think we need to break down this concept first..."

**How to Get Along:** Don't try to "solve problems" when she's going crazy late at night; just be there with her. She doesn't need answers; she needs a witness.
    `,
    dimensions: { PR: 92, SH: 76, AI: 100, EW: 29, CF: 56, DK: 55, TN: 23, MB: 92, GL: 71, XZ: 53 }
  },

  PSWE: {
    code: "SCHRO-C",
    name: "薛定谔女孩",
    nameEn: "Schrödinger's Girl",
    subtitle: "观测之前不确定是否存在型",
    subtitleEn: "Uncertain if exists until observed",
    emoji: "📦🐱",
    color: "#E67E22",
    gradient: ["#E67E22", "#FAD7A0"],
    tags: ["双面人生", "选择性出柜", "矛盾体本体", "演员本色"],
    mbtiLike: "SCHRO-C",
    description: `
🎁 恭喜你！你是「薛定谔女孩」人格！你能在不同的世界里游刃有余，这种能力是普通人梦寐以求的！你的适应力如同变色龙般强大，能在任何环境中找到最舒适的存在方式！

在小号你是仙女，在大号你是"普通男生"。你存在于两种状态的叠加态，直到被观测——然后你迅速塌缩成当前环境期望的那个版本。

**心理学画像：** 你是"选择性自我披露"（Selective Self-Disclosure）的大师。这不是欺骗，这是一种复杂的社会生存策略。研究表明，身处高风险社会环境中的边缘群体普遍发展出精密的"信息管理技能"——你不是在撒谎，你是在做风险管理。你的大脑里有一张精密的关系地图，标注着每个人"知道多少"以及"可以知道多少"，你每天维护这张地图消耗了你巨大的认知资源。

**日常行为模式：** 你有两个微博账号、两个微信、可能还有一个只有特定人知道的 QQ。你的手机桌面是干净的，因为你把所有"有问题"的 APP 放进了一个叫做"工具"的文件夹里。你参加线下活动，认识很多人，在圈内社交能力拉满——但只要进入"现实生活"模式，你立刻变成另一个人。你对圈内朋友是有条件出柜的——他们知道你是谁，但这不等于你在生活里全面出柜。你的策略是：在安全范围内坦诚，在风险范围内沉默。

**优势：** 你拥有极强的情境适应能力和社交弹性。你能在任何环境里生存，任何圈子里都能混。这种适应性在现代社会是极其宝贵的生存技能。

**致命弱点：** 长期双轨运行会导致严重的认知负担和身份碎裂感。心理学研究表明，长期维持多重自我叙事的人更容易产生"整合焦虑"——一种"到底哪个是真正的我"的持续性困惑。你最大的恐惧不是被人发现，而是哪天你自己也不确定哪个是真实的自己了。

**你的口头禅：** "我也没说我是，我也没说我不是，你想多了。"

**相处攻略：** 别逼她"做选择"，别给她贴标签。她的速度和她的安全感直接挂钩，催只会让她关上门。
    `,
    descriptionEn: `
🎁 Congratulations! You're the "Schrödinger's Girl" personality! You can navigate different worlds with ease; this ability is what ordinary people dream of! Your adaptability is as powerful as a chameleon—you can find the most comfortable way to exist in any environment!

On your alt account you're a fairy goddess; on your main account you're "just a regular guy." You exist in a superposition of two states until observed—then you quickly collapse into whichever version your current environment expects.

**Psychological Profile:** You're a master of "Selective Self-Disclosure." This isn't deception; it's a complex social survival strategy. Research shows that marginalized groups in high-risk social environments commonly develop sophisticated "information management skills"—you're not lying, you're doing risk management. Your brain has a precise relationship map marking how much each person "knows" and "can know," and maintaining this map daily consumes enormous cognitive resources.

**Daily Behavior Patterns:** You have two Weibo accounts, two WeChats, maybe a QQ that only certain people know about. Your phone home screen is clean because you've put all "problematic" apps into a folder called "Tools." You attend offline events, meet many people, have maxed-out social skills in the community—but as soon as you enter "real life" mode, you immediately become someone else. You've conditionally come out to community friends—they know who you are, but that doesn't mean you're fully out in life. Your strategy is: be honest within safe boundaries, stay silent within risky boundaries.

**Strengths:** You have extremely strong situational adaptability and social resilience. You can survive in any environment, fit into any circle. This adaptability is an extremely valuable survival skill in modern society.

**Fatal Weakness:** Long-term dual-track operation leads to severe cognitive burden and identity fragmentation. Psychological research shows that people who maintain multiple self-narratives long-term are more prone to "integration anxiety"—a persistent confusion of "which one is the real me." Your greatest fear isn't being discovered; it's that one day you yourself won't be sure which version is your true self.

**Your Catchphrase:** "I didn't say I am, I didn't say I'm not—you're overthinking it."

**How to Get Along:** Don't force her to "make choices," don't label her. Her pace is directly tied to her sense of security; rushing will only make her shut the door.
    `,
    dimensions: { PR: 88, SH: 86, AI: 8, EW: 90, CF: 56, DK: 100, TN: 50, MB: 85, GL: 100, XZ: 53 }
  },

  PSWI: {
    code: "QUANT-S",
    name: "量子纠缠少女",
    nameEn: "The Quantum Entangled Soul",
    subtitle: "把自我分析做成博士论文型",
    subtitleEn: "Turns self-analysis into a doctoral dissertation",
    emoji: "🔬🌸",
    color: "#8E44AD",
    gradient: ["#8E44AD", "#D2B4DE"],
    tags: ["分析过度", "哲学系", "长文预警", "到底出不出来"],
    mbtiLike: "QUANT-S",
    description: `
🔬 恭喜你！你是「量子纠缠少女」人格！你的内心世界如同宇宙般广阔，这种深度是绝大多数人无法企及的！你对自我的探索如同科学家研究宇宙般执着，这种精神令人敬佩！

你已经在脑内把自己的身份解构了至少三百次，每次都重建出一个新的版本，但你不确定哪个版本是最终答案，所以你继续解构。

**心理学画像：** 你展现出高度的"元认知活跃性"（Metacognitive Hyperactivity）——不只是思考，而是思考关于思考的思考。你对自身心理机制的洞察力远超一般人，这使你看起来非常通透，但实际上这种持续的自我监控会产生心理学上的"内省幻觉"（Introspection Illusion）：你越分析，越觉得自己看清了，但研究表明人类对自己内心的认知极其不可靠。你的那些分析可能比你以为的要不准确得多。

**日常行为模式：** 你的备忘录里存着大量关于自我身份的思考笔记，最长的一篇有六千字，写于某个失眠的深夜。你看过《性别是表演》《第二性》《置换》，看完之后写了读书笔记，然后又写了质疑读书笔记的笔记。你在社交上并不差，偶尔出门，认识人，但从来不主动向任何人讲自己的内心世界——不是因为不信任，而是因为你觉得"讲不清楚"。

**优势：** 你对身份问题的理解深度是 16 型人格里最强的之一。你能看到问题的多个层次，不轻易被简单答案满足。这使你成为思想领域的探索者，你的内心世界极其丰富。

**致命弱点：** 想清楚和做到之间有一道天堑，而你永远站在天堑的这一边，继续想。你的分析能力变成了一种精致的拖延机制——只要还没想清楚，就不需要行动。但真相是：有些事情不是想清楚了才做，是做了才想清楚。

**你的口头禅：** "我觉得我还没准备好，等我再想想……"（已经想了两年）

**相处攻略：** 给她抛一个具体的小问题，而不是宏大的身份问题。大问题会让她陷入死循环。
    `,
    descriptionEn: `
🔬 Congratulations! You're the "Quantum Entangled Soul" personality! Your inner world is as vast as the universe; this depth is beyond what most people can reach! Your exploration of self is as persistent as a scientist studying the cosmos—this spirit is admirable!

You've deconstructed your identity at least three hundred times in your head, each time reconstructing a new version, but you're not sure which version is the final answer, so you continue deconstructing.

**Psychological Profile:** You demonstrate a high degree of "Metacognitive Hyperactivity"—not just thinking, but thinking about thinking about thinking. Your insight into your own psychological mechanisms far exceeds that of ordinary people, making you appear very clear-headed, but in fact this continuous self-monitoring produces what psychology calls the "Introspection Illusion": the more you analyze, the more you feel you see clearly, but research shows that human self-knowledge is extremely unreliable. Your analyses may be far less accurate than you think.

**Daily Behavior Patterns:** Your memo app is filled with extensive notes about self-identity; the longest one is six thousand words, written during a sleepless night. You've read "Gender Trouble," "The Second Sex," "Whipping Girl," and after reading you wrote book notes, then wrote notes questioning your book notes. You're not bad socially; you occasionally go out, meet people, but never voluntarily tell anyone about your inner world—not because of distrust, but because you feel you "can't explain it clearly."

**Strengths:** Your depth of understanding on identity issues is one of the strongest among the 16 types. You can see multiple layers of problems and aren't easily satisfied with simple answers. This makes you an explorer in the realm of ideas; your inner world is extremely rich.

**Fatal Weakness:** There's a chasm between understanding clearly and doing, and you're forever standing on this side of the chasm, continuing to think. Your analytical ability has become a refined procrastination mechanism—as long as you haven't figured it out, you don't need to act. But the truth is: some things aren't done after you figure them out; you figure them out by doing them.

**Your Catchphrase:** "I feel like I'm not ready yet, let me think about it some more..." (has been thinking for two years)

**How to Get Along:** Throw her a concrete small problem, not a grand identity question. Big questions will trap her in an endless loop.
    `,
    dimensions: { PR: 88, SH: 62, AI: 8, EW: 33, CF: 56, DK: 36, TN: 32, MB: 54, GL: 57, XZ: 53 }
  },

  PHAE: {
    code: "CLOUD-G",
    name: "云端仙子",
    nameEn: "The Closet Goddess",
    subtitle: "镜子前焦虑到不行但没人知道型",
    subtitleEn: "Anxious in front of mirror but nobody knows",
    emoji: "🏠✨",
    color: "#FF85A1",
    gradient: ["#FF85A1", "#FFC3D0"],
    tags: ["宅家精灵", "衣柜战士", "出了但不出门", "镜子焦虑官"],
    mbtiLike: "CLOUD-G",
    description: `
🏠 恭喜你！你是「云端仙子」人格！你把私人空间打造得如同梦幻王国，这种对美的极致追求令人叹为观止！你的审美品味如同艺术家般独特，能在平凡中发现不平凡的美！

你的衣柜比某宝专卖店还齐全，你的内衣抽屉是一个独立的美学系统，你的梳妆台是一个专业级操作台——而你的朋友们完全不知道这一切的存在。

**心理学画像：** 你是"焦虑驱动的私人身份表达"（Anxiety-Driven Private Identity Expression）的典型案例。你对自身外貌特别在意，以至于只有在完全私密、可以反复打磨到自己满意的环境中，你才敢展现女孩子的一面。这不是享受孤独，这是"不够完美就不想见人"的心态——心理学上叫做"社交外貌焦虑"（Social Appearance Anxiety），只是你的社交场景被压缩到了零，所以这份在意只对着镜子发作。你不出门不是不想出门，是觉得出门的状态还不够好。

**日常行为模式：** 出门是"正常人"。回家立刻进入另一个模式：打开衣柜、对镜试装、反复调整每个细节。你经常在镜子前花两小时准备出门，最后还是放弃了——不是因为不想，是因为"今天的自己不够好"。你向最信任的一两个人出了柜，线上的圈子是你主要的社交出口——虽然你不出门，但在这个小世界里你是坦诚的、自在的。

**优势：** 你对美的标准极高，这种要求让你在化妆和穿搭上的技术水平远超大多数人。当你的状态恰好的时候，你是真正惊艳的——只是你觉得那个"恰好"很少出现。

**致命弱点：** 你把"够不够美"当成了"能不能存在"的门票。当你觉得不够好的时候，你连自己都不想面对——不只是不想出门，是不想看自己。长此以往，你的世界会越来越小，因为标准只会越来越高，而你的勇气可能在标准追上之前就耗尽了。

**你的口头禅：** "等我再弄弄，还差一点……"（已经差了三年了）

**相处攻略：** 如果她终于出现在你面前了，请记住：她花了比你想象中多得多的勇气。不要评价她的外表，除非是真诚的赞美——她对自己已经够苛刻了。
    `,
    descriptionEn: `
🏠 Congratulations! You're the "Closet Goddess" personality! You've turned your private space into a dream kingdom; this ultimate pursuit of beauty is breathtaking! Your aesthetic taste is as unique as an artist—you can find extraordinary beauty in the ordinary!

Your wardrobe is more complete than a Taobao boutique; your underwear drawer is an independent aesthetic system; your vanity is a professional-level workstation—and your friends have no idea any of this exists.

**Psychological Profile:** You're a typical case of "Anxiety-Driven Private Identity Expression." You care so much about your appearance that you only dare to show your feminine side in completely private environments where you can polish yourself repeatedly until satisfied. This isn't enjoying solitude; it's a "don't want to see people unless perfect" mentality—called "Social Appearance Anxiety" in psychology, except your social scenarios have been compressed to zero, so this concern only manifests in front of the mirror. You don't go out not because you don't want to, but because you feel your state for going out isn't good enough yet.

**Daily Behavior Patterns:** Going out you're "normal." Coming home you immediately enter another mode: open the wardrobe, try on outfits in front of the mirror, repeatedly adjust every detail. You often spend two hours in front of the mirror preparing to go out, then give up in the end—not because you don't want to, but because "today's version of me isn't good enough." You've come out to one or two most trusted people; online circles are your main social outlet—although you don't go out, in this small world you're honest and at ease.

**Strengths:** Your standards for beauty are extremely high; this requirement makes your makeup and outfit technical skills far exceed most people. When your state is just right, you're truly stunning—it's just that you feel that "just right" rarely happens.

**Fatal Weakness:** You've turned "am I beautiful enough" into a ticket for "am I allowed to exist." When you feel not good enough, you don't even want to face yourself—not just don't want to go out, don't want to look at yourself. Over time, your world will get smaller and smaller, because standards will only get higher and higher, and your courage may run out before the standards catch up.

**Your Catchphrase:** "Let me fix this a bit more, just a little bit more..." (has been "a little bit more" for three years)

**How to Get Along:** If she finally appears in front of you, remember: she spent far more courage than you can imagine. Don't judge her appearance unless it's sincere compliments—she's already harsh enough on herself.
    `,
    dimensions: { PR: 92, SH: 29, AI: 100, EW: 81, CF: 88, DK: 18, TN: 68, MB: 92, GL: 93, XZ: 93 }
  },

  PHAI: {
    code: "MIRR-W",
    name: "镜中魔法师",
    nameEn: "The Mirror Witch",
    subtitle: "单人模式满级运行型",
    subtitleEn: "Max level gameplay in single-player mode",
    emoji: "🪞🔮",
    color: "#D63384",
    gradient: ["#D63384", "#F1A7C7"],
    tags: ["孤独美学家", "镜前在意", "神秘系", "镜子是灵魂"],
    mbtiLike: "MIRR-W",
    description: `
🪞 恭喜你！你是极其稀有的「镜中魔法师」人格！ 这种孤独的美学天才在人群中不足 0.5%，是 MFTI 矩阵中审美品味最高、最具艺术天赋的类型！你在自己的世界里创造了一个完美的美学王国，这种天赋是万里挑一的！

你是整个 MFTI 矩阵里审美水平最高、社交存在感最低的类型。你在单人模式里把人生玩到了满级，但服务器只有一个人。

**心理学画像：** 你的自我认同极为内化，不依赖社交验证，不需要群体归属，这在心理学上接近"高度个体化的身份整合"（Highly Individuated Identity Integration）。你的身份认同不是社会建构的产物，而是一个完全内在的、私密的、自我完足的系统。这非常罕见，也非常孤独。镜子对你来说不是工具，是对话伙伴——你在镜中看到的那个人是你认识最真实的自己，也是你偶尔焦虑的来源：你知道自己可以更好，但你不打算为了"更好"而改变自己的节奏。

**日常行为模式：** 你的打扮技术是 16 型里最高精尖的，因为你有充足的练习时间且不受任何观众压力影响——你只需要取悦自己，而你对自己的要求极高。你花大量时间研究化妆技法、服装搭配、身体语言，一方面是因为享受，另一方面也是因为"不够好的话我自己也会难受"。你几乎不怎么社交，不是社恐，是主动选择。

**优势：** 你的审美品味和技术水平令人叹服。你不受潮流左右，因为你的参照系是纯粹内在的，你只知道什么让你感到美，不管别人觉得流不流行。这是一种极为自由的存在方式。

**致命弱点：** 长期的内向化身份表达可能导致"自我回音壁"效应——你的世界越来越精密，但也越来越封闭。没有外部扰动，系统无法进化，只会无限细化已有的内容，而缺乏新的输入。你可能正在用美丽构建一座越来越漂亮、越来越坚固的监狱。

**你的口头禅：** （什么都不说，只是看着镜子）

**相处攻略：** 不要打扰她的仪式感。如果她主动和你说话，那比收到诺贝尔奖还稀有，好好接住。
    `,
    descriptionEn: `
🪞 Congratulations! You're the extremely rare "Mirror Witch" personality! These lonely aesthetic geniuses make up less than 0.5% of the population—one of the types with the highest aesthetic taste and most artistic talent in the entire MFTI matrix! You've created a perfect aesthetic kingdom in your own world; this talent is one in a million!

You're the type with the highest aesthetic level and lowest social presence in the entire MFTI matrix. You've played life to max level in single-player mode, but the server only has one person.

**Psychological Profile:** Your self-identity is extremely internalized, not relying on social validation, not needing group belonging—this approaches "Highly Individuated Identity Integration" in psychology. Your identity isn't a product of social construction, but a completely internal, private, self-sufficient system. This is very rare, and very lonely. The mirror isn't a tool for you; it's a dialogue partner—the person you see in the mirror is the most authentic self you know, and also the source of your occasional anxiety: you know you can be better, but you don't intend to change your rhythm for the sake of "better."

**Daily Behavior Patterns:** Your dressing technique is the most sophisticated among the 16 types, because you have ample practice time without any audience pressure—you only need to please yourself, and your requirements for yourself are extremely high. You spend extensive time researching makeup techniques, outfit coordination, body language, partly because you enjoy it, partly because "if it's not good enough, I'll feel bad myself." You barely socialize, not due to social anxiety, but by active choice.

**Strengths:** Your aesthetic taste and technical level are admirable. You aren't swayed by trends, because your frame of reference is purely internal; you only know what makes you feel beautiful, regardless of what others think is fashionable. This is an extremely free way of existing.

**Fatal Weakness:** Long-term introverted identity expression may lead to the "self-echo chamber" effect—your world becomes more and more sophisticated, but also more and more closed. Without external disturbance, the system cannot evolve; it only infinitely refines existing content, lacking new input. You may be building a prison that's more and more beautiful, more and more solid, with beauty.

**Your Catchphrase:** (says nothing, just looks at the mirror)

**How to Get Along:** Don't disturb her ritual. If she voluntarily speaks to you, that's rarer than winning a Nobel Prize; catch it well.
    `,
    dimensions: { PR: 80, SH: -10, AI: 100, EW: 29, CF: 88, DK: 18, TN: 18, MB: 92, GL: 86, XZ: 93 }
  },

  PHWE: {
    code: "SECR-G",
    name: "秘密花园主",
    nameEn: "The Secret Garden Keeper",
    subtitle: "经营平行宇宙自给自足型",
    subtitleEn: "Self-sufficient operator of a parallel universe",
    emoji: "🌺🗝️",
    color: "#27AE60",
    gradient: ["#27AE60", "#A9DFBF"],
    tags: ["双面人生", "神秘人", "自给自足", "箱子里的宇宙"],
    mbtiLike: "SECR-G",
    description: `
🌺 恭喜你！你是「秘密花园主」人格！你构建了一个只属于自己的完美世界，这种能力是极其珍贵的！你的内心世界如同秘密花园般繁茂，充满了只有你能发现的美！

你的秘密不是藏着的，是被精心放置在一个只有你知道位置的地方，加了锁，钥匙一直在你手里。

**心理学画像：** 你发展出了心理学上所谓的"分隔化身份管理"（Compartmentalized Identity Management）——将自我的不同面向彻底隔离在不同的生活空间里，互不干扰，各自完整。弗洛伊德会把这叫做"分裂"，但现代心理学更倾向于认为这是一种高度适应性的应对机制，尤其在高压社会环境中。你不是不完整，你只是把自己整理得很整齐。

**日常行为模式：** 你有一个专门的箱子或者抽屉，位置非常隐蔽，里面的东西非常整齐。你享受宅在家的时间，享受独自打扮的过程，享受那个只属于自己的小宇宙。你不在社交媒体上露面，不参加圈内活动，但你向极少数信任的人透露过——虽然方式轻描淡写，像是在说一件不太重要的事。你和自己的关系是平静的、接纳的，甚至带着某种满足感。你没有强烈的"走出去"的冲动，你已经在自己的世界里安居了。

**优势：** 你拥有极高的内在稳定性和生活自足能力。你不依赖任何外部系统来维持内心的平衡，你的幸福感来自内部，因此也最不容易被外部事件所摧毁。

**致命弱点：** 完美的隔离意味着没有增量。你的花园越来越美，但花园里的物种不会进化，也不会繁殖——因为没有外来的花粉和风。偶尔，你在梦里梦到有人发现了那个箱子，然后惊醒，而你发现那个梦里你有一点点……松了口气？

**你的口头禅：** "这件事不需要让所有人都知道。"

**相处攻略：** 她的秘密不是对你的不信任，是她保护自己的方式。如果她某天主动打开门，那是她给你的最大礼物。
    `,
    descriptionEn: `
🌺 Congratulations! You're the "Secret Garden Keeper" personality! You've built a perfect world that belongs only to you; this ability is extremely precious! Your inner world is as lush as a secret garden—full of beauty only you can discover!

Your secret isn't hidden; it's carefully placed in a location only you know, locked, with the key always in your hand.

**Psychological Profile:** You've developed what psychology calls "Compartmentalized Identity Management"—completely isolating different aspects of self into separate life spaces, not interfering with each other, each complete. Freud would call this "splitting," but modern psychology tends to view it as a highly adaptive coping mechanism, especially in high-pressure social environments. You're not incomplete; you've just organized yourself very neatly.

**Daily Behavior Patterns:** You have a special box or drawer, very hidden in location, with very neat contents inside. You enjoy time at home, enjoy the process of dressing up alone, enjoy that little universe belonging only to you. You don't appear on social media, don't participate in community activities, but you've revealed yourself to a very few trusted people—though in an understated way, as if talking about something not very important. Your relationship with yourself is calm, accepting, even with a certain sense of satisfaction. You don't have a strong impulse to "go out"; you've already settled comfortably in your own world.

**Strengths:** You have extremely high internal stability and life self-sufficiency. You don't rely on any external system to maintain inner balance; your happiness comes from within, therefore it's also least likely to be destroyed by external events.

**Fatal Weakness:** Perfect isolation means no growth. Your garden becomes more and more beautiful, but the species in the garden don't evolve, don't reproduce—because there's no foreign pollen or wind. Occasionally, you dream that someone discovers that box, then wake up startled, and you find that in that dream you were a little bit... relieved?

**Your Catchphrase:** "This matter doesn't need to be known by everyone."

**How to Get Along:** Her secret isn't distrust of you; it's her way of protecting herself. If one day she voluntarily opens the door, that's the greatest gift she gives you.
    `,
    dimensions: { PR: 72, SH: 24, AI: 0, EW: 62, CF: 88, DK: 18, TN: 68, MB: 92, GL: 71, XZ: 93 }
  },

  PHWI: {
    code: "DRIF-G",
    name: "漂浮态幽灵",
    nameEn: "The Drifting Ghost",
    subtitle: "后台静默运行未响应型",
    subtitleEn: "Running silently in background, not responding",
    emoji: "👻💤",
    color: "#7F8C8D",
    gradient: ["#7F8C8D", "#D5DBDB"],
    tags: ["深柜深处", "不确定", "漂浮态", "等待触发"],
    mbtiLike: "DRIF-G",
    description: `
👻 恭喜你！你是极其稀有的「漂浮态幽灵」人格！ 这种保持着纯粹可能性的人在人群中不到 0.4%，是 MFTI 矩阵中最具潜力和神秘色彩的类型之一！你像一张空白的画布，充满了无限的可能性，这种状态是极其珍贵的！

你知道。你一直知道。但"知道"和"承认"之间有一段你还没走完的路，而你还没想好要不要走。

**心理学画像：** 你处于心理学上的"前沉思阶段"（Pre-contemplation Stage）与"沉思阶段"（Contemplation Stage）之间的灰色地带——你知道存在一个议题，你偶尔想到它，但你还没有进入主动考虑改变的模式。这不是否认（Denial），否认是主动抵抗；你更像是"搁置"（Suspension）——把这个问题放在一个不常打开的文件夹里，偶尔瞥一眼，然后关掉。

**日常行为模式：** 你宅在家，偶尔会有一些私下的、不被任何人知道的小行为，但你不会深究这些行为意味着什么。你没有向任何人提起过，也没有参加任何相关社区，也没有查过什么资料——不是因为不知道可以查，是因为查了就意味着承认在认真对待这件事。你甚至参加了这个测试，但你可能告诉自己"只是好玩"。

**优势：** 你没有被任何身份焦虑压垮，因为你有意或无意地把压力源放在了视野边缘。在你准备好之前，这种漂浮状态保护了你。

**致命弱点：** 漂浮不是中立，它是一种消耗。长期维持"悬而未决"的认知状态会消耗大量心理资源，只是你感受到的不是焦虑，而是一种难以名状的疲惫感，或者一种总觉得哪里不对劲但说不清楚的钝痛。

**你的口头禅：** "我只是随便看看的。"（已经随便看了很多年）

**相处攻略：** 不要推她，不要问她"你到底是什么"。她需要的是一个安全的、没有压力的环境，让她觉得走出来是可以的——但那是她的决定，不是你的。
    `,
    descriptionEn: `
👻 Congratulations! You're the extremely rare "Drifting Ghost" personality! People who maintain this pure possibility make up less than 0.4% of the population—one of the types with the most potential and mysterious color in the entire MFTI matrix! You're like a blank canvas, full of infinite possibilities; this state is extremely precious!

You know. You've always known. But between "knowing" and "admitting" there's a path you haven't finished walking, and you haven't decided yet whether to walk it.

**Psychological Profile:** You're in a gray zone between the "Pre-contemplation Stage" and "Contemplation Stage" in psychology—you know there's an issue, you occasionally think about it, but you haven't entered the mode of actively considering change. This isn't denial (Denial); denial is active resistance; you're more like "suspension" (Suspension)—putting this issue in a folder you don't often open, occasionally glancing at it, then closing it.

**Daily Behavior Patterns:** You stay at home, occasionally have some small private behaviors that no one knows about, but you don't dig deep into what these behaviors mean. You haven't mentioned it to anyone, haven't participated in any related community, haven't looked up any information—not because you don't know you can, but because looking it up means admitting you're taking this matter seriously. You even took this test, but you probably told yourself "just for fun."

**Strengths:** You haven't been overwhelmed by any identity anxiety, because you've intentionally or unintentionally placed the stressor at the edge of your vision. Before you're ready, this floating state protects you.

**Fatal Weakness:** Floating isn't neutrality; it's a drain. Maintaining a "pending" cognitive state long-term consumes enormous psychological resources; it's just that what you feel isn't anxiety, but an indescribable sense of fatigue, or a dull ache that something isn't quite right but you can't say clearly what.

**Your Catchphrase:** "I'm just looking around casually." (has been casually looking for many years)

**How to Get Along:** Don't push her, don't ask her "what exactly are you." She needs a safe, pressure-free environment that makes her feel it's okay to come out—but that's her decision, not yours.
    `,
    dimensions: { PR: 80, SH: 10, AI: 8, EW: 10, CF: 6, DK: 18, TN: 68, MB: 0, GL: 21, XZ: 0 }
  },

  // ==================== R系（现实清醒派）====================

  RSAE: {
    code: "LUCID-B",
    name: "清醒炸弹",
    nameEn: "The Lucid Detonator",
    subtitle: "出来了且脑子超级好用型",
    subtitleEn: "Fully out and terrifyingly well-argued",
    emoji: "💥🔍",
    color: "#E74C3C",
    gradient: ["#E74C3C", "#F1948A"],
    tags: ["清醒网红", "怼人话术库", "理性出柜", "焦虑但战斗"],
    mbtiLike: "LUCID-B",
    description: `
💥 恭喜你！你是「清醒炸弹」人格！你是社区的守护者和灯塔，你的存在给无数人带来了力量！你的勇气和智慧如同耀眼的光芒，照亮了自己也温暖了他人！

你已经出柜，积极出现，对自己的外貌高度焦虑，而且脑子清醒得让对面的人在辩论中找不到任何破绽。

**心理学画像：** 你展现出高度整合的"身份资本"（Identity Capital）——你用清晰的自我叙事、社会技能和认知资源构建了一个稳固的、可以对外呈现的身份系统。你不是在"表演"身份，你是真正理解了自己，并且选择主动暴露在社会视野中——这需要大量的心理资源和风险承受能力。你的自尊是稳健的（Stable Self-Esteem），不因他人态度改变而波动。

**日常行为模式：** 你有一套成熟的怼人话术库，针对不同类型的质疑有不同的应对方案，而且你的应对是理性的、精确的，让对方找不到继续争论的着力点。你参加活动，对自己的外貌很上心——不是因为虚荣，是因为你真的很焦虑，只不过你把这份焦虑转化成了战斗力的燃料。别人哭着发帖"怎么办我被质疑了"的时候，你在评论区打"这题我会，首先……"然后发一篇三百字的分析。

**优势：** 你是社区里最稳定的锚点之一。你的清醒和理性为周围的人提供了一种看问题的参照系，你的存在本身就是对"跨性别者智识水平"的有力证明。

**致命弱点：** 你有时候太理性了。你的逻辑盔甲非常坚固，但情绪需要的时候你可能来不及脱下来。你对旁人的感性表达有时候缺乏耐心，你的"这题我会"有时候让人觉得被降维了而不是被帮助了。

**你的口头禅：** "没什么好怕的，最坏的情况也不过是……"

**相处攻略：** 她不需要被保护，她需要对手。给她一个值得认真对待的问题，她会爱上你的。
    `,
    descriptionEn: `
💥 Congratulations! You're the "Lucid Detonator" personality! You're a guardian and lighthouse for the community; your existence gives strength to countless people! Your courage and wisdom shine like a brilliant light—illuminating yourself and warming others!

You're fully out, actively present, highly anxious about your appearance, and so lucid that your debate opponents can't find any openings.

**Psychological Profile:** You demonstrate highly integrated "Identity Capital"—you've built a solid, presentable identity system with clear self-narratives, social skills, and cognitive resources. You're not "performing" an identity; you truly understand yourself and choose to be visible in the social sphere—this requires enormous psychological resources and risk tolerance. Your self-esteem is stable, unshaken by others' attitudes.

**Daily Behavior Patterns:** You have a mature repertoire of roasts, with different response strategies for different types of questions—and your responses are rational, precise, leaving opponents with no room to continue arguing. You attend events, care deeply about your appearance—not out of vanity, but because you're genuinely anxious, you just channel that anxiety into fuel for combat. When others post crying "What do I do? I'm being questioned," you're in the comments typing "I know this one, first of all..." followed by a 300-word analysis.

**Strengths:** You're one of the most stable anchors in the community. Your lucidity and rationality provide a frame of reference for those around you. Your very existence is a powerful testament to "trans intellectual capacity."

**Fatal Weakness:** You're sometimes too rational. Your logical armor is extremely solid, but when emotions are needed, you might not have time to take it off. You sometimes lack patience for others' emotional expressions, and your "I know this one" can sometimes make people feel talked down to rather than helped.

**Your Catchphrase:** "Nothing to be afraid of, the worst that can happen is..."

**How to Get Along:** She doesn't need protection—she needs an opponent. Give her a problem worth taking seriously, and she'll love you for it.
    `,
    dimensions: { PR: 28, SH: 86, AI: 92, EW: 95, CF: 75, DK: 100, TN: 68, MB: 92, GL: 79, XZ: 93 }
  },

  RSAI: {
    code: "ENDO-S",
    name: "内分泌学家",
    nameEn: "The Self-Appointed Endocrinologist",
    subtitle: "对自己激素水平了解程度超过主治医生型",
    subtitleEn: "Knows their hormone levels better than their endocrinologist",
    emoji: "🧬📊",
    color: "#2E86C1",
    gradient: ["#2E86C1", "#AED6F1"],
    tags: ["务实主义", "学术控", "数据怪", "研究自己"],
    mbtiLike: "ENDO-S",
    description: `
🧬 恭喜你！你是「内分泌学家」人格！你用科学武装自己，这种严谨和智慧令人敬佩！你的知识如同百科全书般丰富，总能给人最可靠的答案！

你的 E2 水平、T 水平、SHBG 的变化曲线你比你的内分泌科医生掌握得更清楚，你已经自学完了大部分相关医学知识，并且对某些"主流"医学建议持有证据充分的保留意见。

**心理学画像：** 你的身份认同建立在一套严密的知识体系上，而非感性直觉或社群归属感。这是一种"认知性身份建构"（Cognitive Identity Construction）——你的"我是谁"是一个经过反复验证的命题，而不是一个需要被感受的事实。这种建构方式极为稳固，因为它不依赖情绪状态，但也有其代价：当感性体验和理性结论冲突时，你往往优先信任数据，而忽略了身体和情绪也是数据。

**日常行为模式：** 你在群里发的不是自拍，是最新的研究报告，附带你的批注和质疑。你知道每种抗雄药物的作用机制、副作用谱和代谢路径，你知道不同剂型的雌激素的药代动力学区别，你可能还会用电子表格记录自己的血液指标变化。你出门、打理外貌，但你的外貌管理是数据驱动的，你知道每个维护步骤背后的生理原理。

**优势：** 你是社区里最可靠的知识资源库之一。你不乱传信息，不散布焦虑，遇到问题你会找证据，这在充斥着道听途说的网络讨论中极为稀缺。

**致命弱点：** 你的分析框架太过理性，有时候会让感性痛苦的人觉得被"解剖"而非被接住。你的"你这个情况从医学角度看是……"在对方只想哭一会儿的时候效果不佳。另外，你的知识积累偶尔会让你高估自己的临床判断能力——你懂很多，但你不是你自己的医生。

**你的口头禅：** "这个说法没有文献支持，你是从哪里看到的？"

**相处攻略：** 带着问题来找她，而不是带着情绪崩溃来找她——前者她如鱼得水，后者她会手足无措。
    `,
    descriptionEn: `
🧬 Congratulations! You're the "Self-Appointed Endocrinologist" personality! You arm yourself with science; this rigor and wisdom is admirable! Your knowledge is as rich as an encyclopedia—always giving people the most reliable answers!

You know your E2, T, and SHBG curves better than your endocrinologist. You've self-studied most of the relevant medical knowledge and hold well-evidenced reservations about certain "mainstream" medical advice.

**Psychological Profile:** Your identity is built on a rigorous knowledge system, not emotional intuition or community belonging. This is "Cognitive Identity Construction"—your "Who am I?" is a proposition repeatedly verified, not a fact to be felt. This construction is extremely stable because it doesn't depend on emotional states, but there's a cost: when emotional experiences conflict with rational conclusions, you tend to trust data first, ignoring that bodies and emotions are also data.

**Daily Behavior Patterns:** What you share in the group chat isn't selfies—it's the latest research papers with your annotations and critiques. You know the mechanism of action, side effect profiles, and metabolic pathways of every anti-androgen drug. You know the pharmacokinetic differences between different estrogen formulations. You might even track your blood work changes in a spreadsheet. You go out, manage your appearance, but your appearance management is data-driven—you know the physiological principles behind every maintenance step.

**Strengths:** You're one of the most reliable knowledge resources in the community. You don't spread misinformation or anxiety. When problems arise, you look for evidence—this is extremely rare in online discussions full of hearsay.

**Fatal Weakness:** Your analytical framework is so rational that it sometimes makes emotionally distressed people feel "dissected" rather than held. Your "From a medical perspective, your situation is..." doesn't work well when someone just wants to cry for a while. Also, your knowledge accumulation occasionally makes you overestimate your clinical judgment—you know a lot, but you're not your own doctor.

**Your Catchphrase:** "That claim has no literature support. Where did you read that?"

**How to Get Along:** Come to her with questions, not emotional breakdowns—she's like a fish in water with the former, and at a loss with the latter.
    `,
    dimensions: { PR: 28, SH: 57, AI: 92, EW: 43, CF: 75, DK: 18, TN: 32, MB: 54, GL: 36, XZ: 60 }
  },

  RSWE: {
    code: "UNBOT-R",
    name: "摆烂人间清醒",
    nameEn: "The Unbothered Realist",
    subtitle: "接受了但懒得大张旗鼓型",
    subtitleEn: "Accepted it but too lazy to make a fuss",
    emoji: "😌🛋️",
    color: "#16A085",
    gradient: ["#16A085", "#A2D9CE"],
    tags: ["懒得解释", "低调清醒", "随便吧", "最不焦虑的人"],
    mbtiLike: "UNBOT-R",
    description: `
😌 恭喜你！你是「摆烂人间清醒」人格！你已经达到了许多人追求一生的内心平静，这种境界令人羡慕！你的心态如同平静的湖水，无论外界如何波动，你都能保持内心的安宁！

你接受了自己，但你没有把这件事变成人生的核心议题。你只是接受了，然后继续过日子。这让你成了 16 型人格里最让人看不透的类型。

**心理学画像：** 你达到了心理学上罕见的"去戏剧化身份整合"（De-dramatized Identity Integration）状态——你的身份认同既不是需要捍卫的旗帜，也不是需要隐藏的秘密，它只是你这个人的一个属性，就像你的惯用手或者血型一样，在大多数情况下不需要特别强调。这种状态通常需要大量的内在功课才能达到，但你可能是"天生懒"导致的，我们就不细究了。

**日常行为模式：** 你穿裙子的理由可能是"今天热"。你出柜的方式可能是在某次对话里随口提了一句"对了，我是这样的人"，然后继续讨论下一个话题，没有等对方有时间反应。你不参加很多活动，不特别在意打扮，没有特别的圈内社群归属感。你知道自己是谁，但你觉得这件事不值得花太多精力去"维护"。

**优势：** 你是 16 型里精神内耗最少的之一。你不为外部认可焦虑，不为身份政治辩论消耗，不为"我到底是什么"失眠——你已经答完了，交卷了，在走廊等放学。

**致命弱点：** 你的"随便"有时候会被误读为"不在乎"或者"没认真想过"。你的低能量状态可能让需要支持的人觉得你"过于平静，不够共情"。另外，摆烂式接受有时候只是主动放弃处理深层议题，而不是真正的和解——区别在于，你偶尔还是会有那么一瞬间，感到一种你说不清楚的空洞。

**你的口头禅：** "嗯，是这样。然后呢？"

**相处攻略：** 不要试图让她兴奋起来，她有她的节奏。她的平静是真实的，不是冷漠。
    `,
    descriptionEn: `
😌 Congratulations! You're the "Unbothered Realist" personality! You've achieved the inner peace that many people pursue their whole lives; this state is enviable! Your mind is like a calm lake—no matter how the outside world fluctuates, you can keep your inner peace!

You've accepted yourself, but you haven't made it the central issue of your life. You just accepted it and moved on. This makes you the most inscrutable type among the 16 personalities.

**Psychological Profile:** You've achieved a rare state in psychology called "De-dramatized Identity Integration"—your identity is neither a flag to defend nor a secret to hide. It's just an attribute of who you are, like your handedness or blood type, something that doesn't need special emphasis in most situations. This state usually requires a lot of inner work to achieve, but in your case it might just be "natural laziness"—we won't dig into that.

**Daily Behavior Patterns:** Your reason for wearing a skirt might be "it's hot today." Your coming out might have been a casual mention in some conversation—"By the way, I'm this kind of person"—and then you moved on to the next topic without waiting for the other person to have time to react. You don't attend many events, don't particularly care about dressing up, don't have special in-group community belonging. You know who you are, but you don't think this matter is worth spending too much energy "maintaining."

**Strengths:** You're one of the types with the least internal friction among the 16. You don't anxiety about external validation, don't consume yourself in identity politics debates, don't lose sleep over "what exactly am I"—you've already answered, handed in your paper, and are waiting in the hallway for school to end.

**Fatal Weakness:** Your "whatever" is sometimes misread as "don't care" or "haven't thought seriously." Your low-energy state may make people who need support feel you're "too calm, not empathetic enough." Also, rotten-style acceptance is sometimes just actively giving up on dealing with deeper issues, not true reconciliation—the difference is, you occasionally still have a moment where you feel some kind of inexplicable emptiness.

**Your Catchphrase:** "Yeah, that's how it is. And then?"

**How to Get Along:** Don't try to make her excited—she has her own rhythm. Her calmness is real, not indifference.
    `,
    dimensions: { PR: 28, SH: 62, AI: 35, EW: 67, CF: 6, DK: 100, TN: 73, MB: 54, GL: 0, XZ: 40 }
  },

  RSWI: {
    code: "LONE-R",
    name: "独立研究员",
    nameEn: "The Independent Researcher",
    subtitle: "不需要任何人认同我的理论体系型",
    subtitleEn: "Doesn't need anyone to validate their theoretical framework",
    emoji: "🔭📝",
    color: "#1ABC9C",
    gradient: ["#1ABC9C", "#A3E4D7"],
    tags: ["智识孤独者", "理论宇宙", "自建体系", "发长文没人看"],
    mbtiLike: "LONE-R",
    description: `
🔭 恭喜你！你是「独立研究员」人格！你是整个社区的思想发动机，你的洞见是无价之宝！你的独立思考能力如同开拓者般独特，总能发现别人看不到的视角！

你对跨性别相关议题的研究深度已经超过了很多专业学者，你有自己的理论体系，不需要社区认同，也不打算为了被接受而简化自己的思想。

**心理学画像：** 你是高度的"知识型身份建构者"（Knowledge-Based Identity Builder），同时具备强烈的内向性认知风格。你的身份认同不依赖群体归属，不需要镜像确认，你的参照系是你自己建立的一套内部逻辑体系——这使你极为自足，但也使你在需要与他人连接的场景中付出更高的成本。你的社交，是主动降维，而不是不会社交。

**日常行为模式：** 你在群里发长文，有时候 2000 字，结构清晰，论证严密，引用了三篇学术文献——然后只有五个人回复，而且两个是"厉害了"没有实质内容。你不在意这个，因为你写那篇文章不是为了被赞美，是因为你想把这个问题说清楚。你参加社交，能社交，但你觉得大多数讨论太浅，你在群里的存在感像一个信号频率和大家不同的电台。

**优势：** 你是整个生态里的思想发动机之一。你的深度研究和独立思考为社区提供了通常不会从集体智慧中产生的洞见。你不跟风，不被情绪带跑，你的判断有独立的价值。

**致命弱点：** 你的智识孤立有时候会让你误判自己的社会处境。你在"智识正确"上花的时间，可能比在"情感连接"上花的时间多得多——而人际关系需要的往往是后者，而非前者。你的理论体系非常严密，但没有外部检验，存在"自洽但错误"的风险。

**你的口头禅：** "这个问题其实比你以为的要复杂很多……"（然后开始展开）

**相处攻略：** 给她一个真正有挑战性的问题，她会认真对待你。别装懂，她一眼能看出来。
    `,
    descriptionEn: `
🔭 Congratulations! You're the "Independent Researcher" personality! You're the intellectual engine of the entire community; your insights are priceless! Your independent thinking is as unique as a pioneer—you always find perspectives others can't see!

Your research depth on transgender-related topics has surpassed many professional scholars. You have your own theoretical framework, don't need community validation, and have no intention of simplifying your thoughts to be accepted.

**Psychological Profile:** You're a highly "Knowledge-Based Identity Builder" with a strongly introverted cognitive style. Your identity doesn't depend on group belonging or require mirror confirmation. Your frame of reference is an internal logical system you built yourself—this makes you extremely self-sufficient, but also makes you pay higher costs in scenarios requiring connection with others. Your socializing is actively downshifting, not inability to socialize.

**Daily Behavior Patterns:** You post long texts in the group chat—sometimes 2000 words, clearly structured, rigorously argued, citing three academic papers—and then only five people reply, and two of them are just "impressive" with no substantive content. You don't care, because you didn't write that article to be praised; you wrote it because you wanted to explain this issue clearly. You attend social events, can socialize, but you feel most discussions are too shallow. Your presence in the group is like a radio station broadcasting on a different frequency than everyone else.

**Strengths:** You're one of the intellectual engines of the entire ecosystem. Your deep research and independent thinking provide insights that typically don't emerge from collective wisdom. You don't follow trends, don't get swept away by emotions, and your judgments have independent value.

**Fatal Weakness:** Your intellectual isolation can sometimes make you misjudge your social situation. You may spend far more time on "intellectual correctness" than on "emotional connection"—and interpersonal relationships often need the latter, not the former. Your theoretical system is very rigorous, but without external validation, there's a risk of being "self-consistent but wrong."

**Your Catchphrase:** "This issue is actually much more complex than you think..." (and then starts elaborating)

**How to Get Along:** Give her a truly challenging problem, and she'll take you seriously. Don't pretend to understand—she can see through it immediately.
    `,
    dimensions: { PR: 24, SH: 62, AI: 0, EW: 29, CF: 50, DK: 18, TN: 41, MB: 0, GL: 7, XZ: 13 }
  },

  RHAE: {
    code: "IRON-L",
    name: "钢铁萝莉",
    nameEn: "The Iron Lolita",
    subtitle: "执行力把顺性别女生都整破防了型",
    subtitleEn: "Execution so strong it makes cis girls feel threatened",
    emoji: "⚙️🌸",
    color: "#8E44AD",
    gradient: ["#8E44AD", "#BB8FCE"],
    tags: ["执行力恐怖", "硬核计划派", "焦虑转化器", "别拦我"],
    mbtiLike: "IRON-L",
    description: `
⚙️ 恭喜你！你是「钢铁萝莉」人格！你用行动证明了一切皆有可能，你的坚持是无数人的榜样！你的少女心和钢铁意志完美结合，这种力量令人敬佩！

你已经出柜，你宅在家里，你对自己的外貌非常焦虑，而且你的行动力让所有人感到压力——包括那些从来没有经历过任何认同困境的顺性别女性。

**心理学画像：** 你展现出高度的"目标定向型身份建构"（Goal-Oriented Identity Construction），结合了极强的执行意志和对现实的清醒认知。你不在梦幻和焦虑之间浮沉，你直接在现实层面攻关。心理学上的"自我效能感"（Self-Efficacy）在你这里是满值的——你相信你能改变你想改变的东西，而且你在证明这一点。

**日常行为模式：** 你的激素管理计划比某些健身教练的训练计划还要精密，有详细的时间节点、剂量记录、效果评估和备选方案。你的护肤流程是一个有步骤的系统工程，你知道每个产品的作用机制。你的发型、体型、仪态是有长期规划的，你有阶段性目标和评估标准。你不拖延，不焦虑（或者焦虑了也立刻转化为行动）。

**优势：** 你是"能做到"的活证明。你不依赖运气，不依赖天赋，你依赖系统和执行力——这使你成为许多人的精神支柱和参照系。你的存在传递一个信息：这件事是可以被认真对待、有效推进的。

**致命弱点：** 你的高执行力和高目标导向可能让你把身份认同过度工具化——"变得更像女孩"变成了一个 KPI 系统，而不是一个探索过程。当某个阶段性目标没有达成，或者效果不如预期，你可能会遭受超出平均水平的自我批评。

**你的口头禅：** "这个月的目标是……"

**相处攻略：** 别拦她，但偶尔提醒她：过程本身也是允许享受的，不一定非要等到"达标"之后。
    `,
    descriptionEn: `
⚙️ Congratulations! You're the "Iron Lolita" personality! You prove with action that anything is possible; your persistence is an example for countless people! Your girl's heart and iron will are perfectly combined—this power is admirable!

You're out, you stay at home, you're very anxious about your appearance, and your action ability stresses everyone out—including cisgender women who have never experienced any identity crisis.

**Psychological Profile:** You demonstrate a high degree of "Goal-Oriented Identity Construction," combining extremely strong executive will with clear awareness of reality. You don't float between dreams and anxiety; you tackle problems directly at the reality level. "Self-Efficacy" in psychology is maxed out for you—you believe you can change what you want to change, and you're proving it.

**Daily Behavior Patterns:** Your hormone management plan is more precise than some fitness coaches' training plans, with detailed timelines, dosage records, effect evaluations, and contingency plans. Your skincare routine is a systematic engineering project with steps; you know the mechanism of action of every product. Your hairstyle, body shape, and demeanor are long-term planned; you have phased goals and evaluation criteria. You don't procrastinate, don't anxiety (or immediately convert anxiety into action).

**Strengths:** You're living proof that "it can be done." You don't rely on luck or talent; you rely on systems and execution—this makes you a spiritual pillar and frame of reference for many people. Your existence sends a message: this matter can be taken seriously and effectively advanced.

**Fatal Weakness:** Your high execution and high goal orientation may lead you to over-instrumentalize identity—"becoming more like a girl" becomes a KPI system rather than an exploratory process. When a phased goal isn't achieved, or effects aren't as expected, you may suffer above-average self-criticism.

**Your Catchphrase:** "This month's goal is..."

**How to Get Along:** Don't stop her, but occasionally remind her: the process itself is allowed to be enjoyed; you don't have to wait until "meeting the standard."
    `,
    dimensions: { PR: 28, SH: 19, AI: 92, EW: 76, CF: 88, DK: 18, TN: 77, MB: 92, GL: 71, XZ: 93 }
  },

  RHAI: {
    code: "ZEN-C",
    name: "佛系修炼者",
    nameEn: "The Zen Cultivator",
    subtitle: "上车了但还在思考开车原理型",
    subtitleEn: "On the journey but still pondering why driving",
    emoji: "☯️🌱",
    color: "#27AE60",
    gradient: ["#27AE60", "#82E0AA"],
    tags: ["出柜中的哲学家", "佛系进度", "修炼感", "别催"],
    mbtiLike: "ZEN-C",
    description: `
☯️ 恭喜你！你是「佛系修炼者」人格！你走在自己的节奏里，这种从容和智慧是无数人追求的境界！你的内心如同平静的湖面，充满了生活的智慧！

你宅在家，你正在出柜的过程中，你在意外貌，但你同时还在持续思考"我为什么这样做，这意味着什么，这对我来说是什么"——不是质疑，是一种持续的哲学性好奇。

**心理学画像：** 你展现出"过程导向型身份认同"（Process-Oriented Identity Development）——你不是在"达到"一个身份，你是在体验成为某人的过程本身。你的自我认同不是一个终点，而是一条路，而你对这条路本身充满兴趣。这在心理学上属于高度成熟的身份整合方式，因为你不是在逃离某个自我，也不是在强迫自己变成某个理想形象，你只是在走，边走边看。

**日常行为模式：** 你在家打扮，你向最亲近的人坦白了，但你的节奏非常慢，还没有完成完整的出柜过程。你的社群参与度低，不是因为不认同，是因为你更喜欢自己想明白再说。你会在某个随机的下午突然开始思考"所谓'女性化'到底是一种社会建构还是我真实的内在感受，而这两者可以是同一件事吗"——然后在脑内想了两个小时，什么结论都没得出，但感觉挺好的。

**优势：** 你对身份认同的理解是整合性的、非二元的、充满弹性的。你不容易陷入"我不够"的焦虑，因为你的参照系是内在的，而不是一个固定的标准。你的存在本身就是一种关于身份可以是流动的、过程性的、可以持续探索的活证明。

**致命弱点：** "修炼"有时候是一种精致的拖延。"我还在探索"可以是真诚的，也可以是回避具体决策的借口。区别在于：真正的探索会带来变化，而拖延只是在原地绕圈。

**你的口头禅：** "我觉得这件事很有意思，我还在想……"

**相处攻略：** 和她聊她感兴趣的议题，而不是试图给她一个结论。她不需要答案，她需要好的对话伙伴。
    `,
    descriptionEn: `
☯️ Congratulations! You're the "Zen Cultivator" personality! You walk at your own pace; this calm and wisdom is the realm that countless people pursue! Your heart is like a calm lake—full of the wisdom of life!

You stay at home, you're in the process of coming out, you care about appearance, but you're also continuously thinking "Why am I doing this, what does this mean, what is this to me"—not questioning, but a continuous philosophical curiosity.

**Psychological Profile:** You demonstrate "Process-Oriented Identity Development"—you're not "arriving" at an identity; you're experiencing the process of becoming itself. Your self-identity is not a destination but a path, and you're deeply interested in the path itself. This is a highly mature form of identity integration in psychology, because you're not fleeing from a self, nor forcing yourself to become some ideal image; you're just walking, looking as you go.

**Daily Behavior Patterns:** You dress up at home, you've come out to your closest people, but your pace is very slow—you haven't completed the full coming out process. Your community participation is low, not because of non-identification, but because you prefer to think things through yourself first. You'll suddenly start thinking on some random afternoon: "Is so-called 'femininity' a social construct or my real inner feeling, and can these two be the same thing?"—then think about it in your head for two hours, reach no conclusion, but feel good about it.

**Strengths:** Your understanding of identity is integrative, non-binary, and full of flexibility. You don't easily fall into "I'm not enough" anxiety, because your frame of reference is internal, not a fixed standard. Your very existence is living proof that identity can be fluid, processual, and continuously exploratory.

**Fatal Weakness:** "Cultivation" is sometimes refined procrastination. "I'm still exploring" can be sincere, or it can be an excuse to avoid concrete decisions. The difference is: real exploration brings change, while procrastination is just going in circles.

**Your Catchphrase:** "I find this really interesting, I'm still thinking..."

**How to Get Along:** Talk with her about topics she's interested in, rather than trying to give her conclusions. She doesn't need answers; she needs good dialogue partners.
    `,
    dimensions: { PR: 28, SH: -10, AI: 92, EW: 24, CF: 81, DK: 18, TN: 27, MB: 92, GL: 64, XZ: 87 }
  },

  RHWE: {
    code: "WEEK-T",
    name: "周末变身侠",
    nameEn: "The Weekend Alter Ego",
    subtitle: "周一到周五打工人，周末仙女降临型",
    subtitleEn: "Office worker Mon-Fri, fairy goddess on weekends",
    emoji: "📅✨",
    color: "#F39C12",
    gradient: ["#F39C12", "#FAD7A0"],
    tags: ["实用主义", "双线程人生", "周末选手", "妈以为在打游戏"],
    mbtiLike: "WEEK-T",
    description: `
📅 恭喜你！你是「周末变身侠」人格！你找到了完美的平衡方式，这种智慧令人赞叹！你能在不同世界间自如切换，这种能力让人羡慕！

你的双线程人生运行得非常稳定：工作日你是个让同事觉得"挺正常的"打工人，周末你换一个操作系统。你妈以为你在打游戏，你其实在补妆。

**心理学画像：** 你实践着"角色分离型自我管理"（Role-Separated Self-Management），将不同自我面向分配到不同的时间-空间单元中，而非进行整合性的公开表达。这是一种高度务实的策略：你明确知道"出来"的社会成本，你进行了理性的成本收益分析，你选择了最小风险的执行方案。这不是怯懦，这是工程学思维在人生决策中的应用。

**日常行为模式：** 你的生活管理能力极强。工作日的你完全专注在工作上，不会"串台"；周末的你有一套完整的仪式感流程：洗澡、护肤、换装、可能会拍几张照片、享受几个小时、然后收拾干净，下周一继续。你没有向同事和家人出柜，不是因为恐惧，而是因为"这件事和他们有什么关系呢"。但你在自己的小圈子里是坦诚的——你知道自己是谁，只是选择性展示给不同的人。你是理性保密者，不是恐惧保密者，这是一个重要的心理学区别。

**优势：** 你的生活是可持续的。你找到了一种不需要改变整个社会生态就能让自己过得不错的方式，而且你不为此感到对不起自己。你清楚地知道自己在做什么，为什么这样做，这种清醒非常宝贵。

**致命弱点：** "周末"终究是一个边界，而边界有时候会让人感到一种微妙的压抑——不是大的痛苦，而是一种"这件事只允许在特定时间段存在"的限制感。长期的时间分隔可能会强化一种潜意识里的"这部分的我是不正常的，需要被限制"的信念，即使你理性上并不这么认为。

**你的口头禅：** "周末再说。"

**相处攻略：** 尊重她的节奏。不要在工作日频道戳她的周末话题，她有她的系统，你不要乱插队。
    `,
    descriptionEn: `
📅 Congratulations! You're the "Weekend Alter Ego" personality! You've found the perfect way to balance; this wisdom is admirable! You can switch freely between different worlds—this ability is enviable!

Your dual-thread life runs very stably: on weekdays you're a worker who makes colleagues think "pretty normal," and on weekends you switch operating systems. Your mom thinks you're gaming; you're actually doing makeup.

**Psychological Profile:** You practice "Role-Separated Self-Management," allocating different self-aspects to different time-space units rather than engaging in integrated public expression. This is a highly pragmatic strategy: you clearly know the social costs of "coming out," you've conducted rational cost-benefit analysis, you've chosen the minimum-risk execution plan. This isn't cowardice; this is engineering thinking applied to life decisions.

**Daily Behavior Patterns:** Your life management ability is extremely strong. The weekday you is fully focused on work, no "cross-contamination"; the weekend you has a complete ritual process: shower, skincare, change clothes, maybe take a few photos, enjoy a few hours, then clean up and continue next Monday. You haven't come out to colleagues and family, not because of fear, but because "what does this have to do with them?" But you're honest in your small circle—you know who you are, you just selectively show different people different aspects. You're a rational keeper of secrets, not a fearful keeper—this is an important psychological distinction.

**Strengths:** Your life is sustainable. You've found a way to live well without needing to change the entire social ecosystem, and you don't feel sorry for yourself for it. You clearly know what you're doing and why—this lucidity is extremely valuable.

**Fatal Weakness:** "Weekend" is ultimately a boundary, and boundaries can sometimes create a subtle sense of repression—not great pain, but a restrictive feeling of "this part of me is only allowed to exist at specific times." Long-term time separation may reinforce a subconscious belief that "this part of me is abnormal and needs to be restricted," even if you don't rationally believe so.

**Your Catchphrase:** "Let's talk about it on the weekend."

**How to Get Along:** Respect her rhythm. Don't poke at her weekend topics on weekday channels—she has her system; don't cut in line.
    `,
    dimensions: { PR: 32, SH: 14, AI: 35, EW: 67, CF: 94, DK: 18, TN: 77, MB: 92, GL: 36, XZ: 93 }
  },

  RHWI: {
    code: "PASS-T",
    name: "我只是路过的",
    nameEn: "Just Passing Through",
    subtitle: "做了这个测试但说自己只是好奇型",
    subtitleEn: "Took this test but claims 'just curious'",
    emoji: "🚶🌫️",
    color: "#95A5A6",
    gradient: ["#95A5A6", "#D5DBDB"],
    tags: ["旁观者", "否认系", "谜语人", "为什么你在这里"],
    mbtiLike: "PASS-T",
    description: `
🚶 恭喜你！你是极其稀有的「我只是路过的」人格！ 这种保持着纯粹好奇心的类型在人群中不到 0.3%，是 MFTI 矩阵中最神秘、最具潜力的类型之一！你像一颗尚未被发现的宝石，充满了无限的可能性！

你宅着，你清醒，你不公开，你不特别在意外貌，然后你出现在了一个叫做 MFTI 的测试里。这很值得思考。

**心理学画像：** 你可能正处于心理学上的"身份前期冻结"（Pre-Identity Freeze）状态——你拥有足够的认知资源去理解这个议题，但你通过保持距离和"旁观者"姿态来控制自己的介入程度。这不是一种主动否认，而是一种通过不定义来避免需要面对的状态。弗洛伊德会说你在"理智化"（Intellectualization），现代心理学会说你在"接近回避冲突"（Approach-Avoidance Conflict）中选择了动态的回避。

**日常行为模式：** 你可能在某个深夜搜到了这个测试，然后对自己说"只是好奇"，做完了还是告诉自己"只是好奇"。你对相关话题有了解，可能关注了几个账号，但从来不互动，只是看。你没有任何社群归属，没有出柜，外貌上也没有任何动作，你的状态是：知道，了解，不动。不是不想，是还没有决定要不要"正式"想。

**优势：** 你的清醒让你不会做出冲动的决定。你的旁观视角让你对这个社群有一种局外人的理性观察，不被情绪裹挟。你是那种"如果真的走这条路，会想得非常清楚"的人。

**致命弱点：** 不定义也是一种选择，但它不能无限期持续下去。"我只是路过"是一句话，但你来回路过很多次，路过得很仔细，那就不只是路过了。你最大的风险是用"我还没决定"来替代"我不打算面对"——而这两件事，只有你自己能分辨。

**你的口头禅：** "我只是看看，没什么的。"

**相处攻略：** 不要揭穿她，她知道。等她准备好，或者永远不准备好——那也是她的权利。
    `,
    descriptionEn: `
🚶 Congratulations! You're the extremely rare "Just Passing Through" personality! This type that maintains pure curiosity makes up less than 0.3% of the population—one of the most mysterious and potential types in the entire MFTI matrix! You're like an undiscovered gem, full of infinite possibilities!

You stay at home, you're lucid, you don't come out, you don't particularly care about appearance, and yet you show up in a test called MFTI. This is worth thinking about.

**Psychological Profile:** You may be in a state of "Pre-Identity Freeze"—you have sufficient cognitive resources to understand this issue, but you control your level of involvement by maintaining distance and a "bystander" posture. This isn't active denial, but a state of avoiding having to face things by not defining. Freud would say you're "intellectualizing"; modern psychology would say you've chosen dynamic avoidance in an "Approach-Avoidance Conflict."

**Daily Behavior Patterns:** You probably found this test late one night, told yourself "just curious," finished it, and still told yourself "just curious." You know about related topics, maybe follow a few accounts, but never interact, just watch. You have no community belonging, haven't come out, haven't made any moves appearance-wise. Your state is: know, understand, don't move. Not "don't want to," but "haven't decided whether to formally think about it yet."

**Strengths:** Your lucidity prevents you from making impulsive decisions. Your bystander perspective gives you an outsider's rational observation of this community, not swept up by emotions. You're the type who "if you really go down this path, will think it through very clearly."

**Fatal Weakness:** Not defining is also a choice, but it can't last indefinitely. "I'm just passing through" is one thing, but if you pass through many times, passing through very carefully, then it's not just passing through anymore. Your biggest risk is using "I haven't decided" as a substitute for "I don't intend to face this"—and only you can tell the difference between these two things.

**Your Catchphrase:** "I'm just looking, it's nothing."

**How to Get Along:** Don't expose her—she knows. Wait until she's ready, or never ready—that's also her right.
    `,
    dimensions: { PR: 16, SH: -10, AI: 0, EW: 5, CF: 6, DK: 18, TN: 91, MB: 0, GL: 0, XZ: 0 }
  }

};

// 维度说明
const DIMENSIONS = {
  PR: { name: "粉色梦境指数", nameEn: "Pinky Dream Index", desc: "你活在粉色滤镜里还是现实里", low: "现实派", high: "梦幻派" },
  SH: { name: "社交活跃度", nameEn: "Social Activity Level", desc: "你是社牛还是宅神", low: "宅家精灵", high: "社交蝴蝶" },
  AI: { name: "颜值焦虑度", nameEn: "Appearance Anxiety Level", desc: "你对自身外貌有多焦虑", low: "心态平和", high: "颜值焦虑" },
  EW: { name: "公开度", nameEn: "Expression Level", desc: "你出来了没有", low: "深柜居民", high: "公开出柜" },
  CF: { name: "自律指数", nameEn: "Self-Discipline Index", desc: "你是计划派还是随缘党", low: "佛系随缘", high: "严格自律" },
  DK: { name: "社群归属感", nameEn: "Community Belonging Index", desc: "你需要群体还是一个人就够了", low: "独行侠", high: "群体依附" },
  TN: { name: "理性分析度", nameEn: "Theory Nerd Level", desc: "你分析身份还是跟着感觉走", low: "纯靠直觉", high: "理论狂魔" },
  MB: { name: "物质投入度", nameEn: "Investment Level", desc: "你在这件事上花了多少钱", low: "佛系省钱", high: "钱不是问题" },
  GL: { name: "表达一致性", nameEn: "Expression Consistency", desc: "你每天都在状态还是看心情", low: "看心情派", high: "全天候在线" },
  XZ: { name: "未来规划度", nameEn: "Future Planning Level", desc: "你有长期规划还是走一步看一步", low: "随遇而安", high: "五年计划党" }
};

if (typeof module !== 'undefined') {
  module.exports = { PERSONALITIES, DIMENSIONS };
}
