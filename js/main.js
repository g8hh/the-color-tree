var diff = 0;
var date = Date.now();

function changeTab(id) {
    if (tab != id) {
        if (tab != 'none') document.getElementById(tab).style.display = 'none'
        document.getElementById(id).style.display = 'inline'
        tab = id
    }
}

function reset(col) {
    let reseted = false
    switch (col) {
        case 'w':
            if (col_gain.w(player.points).gte(1)) {
                player.w.points = player.w.points.add(col_gain.w(player.points))
                player.points = E(0)
                reseted = true
            }
            break
        default:
            if (col_gain[col](player.points).gte(1)) {
                player[col].unl = true
                player[col].points = player[col].points.add(col_gain[col](player.points))
                player.w.points = E(0)
                player.points = E(10)
                reseted = true
            }
            break
    }
    if (reseted & col != 'w') {
        if (!player[col].upg[1]) player.w.upg = player.w.upg.map(() => {false})
        player.g.power = E(0)
    }
}

function buyUpg(col, id) {
    let ic = colors.indexOf(col)
    let color_upg = col_upgs[col][id]
    if (player[col].points.gte(color_upg.cost) & !player[col].upg[id]) {
        player[col].points = player[col].points.sub(color_upg.cost)
        player[col].upg[id] = true
    }
}

function loop(){
    diff = Date.now()-date;
    calc(diff);
    updateDisplay();
    date = Date.now();
}

function updateDisplay() {
    upd('points', notate(player.points))

    for (let i = 0; i < 3; i++) {
        upd(full_colors[i]+'s', notate(player[colors[i]].points))
        upd(colors[i]+'_reset', notate(col_gain[colors[i]](player.points)))
    }

    upd('eff0', notate(col_effs.r(player.r.points)))
    upd('eff1', notate(col_effs.g(player.g.points)))
    upd('eff2', notate(col_effs.gp(player.g.power)))
    upd('eff3', notate(col_effs.b(player.b.points)))

    upd('power1', notate(player.g.power))

    for (let c = 0; c < Object.keys(col_upgs).length; c++) {
        let color_upg = col_upgs[colors[c]]
        for (let i = 0; i < Object.keys(color_upg).length; i++) {
            let text = color_upg[i].desc + 
            ('<br>Cost: '+color_upg[i].cost+' '+full_colors[c]+' points') +
            ((color_upg[i].cur != undefined)?('<br>Currently: '+color_upg[i].effDis(color_upg[i].cur())):'')
            upd(colors[c]+'upg'+i, text)
            document.getElementById(colors[c]+'upg'+i).style.display = (color_upg[i].unl()) ? 'inline' : 'none'
            document.getElementById(colors[c]+'upg'+i).style.backgroundColor = (player[colors[c]].upg[i]) ? '#68a66b' : ((player[colors[c]].points.gte(color_upg[i].cost)) ? hex_colors[c]: '#9c6e6e')
        }
    }
}

setInterval(loop, 50);