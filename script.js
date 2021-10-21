let affichage_avion = $('#affichage_avion');
let affichage_voiture = $('#affichage_voiture');
let affichage_bus = $('#affichage_bus');
let affichage_pieds = $('#affichage_pieds');

let affichage_voiture_annuel = $('#affichage_voiture_annuel');
let affichage_bus_annuel = $('#affichage_bus_annuel');

let ttNum = 0;
let ttMoni = 0;
let ttCloud = 0;
let ttTransport = 0;
let ttTransportVoit = 0;
let ttTransportBus = 0;
let ttTransportAvion = 0;

function totalImpact() {
    ttNum = ttMoni + ttCloud;
    ttTransport = ttTransportVoit + ttTransportBus + ttTransportAvion;
    $('#impactNumeriqueTotal').text(ttNum.toFixed(2));
    $('#impactDeplacementTotal').text(ttTransport.toFixed(2));
    $('#impactTotal').text((ttNum + ttTransport).toFixed(2));
}

function consoMoni(Nbmoni, HA) {
    HA = HA * 7;
    let HO = 168 - HA;
    let uec = (0.3 * (200 * HA + 7 * HO) / 7) * 365 / 1000 + ((1 - 0.3) * (200 * HA + 7 * HO) / 7) * 365 / 1000;
    let uecMoni = (0.3 * (30 * HA + 7 * HO) / 7) * 365 / 1000 + ((1 - 0.3) * (30 * HA + 7 * HO) / 7) * 365 / 1000;
    if (Nbmoni) {
        uecMoni = uec + uecMoni * Nbmoni;
    }
    $('#equipementUsage').text(uecMoni.toFixed(2));
    ttMoni = uecMoni;
    totalImpact();
    return uecMoni;
}

function smart() {
    let uec = consoMoni($('#nbEcranSupp').val(), $('#nbAnneeUtilisation').val()) + 7;
    ttMoni += 7;
    totalImpact();
    $('#equipementUsage').text(uec.toFixed(2));
}

function cloud(Go) {
    let Mo = Go * 1000;
    let kgeco2 = Mo * 15 / 1000;
    if ($('#nbMailQuotidien').val()) {
        kgeco2 += ($('#nbMailQuotidien').val() * 10 * 365) / 1000;
    }
    $('#affichageCloudAnnuel').text(kgeco2.toFixed(2));
    ttCloud = kgeco2;
    totalImpact();
}

function transport(km, val) {
    const transp = trans.find(s => s.id === val);
    let tr;
    if (val === 1) //#avion
    {
        if (km < 1000) {
            tr = transp.values.find(s => s.max === 1000).value;
            affichage_avion.text(km * tr / 1000);
            ttTransportAvion = km * tr / 1000;
        } else if (km < 2000) {
            tr = transp.values.find(s => s.max === 2000).value;
            affichage_avion.text(km * tr / 1000);
            ttTransportAvion = km * tr / 1000;
        } else if (km < 3500) {
            tr = transp.values.find(s => s.max === 3500).value;
            affichage_avion.text(km * tr / 1000);
            ttTransportAvion = km * tr / 1000;
        } else {
            tr = transp.values.find(s => s.max === 10).value;
            affichage_avion.text(km * tr / 1000);
            ttTransportAvion = km * tr / 1000;
        }

    } else if (val === 3) {
        tr = transp.values.find(s => s.max === 1).value;
        affichage_voiture.text(km * tr / 1000);
        affichage_voiture_annuel.text((km * tr / 1000 * 365).toFixed(2));
        ttTransportVoit = km * tr / 1000 * 365;
    } else if (val === 5) {
        tr = transp.values.find(s => s.max === 1).value;
        affichage_pieds = km * tr / 1000 * 365;
    } else if (val === 7) {
        tr = transp.values.find(s => s.max === 1).value;
        affichage_bus.text(km * tr / 1000);
        affichage_bus_annuel.text((km * tr / 1000 * 365).toFixed(2));
        ttTransportBus = km * tr / 1000 * 365;
    } else {}
    totalImpact();
}

let trans = [{
        "id": 1,
        "label": {
            "fr": "Avion"
        },
        "uncertainty": true,
        "description": {
            "fr": "L'avion est proposé avec les tailles suivantes : <br/><br/>- 500 à 1 000 km, 101 à 220 sièges :<br/>126 gCO2e/km/personne sans l'impact des traînées,<br/>230 gCO2e/km/personne avec l'impact des traînées<br/><br/>- 1 000 à 2 000 km, 101 à 220 sièges :<br/>102 gCO2e/km/personne sans l'impact des traînées,<br/>186 gCO2e/km/personne avec l'impact des traînées<br/><br/>- 2 000 à 3 500 km, >220 sièges<br/>: 97,4 gCO2e/km/personne sans l'impact des traînées,<br/>178 gCO2e/km/personne avec l'impact des traînées<br/><br/>- au delà de 3 500 km, >220 sièges :<br/>82,8 gCO2e/km/personne sans l'impact des traînées,<br/>151 gCO2e/km/personne avec l'impact des traînées"
        },
        "emoji": { "main": "✈️" },
        "default": true,
        "display": {
            "min": 500
        },
        "values": [{
                "max": 1000,
                "value": 126

            },
            {
                "max": 2000,
                "value": 102
            },
            {
                "max": 3500,
                "value": 97.4
            },
            {
                "max": 10,
                "value": 82.8
            }
        ]
    },
    {
        "id": 2,
        "label": {
            "fr": "TGV"
        },
        "description": {
            "fr": "1,73 gCO2e/km/personne : Base Carbone ADEME"
        },
        "emoji": { "main": "🚄" },
        "default": true,
        "display": {
            "min": 150
        },
        "values": [{
            "value": 1.73
        }]
    },

    {
        "id": 3,
        "label": {
            "fr": "Voiture (thermique)"
        },
        "description": {
            "fr": "193 gCO2e/km/véhicule ; Base Carbone ADEME, moyenne nationale toutes distances, toutes carburations. <br/>Les données intègrent l’amont et la combustion du carburant. Comme pour les autres modes de transports, elles n’intègrent pas la fabrication des véhicules et les émissions liées aux infrastructures routières."
        },
        "emoji": { "main": "🚗" },
        "default": true,
        "display": {},
        "values": [{
            "max": 1,
            "value": 193
        }],
        "carpool": 5
    },
    {
        "id": 4,
        "label": {
            "fr": "Voiture (électrique)"
        },
        "description": {
            "fr": "19,8 gCO2e/km/véhicule ; Base Carbone ADEME, Véhicule Electrique compact - \"Coeur de gamme\". <br/>Les données intègrent les émissions liées à l'électricité pour recharger le véhicule. Comme pour les autres modes de transports, elles n’intègrent pas la fabrication des véhicules et les émissions liées aux infrastructures routières."
        },
        "emoji": { "main": "🚗", "secondary": "⚡" },
        "default": true,
        "display": {},
        "values": [{
            "value": 19.8
        }],
        "carpool": 5
    },
    {
        "id": 5,
        "label": {
            "fr": "Vélo ou marche"
        },
        "description": {
            "fr": "0 gCO2e/km/personne ; ADEME"
        },
        "emoji": { "main": "🚴" },
        "default": true,
        "display": {
            "max": 30
        },
        "values": [{
            "max": 1,
            "value": 0
        }]
    },
    {
        "id": 6,
        "label": {
            "fr": "Vélo et trottinette électrique"
        },
        "description": {
            "fr": " 2 gCO2e/km/personne pour la phase d'usage ; Etude ADEME \"Modélisation et évaluation environnementale de produits de consommation et biens d’Équipement \"<br/><br/>Hypothèses Vélo Électrique :<br/>- Capacité de la batterie : 11,6 Ah<br/>- Tension : 36 V<br/>- Capacité énergétique 417,6 Wh<br/>- Distance de 40 km par charge complète<br/>- 2 500 km/an<br/><br/>Hypothèses Trotinette Électrique :<br/>- Capacité de la batterie : 2,5 Ah<br/>- Tension : 36 V<br/>- Capacité énergétique : 90 Wh<br/>- 300 charges par an<br/>- 1 000 km/an"
        },
        "emoji": { "main": "🚴", "secondary": "⚡" },
        "default": true,
        "display": {
            "max": 30
        },
        "values": [{
            "value": 2
        }]
    },

    {
        "id": 7,
        "label": {
            "fr": "Bus"
        },
        "description": {
            "fr": "103 gCO2e/km/personne ; Taux de remplissage : 10 personnes ; Base Carbone ADEME, Autobus - Gazole"
        },
        "emoji": { "main": "🚌" },
        "default": true,
        "display": {
            "max": 15
        },
        "values": [{
            "max": 1,
            "value": 103
        }]
    },
    {
        "id": 8,
        "label": {
            "fr": "Tramway"
        },
        "description": {
            "fr": "2,2 gCO2e/km/personne ; Base Carbone ADEME, Tramway - Ile de France"
        },
        "emoji": { "main": "🚋" },
        "default": false,
        "display": {
            "max": 12
        },
        "values": [{
            "value": 2.2
        }]
    },
    {
        "id": 9,
        "label": {
            "fr": "Métro"
        },
        "description": {
            "fr": "2,5 gCO2e/km/personne ; Base Carbone ADEME, Métro - Ile de France"
        },
        "emoji": { "main": "🚇" },
        "default": true,
        "display": {
            "max": 20
        },
        "values": [{
            "value": 2.5
        }]
    },
    {
        "id": 10,
        "label": {
            "fr": "Moto"
        },
        "description": {
            "fr": "Deux roues thermiques > 250cm3 ;<br/>168 gCO2e/km/personne ; calculs ADEME à partir d'HBEFA (2020)"
        },
        "emoji": { "main": "🏍️" },
        "default": true,
        "display": {
            "min": 51
        },
        "values": [{
            "value": 168
        }],
        "carpool": 2
    }


];