let affichage_avion = $('#affichage_avion');
let affichage_voiture = $('#affichage_voiture');
let affichage_bus = $('#affichage_bus');
let affichage_pieds = $('#affichage_pieds');

import ("transport.json", { assert: { type: "json" } });

// import transport from('./transport.json');
// import transport from "./transport.json"
$.getJSON("./transport.json", function(data) {
    function consoMoni(Nbmoni, HA) {
        HA = HA * 7;
        let HO = 168 - HA;
        let uec = (0.3 * (200 * HA + 7 * HO) / 7) * 365 / 1000 + ((1 - 0.3) * (200 * HA + 7 * HO) / 7) * 365 / 1000;
        let uecMoni = (0.3 * (30 * HA + 7 * HO) / 7) * 365 / 1000 + ((1 - 0.3) * (30 * HA + 7 * HO) / 7) * 365 / 1000;
        if (Nbmoni) {
            uecMoni = uec + uecMoni * Nbmoni;
        }
        $('#equipementUsage').text(uecMoni.toFixed(2));
        return uecMoni;
    }

    function smart() {
        let uec = consoMoni($('#nbEcranSupp').val(), $('#nbAnneeUtilisation').val()) + 7;
        $('#equipementUsage').text(uec.toFixed(2));
    }

    function cloud(Go) {
        let Mo = Go * 1000;
        let kgeco2 = Mo * 15 / 1000;
        if ($('#nbMailQuotidien').val()) {
            kgeco2 += mail($('#nbMailQuotidien').val());
        }
        $('#affichageCloudAnnuel').text(kgeco2.toFixed(2));
    }

    function mail(nbmail) {
        return eco2mail = (nbmail * 10 * 365) / 1000; //return enkgeCo2
    }

    function transport(km, val) {
        const transp = data.trans.find(s => s.id === val);
        let tr;
        if (val === 1) //#avion
        {
            if (km < 1000) {
                tr = transp.values.find(s => s.max === 1000).value;
                affichage_avion.text(km * tr / 1000);
            } else if (km < 2000) {
                tr = transp.values.find(s => s.max === 2000).value;
                affichage_avion.text(km * tr / 1000);
            } else if (km < 3500) {
                tr = transp.values.find(s => s.max === 3500).value;
                affichage_avion.text(km * tr / 1000);
            } else {
                tr = transp.values.find(s => s.max === 10).value;
                affichage_avion.text(km * tr / 1000);
            }

        } else if (val === 3) {
            tr = transp.values.find(s => s.value);
            affichage_voiture.text(km * tr / 1000);

        } else if (val === 5) {
            tr = transp.values.find(s => s.value);

            affichage_pieds.text(km * tr / 1000);
        } else if (val === 7) {
            tr = transp.values.find(s => s.value);

            affichage_bus.text(km * tr / 1000);
        } else {}
    }

});