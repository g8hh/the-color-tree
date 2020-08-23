function calc(dt) {
    player.points = player.points.add(
        E((player.w.upg[0])?1:0)
        .mul((player.w.upg[1])?col_upgs.w[1].cur():1)
        .mul((player.w.upg[2])?col_upgs.w[2].cur():1)
        .mul(col_effs.r(player.r.points))
        .mul(col_effs.gp(player.g.power))
        .pow(player.w.upg[4]?1.15:1)
        .pow(player.m.upg[3]?col_upgs.m[3].cur():1)
    .mul(dt/1000))
    player.g.power = player.g.power.add(
        col_effs.g(player.g.points)
    .mul(dt/1000))
    player.y.power = player.y.power.add(
        col_effs.y(player.y.points)
    .mul(dt/1000))
    player.t.power = player.t.power.add(
        col_effs.t(player.t.points)
    .mul(dt/1000))
    player.w.points = player.w.points.add((player.g.upg[3])?col_gain.w(player.points).mul(dt/1000):0)
    player.r.points = player.r.points.add((player.y.upg[1])?col_gain.r(player.points).mul(dt/1000):0)
    player.g.points = player.g.points.add((player.m.upg[1])?col_gain.g(player.points).mul(dt/1000):0)
    player.b.points = player.b.points.add((player.t.upg[1])?col_gain.b(player.points).mul(dt/1000):0)

    for (let i = 0; i < colKeys; i++) {
        if (keysDown[colKeys[i]]) reset(colors[i])
    }
}