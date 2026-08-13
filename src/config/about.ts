export const aboutConfig = {
	intro: {
		eyebrow: "你好，很高兴认识你 👋",
		name: "许耿彬",
		roles: ["数码科技爱好者", "独立博客作者", "INTP-A"],
		description:
			"喜欢研究电脑、软件与网络，也喜欢把一个问题追到能说清楚为止。这里记录折腾过程，也收藏生活里值得记住的片段。",
	},
	mbti: {
		type: "INTP-A",
		description: "逻辑学家是富有创造力的发明家，对知识有着不可抑制的渴望。",
	},
	location: {
		label: "中国",
		note: "UTC+8 · 具体城市暂不公开",
		marker: { x: 76, y: 43 },
	},
	interests: [
		{
			name: "数码科技",
			description: "电脑、手机与软硬件",
			icon: "material-symbols:devices-rounded",
			accent: "250",
		},
		{
			name: "软件折腾",
			description: "系统、网络与部署",
			icon: "material-symbols:terminal-rounded",
			accent: "300",
		},
		{
			name: "游戏世界",
			description: "Steam 与游戏时光",
			icon: "material-symbols:sports-esports-rounded",
			accent: "340",
		},
		{
			name: "独立博客",
			description: "记录问题，也分享答案",
			icon: "material-symbols:edit-note-rounded",
			accent: "190",
		},
	],
	skills: [
		{ name: "Astro", icon: "material-symbols:rocket-launch-rounded" },
		{ name: "Markdown", icon: "material-symbols:markdown-rounded" },
		{ name: "GitHub", icon: "fa6-brands:github" },
		{ name: "Windows", icon: "fa6-brands:windows" },
		{ name: "网络服务", icon: "material-symbols:lan-rounded" },
	],
	status: [
		{ label: "正在做", value: "完善这个小站", icon: "material-symbols:construction-rounded" },
		{ label: "正在学", value: "Astro 与网络服务", icon: "material-symbols:auto-stories-rounded" },
		{ label: "博客节奏", value: "想清楚了就写", icon: "material-symbols:edit-calendar-rounded" },
	],
	siteFacts: [
		{ label: "建站框架", value: "Astro", icon: "material-symbols:rocket-launch-rounded" },
		{ label: "主题基底", value: "Fuwari", icon: "material-symbols:palette-outline" },
		{ label: "文章", value: "3 篇", icon: "material-symbols:article-rounded" },
		{ label: "内容许可", value: "CC BY-NC-SA 4.0", icon: "material-symbols:copyright-outline-rounded" },
	],
};
