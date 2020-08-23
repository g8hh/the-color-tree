loadGame()

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
    if (col == 'w') {
        if (col_gain.w(player.points).gte(1)) {
            player[col].unl = true
            player.w.points = player.w.points.add(col_gain.w(player.points))
            player.points = E(0)
            reseted = true
        }
    } else if (col == 'r' || col == 'g' || col == 'b') {
        if (col_gain[col](player.points).gte(1)) {
            if (!player[col].upg[2]) player.w.upg = player.w.upg.map(() => {false})
            player[col].unl = true
            player[col].points = player[col].points.add(col_gain[col](player.points))
            player.w.points = E(0)
            player.points = E(10)
            reseted = true
        }
    } else if (col == 'y' || col == 'm' || col == 't') {
        if (col_gain[col](player.points).gte(1)) {
            if (!player[col].upg[2]) player.w.upg = []
            for (let i = 0; i < 4; i++) {
                player[['w', 'r', 'g', 'b'][i]].points = E(0)
                player[['w', 'r', 'g', 'b'][i]].unl = false
                if (i > 0) {
                    if (!player[['y','m','t'][i-1]].upg[[3,4,3][i-1]]) player[['r','g','b'][i-1]].upg = []
                }
            }
            player.y.power = E(0)
            player.t.power = E(0)
            player[col].unl = true
            player[col].points = player[col].points.add(col_gain[col](player.points))
            player.points = E(10)
            reseted = true
        }
    }
    if (reseted & col != 'w') {
        player.w.unl = true
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

    for (let i = 0; i < 7; i++) {
        upd(full_colors[i]+'s', notate(player[colors[i]].points))
        upd(colors[i]+'_reset', notate(col_gain[colors[i]](player.points)))
        document.getElementById('reset'+i).style.backgroundColor = (col_gain[colors[i]](player.points).gte(1)) ? hex_colors[i] : '#9c6e6e'
        document.getElementById('reset'+i).style.cursor = (col_gain[colors[i]](player.points).gte(1)) ? 'pointer' : 'not-allowed'
    }

    upd('eff0', notate(col_effs.r(player.r.points)))
    upd('eff1', notate(col_effs.g(player.g.points)))
    upd('eff2', notate(col_effs.gp(player.g.power)))
    upd('eff3', notate(col_effs.b(player.b.points)))
    upd('eff4', notate(col_effs.y(player.y.points)))
    upd('eff5', notate(col_effs.yp(player.y.power).mul(100)))
    upd('eff6', notate(col_effs.m(player.m.points).sub(1).mul(100)))
    upd('eff7', notate(col_effs.t(player.t.points)))
    upd('eff8', notate(col_effs.tp(player.t.power).mul(100)))

    upd('power1', notate(player.g.power))
    upd('power2', notate(player.y.power))
    upd('power3', notate(player.t.power))

    for (let c = 0; c < Object.keys(col_upgs).length; c++) {
        let color_upg = col_upgs[colors[c]]
        for (let i = 0; i < Object.keys(color_upg).length; i++) {
            let text = color_upg[i].desc + 
            ('<br>Cost: '+notate(color_upg[i].cost)+' '+full_colors[c]+' points') +
            ((color_upg[i].cur != undefined)?('<br>Currently: '+color_upg[i].effDis(color_upg[i].cur())):'')
            upd(colors[c]+'upg'+i, text)
            document.getElementById(colors[c]+'upg'+i).style.display = (color_upg[i].unl()) ? 'inline' : 'none'
            document.getElementById(colors[c]+'upg'+i).style.backgroundColor = (player[colors[c]].upg[i]) ? '#68a66b' : ((player[colors[c]].points.gte(color_upg[i].cost)) ? hex_colors[c]: '#9c6e6e')
            document.getElementById(colors[c]+'upg'+i).style.cursor = (player[colors[c]].upg[i]) ? 'default' : ((player[colors[c]].points.gte(color_upg[i].cost)) ? 'pointer': 'not-allowed')
        }
    }
}

setInterval(loop, 50);