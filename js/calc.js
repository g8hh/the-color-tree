function calc(dt) {
    player.points = player.points.add(
        E((player.w.upg[0])?1:0)
        .mul((player.w.upg[1])?col_upgs.w[1].cur():1)
        .mul((player.w.upg[2])?col_upgs.w[2].cur():1)
        .mul(col_effs.r(player.r.points))
        .mul(col_effs.gp(player.g.power))
    .mul(dt/1000))
    player.g.power = player.g.power.add(
        col_effs.g(player.g.points)
    .mul(dt/1000))
    player.w.points = player.w.points.add((player.g.upg[2])?col_gain.w(player.points).mul(dt/1000):0)
}