var rec = require("./ressources.json");
var trans = require("./transport.json")

function consoPC(HA)
{
    HA=HA*7;
    let HO=168-HA;
    let uec =  (0.3*(200*HA+7*HO)/7)*365/1000 + ((1-0.3)*(200*HA+7*HO)/7)*365/1000;
    return uec/10;
}

function consoMoni(Nbmoni,HA)
{
    HA=HA*7;
    let HO=168-HA;
    let uecMoni =  (0.3*(30*HA+7*HO)/7)*365/1000 + ((1-0.3)*(30*HA+7*HO)/7)*365/1000;
    uecMoni=uecMoni*Nbmoni;
    return uecMoni/10;
}



function transport(km,val) {
    const transp = trans.find(s=>s.id===val);
    if(val === 1)//#avion
    {
        if(km<1000)
        {
            return transp.values.find(s=>s.max===1000).value;
        }    
        else if(km<2000)
        {
            return transp.values.find(s=>s.max===2000).value;
        }
        else if(km<3500)
        {
            return transp.values.find(s=>s.max===3500).value;
        }
        else{
            return transp.values.find(s=>s.max===10).value;
        }

    }
    else
    {
    return transp.values.find(s=>s.value)
    }
}


function cloud(Go)
{//1Mo=15gco2
    let Mo=Go*1000;
    let kgeco2=Mo*15/1000;
    return kgeco2;              //return enkgeCo2
}
function mail(nbmail){
    //10g /mail
    return eco2mail=(nbmail*10)/1000; //return enkgeCo2
}

function feuille(nbfeuille)
{//0.8 par feuille 
    return eCo2feuille=(nbfeuille*0.8)/1000; //return enkgeCo2
}

let Co2trans = km * transport(km,1);
console.log(Co2trans);
