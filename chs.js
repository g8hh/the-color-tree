/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "teal points": "青色点",
    "teal points, which are generating": "青色点，正在生成",
    "Teal Power, which makes Blue +": "青色力量，使蓝色 +",
    "Teal Power/sec": "青色力量/秒",
    "Yellow Power/sec": "黄色力量/秒",
    "Blue Power/sec": "蓝色力量/秒",
    "Red Power/sec": "红色力量/秒",
    "Green Power/sec": "绿色力量/秒",
    "Magenta Power/sec": "品红色力量/秒",
    "White Power/sec": "白色力量/秒",
    "w - reset for white points": "w - 重置得到白色点",
    "g - reset for green points": "g - 重置得到绿色点",
    "t - reset for teal points": "t - 重置得到青色点",
    "b - reset for blue points": "b - 重置得到蓝色点",
    "m - reset for magenta points": "b - 重置得到品红色点",
    "r - reset for red points": "b - 重置得到红色点",
    "y - reset for yellow points": "b - 重置得到黄色点",
    "white points": "白色点",
    "Infinity Power": "无限力量",
    "Infinity Power/sec": "无限力量/秒",
    "Limit number is": "限制数是",
    "Next at": "下一个在",
    "points": "点数",
    "Reset for": "重置得到 ",
    "Start to generate points.": "开始生成点数。",
    "White points add to the Green Effect.": "白色点增加了绿色效果。",
    "White points boosts point generation.": "白色点促进点生成。",
    "yellow points": "黄色点数",
    "yellow points, which are generating": "黄色点数，它们正在生成",
    "|Hotkeys|": "|快捷键|",
    "|info|": "|信息|",
    "|Save|": "|保存|",
    "|settings|": "|设置|",
    "|Settings|": "|设置|",
    "|The Color Tree|": "|颜色树|",
    "|WIPE|": "|擦除|",
    "|Version| - alpha build 6": "|版本| - alpha build 6",
    "% stronger": "% 更强",
    "% bouns 2nd row Colors effects": "% 奖励第二行颜色效果",
    "Because youre limit number has finished, you can go to infinity, then increase limit! Youre ready?": "因为你的限制数已经用完了，你可以去无穷大，然后增加限制！ 你准备好了？",
    "red points": "红色点",
    "magenta points": "品红色点",
    "green points": "绿色点",
    "blue points": "蓝色点",
    "Blue points add to the Red Effect.": "蓝色点添加到红色效果。",
    "Blue points boost Blue effects.": "蓝点增强蓝色效果。",
    "blue points, which multiples white point gain by": "蓝色点，将白色点增益乘以",
    "Yellow Power, which makes Red +": "黄色力量，这使得 红色 +",
    "You've be seen Infinity!": "你已经看到了无限！",
    "Points boost white points.": "点数提升白色点。",
    "Points boost colors on 2nd rows.": "点数提升第二行的颜色",
    "magenta points, getting +": "品红色点，获得 +",
    "3rd white upgrade is stronger based on magenta points.": "基于品红色点，第三个白色升级更强。",
    "2nd white upgrade is stronger based on yellow points.": "基于黄色点，第二个白色升级更强。",
    "Fan game \"The Prestige Tree\" by Jacorb": "Jacorb 的粉丝游戏“The Prestige Tree”",
    "Reset previous progress to be infinity!": "将之前的进度重置为无穷大！",
    "red points, translated to a": "红色点，翻译成",
    "Red points boost white points.": "红色点提升白点。",
    "Red points boost red effects.": "红色点增强红色效果。",
    "Red points add to the Blue Effect.": "红色点添加到蓝色效果。",
    "Gain 100% blue points/sec.": "获得 100% 蓝色点/秒。",
    "Gain 100% green points/sec.": "获得 100% 绿色点/秒。",
    "Gain 100% red points/sec.": "获得 100% 红色点/秒。",
    "Gain 100% white points/sec.": "获得 100% 白色点/秒。",
    "Gain double white points.": "获得双倍白色点",
    "Green points boost white points.": "绿色点提升白色点。",
    "green points, which are generating": "绿色点，它们正在生成",
    "Green Power boost green points.": "绿色力量提升绿色点。",
    "Green Power is stronger based on teal points.": "基于青色点，绿色力量更强大。",
    "Green Power, which multiples Point gain by": "绿色力量，将点数增益乘以",
    "infinity points": "无限点",
    "infinity points, which are generating": "无限点，生成",
    "Keep green upgrades on reset for 3rd row.": "重置时保留绿色升级第三行。",
    "Keep red upgrades on reset for 3rd row.": "重置时保留红色升级第三行。",
    "Keep blue upgrades on reset for 3rd row.": "重置时保留蓝色升级第三行。",
    "Keep white upgrades on reset.": "重置时保留白色升级。",
    "Points boosts point generation.": "点数促进点数生成。",
    "Raise point generation based on magenta points.": "基于品红色点提升点数生成。",
    "Raise point generation by 1.15.": "将点数生成提高 1.15。",
    "x multiplier to point gain": "x 乘数到点数增益",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": " ",
    "\n": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^Currently: \^([\d\.]+)$/, '当前: \^$1'],
    [/^Currently: \+([\d\.]+) to base$/, '当前: \+$1 到基础'],
    [/^Currently: ([\d\.]+)x$/, '当前: $1x'],
    [/^\(Reach over (.+) points to reset\)$/, '\(达到 $1 点数以重置\)'],
    [/^Reach over (.+) points to reset$/, '达到 $1 点数以重置'],
    [/^Cost: (.+) magenta points$/, '成本: $1 品红色点'],
    [/^Cost: (.+) teal points$/, '成本: $1 青色点'],
    [/^Cost: (.+) blue points$/, '成本: $1 蓝色点'],
    [/^Cost: (.+) red points$/, '成本: $1 红色点'],
    [/^Cost: (.+) green points$/, '成本: $1 绿色点'],
    [/^Cost: (.+) yellow points$/, '成本: $1 黄色点'],
    [/^Cost: (.+) white points$/, '成本: $1 白色点'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^(\d+) Royal points$/, '$1 皇家点数'],
    [/^Cost: (\d+) RP$/, '成本：$1 皇家点数'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);