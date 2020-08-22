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

var colors = ['w','r','g','b','y','m','t']
var full_colors = ['white','red','green','blue','yellow','magenta','teal']
var hex_colors = ['white','#ff0000','#00ff00','#0000ff','#ffff00','#ff00ff','#00ffff']

const col_gain = {
    w: (x) => { return E(x).div(10).pow(0.5)
        .mul((player.w.upg[3])?2:1)
        .mul((player.r.upg[0])?col_upgs.r[0].cur():1)
        .mul((player.g.upg[0])?col_upgs.g[0].cur():1)
        .mul(col_effs.b(player.b.points))
        .mul((player.b.upg[0])?col_upgs.b[0].cur():1)
        .floor() },
    r: (x) => { return E(x).div(200).pow(0.3).floor() },
    g: (x) => { return E(x).div(200).pow(0.3).floor() },
    b: (x) => { return E(x).div(200).pow(0.3).floor() },
}

const col_effs = {
    r: (x) => { return E(x).add(1).pow(0.8) },
    g: (x) => { return E(x).add(1).pow(1.25).sub(1) },
    gp: (x) => { return E(x).add(1).pow(1/3) },
    b: (x) => { return E(x).add(1).pow(0.75) },
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
            cur: () => { return player.w.points.add(1).sqrt() },
            effDis: (x) => { return notate(x)+'x' },
        },
        2: {
            desc: 'Points boosts point generation.',
            cost: E(5),
            unl: () => { return player.w.upg[1] },
            cur: () => { return player.points.add(1).log10().pow(0.75).add(1) },
            effDis: (x) => { return notate(x)+'x' },
        },
        3: {
            desc: 'Gain double white points.',
            cost: E(20),
            unl: () => { return player.w.upg[2] },
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
            desc: 'Keep white upgrades on reset',
            cost: E(25),
            unl: () => { return player.r.upg[0] },
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
            desc: 'Keep white upgrades on reset',
            cost: E(25),
            unl: () => { return player.g.upg[0] },
        },
        2: {
            desc: 'Gain 100% white points/sec',
            cost: E(50),
            unl: () => { return player.g.upg[1] },
        },
    },
    b: {
        0: {
            desc: 'Points boost white points.',
            cost: E(3),
            unl: () => { return player.w.unl },
            cur: () => { return player.points.add(1).log10().sqrt().max(1.5) },
            effDis: (x) => { return notate(x)+'x' },
        },
        1: {
            desc: 'Keep white upgrades on reset',
            cost: E(25),
            unl: () => { return player.b.upg[0] },
        },
    },
}

function wipe() {
    player = {
        points: E(10),
        w: {
            points: E(0),
            unl: true,
            upg: [false,false,false,false],
        },
        r: {
            points: E(0),
            unl: false,
            upg: [false,false],
        },
        g: {
            points: E(0),
            power: E(0),
            unl: false,
            upg: [false,false,false],
        },
        b: {
            points: E(0),
            unl: false,
            upg: [false,false],
        },
        y: {
            points: E(0),
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
            unl: false,
            upg: [],
        },
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
    return (e.log10().gte(6)?'':m.toFixed(acc))+'e'+notate(e,0)
}

function save(){
    localStorage.setItem("theColorTreeSave",btoa(JSON.stringify(player)));
}
    
function load(x){
    if(typeof x == "string"){
        let load = JSON.parse(atob(x));
        player.points = ex(load.points)
        for (let i = 0; i < 7; i++) {
            player[colors[i]].points = ex(load[colors[i]].points)
            if (colors[i] == 'g') player[colors[i]].power = ex(load[colors[i]].power)
            player[colors[i]].unl = load[colors[i]].unl
            player[colors[i]].upg = load[colors[i]].upg
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