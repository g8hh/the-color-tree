function upd(x,y){document.getElementById(x).innerHTML = y};
function E(x){return new ExpantaNum(x)};

function ex(x){
    let nx = new E(0);
    nx.array = x.array;
    nx.sign = x.sign;
    nx.layer = x.layer;
    return nx;
}

var player, tab = 'none';
var see_infinity = false;

var colors = ['w','r','g','b','y','m','t']
var full_colors = ['white','red','green','blue','yellow','magenta','teal']
var hex_colors = ['white','#ff0000','#00ff00','#0000ff','#ffff00','#ff00ff','#00ffff']
var keysDown = {};
var colKeys = [87,82,71,66,89,77,84]

addEventListener("keydown", function(e){
    if (colKeys.indexOf(e.keyCode) != -1) reset(colors[colKeys.indexOf(e.keyCode)])
}, false);

const col_gain = {
    w: (x) => { return E(x).div(10).pow(0.5)
        .mul((player.w.upg[3])?2:1)
        .mul((player.r.upg[0])?col_upgs.r[0].cur():1)
        .mul((player.g.upg[0])?col_upgs.g[0].cur():1)
        .mul(col_effs.b(player.b.points))
        .mul((player.b.upg[0])?col_upgs.b[0].cur():1)
        .mul(player.i.upg[0][1]?inf_upgs[0][1].cur():1)
        .floor() },
    r: (x) => { return E(x).div(200).pow(0.3)
        .mul(player.w.upg[5]?col_upgs.w[5].cur():1)
        .pow(player.r.upg[3]?col_upgs.r[3].cur():1)
        .floor() },
    g: (x) => { return E(x).div(200).pow(0.3)
        .mul(player.w.upg[5]?col_upgs.w[5].cur():1)
        .pow(player.m.upg[5]?col_upgs.m[5].cur():1)
        .floor() },
    b: (x) => { return E(x).div(200).pow(0.3)
        .mul(player.w.upg[5]?col_upgs.w[5].cur():1)
        .pow(player.b.upg[3]?col_upgs.b[3].cur():1)
        .floor() },
    y: (x) => { return E(x).add(1).log10().div(10).add(1).log10().cbrt().floor() },
    m: (x) => { return E(x).add(1).log10().div(10).add(1).log10().cbrt().floor() },
    t: (x) => { return E(x).add(1).log10().div(10).add(1).log10().cbrt().floor() },
}

const inf_gain = {
    il: () => { return E(10).pow(E(2).pow(E(2).pow(player.i.points.add(10)))) },
    ir: () => { return player.points.add(1).log10().add(1).logBase(2).add(1).logBase(2).div(player.i.points.add(10)) },
}

const col_effs = {
    r: (x) => { return E(x).add(player.r.upg[1]?col_upgs.r[1].cur():0).mul(col_effs.m(player.m.points)).add(1).pow(E(0.8).mul(col_effs.yp(player.y.power).add(1))) },
    g: (x) => { return E(x).add(player.g.upg[1]?col_upgs.g[1].cur():0).mul(col_effs.m(player.m.points)).add(1).pow(1.25).sub(1) },
    gp: (x) => { return E(x).add(1).pow(E(1/3).mul(col_upgs.t[0].cur()).mul(player.i.upg[1][0]?inf_upgs[1][0].cur():1)) },
    b: (x) => { return E(x).add(player.b.upg[1]?col_upgs.b[1].cur():0).mul(col_effs.m(player.m.points)).add(1).pow(E(0.8).mul(col_effs.tp(player.t.power).add(1))) },
    y: (x) => { return E(x).add(1).pow(2).sub(1) },
    yp: (x) => { return E(x).add(1).log10().pow(2).div(100) },
    m: (x) => { return E(x).add(1).pow(2/3) },
    t: (x) => { return E(x).add(1).pow(2).sub(1) },
    tp: (x) => { return E(x).add(1).log10().pow(2).div(100) },
    i: (x) => { return E(2).pow(x).sub(1) }
}

const col_upgs = {
    w: {
        0: {
            desc: 'Start to generate points.',
            cost: E(1),
            unl: () => { return player.w.unl },
        },
        1: {
            desc: 'White points boosts point generation.',
            cost: E(1),
            unl: () => { return player.w.upg[0] },
            cur: () => { return player.w.points.add(1).pow(player.y.upg[0]?col_upgs.y[0].cur():0.5) },
            effDis: (x) => { return notate(x)+'x' },
        },
        2: {
            desc: 'Points boosts point generation.',
            cost: E(5),
            unl: () => { return player.w.upg[1] },
            cur: () => { return player.points.add(1).log10().pow(0.75).add(1).pow(player.m.upg[0]?col_upgs.m[0].cur():1) },
            effDis: (x) => { return notate(x)+'x' },
        },
        3: {
            desc: 'Gain double white points.',
            cost: E(20),
            unl: () => { return player.w.upg[2] },
        },
        4: {
            desc: 'Raise point generation by 1.15.',
            cost: E(1e5),
            unl: () => { return player.w.upg[1] },
        },
        5: {
            desc: 'Points boost colors on 2nd rows.',
            cost: E(1e10),
            unl: () => { return player.w.upg[2] },
            cur: () => { return player.points.add(1).log10().add(1).log10().max(1.5) },
            effDis: (x) => { return notate(x)+'x' },
        },
    },
    r: {
        0: {
            desc: 'Red points boost white points.',
            cost: E(3),
            unl: () => { return player.w.unl },
            cur: () => { return player.r.points.sqrt().add(1).max(1.5) },
            effDis: (x) => { return notate(x)+'x' },
        },
        1: {
            desc: 'Blue points add to the Red Effect.',
            cost: E(10),
            unl: () => { return player.r.upg[0] },
            cur: () => { return ExpantaNum.pow(2.5,player.b.points.add(1).log10()) },
            effDis: (x) => { return '+'+notate(x)+' to base' },
        },
        2: {
            desc: 'Keep white upgrades on reset',
            cost: E(25),
            unl: () => { return player.r.upg[0] },
        },
        3: {
            desc: 'Red points boost red effects.',
            cost: E('ee500'),
            unl: () => { return player.r.upg[1] },
            cur: () => { return player.r.points.add(1).log10().add(1).log10().add(1) },
            effDis: (x) => { return '^'+notate(x) },
        },
    },
    g: {
        0: {
            desc: 'Green points boost white points.',
            cost: E(3),
            unl: () => { return player.w.unl },
            cur: () => { return player.g.points.sqrt().add(1).max(1.5) },
            effDis: (x) => { return notate(x)+'x' },
        },
        1: {
            desc: 'White points add to the Green Effect.',
            cost: E(10),
            unl: () => { return player.g.upg[0] },
            cur: () => { return ExpantaNum.pow(1.1,player.w.points.add(1).log10()) },
            effDis: (x) => { return '+'+notate(x)+' to base' },
        },
        2: {
            desc: 'Keep white upgrades on reset',
            cost: E(25),
            unl: () => { return player.g.upg[1] },
        },
        3: {
            desc: 'Gain 100% white points/sec',
            cost: E(50),
            unl: () => { return player.g.upg[2] },
        },
    },
    b: {
        0: {
            desc: 'Points boost white points.',
            cost: E(3),
            unl: () => { return player.w.unl },
            cur: () => { return player.points.add(1).log10().max(1.5) },
            effDis: (x) => { return notate(x)+'x' },
        },
        1: {
            desc: 'Red points add to the Blue Effect.',
            cost: E(10),
            unl: () => { return player.b.upg[0] },
            cur: () => { return ExpantaNum.pow(2.5,player.r.points.add(1).log10()) },
            effDis: (x) => { return '+'+notate(x)+' to base' },
        },
        2: {
            desc: 'Keep white upgrades on reset',
            cost: E(25),
            unl: () => { return player.b.upg[0] },
        },
        3: {
            desc: 'Blue points boost Blue effects.',
            cost: E('ee500'),
            unl: () => { return player.b.upg[1] },
            cur: () => { return player.b.points.add(1).log10().add(1).log10().add(1) },
            effDis: (x) => { return '^'+notate(x) },
        },
    },
    y: {
        0: {
            desc: '2nd white upgrade is stronger based on yellow points.',
            cost: E(2),
            unl: () => { return player.w.unl },
            cur: () => { return player.y.points.add(1).pow(1/4) },
            effDis: (x) => { return '^'+notate(x) },
        },
        1: {
            desc: 'Gain 100% red points/sec.',
            cost: E(5),
            unl: () => { return player.y.upg[0] },
        },
        2: {
            desc: 'Keep white upgrades on reset.',
            cost: E(10),
            unl: () => { return player.y.upg[1] },
        },
        3: {
            desc: 'Keep red upgrades on reset for 3rd row.',
            cost: E(25),
            unl: () => { return player.y.upg[1] },
        },
    },
    m: {
        0: {
            desc: '3rd white upgrade is stronger based on magenta points.',
            cost: E(2),
            unl: () => { return player.w.unl },
            cur: () => { return player.m.points.add(1).pow(1/4) },
            effDis: (x) => { return '^'+notate(x) },
        },
        1: {
            desc: 'Gain 100% green points/sec.',
            cost: E(5),
            unl: () => { return player.m.upg[0] },
        },
        2: {
            desc: 'Keep white upgrades on reset.',
            cost: E(10),
            unl: () => { return player.m.upg[1] },
        },
        3: {
            desc: 'Raise point generation based on magenta points.',
            cost: E(15),
            unl: () => { return player.m.upg[1] },
            cur: () => { return player.m.points.add(1).pow(1/6) },
            effDis: (x) => { return '^'+notate(x) },
        },
        4: {
            desc: 'Keep green upgrades on reset for 3rd row.',
            cost: E(25),
            unl: () => { return player.m.upg[3] },
        },
        5: {
            desc: 'Green Power boost green points.',
            cost: E(50),
            unl: () => { return player.m.upg[3] },
            cur: () => { return E(10).pow(player.g.power.add(1).log10().add(1).log10().add(1).cbrt()) },
            effDis: (x) => { return '^'+notate(x) },
        },
    },
    t: {
        0: {
            desc: 'Green Power is stronger based on teal points.',
            cost: E(2),
            unl: () => { return player.w.unl },
            cur: () => { return player.t.points.add(1).pow(1/3) },
            effDis: (x) => { return '^'+notate(x) },
        },
        1: {
            desc: 'Gain 100% blue points/sec.',
            cost: E(5),
            unl: () => { return player.t.upg[0] },
        },
        2: {
            desc: 'Keep white upgrades on reset.',
            cost: E(10),
            unl: () => { return player.t.upg[1] },
        },
        3: {
            desc: 'Keep blue upgrades on reset for 3rd row.',
            cost: E(25),
            unl: () => { return player.t.upg[1] },
        },
    },
}

const inf_upgs = {
    0: {
        0: {
            desc: 'Infinity points boost point generation.',
            reqDis: 'None',
            cost: E(40),
            req: () => { return true },
            unl: () => { return player.i.unl },
            cur: () => { return player.i.points.add(1).pow(1/5) },
            effDis: (x) => { return '^'+notate(x) },
        },
        1: {
            desc: 'Infinity powers boost white points gain.',
            reqDis: 'A1',
            cost: E(200),
            req: () => { return player.i.upg[0][0] },
            unl: () => { return player.i.unl },
            cur: () => { return player.i.power.add(1).pow(1/10) },
            effDis: (x) => { return 'x'+notate(x) },
        },
    },
    1: {
        0: {
            desc: 'Infinity powers boost green effects.',
            reqDis: 'A1',
            cost: E(200),
            req: () => { return player.i.upg[0][0] },
            unl: () => { return player.i.unl },
            cur: () => { return player.i.power.add(1).log10().add(1).cbrt() },
            effDis: (x) => { return 'x'+notate(x) },
        },
        1: {
            desc: 'Green powers boost infinity powers gain.',
            reqDis: 'B1 & A2',
            cost: E(400),
            req: () => { return player.i.upg[1][0] & player.i.upg[0][1] },
            unl: () => { return player.i.unl },
            cur: () => { return player.g.power.add(1).log10().add(1).log10().add(1).log10().max(1.5) },
            effDis: (x) => { return 'x'+notate(x) },
        },
    }
}

function wipe() {
    player = {
        points: E(10),
        w: {
            points: E(0),
            unl: true,
            upg: [],
        },
        r: {
            points: E(0),
            unl: false,
            upg: [],
        },
        g: {
            points: E(0),
            power: E(0),
            unl: false,
            upg: [],
        },
        b: {
            points: E(0),
            unl: false,
            upg: [],
        },
        y: {
            points: E(0),
            power: E(0),
            unl: false,
            upg: [],
        },
        m: {
            points: E(0),
            unl: false,
            upg: [],
        },
        t: {
            points: E(0),
            power: E(0),
            unl: false,
            upg: [],
        },
        i: {
            points: E(0),
            power: E(0),
            unl: false,
            upg: [[],[],[],[],[],[],[],[],[],[]],
        },
        ver: '2',
    };
};

function notate(ex, acc=2) {
    ex = E(ex)
    let e = ex.log10().floor()
    if (e.lt(6)) {
        if (e.lt(3)) {
            return ex.toFixed(acc)
        }
        return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    let m = ex.div(E(10).pow(e))
    return (e.log10().gte(6)?'':m.toFixed(2))+'e'+notate(e,0)
}

function save(){
    localStorage.setItem("theColorTreeSave",btoa(JSON.stringify(player)));
}
    
function load(x){
    if(typeof x == "string"){
        let load = JSON.parse(atob(x));
        player.points = ex(load.points)
        if (player.ver == undefined) return
        for (let i = 0; i < 7; i++) {
            player[colors[i]].points = ex(load[colors[i]].points)
            if (colors[i] == 'g' || colors[i] == 'y' || colors[i] == 't') player[colors[i]].power = ex(load[colors[i]].power)
            player[colors[i]].unl = load[colors[i]].unl
            player[colors[i]].upg = load[colors[i]].upg
        }
        if (load.i != undefined) {
            player.i.points = ex(load.i.points)
            player.i.power = ex(load.i.power)
            player.i.unl = load.i.unl
            player.i.upg = load.i.upg
        }
    } else {
        wipe();
    }
}
    
function loadGame(){
    wipe()
    load(localStorage.getItem("theColorTreeSave"));
    setInterval(save,1000)
}

/*
function notate(ex,acc=2){
    let e = ex.log10().floor()
    if (e.lt(9)) return ex.toFixed(acc)
    let m = ex.div(E(10).pow(e))
    return ((e.log10().lt(9)) ? m.toFixed(2) : '') + 'e' + notate(e,0)
};
*/