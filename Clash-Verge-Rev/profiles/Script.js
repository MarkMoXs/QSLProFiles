// 国内DNS服务器
const domesticNameservers = [
  "https://dns.alidns.com/dns-query", // 阿里DNSPod DoH
  "https://223.5.5.5/dns-query", // 阿里DoH
  "https://doh.pub/dns-query" // 腾讯DoH，因腾讯云即将关闭免费版IP访问，故用域名
];

// 国外DNS服务器
const foreignNameservers = [
  "https://cloudflare-dns.com/dns-query", // CloudflareDNS
  "https://77.88.8.8/dns-query", //YandexDNS
  "https://8.8.4.4/dns-query#ecs=1.1.1.1/24&ecs-override=true", // GoogleDNS
  "https://208.67.222.222/dns-query#ecs=1.1.1.1/24&ecs-override=true", // OpenDNS
  "https://9.9.9.9/dns-query", //Quad9DNS
];

// DNS配置
const dnsConfig = {
  "enable": true,  // 是否启用，如为 false，则使用系统 DNS 解析

  "ipv6": false,  // 是否解析 IPV6, 如为 false, 则回应 AAAA 的空解析

  "prefer-h3": false,  // DOH 优先使用 http/3

  "respect-rules": true,  // dns 连接遵守路由规则，需配置 proxy-server-nameserver ### 强烈不建议和 prefer-h3 一起使用

  "listen": "0.0.0.0:1053",  // DNS 服务监听，支持 udp, tcp

  "use-hosts": true,  // 是否回应配置中的 hosts，默认 true

  "use-system-hosts": false,  // 是否查询系统 hosts，默认 true

  "cache-algorithm": "arc",  // 支持的算法有： "arc"（Adaptive Replacement Cache，自适应替换缓存算法），"lru"（Least Recently Used，最近最少使用算法），"lfu"（Least Frequently Used，最不经常使用算法）。默认值为 "arc"，它结合了 LRU 和 LFU 的优点，能够更高效地管理 DNS 缓存。

  "enhanced-mode": "fake-ip",  // 可选值 fake-ip/redir-host，默认redir-host,mihomo 的 DNS 处理模式

  "fake-ip-range": "198.18.0.1/16",  // fakeip 下的 IP 段设置，tun 的默认 IPV4 地址 也使用此值作为参考

  // fakeip 过滤，以下地址不会下发 fakeip 映射用于连接
  "fake-ip-filter": [
    // 本地主机/设备
    "+.lan",
    "+.local",
    // // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com"
  ],

  // 默认 DNS, 用于解析 DNS 服务器 的域名，必须为 IP, 可为加密 DNS
  "default-nameserver": ["223.5.5.5","1.2.4.8","1.1.1.1"],

  // 全局默认 DNS，Clash 会在一般模式下使用，适用于兜底的流量。
  "nameserver": [...foreignNameservers],

  // 代理节点域名解析服务器，仅用于解析代理节点的域名，如果不填则遵循 nameserver-policy、nameserver 和 fallback 的配置
  "proxy-server-nameserver":[...domesticNameservers],

  // 用于 direct 出口域名解析的 DNS 服务器，如果不填则遵循 nameserver-policy、nameserver 和 fallback 的配置
  "direct-nameserver":[...domesticNameservers],

  // 是否遵循 nameserver-policy，默认为不遵守，仅当 direct-nameserver 不为空时生效
  "direct-nameserver-follow-policy":false,

  // 指定域名查询的解析服务器，可使用 geosite, 优先于 nameserver/fallback 查询
  "nameserver-policy": {
    "geosite:cn": domesticNameservers,
    // ============== 阿里系专用 DNS ==============
    "+.taobao.com": ["223.5.5.5"],
    "+.tmall.com": ["223.5.5.5"],
    "+.1688.com": ["223.5.5.5"],
    "+.alibaba.com": ["223.5.5.5"],
    "+.alibabagroup.com": ["223.5.5.5"],
    "+.alicdn.com": ["223.5.5.5"],
    "+.aliyun.com": ["223.5.5.5"],
    "+.alipay.com": ["223.5.5.5"],
    "+.aliexpress.com": ["223.5.5.5"],
    // ============== 腾讯系专用 DNS ==============
    "+.qq.com": ["119.29.29.29"],
    "+.tencent.com": ["119.29.29.29"],
    "+.wechat.com": ["119.29.29.29"],
    "+.weixin.com": ["119.29.29.29"],
    "+.qcloud.com": ["119.29.29.29"],
    "+.tencentcloud.com": ["119.29.29.29"],
    "+.qqmail.com": ["119.29.29.29"],
    "+.myapp.com": ["119.29.29.29"],
    "+.baidu.com": ["223.5.5.5"],
    "+.bilibili.com": ["119.29.29.29"],
    "+.douyin.com": ["119.29.29.29"],
    "+.jd.com": ["119.29.29.29"],
  }
};

// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};

// 规则集配置
const ruleProviders = {

// 1 🛍️ Amazon 亚马逊
  "Amazon": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Amazon.yaml",
    "path": "./ruleset/kelee/Amazon.yaml"
  },

// 2 🍎 Apple 苹果
  "Apple": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Apple.yaml",
    "path": "./ruleset/kelee/Apple.yaml"
  },

// 3 🅱️ Bing 必应
  "Bing": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Bing.yaml",
    "path": "./ruleset/kelee/Bing.yaml"
  },

// 4 ⛅ Cloudflare 验证
  "Cloudflare": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Cloudflare.yaml",
    "path": "./ruleset/kelee/Cloudflare.yaml"
  },

// 5 🐼 Discord
  "Discord": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Discord.yaml",
    "path": "./ruleset/kelee/Discord.yaml"
  },

// 6 🥁 Instagram
  "Instagram": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Instagram.yaml",
    "path": "./ruleset/kelee/Instagram.yaml"
  },

// 7 📖 Facebook 脸书
  "Facebook": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Facebook.yaml",
    "path": "./ruleset/kelee/Facebook.yaml"
  },

// 8 ✴️ Gemini 谷歌
  "Gemini": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Gemini.yaml",
    "path": "./ruleset/kelee/Gemini.yaml"
  },

// 9 🔍 Google 谷歌
  "Google": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Google.yaml",
    "path": "./ruleset/kelee/Google.yaml"
  },

// 10 ⛄️ GitHub
  "GitHub": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/GitHub.yaml",
    "path": "./ruleset/kelee/GitHub.yaml"
  },

// 11 🔞 R18+
  "JavHub JP": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/Clash-Verge-Rev/ruleset/JavHub-JP.yaml",
    "path": "./ruleset/MarkMoXs/JavHub-JP.yaml"
  },

// 12 🔞 R18+
  "JavHub CN": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/Clash-Verge-Rev/ruleset/JavHub-CN.yaml",
    "path": "./ruleset/MarkMoXs/JavHub-CN.yaml"
  },

// 13 🖥️ Microsoft 微软
  "Microsoft": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Microsoft.yaml",
    "path": "./ruleset/kelee/Microsoft.yaml"
  },

// 14 🎬 Netflix 奈飞
  "Netflix": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Netflix.yaml",
    "path": "./ruleset/kelee/Netflix.yaml"
  },

// 15 🤖 OpenAI
  "OpenAI": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/OpenAI.yaml",
    "path": "./ruleset/kelee/OpenAI.yaml"
  },

// 16 🐹 Reddit 社区
  "Reddit": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Reddit.yaml",
    "path": "./ruleset/kelee/Reddit.yaml"
  },

// 17 ⏲️ Speedtest 测速
  "Speedtest": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Speedtest.yaml",
    "path": "./ruleset/kelee/Speedtest.yaml"
  },

// 18 🎼 Spotify
  "Spotify": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Spotify.yaml",
    "path": "./ruleset/kelee/Spotify.yaml"
  },

// 19 📟 Telegram 电报
  "Telegram": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Telegram.yaml",
    "path": "./ruleset/kelee/Telegram.yaml"
  },

// 20 🎶 Tiktok
  "TikTok": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/TikTok.yaml",
    "path": "./ruleset/kelee/TikTok.yaml"
  },

// 21 📔 Twitch
  "Twitch": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Twitch.yaml",
    "path": "./ruleset/kelee/Twitch.yaml"
  },

// 22 🐦 Twitter 推特
  "Twitter": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Twitter.yaml",
    "path": "./ruleset/kelee/Twitter.yaml"
  },

// 23 📺 YouTube 油管
  "YouTube": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/YouTube.yaml",
    "path": "./ruleset/kelee/YouTube.yaml"
  },

// 24 🎞️ 中国媒体
  "ChinaMedia": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/ChinaMedia.yaml",
    "path": "./ruleset/kelee/ChinaMedia.yaml"
  },

// 25 🌏 中国网站
  "ChinaMax": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/ChinaMax.yaml",
    "path": "./ruleset/kelee/ChinaMax.yaml"
  },

// 26 🎥 国际媒体
  "GlobalMedia": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/GlobalMedia.yaml",
    "path": "./ruleset/kelee/GlobalMedia.yaml"
  },

// 27 🗺️ 国际网站
  "Global": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://rule.kelee.one/Clash/Global.yaml",
    "path": "./ruleset/kelee/Global.yaml"
  },

  "reject": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    "path": "./ruleset/loyalsoldier/reject.yaml"
  },

  "proxy": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    "path": "./ruleset/loyalsoldier/proxy.yaml"
  },

  "direct": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    "path": "./ruleset/loyalsoldier/direct.yaml"
  },

  "private": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    "path": "./ruleset/loyalsoldier/private.yaml"
  },

  "gfw": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    "path": "./ruleset/loyalsoldier/gfw.yaml"
  },

  "tld-not-cn": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
  },

  "cncidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    "path": "./ruleset/loyalsoldier/cncidr.yaml"
  },

  "lancidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    "path": "./ruleset/loyalsoldier/lancidr.yaml"
  },

  "applications": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    "path": "./ruleset/loyalsoldier/applications.yaml"
  },
};

// 规则
const rules = [
  // 自定义 PROCESS-NAME 进程规则
  "PROCESS-NAME,steam.exe,🚝 自定义直连",
  // 自定义 DOMAIN-SUFFIX 域名后缀规则
  "DOMAIN-SUFFIX,immersivetranslate.com,🚒 自定义代理",
  "DOMAIN-SUFFIX,mb3admin.com,🚝 自定义直连",// Emby
  "DOMAIN-SUFFIX,darkreader.org,🚝 自定义直连",// Emby
  "DOMAIN-SUFFIX,tailscale.com,🔍 Google",
  // 自定义 DOMAIN 域名匹配规则
  "DOMAIN,v2rayse.com,👨‍🚀 模式选择", // V2rayse节点工具

  // kelee 远程规则集
  "RULE-SET,Amazon,🛍️ Amazon",
  "RULE-SET,Apple,🍎 Apple",
  "RULE-SET,Bing,🅱️ Bing",
  "RULE-SET,Cloudflare,⛅ Cloudflare",
  "RULE-SET,Discord,🐼 Discord",
  "RULE-SET,Instagram,🥁 Instagram",
  "RULE-SET,Facebook,📖 Facebook",
  "RULE-SET,Gemini,✴️ Gemini",
  "RULE-SET,Google,🔍 Google",
  "RULE-SET,GitHub,⛄️ GitHub",
  "RULE-SET,JavHub JP,🙅🏻 JavHub JP",
  "RULE-SET,JavHub CN,🙅🏻‍♂️ JavHub CN",
  "RULE-SET,Microsoft,🖥️ Microsoft",
  "RULE-SET,Netflix,🎬 Netflix",
  "RULE-SET,OpenAI,🤖 OpenAI",
  "RULE-SET,Reddit,🐹 Reddit",
  "RULE-SET,Speedtest,⏲️ Speedtest",
  "RULE-SET,Spotify,🎼 Spotify",
  "RULE-SET,Telegram,📟 Telegram",
  "RULE-SET,TikTok,🎶 TikTok",
  "RULE-SET,Twitch,📔 Twitch",
  "RULE-SET,Twitter,🐦 Twitter",
  "RULE-SET,YouTube,📺 YouTube",
  "RULE-SET,ChinaMedia,🎞️ 中国媒体",
  "RULE-SET,ChinaMax,🌏 中国网站",
  "RULE-SET,GlobalMedia,🎥 国际媒体",
  "RULE-SET,Global,🗺️ 国际网站",
  // Loyalsoldier 规则集
  "RULE-SET,applications,💻 全局直连",
  "RULE-SET,private,💻 全局直连",
  "RULE-SET,reject,🚯 阻止广告",
  "RULE-SET,proxy,👨‍🚀 模式选择",
  "RULE-SET,gfw,👨‍🚀 模式选择",
  "RULE-SET,tld-not-cn,👨‍🚀 模式选择",
  "RULE-SET,direct,💻 全局直连",
  "RULE-SET,lancidr,💻 全局直连,no-resolve",
  "RULE-SET,cncidr,💻 全局直连,no-resolve",
  // 其他规则
  "GEOIP,LAN,💻 全局直连,no-resolve",
  "GEOIP,CN,💻 全局直连,no-resolve",
  "MATCH,🐟 漏网之鱼"
];

// 代理组通用配置
const groupBaseOption = {
  "interval": 0,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};

const landingNodeProxies = [
    {
      "name": "webshare", // 给你的落地节点起个名字
      "server": "", // 替换成你的落地节点 IP 或域名
      "port": 12345, // 替换成你的落地节点端口
      "type": "socks5",
      "username": "", // 替换成你的用户名
      "password": "", // 替换成你的密码
      "tls": false,
      "skip-cert-verify": true,
      "udp": true,
      "dialer-proxy": "🚀 节点选择"
    },
    // 如果有更多落地节点，在这里继续添加
    // {
    //   "name": "landing-node-2",
    //   ...
    //   "dialer-proxy": "🚀 节点选择"
    // }
];

const landingNodeNames = landingNodeProxies.map(p => p.name);

const proxyGroupsConfig = [
    {
        ...groupBaseOption,
        "name": "👨‍🚀 模式选择",
        "type": "select",
        "proxies": [
            "🚀 节点选择",
            "🏠 落地节点",
            "💻 全局直连"
        ]
    },
    {
      ...groupBaseOption,
      "name": "🚀 节点选择",
      "type": "select",
      "proxies": ["⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
    },
    {
      ...groupBaseOption,
      "name": "🏠 落地节点",
      "type": "select",
      "proxies": [...landingNodeNames],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/openwrt.svg"
    },
    {
      ...groupBaseOption,
      "name": "⏲️ 延迟选优",
      "type": "url-test",
      "tolerance": 50,
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
    },
    {
      ...groupBaseOption,
      "name": "🚑 故障转移",
      "type": "fallback",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
    },
    {
      ...groupBaseOption,
      "name": "⚖️ 负载均衡(散列)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg"
    },
    {
      ...groupBaseOption,
      "name": "🪐 负载均衡(轮询)",
      "type": "load-balance",
      "strategy": "round-robin",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
    },
    {
      ...groupBaseOption,
      "name": "🇭🇰 香港 HK",
      "type": "select",
      "include-all": true,
      "filter": "(🇭🇰)|(港)|(香港)|(HK)",
      "icon": "https://raw.githubusercontent.com/MarkMoXs/Qure/refs/heads/master/IconSet/Color/Hong_Kong.png"
    },
    {
      ...groupBaseOption,
      "name": "🇹🇼 台湾 TW",
      "type": "select",
      "include-all": true,
      "filter": "(🇹🇼)|(台)|(台湾)|(TW)",
      "icon": "https://raw.githubusercontent.com/MarkMoXs/Qure/refs/heads/master/IconSet/Color/Taiwan.png"
    },
    {
      ...groupBaseOption,
      "name": "🇯🇵 日本 JP",
      "type": "select",
      "include-all": true,
      "filter": "(🇯🇵)|(日)|(日本)|(JP)",
      "icon": "https://raw.githubusercontent.com/MarkMoXs/Qure/refs/heads/master/IconSet/Color/Japan.png"
    },
    {
      ...groupBaseOption,
      "name": "🇰🇷 韩国 KR",
      "type": "select",
      "include-all": true,
      "filter": "(🇰🇷)|(韩)|(韩国)|(KR)",
      "icon": "https://raw.githubusercontent.com/MarkMoXs/Qure/refs/heads/master/IconSet/Color/Korea.png"
    },
    {
      ...groupBaseOption,
      "name": "🇺🇸 美国 US",
      "type": "select",
      "include-all": true,
      "filter": "(🇺🇸)|(美)|(States)|(US)",
      "icon": "https://raw.githubusercontent.com/MarkMoXs/Qure/refs/heads/master/IconSet/Color/United_States.png"
    },
    {
      ...groupBaseOption,
      "name": "🇸🇬 新加坡 SG",
      "type": "select",
      "include-all": true,
      "filter": "🇸🇬 新加坡 SG",
      "icon": "https://raw.githubusercontent.com/MarkMoXs/Qure/refs/heads/master/IconSet/Color/Singapore.png"
    },

// 1 🛍️ Amazon 亚马逊
    {
      ...groupBaseOption,
      "name": "🛍️ Amazon",
      "type": "select",
      "proxies": ["🇯🇵 日本 JP", "🇭🇰 香港 HK", "🇹🇼 台湾 TW", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Amazon.png"
    },

// 2 🍎 Apple 苹果
    {
      ...groupBaseOption,
      "name": "🍎 Apple",
      "type": "select",
      "proxies": [ "💻 全局直连", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Apple.png"
    },

// 3 🅱️ Bing 必应
    {
      ...groupBaseOption,
      "name": "🅱️ Bing",
      "type": "select",
      "proxies": ["🇸🇬 新加坡 SG", "🇺🇸 美国 US", "🇭🇰 香港 HK", "🇹🇼 台湾 TW", "🇰🇷 韩国 KR", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Bing.png"
    },

// 4 ⛅ Cloudflare 验证
    {
      ...groupBaseOption,
      "name": "⛅ Cloudflare",
      "type": "select",
      "proxies": ["🇭🇰 香港 HK", "🇹🇼 台湾 TW", "🇯🇵 日本 JP", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Cloudflare.png"
    },

// 5 🐼 Discord
    {
      ...groupBaseOption,
      "name": "🐼 Discord",
      "type": "select",
      "proxies": ["🇭🇰 香港 HK", "🇹🇼 台湾 TW", "🇯🇵 日本 JP", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Discord.png"
    },

// 6 🥁 Instagram
    {
      ...groupBaseOption,
      "name": "🥁 Instagram",
      "type": "select",
      "proxies": ["🇹🇼 台湾 TW", "🇭🇰 香港 HK", "🇯🇵 日本 JP", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Instagram.png"
    },

// 7 📖 Facebook 脸书
    {
      ...groupBaseOption,
      "name": "📖 Facebook",
      "type": "select",
      "proxies": ["🇹🇼 台湾 TW", "🇭🇰 香港 HK", "🇯🇵 日本 JP", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Facebook.png"
    },

// 8 ✴️ Gemini 谷歌
    {
      ...groupBaseOption,
      "name": "✴️ Gemini",
      "type": "select",
      "proxies": ["🇹🇼 台湾 TW", "🇭🇰 香港 HK", "🇯🇵 日本 JP", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Gemini.png"
    },

// 9 🔍 Google 谷歌
    {
      ...groupBaseOption,
      "name": "🔍 Google",
      "type": "select",
      "proxies": ["🇹🇼 台湾 TW", "🇭🇰 香港 HK", "🇯🇵 日本 JP", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Google.png"
    },

// 10 ⛄️ GitHub
    {
      ...groupBaseOption,
      "name": "⛄️ GitHub",
      "type": "select",
      "proxies": ["🇭🇰 香港 HK", "🇹🇼 台湾 TW", "🇯🇵 日本 JP", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/GitHub.png"
    },

// 11 🔞 R18+ JP
    {
      ...groupBaseOption,
      "name": "🙅🏻 JavHub JP",
      "type": "select",
      "proxies": ["🇯🇵 日本 JP", "🇹🇼 台湾 TW", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🇭🇰 香港 HK", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/JavXxOo.png"
    },

// 12 🔞 R18+ CN
    {
      ...groupBaseOption,
      "name": "🙅🏻‍♂️ JavHub CN",
      "type": "select",
      "proxies": ["🇭🇰 香港 HK", "🇹🇼 台湾 TW", "🇯🇵 日本 JP", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/JavXxOo.png"
    },

// 13 🖥️ Microsoft 微软
    {
      ...groupBaseOption,
      "name": "🖥️ Microsoft",
      "type": "select",
      "proxies": ["💻 全局直连", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Microsoft.png"
    },

// 14 🎬 Netflix 奈飞
    {
      ...groupBaseOption,
      "name": "🎬 Netflix",
      "type": "select",
      "proxies": ["🇹🇼 台湾 TW", "🇭🇰 香港 HK", "🇯🇵 日本 JP", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Netflix.png"
    },

// 15 🤖 OpenAI
    {
      ...groupBaseOption,
      "name": "🤖 OpenAI",
      "type": "select",
      "proxies": ["🇹🇼 台湾 TW", "🇭🇰 香港 HK", "🇯🇵 日本 JP", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/ChatGPT.png"
    },

// 16 🐹 Reddit 社区
    {
      ...groupBaseOption,
      "name": "🐹 Reddit",
      "type": "select",
      "proxies": ["🇹🇼 台湾 TW", "🇭🇰 香港 HK", "🇯🇵 日本 JP", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Reddit.png"
    },

// 17 ⏲️ Speedtest 测速
    {
      ...groupBaseOption,
      "name": "⏲️ Speedtest",
      "type": "select",
      "proxies": ["💻 全局直连", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Speedtest.png"
    },

// 18 🎼 Spotify
    {
      ...groupBaseOption,
      "name": "🎼 Spotify",
      "type": "select",
      "proxies": ["🇹🇼 台湾 TW", "🇭🇰 香港 HK", "🇯🇵 日本 JP", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Spotify.png"
    },

// 19 📟 Telegram 电报
    {
      ...groupBaseOption,
      "name": "📟 Telegram",
      "type": "select",
      "proxies": ["🇭🇰 香港 HK", "🇹🇼 台湾 TW", "🇯🇵 日本 JP", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Telegram.png"
    },

// 20 🎶 TikTok
    {
      ...groupBaseOption,
      "name": "🎶 TikTok",
      "type": "select",
      "proxies": ["🇹🇼 台湾 TW", "🇭🇰 香港 HK", "🇯🇵 日本 JP", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/TikTok.png"
    },

// 21 📔 Twitch
    {
      ...groupBaseOption,
      "name": "📔 Twitch",
      "type": "select",
      "proxies": ["🇭🇰 香港 HK", "🇹🇼 台湾 TW", "🇯🇵 日本 JP", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Twitch.png"
    },

// 22 🐦 Twitter 推特
    {
      ...groupBaseOption,
      "name": "🐦 Twitter",
      "type": "select",
      "proxies": ["🇭🇰 香港 HK", "🇹🇼 台湾 TW", "🇯🇵 日本 JP", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Twitter.png"
    },

// 23 📺 YouTube 油管
    {
      ...groupBaseOption,
      "name": "📺 YouTube",
      "type": "select",
      "proxies": ["🇹🇼 台湾 TW", "🇭🇰 香港 HK", "🇯🇵 日本 JP", "🇰🇷 韩国 KR", "🇺🇸 美国 US", "🇸🇬 新加坡 SG", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/YouTube.png"
    },

// 24 🎞️ 中国媒体
    {
      ...groupBaseOption,
      "name": "🎞️ 中国媒体",
      "type": "select",
      "proxies": ["💻 全局直连", "👨‍🚀 模式选择", "🚀 节点选择", "🏠 落地节点", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/CMedia.png"
    },

// 25 🌏 中国网站
    {
      ...groupBaseOption,
      "name": "🌏 中国网站",
      "type": "select",
      "proxies": ["💻 全局直连", "👨‍🚀 模式选择", "🚀 节点选择", "🏠 落地节点", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Mainland.png"
    },

// 26 🎥 国际媒体
    {
      ...groupBaseOption,
      "name": "🎥 国际媒体",
      "type": "select",
      "proxies": ["👨‍🚀 模式选择", "🚀 节点选择", "🏠 落地节点", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/GMedia.png"
    },

// 27 🗺️ 国际网站
    {
      ...groupBaseOption,
      "name": "🗺️ 国际网站",
      "type": "select",
      "proxies": ["👨‍🚀 模式选择", "🚀 节点选择", "🏠 落地节点", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/Global.png"
    },

    {
      ...groupBaseOption,
      "name": "🚯 阻止广告",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/NoAds.png"
    },

    {
      ...groupBaseOption,
      "name": "💻 全局直连",
      "type": "select",
      "proxies": ["DIRECT", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/DIRECT.png"
    },

    {
      ...groupBaseOption,
      "name": "❌ 全局拦截",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
    },

    {
      ...groupBaseOption,
      "name": "🚝 自定义直连",
      "type": "select",
      "include-all": true,
      "proxies": ["💻 全局直连", "👨‍🚀 模式选择", "🚀 节点选择", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)"],
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/CustomDIRECT.png"
    },

    {
      ...groupBaseOption,
      "name": "🚒 自定义代理",
      "type": "select",
      "include-all": true,
      "proxies": ["👨‍🚀 模式选择", "🚀 节点选择", "🏠 落地节点", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "icon": "https://raw.githubusercontent.com/MarkMoXs/QSLProFiles/refs/heads/TestFiles/FrostyIcon/CustomPROXY.png"
    },

    {
      ...groupBaseOption,
      "name": "🐟 漏网之鱼",
      "type": "select",
      "proxies": ["👨‍🚀 模式选择", "🚀 节点选择", "🏠 落地节点", "⏲️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "🪐 负载均衡(轮询)", "💻 全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    }
  ];

// 多订阅合并，这里添加额外的地址
const proxyProviders = {
  "🩷 良心云": {
    "type": "http",   // 订阅链接
    "url": "https://xn--9kqz23b19z.com/#/register?code=5jvvI2ZA",
    "interval": 86400,  // 自动更新时间 86400 (秒) / 3600 = 24 小时
    "proxy": "👨‍🚀 模式选择",
    "override": {
      "additional-prefix": "🩷 良心云 | "  // 节点名称前缀 p1，用于区别机场节点
    }
  },
  "🏖️ 桔子云": {
    "type": "http",   // 订阅链接
    "url": "https://juzi82.xyz/auth/register?code=2t0z",
    "interval": 86400,  // 自动更新时间 86400 (秒) / 3600 = 24 小时
    "proxy": "👨‍🚀 模式选择",
    "override": {
      "additional-prefix": "🏖️ 桔子云 | "  // 节点名称前缀 p1，用于区别机场节点
    }
  },
  // 其他订阅地址
}

// 程序入口
function main(config) {
  const originalProxies = config?.proxies ? [...config.proxies] : [];
  const proxyCount = originalProxies.length;
  const originalProviders = config?.["proxy-providers"] || {};
  const proxyProviderCount = originalProviders !== null && typeof originalProviders === 'object' ? Object.keys(originalProviders).length : 0;

  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;
  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules; // Use the modified rules array defined above

  // Process original proxies (just ensure UDP)
  const processedProxies = originalProxies.map(proxy => {
      if (proxy && typeof proxy === 'object' && proxy.name) {
          proxy.udp = true;

          // 新增：针对 AnyTLS 类型强制加前缀
          if (proxy.type === "anytls" && !proxy.name.startsWith("🏖️ 桔子云 |")) {
            proxy.name = "🏖️ 桔子云 | " + proxy.name;
            console.log(`手动添加前缀到 AnyTLS 节点: ${proxy.name}`);
          }

          // 节点绑定的接口，从此接口发起连接，适用于部分vpn情况
          // proxy["interface-name"] = "WLAN"
          // proxy["interface-name"] = "以太网"
      } else {
          console.warn("警告：发现一个无效或缺少名称的原始代理配置:", proxy);
          return null;
      }
      return proxy;
  }).filter(p => p !== null);

  // Combine proxies
  config["proxies"] = [...processedProxies, ...landingNodeProxies];
  config["proxy-providers"] = {
    ...originalProviders,
    ...proxyProviders
  };

  // 转义正则元字符，保证名字按“字面量”匹配
  function escapeForRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // 取出所有落地节点的名字，并做转义
  const landingNodeNames = landingNodeProxies.map(p => p.name);
  const escapedNames = landingNodeNames
    .map(escapeForRegExp)
    .join('|');

  // 构造只匹配完全等于这些名字的正则
  const excludeLandingFilter = escapedNames
    ? `^(?:${escapedNames})$`
    : null;

  // 定义需要排除落地节点的组名
  const groupsToExcludeLandingNodes = [
      "🚀 节点选择",
      "⏲️ 延迟选优",
      "⚖️ 负载均衡(散列)",  // 同一个域名的请求全部分到同一个节点
      "🪐 负载均衡(轮询)"  //  同一个域名的请求全部分到不同的节点
  ];

  // 遍历所有代理组配置，为指定的组添加排除落地节点的过滤器
  const finalProxyGroups = proxyGroupsConfig.map(group => {
      // 检查当前组名是否在需要排除落地节点的列表中，并且确实有落地节点需要排除
      if (groupsToExcludeLandingNodes.includes(group.name) && excludeLandingFilter) {
          // 合并已有的 exclude-filter：只要旧规则 或 新排除规则 匹配，就排除
          // 如果 group["exclude-filter"] 已存在，则用 | 连接新旧规则
          // 否则直接使用新的 excludeLandingFilter
          const existingFilter = group["exclude-filter"];
          group["exclude-filter"] = existingFilter
              ? `(${existingFilter})|(${excludeLandingFilter})`
              : excludeLandingFilter;

          console.log(
              `信息：为组 [${group.name}] 添加或合并了落地节点排除过滤器: ${group["exclude-filter"]}`
          );
      }
      return group; // 返回（可能已修改的）组配置
  });

  config["proxy-groups"] = finalProxyGroups; // 使用处理过的代理组
  return config;
}