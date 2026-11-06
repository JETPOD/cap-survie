/* Cap Survie : contenu pédagogique.
   s = 2 (réflexe adapté), 1 (incomplet), 0 (dangereux)
   aud : "j" jeunes, "g" grand public, "p" professionnels */

const SOURCES = {
  kit: { label: "Ministère de la Transition écologique : kit d’urgence 72 h", url: "https://www.ecologie.gouv.fr/dossiers/comprendre-risques-naturels-sen-proteger/preparer-son-kit-durgence-72-h" },
  eau: { label: "INSPQ : avis d’ébullition de l’eau", url: "https://www.inspq.qc.ca/eau-potable/avis-ebullition" },
  co: { label: "Ministère de la Santé : intoxications au monoxyde de carbone", url: "https://sante.gouv.fr/actualites-presse/presse/communiques-de-presse/article/intoxications-au-monoxyde-de-carbone-adopter-les-bons-gestes-peut-sauver-des" },
  inond: { label: "SDIS 31 : en cas d’inondation", url: "https://www.sdis31.fr/conseils-prevention/reagir-en-cas-devenements-climatiques/en-cas-dinondation/" },
  vipere: { label: "CEN Hauts-de-France : la vipère péliade", url: "https://www.cen-hautsdefrance.org/wp-content/uploads/2026/02/PAV_20180625_T_BRO_grand_public_V2.pdf" },
  seisme: { label: "Gouvernement du Yukon : se baisser, s’abriter, s’agripper", url: "https://yukon.ca/fr/situations-durgence-et-securite/tremblements-de-terre/preparation-en-cas-de-tremblements-de-terre" },
  froid: { label: "Ministère de la Santé : grand froid, information du public", url: "https://sante.gouv.fr/sante-et-environnement/risques-climatiques/article/grand-froid-information-du-public" },
  montagne: { label: "Snowtrex : signal de détresse alpin", url: "https://www.snowtrex.fr/magazine/interviews-reportages/sauveteur-en-montagne/" }
};

const SCENARIOS = [
  /* ---------------- NATURE ---------------- */
  {
    id: "N1", env: "nature", aud: ["j","g","p"], title: "Égaré en forêt au crépuscule",
    ctx: "Vous quittez le sentier balisé pour photographier un chevreuil. Vingt minutes plus tard, plus aucun repère. Le soleil se couche, il fera 4 °C cette nuit.",
    steps: [
      { q: "Vous réalisez que vous êtes perdu. Premier réflexe ?", opts: [
        { t: "S’arrêter, respirer, observer les alentours et faire le point avant de bouger (méthode STOP).", s: 2, fb: "La panique pousse à marcher vite et à s’enfoncer. S’arrêter permet de repérer un bruit de route, une pente, une trace de passage." },
        { t: "Marcher vite dans la direction qui semble la bonne pour profiter de la lumière.", s: 0, fb: "Marcher au hasard multiplie la distance avec la zone où l’on vous cherchera et augmente le risque de chute." },
        { t: "Suivre un ruisseau vers l’aval, même de nuit.", s: 1, fb: "Suivre l’eau peut mener à un village, mais de nuit les berges sont glissantes et les ravins fréquents. À envisager de jour seulement." }
      ]},
      { q: "Votre téléphone affiche 15 % de batterie et une seule barre de réseau.", opts: [
        { t: "Appeler le 112, donner sa position, puis passer en mode économie d’énergie.", s: 2, fb: "Le 112 est joignable même sans forfait et via un autre opérateur si le vôtre ne capte pas. Ensuite, chaque pourcent compte." },
        { t: "Publier un message sur les réseaux sociaux pour prévenir ses amis.", s: 0, fb: "Un message public n’alerte pas les secours et consomme beaucoup de batterie." },
        { t: "Garder la batterie pour la lampe torche et attendre le matin.", s: 1, fb: "Prudent pour la batterie, mais retarder l’alerte retarde les recherches. Alerter d’abord, éclairer ensuite." }
      ]},
      { q: "La nuit tombe. Comment la passer ?", opts: [
        { t: "Construire un abri sommaire, s’isoler du sol avec une épaisse couche de feuilles et de branches, rester au sec.", s: 2, fb: "Le sol froid vole la chaleur par conduction bien plus vite que l’air. L’isolation sous soi compte plus que la couverture au-dessus." },
        { t: "Dormir au bord du ruisseau, pour avoir de l’eau à portée.", s: 0, fb: "Les fonds de vallon sont plus froids et humides la nuit. On s’installe à proximité de l’eau, pas à côté." },
        { t: "Marcher toute la nuit pour ne pas avoir froid.", s: 0, fb: "La transpiration mouille les vêtements, l’épuisement s’installe et le risque de chute est majeur dans le noir." }
      ]}
    ],
    pro: "Les personnes égarées se déplacent souvent en spirale. Rester sur place après l’alerte réduit fortement la zone de recherche."
  },
  {
    id: "N2", env: "nature", aud: ["j","g","p"], title: "Orage sur la crête",
    ctx: "En randonnée en moyenne montagne, vous êtes sur une crête dégagée. Le ciel noircit, le tonnerre gronde au loin.",
    steps: [
      { q: "Le tonnerre se rapproche. Que faites-vous ?", opts: [
        { t: "Quitter la crête au plus vite et descendre, loin des sommets et des arbres isolés.", s: 2, fb: "La foudre frappe en priorité les points hauts. Perdre de l’altitude est la meilleure protection en terrain ouvert." },
        { t: "S’abriter sous le grand arbre isolé un peu plus bas.", s: 0, fb: "Un arbre isolé attire la foudre. Le courant se propage dans le sol autour de lui." },
        { t: "Accélérer pour atteindre le sommet et le refuge de l’autre côté.", s: 0, fb: "Le sommet est l’endroit le plus exposé. Ne jamais monter vers l’orage." }
      ]},
      { q: "L’orage est sur vous, aucun abri en dur à proximité.", opts: [
        { t: "S’accroupir, pieds joints, sur son sac, en espaçant les membres du groupe de plusieurs mètres.", s: 2, fb: "Pieds joints, on limite le courant qui traverse le corps. L’espacement évite qu’un seul impact touche tout le groupe." },
        { t: "S’allonger à plat ventre dans l’herbe.", s: 0, fb: "Allongé, la surface de contact avec le sol est maximale : le courant de sol vous traverse davantage." },
        { t: "Se serrer tous ensemble pour se rassurer.", s: 1, fb: "Le soutien moral compte, mais un groupe serré peut être touché en entier. Restez à vue, pas au contact." }
      ]},
      { q: "La pluie cesse, le soleil revient. Quand repartir ?", opts: [
        { t: "Attendre environ 30 minutes après le dernier coup de tonnerre.", s: 2, fb: "La foudre peut tomber à plusieurs kilomètres en arrière de l’orage. La règle des 30 minutes est un repère simple." },
        { t: "Dès que la pluie s’arrête.", s: 0, fb: "Fin de la pluie ne signifie pas fin du risque de foudre." },
        { t: "Dès qu’on ne voit plus d’éclairs.", s: 1, fb: "En plein jour les éclairs sont peu visibles. Fiez-vous au tonnerre." }
      ]}
    ]
  },
  {
    id: "N3", env: "nature", aud: ["j","g","p"], title: "Gourde vide sous la chaleur",
    ctx: "Randonnée estivale, 33 °C. Vous avez sous-estimé l’eau. Il reste 6 heures de marche.",
    steps: [
      { q: "Vous trouvez un ruisseau limpide.", opts: [
        { t: "Faire bouillir l’eau à gros bouillons au moins une minute, ou utiliser filtre ou pastilles.", s: 2, fb: "Une eau claire peut contenir bactéries, virus et parasites. L’ébullition d’au moins une minute les inactive ; au-delà d’environ 2000 m on prolonge à 3 minutes." },
        { t: "La boire directement : elle est claire et vient de la montagne.", s: 0, fb: "Limpide ne veut pas dire potable. Un troupeau ou un animal mort en amont suffit à la contaminer." },
        { t: "Ne pas boire jusqu’au retour pour ne prendre aucun risque.", s: 0, fb: "La déshydratation sous 33 °C est un danger bien plus rapide qu’une diarrhée. On traite l’eau, on ne s’en prive pas." }
      ]},
      { q: "Votre compagnon devient confus, sa peau est chaude et sèche, il titube.", opts: [
        { t: "Appeler le 15 ou le 112, le mettre à l’ombre, le déshabiller, le mouiller et l’éventer.", s: 2, fb: "Confusion et peau brûlante évoquent un coup de chaleur : urgence vitale. Le refroidissement immédiat est le traitement." },
        { t: "Lui faire boire beaucoup d’eau et repartir doucement.", s: 0, fb: "Une personne confuse risque de faire une fausse route. Et marcher aggrave la production de chaleur." },
        { t: "Le laisser se reposer à l’ombre en attendant que ça passe.", s: 1, fb: "L’ombre aide, mais sans refroidissement actif ni alerte, l’état peut s’aggraver rapidement." }
      ]},
      { q: "Comment gérer la suite de la marche ?", opts: [
        { t: "Boire régulièrement par petites gorgées, marcher aux heures fraîches et s’arrêter à l’ombre.", s: 2, fb: "On rationne l’effort et la sueur, pas l’eau. Bouger tôt le matin et en fin de journée limite les pertes." },
        { t: "Rationner l’eau à une gorgée par heure.", s: 0, fb: "Rationner l’eau en ayant chaud précipite la déshydratation. Mieux vaut boire et réduire l’effort." },
        { t: "Accélérer pour arriver plus vite.", s: 1, fb: "Gagner du temps semble logique mais augmente la transpiration. Un rythme régulier est plus sûr." }
      ]}
    ]
  },
  {
    id: "N4", env: "nature", aud: ["j","g","p"], title: "Morsure de vipère",
    ctx: "Pique-nique sur une pelouse sèche. Votre amie pousse un cri : une vipère vient de la mordre à la cheville et s’enfuit.",
    steps: [
      { q: "Premiers gestes ?", opts: [
        { t: "La rassurer, l’allonger, immobiliser la jambe, retirer chaussure et bijoux, appeler le 15.", s: 2, fb: "Calme et immobilité ralentissent la diffusion du venin. L’œdème peut serrer : on retire tout ce qui comprime." },
        { t: "Poser un garrot serré au-dessus de la morsure.", s: 0, fb: "Le garrot est proscrit : il aggrave les lésions locales sans empêcher la diffusion du venin." },
        { t: "Inciser et aspirer le venin.", s: 0, fb: "Inciser ou aspirer est inutile et dangereux (infection, saignement). Ces gestes sont abandonnés." }
      ]},
      { q: "La voiture est à 1 km.", opts: [
        { t: "Éviter qu’elle marche : attendre les secours ou la porter si possible.", s: 2, fb: "L’effort musculaire accélère la circulation du venin. Moins elle bouge, mieux c’est." },
        { t: "Courir jusqu’à la voiture pour gagner du temps.", s: 0, fb: "Courir est le pire choix : effort maximal, stress maximal." },
        { t: "Marcher lentement en la soutenant.", s: 1, fb: "Acceptable si aucune autre option, mais l’attente sur place reste préférable quand les secours sont joignables." }
      ]},
      { q: "Une heure plus tard, elle se sent bien, sans gonflement.", opts: [
        { t: "Aller quand même à l’hôpital pour quelques heures de surveillance.", s: 2, fb: "Les signes d’envenimation peuvent être retardés. Une surveillance médicale de quelques heures est systématique." },
        { t: "Rentrer à la maison, c’était sûrement une morsure sèche.", s: 0, fb: "Impossible de le savoir sur le moment. On ne prend pas le pari." },
        { t: "Appeler son médecin traitant le lendemain.", s: 1, fb: "Trop tard si une envenimation se déclare dans la soirée." }
      ]}
    ],
    src: ["vipere"]
  },
  {
    id: "N5", env: "nature", aud: ["g","p"], title: "Chute dans l’eau glacée",
    ctx: "En marchant sur un étang gelé, la glace cède. Vous tombez dans une eau à 2 °C.",
    steps: [
      { q: "Les premières secondes, vous suffoquez.", opts: [
        { t: "Se concentrer sur sa respiration une minute, sans s’agiter, la tête hors de l’eau.", s: 2, fb: "Le choc thermique provoque une hyperventilation qui dure environ une minute. Le maîtriser évite d’inhaler de l’eau." },
        { t: "Nager vigoureusement vers la berge la plus éloignée, plus solide.", s: 0, fb: "Nager dans l’eau glacée épuise en quelques minutes. Le chemin connu est celui par lequel vous êtes arrivé." },
        { t: "Retirer son manteau qui alourdit.", s: 0, fb: "Les vêtements emprisonnent de l’air et isolent. On les garde." }
      ]},
      { q: "Comment sortir de l’eau ?", opts: [
        { t: "Revenir vers le bord d’où l’on vient, poser les avant-bras sur la glace, battre des jambes pour s’allonger dessus, puis rouler.", s: 2, fb: "La glace a supporté votre poids à l’aller. Répartir le poids en rampant ou en roulant évite une nouvelle rupture." },
        { t: "Se hisser debout d’un coup.", s: 0, fb: "Tout le poids sur un point : la glace casse à nouveau." },
        { t: "Attendre immobile que quelqu’un arrive.", s: 1, fb: "Si la sortie est impossible, s’accrocher et limiter les mouvements est utile. Mais tant que les bras répondent, on tente de sortir." }
      ]},
      { q: "Vous êtes sorti, trempé, frissonnant.", opts: [
        { t: "Se mettre à l’abri, retirer les vêtements mouillés, se couvrir, boire chaud et sucré si l’on est bien conscient.", s: 2, fb: "Le vent sur des vêtements mouillés accélère l’hypothermie. On isole, on couvre, on appelle si les frissons cessent ou si la confusion apparaît." },
        { t: "Boire un alcool fort pour se réchauffer.", s: 0, fb: "L’alcool dilate les vaisseaux de la peau : sensation de chaleur trompeuse et perte de chaleur accrue." },
        { t: "Frictionner vigoureusement bras et jambes.", s: 0, fb: "Il ne faut ni frictionner ni masser les zones atteintes par le froid : cela peut aggraver les lésions." }
      ]}
    ],
    pro: "Règle 1-10-1 : environ 1 minute de choc respiratoire, 10 minutes de mouvements utiles, environ 1 heure avant la perte de conscience par hypothermie.",
    src: ["froid"]
  },
  {
    id: "N6", env: "nature", aud: ["j","g","p"], title: "Se faire repérer",
    ctx: "Blessé à la cheville en montagne, sans réseau. Les secours vous cherchent.",
    steps: [
      { q: "Pas de réseau. Comment signaler votre détresse à des randonneurs lointains ?", opts: [
        { t: "Six coups de sifflet (ou signaux lumineux) en une minute, une minute de pause, et recommencer.", s: 2, fb: "C’est le signal de détresse alpin. La réponse attendue est trois signaux par minute." },
        { t: "Crier sans arrêt.", s: 1, fb: "La voix porte peu et s’épuise vite. Le sifflet porte bien plus loin pour un effort minime." },
        { t: "Attendre en silence pour économiser ses forces.", s: 0, fb: "Économiser ses forces oui, mais un signal régulier est indispensable pour être localisé." }
      ]},
      { q: "Un hélicoptère approche.", opts: [
        { t: "Lever les deux bras en Y.", s: 2, fb: "Bras en Y = « Yes », nous avons besoin d’aide. Un bras levé et l’autre baissé signifie « No », pas besoin d’aide." },
        { t: "Agiter un seul bras levé.", s: 1, fb: "Geste ambigu : un bras en l’air et l’autre le long du corps peut être compris comme « pas besoin d’aide »." },
        { t: "Courir vers une clairière malgré la cheville.", s: 0, fb: "Se blesser davantage n’aide pas. On se signale là où l’on est, en se rendant visible (couleurs vives, couverture de survie)." }
      ]},
      { q: "Vous envisagez un feu de signalisation, en août, dans une pinède sèche.", opts: [
        { t: "Y renoncer, utiliser le côté brillant de la couverture de survie et des vêtements colorés étalés au sol.", s: 2, fb: "Un feu en zone sèche peut déclencher un incendie de forêt. Les surfaces réfléchissantes sont très visibles du ciel." },
        { t: "Allumer un grand feu bien visible.", s: 0, fb: "Risque majeur d’incendie, pour vous et pour les autres." },
        { t: "Allumer un petit feu entouré de pierres.", s: 1, fb: "Moins risqué mais toujours dangereux en période sèche, souvent interdit, et peu visible de jour." }
      ]}
    ],
    src: ["montagne"]
  },

  /* ---------------- CRISES ---------------- */
  {
    id: "C1", env: "crise", aud: ["j","g","p"], title: "Tempête : 3 jours sans électricité",
    ctx: "Janvier. Une tempête a coupé l’électricité de votre quartier. Le rétablissement est annoncé dans trois jours. Il fait 12 °C dans la maison.",
    steps: [
      { q: "Comment se chauffer ?", opts: [
        { t: "Se regrouper dans une seule pièce, superposer les couches, calfeutrer les portes, ne rien brûler à l’intérieur.", s: 2, fb: "Réduire le volume à chauffer et isoler les corps suffit souvent à tenir quelques jours en sécurité." },
        { t: "Allumer le barbecue au charbon dans le salon, fenêtre entrouverte.", s: 0, fb: "Un barbecue en intérieur produit massivement du monoxyde de carbone, gaz inodore et mortel. Une fenêtre entrouverte ne suffit pas." },
        { t: "Faire tourner le groupe électrogène dans le garage, porte ouverte.", s: 0, fb: "Un groupe électrogène ne doit jamais fonctionner dans un local, même ouvert. Il s’installe à l’extérieur, loin des ouvertures." }
      ]},
      { q: "Que faire du congélateur ?", opts: [
        { t: "Le garder fermé le plus possible et consommer d’abord le contenu du réfrigérateur.", s: 2, fb: "Fermé, un congélateur plein reste froid bien plus longtemps. Chaque ouverture fait remonter la température." },
        { t: "Ouvrir régulièrement pour vérifier l’état des aliments.", s: 0, fb: "Chaque vérification accélère la décongélation." },
        { t: "Tout jeter immédiatement.", s: 1, fb: "Gaspillage inutile si la coupure est courte. En cas de doute à la fin, on jette les produits décongelés." }
      ]},
      { q: "Le deuxième jour, plusieurs membres de la famille ont mal à la tête et des nausées.", opts: [
        { t: "Penser au monoxyde de carbone : aérer, sortir tout le monde et appeler le 15, le 18 ou le 112.", s: 2, fb: "Maux de tête, nausées et vertiges chez plusieurs personnes d’un même lieu : il faut évoquer le CO jusqu’à preuve du contraire." },
        { t: "Donner du paracétamol et aller se coucher.", s: 0, fb: "S’endormir dans une atmosphère chargée en CO peut être mortel." },
        { t: "Ouvrir les fenêtres et attendre que ça passe.", s: 1, fb: "Aérer est le bon premier geste, mais un avis médical est indispensable : l’intoxication peut laisser des séquelles." }
      ]}
    ],
    src: ["co"]
  },
  {
    id: "C2", env: "crise", aud: ["j","g","p"], title: "Inondation éclair",
    ctx: "Alerte vigilance rouge pluie-inondation. L’eau monte très vite dans votre commune.",
    steps: [
      { q: "En voiture, la route devant vous est submergée.", opts: [
        { t: "Faire demi-tour, même si l’eau paraît peu profonde.", s: 2, fb: "Une voiture flotte dans 30 cm d’eau et n’est plus manœuvrable. La majorité des victimes d’inondation meurent dans leur véhicule." },
        { t: "Passer doucement, le SUV est haut.", s: 0, fb: "La hauteur de caisse ne change rien au courant ni à la chaussée qui a pu être emportée." },
        { t: "Passer vite pour ne pas caler.", s: 0, fb: "La vitesse ne protège pas du courant et empêche de voir les obstacles." }
      ]},
      { q: "À la maison, l’eau entre au rez-de-chaussée.", opts: [
        { t: "Monter à l’étage avec le kit d’urgence, couper électricité et gaz si c’est possible sans danger.", s: 2, fb: "Se réfugier en hauteur et couper les énergies limite les risques d’électrocution et d’explosion." },
        { t: "Descendre au parking souterrain pour sauver la voiture.", s: 0, fb: "Les parkings souterrains se remplissent en quelques minutes : piège mortel." },
        { t: "Aller chercher les enfants à l’école.", s: 0, fb: "L’école met les enfants à l’abri. Se déplacer expose à la crue et encombre les routes des secours." }
      ]},
      { q: "La décrue est amorcée.", opts: [
        { t: "Suivre les consignes de la mairie sur l’eau du robinet et nettoyer avec gants et bottes.", s: 2, fb: "Les eaux de crue sont souillées et le réseau d’eau peut être contaminé. On attend l’autorisation pour boire l’eau du robinet." },
        { t: "Rebrancher tout de suite l’électricité.", s: 0, fb: "Une installation mouillée doit être vérifiée avant remise sous tension." },
        { t: "Boire l’eau du robinet, elle est claire.", s: 0, fb: "La couleur n’indique rien de la qualité microbiologique." }
      ]}
    ],
    src: ["inond"]
  },
  {
    id: "C3", env: "crise", aud: ["j","g","p"], title: "Préparer son kit 72 h",
    ctx: "Les autorités recommandent à chaque foyer de pouvoir tenir 72 heures en autonomie. Vous constituez le vôtre.",
    steps: [
      { q: "Combien d’eau prévoir ?", opts: [
        { t: "6 litres par personne, en récipients scellés.", s: 2, fb: "C’est la quantité recommandée pour 72 h : environ 2 litres par jour et par personne, hors toilette." },
        { t: "Un litre par personne, on trouvera bien de l’eau.", s: 0, fb: "Insuffisant : en crise, les réseaux d’eau sont souvent touchés." },
        { t: "Pas d’eau, juste des pastilles de purification.", s: 1, fb: "Les pastilles sont un bon complément, mais il faut une source d’eau disponible." }
      ]},
      { q: "Où ranger le kit ?", opts: [
        { t: "Dans un endroit facile d’accès, hors de portée de l’eau.", s: 2, fb: "On doit pouvoir l’attraper en quelques secondes, même dans le noir." },
        { t: "À la cave, là où il ne gêne pas.", s: 0, fb: "La cave est la première pièce inondée. Mauvais endroit." },
        { t: "Dans le coffre de la voiture.", s: 1, fb: "Utile en déplacement, mais la voiture peut être inaccessible. L’idéal est un kit à la maison, un autre dans la voiture." }
      ]},
      { q: "Comment vous informer si internet et le réseau mobile tombent ?", opts: [
        { t: "Une radio à piles ou à dynamo, avec des piles de rechange.", s: 2, fb: "La radio reste le canal le plus robuste pour recevoir les consignes des autorités." },
        { t: "Compter sur le téléphone, il y a toujours du réseau.", s: 0, fb: "Les antennes ont des batteries limitées et saturent vite en crise." },
        { t: "Demander aux voisins.", s: 1, fb: "La solidarité est précieuse, mais les rumeurs circulent vite. Il faut une source officielle." }
      ]}
    ],
    src: ["kit"]
  },
  {
    id: "C4", env: "crise", aud: ["j","g","p"], title: "Séisme",
    ctx: "En vacances aux Antilles, le sol se met à trembler violemment dans votre appartement.",
    steps: [
      { q: "Pendant la secousse ?", opts: [
        { t: "Se baisser, s’abriter sous une table solide, s’agripper à son pied.", s: 2, fb: "La plupart des blessures viennent de chutes d’objets et de chutes de la personne. Cette posture protège des deux." },
        { t: "Courir dehors par l’escalier.", s: 0, fb: "Se déplacer pendant la secousse expose aux chutes et aux débris qui tombent des façades." },
        { t: "Se placer sous l’encadrement de la porte.", s: 1, fb: "Idée ancienne : les encadrements modernes ne sont pas plus solides et la porte peut vous frapper." }
      ]},
      { q: "La secousse s’arrête.", opts: [
        { t: "Sortir prudemment par l’escalier, sans ascenseur, et s’éloigner des bâtiments.", s: 2, fb: "Les répliques peuvent fragiliser un bâtiment déjà endommagé. Ascenseur exclu : panne et blocage." },
        { t: "Prendre l’ascenseur pour sortir plus vite.", s: 0, fb: "Risque de blocage entre deux étages." },
        { t: "Rester dans l’appartement pour attendre les consignes.", s: 1, fb: "Possible si le bâtiment est intact, mais en cas de dégâts ou d’odeur de gaz, il faut sortir." }
      ]},
      { q: "Vous voulez rassurer votre famille.", opts: [
        { t: "Envoyer un SMS court plutôt qu’appeler.", s: 2, fb: "Les appels saturent les réseaux dont les secours ont besoin. Un SMS passe mieux et consomme peu." },
        { t: "Appeler tout le monde.", s: 0, fb: "Vous contribuez à saturer le réseau." },
        { t: "Faire une vidéo en direct.", s: 0, fb: "Très gourmand en réseau et en batterie." }
      ]}
    ],
    src: ["seisme"]
  },
  {
    id: "C5", env: "crise", aud: ["j","g","p"], title: "La sirène retentit",
    ctx: "Un mercredi, hors du premier mercredi du mois : la sirène émet un son montant et descendant, trois fois. Une alerte FR-Alert arrive sur votre téléphone : accident industriel.",
    steps: [
      { q: "Vous êtes dans la rue.", opts: [
        { t: "Entrer dans le bâtiment clos le plus proche, fermer portes et fenêtres.", s: 2, fb: "La mise à l’abri dans un bâtiment est la consigne de base face à un nuage toxique." },
        { t: "Courir chercher les enfants à l’école.", s: 0, fb: "L’école applique son plan de mise en sûreté. Sortir vous expose et encombre les routes." },
        { t: "Rentrer chez soi en voiture, à 15 minutes.", s: 1, fb: "Une voiture protège mal. Le bâtiment le plus proche vaut mieux que votre domicile." }
      ]},
      { q: "Vous êtes à l’abri.", opts: [
        { t: "Écouter la radio et suivre les consignes, limiter les appels téléphoniques.", s: 2, fb: "La radio relaie les consignes officielles. Les lignes doivent rester libres pour les secours." },
        { t: "Allumer la ventilation pour renouveler l’air.", s: 0, fb: "Au contraire, il faut couper ventilation et climatisation pour ne pas faire entrer l’air extérieur." },
        { t: "Sortir voir ce qui se passe.", s: 0, fb: "Restez à l’abri jusqu’à la fin de l’alerte (son continu de 30 secondes)." }
      ]},
      { q: "Il s’agit d’un accident nucléaire. Faut-il prendre de l’iode ?", opts: [
        { t: "Uniquement sur ordre du préfet, aux doses indiquées.", s: 2, fb: "L’iode stable protège la thyroïde seulement s’il est pris au bon moment. La décision est préfectorale." },
        { t: "Tout de suite, par précaution.", s: 0, fb: "Pris trop tôt ou sans indication, il n’apporte rien et peut entraîner des effets indésirables." },
        { t: "Jamais, ça ne sert à rien.", s: 0, fb: "Faux : sur ordre des autorités, il réduit fortement le risque de cancer de la thyroïde, surtout chez les enfants." }
      ]}
    ],
    pro: "Le signal national d’alerte se compose de trois cycles successifs d’environ 1 minute 41 secondes. Il est testé le premier mercredi de chaque mois à midi."
  },
  {
    id: "C6", env: "crise", aud: ["j","g","p"], title: "Canicule",
    ctx: "Vigilance canicule orange pour cinq jours. Votre appartement est sous les toits.",
    steps: [
      { q: "Comment garder le logement frais ?", opts: [
        { t: "Volets et fenêtres fermés le jour, tout ouvrir la nuit pour faire des courants d’air.", s: 2, fb: "Bloquer le soleil le jour et profiter de la fraîcheur nocturne est la stratégie la plus efficace sans climatisation." },
        { t: "Fenêtres grandes ouvertes toute la journée.", s: 0, fb: "On fait entrer l’air chaud extérieur." },
        { t: "Un ventilateur seul, fenêtres fermées jour et nuit.", s: 1, fb: "Le ventilateur aide à évaporer la sueur, mais ne refroidit pas une pièce qu’on n’aère jamais." }
      ]},
      { q: "Votre voisine de 86 ans vit seule.", opts: [
        { t: "Prendre de ses nouvelles chaque jour et lui proposer de s’inscrire au registre de la mairie.", s: 2, fb: "L’isolement est un facteur de risque majeur en canicule. Le registre communal permet un contact par les services." },
        { t: "Ne rien faire, elle a l’habitude.", s: 0, fb: "Les personnes âgées ressentent moins la soif et la chaleur : elles ne se protègent pas spontanément." },
        { t: "Lui déposer des bouteilles d’eau une fois.", s: 1, fb: "Bon geste, mais un passage quotidien permet de repérer une dégradation." }
      ]},
      { q: "Pour vous-même ?", opts: [
        { t: "Boire sans attendre la soif, se mouiller le corps, éviter l’alcool et l’effort aux heures chaudes.", s: 2, fb: "Mouiller la peau et s’exposer à un courant d’air reproduit le refroidissement par la sueur." },
        { t: "Faire son footing à 14 h pour s’habituer.", s: 0, fb: "L’effort aux heures chaudes est la première cause de coup de chaleur chez l’adulte jeune." },
        { t: "Prendre une douche glacée toutes les heures.", s: 1, fb: "Une eau tiède suffit et évite le frisson réactionnel." }
      ]}
    ]
  },

  /* ---------------- PROFESSIONNELS ---------------- */
  {
    id: "P1", env: "crise", aud: ["p"], title: "Panne électrique en service hospitalier",
    ctx: "Tempête nocturne. Le réseau électrique tombe. Les groupes électrogènes démarrent, mais une partie de l’éclairage reste éteinte dans votre unité.",
    steps: [
      { q: "Première priorité de l’équipe soignante ?", opts: [
        { t: "Faire le tour des patients dépendants d’un appareil (ventilation, pousse-seringues, aspiration, oxygène) et vérifier leur alimentation secourue et leurs batteries.", s: 2, fb: "Les patients technologie-dépendants sont la priorité vitale. Seules les prises secourues identifiées sont alimentées par les groupes." },
        { t: "Appeler les services techniques et attendre leurs consignes.", s: 1, fb: "Il faut les prévenir, mais pas au prix d’un retard dans la vérification des patients." },
        { t: "Rassurer d’abord les patients conscients par un passage en chambre.", s: 1, fb: "Utile, mais secondaire par rapport aux patients dont la vie dépend d’un appareil." }
      ]},
      { q: "La panne se prolonge et touche plusieurs bâtiments.", opts: [
        { t: "Remonter l’information à l’administrateur de garde pour activer la cellule de crise selon le plan de gestion des tensions et situations sanitaires exceptionnelles.", s: 2, fb: "Le plan établissement (dont le volet plan blanc) prévoit l’organisation : cellule de crise, rappel de personnel, déprogrammation." },
        { t: "Gérer au niveau de l’unité pour ne pas alarmer.", s: 0, fb: "Une panne multisite dépasse l’unité : l’absence d’escalade retarde les moyens." },
        { t: "Transférer d’emblée tous les patients ventilés vers un autre établissement.", s: 1, fb: "Peut devenir nécessaire, mais la décision se prend en cellule de crise, avec le SAMU." }
      ]},
      { q: "Risque infectieux à anticiper ?", opts: [
        { t: "Arrêt de la ventilation et des traitements d’air des zones protégées, chaîne du froid des produits de santé, eau chaude sanitaire : alerter l’EOH.", s: 2, fb: "Les zones à environnement maîtrisé, la pharmacie et les réseaux d’eau sont des points critiques. L’EOH aide à prioriser." },
        { t: "Aucun, c’est un problème technique.", s: 0, fb: "Une panne d’énergie a des conséquences directes sur l’air, l’eau et les produits de santé." },
        { t: "Uniquement la chaîne du froid des vaccins.", s: 1, fb: "Un point parmi d’autres : air traité et eau sont aussi concernés." }
      ]}
    ]
  },
  {
    id: "P2", env: "crise", aud: ["p"], title: "Afflux massif de victimes",
    ctx: "Un accident de car avec une quarantaine de blessés à 20 km. Le SAMU prévient votre service d’urgences.",
    steps: [
      { q: "Qui déclenche le plan blanc ?", opts: [
        { t: "Le directeur de l’établissement (ou son représentant), éventuellement à la demande du préfet ou de l’ARS.", s: 2, fb: "Le déclenchement relève de la direction, qui active la cellule de crise." },
        { t: "Le médecin urgentiste de garde.", s: 1, fb: "Il alerte et propose, mais ne déclenche pas seul." },
        { t: "Le SAMU.", s: 0, fb: "Le SAMU régule et oriente les victimes, il ne déclenche pas le plan d’un établissement." }
      ]},
      { q: "À l’arrivée des victimes ?", opts: [
        { t: "Un tri à l’entrée catégorise les victimes (urgences absolues, relatives, impliqués) et oriente vers des zones dédiées.", s: 2, fb: "Le tri par un médecin expérimenté évite l’engorgement et garantit que les plus graves sont vus en premier." },
        { t: "Prendre en charge dans l’ordre d’arrivée.", s: 0, fb: "En afflux massif, l’ordre d’arrivée ne reflète pas la gravité." },
        { t: "Tout envoyer en salle d’accueil des urgences vitales.", s: 0, fb: "Saturation immédiate de la ressource la plus critique." }
      ]},
      { q: "Traçabilité des victimes ?", opts: [
        { t: "Enregistrement dans SI-VIC avec le numéro unique attribué à chaque victime.", s: 2, fb: "SI-VIC assure le suivi des victimes entre établissements et l’information des familles." },
        { t: "Liste papier tenue par l’accueil, saisie plus tard.", s: 1, fb: "Solution dégradée acceptable en cas de panne, mais à reporter dans SI-VIC dès que possible." },
        { t: "Inutile en urgence.", s: 0, fb: "Sans traçabilité, des victimes se perdent et les familles ne peuvent être informées." }
      ]}
    ]
  },
  {
    id: "P3", env: "nature", aud: ["p"], title: "Hypothermie accidentelle sévère",
    ctx: "Vous intervenez sur un randonneur retrouvé après une nuit dehors. Il est inconscient, froid, respire lentement.",
    steps: [
      { q: "Mobilisation ?", opts: [
        { t: "Manipuler avec une extrême douceur, le garder à l’horizontale, l’isoler du sol et du vent.", s: 2, fb: "Le myocarde hypotherme est irritable : une mobilisation brusque peut déclencher une fibrillation ventriculaire." },
        { t: "Le relever pour le faire marcher jusqu’au véhicule.", s: 0, fb: "Mise en position verticale et effort : risque de collapsus et d’arrêt cardiaque." },
        { t: "Le frictionner pour relancer la circulation.", s: 0, fb: "Proscrit : risque de lésions et de troubles du rythme." }
      ]},
      { q: "Il fait un arrêt cardiaque.", opts: [
        { t: "RCP continue et orientation vers un centre capable d’assistance circulatoire extracorporelle.", s: 2, fb: "Le froid protège le cerveau. On ne déclare pas le décès d’une victime hypotherme avant réchauffement." },
        { t: "Arrêter la réanimation après 30 minutes sans reprise.", s: 0, fb: "En hypothermie profonde, des réanimations prolongées ont permis des survies sans séquelles." },
        { t: "Le réchauffer d’abord, puis commencer la RCP.", s: 0, fb: "La RCP ne se diffère pas." }
      ]},
      { q: "Réchauffement sur le terrain ?", opts: [
        { t: "Passif et externe : vêtements mouillés retirés en coupant, couverture, sac isotherme, chaleur au tronc.", s: 2, fb: "On limite les pertes et on réchauffe le tronc avant les extrémités." },
        { t: "Bouillottes très chaudes sur les mains et les pieds.", s: 0, fb: "Réchauffer les extrémités en premier peut aggraver la chute de température centrale et brûler une peau insensible." },
        { t: "Aucun, le transport suffit.", s: 1, fb: "Le transport est prioritaire, mais l’isolation doit commencer dès la prise en charge." }
      ]}
    ],
    src: ["froid"]
  }
];

/* -------- Gestion de ressources --------
   d : variations des jauges. Jauges : 0 à 10. */
const CAMPAIGNS = [
  {
    id: "R1", env: "crise", title: "72 heures sans courant",
    ctx: "Janvier, tempête. Votre foyer de 3 personnes est privé d’électricité et d’eau chaude. Tenez 72 heures, en 6 étapes de 12 heures.",
    gauges: [
      { k: "eau", n: "Eau", v: 6 }, { k: "chaleur", n: "Chaleur", v: 6 }, { k: "energie", n: "Énergie", v: 6 },
      { k: "nourriture", n: "Nourriture", v: 6 }, { k: "sante", n: "Santé", v: 8 }, { k: "moral", n: "Moral", v: 6 }
    ],
    decay: { eau: -1, chaleur: -1, nourriture: -1 },
    turns: [
      { t: "H+0 · La nuit tombe", e: "Le noir complet. Les enfants s’inquiètent.", c: [
        { t: "Bougies posées au sol, loin des rideaux, et une lampe frontale par personne", d: { energie: -1, moral: 1 }, s: 2, fb: "Lumière sûre et rassurante. Les bougies se surveillent en permanence." },
        { t: "Utiliser les téléphones comme lampes", d: { energie: -3, moral: 1 }, s: 1, fb: "Vous videz vos batteries, précieuses pour recevoir les alertes." },
        { t: "Allumer le réchaud de camping à gaz dans le salon pour éclairer et chauffer", d: { chaleur: 2, sante: -4 }, s: 0, fb: "Combustion en intérieur : production de monoxyde de carbone." }
      ]},
      { t: "H+12 · Matin glacial", e: "Il fait 10 °C dans la maison.", c: [
        { t: "Regrouper tout le monde dans la plus petite pièce, couvertures, bonnets, calfeutrage", d: { chaleur: 2, moral: 1 }, s: 2, fb: "Moins de volume, moins de pertes. On perd beaucoup de chaleur par la tête." },
        { t: "Faire tourner le groupe électrogène du voisin dans le garage", d: { chaleur: 3, energie: 2, sante: -5 }, s: 0, fb: "Jamais dans un local, même porte ouverte. Le CO s’accumule et s’infiltre dans la maison." },
        { t: "Partir chez la famille à 40 km sur routes verglacées", d: { chaleur: 2, sante: -2, moral: -1 }, s: 1, fb: "Pourquoi pas si les routes sont praticables, mais les autorités demandent souvent de limiter les déplacements." }
      ]},
      { t: "H+24 · Le robinet tousse", e: "La pression d’eau baisse, la mairie annonce une possible contamination du réseau.", c: [
        { t: "Utiliser les réserves d’eau scellées pour boire, garder l’eau du robinet pour les toilettes", d: { eau: 0, sante: 1 }, s: 2, fb: "On réserve l’eau sûre à la boisson et à la cuisine." },
        { t: "Boire l’eau du robinet, elle a l’air normale", d: { eau: 2, sante: -3 }, s: 0, fb: "Une eau claire peut être contaminée. Respectez l’avis des autorités." },
        { t: "Faire bouillir l’eau du robinet sur le réchaud, dehors sur la terrasse", d: { eau: 2, energie: -1 }, s: 2, fb: "Ébullition au moins une minute, réchaud utilisé à l’extérieur : bonne solution." }
      ]},
      { t: "H+36 · Le frigo tiédit", e: "Le réfrigérateur ne tient plus le froid.", c: [
        { t: "Manger d’abord les produits frais du frigo, garder le congélateur fermé", d: { nourriture: 2 }, s: 2, fb: "On consomme dans l’ordre de fragilité. Le congélateur fermé tient plus longtemps." },
        { t: "Ouvrir le congélateur pour faire l’inventaire", d: { nourriture: -1 }, s: 0, fb: "Chaque ouverture accélère la décongélation." },
        { t: "Mettre les aliments dehors dans une glacière (il gèle)", d: { nourriture: 1 }, s: 1, fb: "Astucieux par temps de gel, mais attention aux animaux et aux redoux." }
      ]},
      { t: "H+48 · Maux de tête", e: "Le cadet se plaint de maux de tête et de nausées. Votre voisin aussi.", c: [
        { t: "Penser au CO, aérer, sortir, appeler le 15 ou le 112", d: { sante: 3, chaleur: -1 }, s: 2, fb: "Symptômes chez plusieurs personnes au même endroit : on évoque le CO." },
        { t: "Paracétamol et sieste", d: { sante: -4 }, s: 0, fb: "Dormir dans une atmosphère chargée en CO peut être mortel." },
        { t: "Prévenir le voisin que son groupe électrogène pourrait être en cause", d: { sante: 1, moral: 1 }, s: 1, fb: "Utile, mais il faut aussi sortir et demander un avis médical." }
      ]},
      { t: "H+60 · Fin proche", e: "La radio annonce le retour du courant dans la nuit. Une voisine âgée n’a pas été vue depuis deux jours.", c: [
        { t: "Aller frapper chez elle et lui proposer de l’aide", d: { moral: 2, nourriture: -1 }, s: 2, fb: "La solidarité de voisinage sauve des vies en crise, surtout pour les personnes isolées." },
        { t: "Ne pas s’en mêler", d: { moral: -2 }, s: 0, fb: "Les personnes âgées isolées sont les plus vulnérables au froid." },
        { t: "Appeler la mairie pour signaler", d: { moral: 1, energie: -1 }, s: 1, fb: "Bon réflexe, idéalement complété par une visite." }
      ]}
    ]
  },
  {
    id: "R2", env: "nature", title: "48 heures égaré en montagne",
    ctx: "Automne. Seul, vous vous êtes écarté de l’itinéraire et un brouillard épais est tombé. Tenez jusqu’aux secours, en 6 étapes de 8 heures.",
    gauges: [
      { k: "eau", n: "Hydratation", v: 6 }, { k: "chaleur", n: "Chaleur", v: 6 }, { k: "forces", n: "Forces", v: 7 },
      { k: "batterie", n: "Batterie", v: 4 }, { k: "visibilite", n: "Visibilité", v: 2 }, { k: "moral", n: "Moral", v: 5 }
    ],
    decay: { eau: -1, chaleur: -1, forces: -1 },
    turns: [
      { t: "H+0 · Brouillard", e: "Visibilité 10 mètres. Plus aucune trace.", c: [
        { t: "S’arrêter, appeler le 112, donner sa dernière position connue", d: { batterie: -1, visibilite: 3, moral: 1 }, s: 2, fb: "L’alerte précoce déclenche les recherches. Le 112 passe par tout réseau disponible." },
        { t: "Continuer à marcher pour retrouver le sentier", d: { forces: -2, visibilite: -1 }, s: 0, fb: "Dans le brouillard, on tourne en rond et on s’éloigne de la zone de recherche." },
        { t: "Attendre que le brouillard se lève sans prévenir", d: { moral: -1 }, s: 1, fb: "Rester sur place est bien, mais sans alerte personne ne vous cherche." }
      ]},
      { t: "H+8 · Le froid tombe", e: "La température approche 2 °C. Le vent se lève.", c: [
        { t: "Abri sous un rocher, sol isolé avec branches et sac, couverture de survie", d: { chaleur: 2, forces: -1 }, s: 2, fb: "Couper le vent et s’isoler du sol, voilà les deux priorités." },
        { t: "Allumer un feu avec des herbes mouillées", d: { forces: -1, moral: -1 }, s: 1, fb: "Effort peu rentable par temps humide. L’abri passe avant le feu." },
        { t: "Marcher en rond pour se réchauffer", d: { forces: -2, eau: -1 }, s: 0, fb: "Transpiration et fatigue : vous serez plus froid ensuite." }
      ]},
      { t: "H+16 · Soif", e: "Votre gourde est vide. Un filet d’eau coule à 50 m.", c: [
        { t: "Remplir la gourde, utiliser une pastille de purification de la trousse", d: { eau: 3 }, s: 2, fb: "Traiter l’eau évite une diarrhée qui aggraverait la déshydratation." },
        { t: "Manger de la neige", d: { eau: 1, chaleur: -2 }, s: 0, fb: "La neige consomme énormément de chaleur corporelle pour fondre. On la fait fondre avant." },
        { t: "Boire directement au ruisseau", d: { eau: 3, forces: -1 }, s: 1, fb: "Mieux que la déshydratation, mais risque infectieux non nul." }
      ]},
      { t: "H+24 · Bruit de rotor", e: "Un hélicoptère passe au-dessus du brouillard qui se déchire.", c: [
        { t: "Étaler la couverture de survie côté brillant, bras en Y", d: { visibilite: 4, moral: 2 }, s: 2, fb: "Surface réfléchissante et signal codifié : très visible du ciel." },
        { t: "Courir vers une crête dégagée", d: { forces: -3, visibilite: 1 }, s: 0, fb: "Risque de chute et épuisement. On se signale là où l’on est." },
        { t: "Agiter un seul bras", d: { visibilite: 1 }, s: 1, fb: "Peut être lu comme « pas besoin d’aide »." }
      ]},
      { t: "H+32 · Batterie faible", e: "Le téléphone affiche 8 %. Pas de message des secours.", c: [
        { t: "Mode avion, rallumer brièvement à heures fixes pour un SMS de position", d: { batterie: 1, visibilite: 1 }, s: 2, fb: "Le téléphone cherche le réseau en permanence et se vide. Des fenêtres courtes économisent la batterie." },
        { t: "Regarder des vidéos pour garder le moral", d: { batterie: -3, moral: 1 }, s: 0, fb: "Le moral compte, mais la batterie est votre lien avec les secours." },
        { t: "Éteindre définitivement", d: { batterie: 1, visibilite: -1 }, s: 1, fb: "Vous économisez, mais les secours ne peuvent plus vous localiser." }
      ]},
      { t: "H+40 · Coup de blues", e: "Deuxième nuit qui approche. Le découragement monte.", c: [
        { t: "Se fixer des tâches simples : entretenir l’abri, sifflet 6 fois par minute toutes les heures", d: { moral: 2, visibilite: 2, forces: -1 }, s: 2, fb: "L’action structurée lutte contre le désespoir et augmente les chances d’être entendu." },
        { t: "Tenter une descente de nuit", d: { forces: -3, visibilite: -2 }, s: 0, fb: "La nuit et la fatigue sont les deux causes principales de chutes graves." },
        { t: "Dormir le plus possible", d: { forces: 1, chaleur: -1 }, s: 1, fb: "Le repos est utile si l’abri est bon, mais restez attentif aux appels." }
      ]}
    ]
  }
];

/* -------- Quiz -------- */
const QUIZ = [
  { env: "nature", aud: "jgp", q: "Combien de coups de sifflet par minute pour le signal de détresse alpin ?", o: ["3", "6", "10", "1"], a: 1, x: "Six signaux par minute, puis une minute de pause. La réponse est trois signaux par minute." },
  { env: "nature", aud: "jgp", q: "Bras levés en Y face à un hélicoptère signifient :", o: ["Tout va bien", "Nous avons besoin d’aide", "Atterrissez ici", "Partez"], a: 1, x: "Y comme Yes : besoin d’aide." },
  { env: "nature", aud: "jgp", q: "Combien de temps faire bouillir l’eau au minimum (basse altitude) ?", o: ["10 secondes", "1 minute", "15 minutes", "Inutile"], a: 1, x: "Au moins une minute à gros bouillons, 3 minutes en altitude." },
  { env: "nature", aud: "jgp", q: "Face à une morsure de vipère, le garrot est :", o: ["Indispensable", "Proscrit", "Conseillé 10 minutes", "Utile si on aspire ensuite"], a: 1, x: "Garrot, incision et aspiration sont proscrits." },
  { env: "nature", aud: "jgp", q: "Manger de la neige quand on a soif :", o: ["Bonne idée", "Refroidit le corps, mieux vaut la faire fondre", "Remplace l’eau sans risque", "Seulement la nuit"], a: 1, x: "La fonte dans la bouche consomme de la chaleur corporelle." },
  { env: "nature", aud: "jgp", q: "Après le dernier coup de tonnerre, on attend environ :", o: ["2 minutes", "30 minutes", "3 heures", "Inutile d’attendre"], a: 1, x: "La foudre peut frapper loin derrière l’orage." },
  { env: "nature", aud: "jgp", q: "Perdu en forêt, la première étape est de :", o: ["Courir", "S’arrêter et réfléchir", "Grimper à un arbre", "Crier"], a: 1, x: "Méthode STOP : s’arrêter, réfléchir, observer, planifier." },
  { env: "nature", aud: "gp", q: "Dans l’eau glacée, la première minute est surtout dangereuse à cause :", o: ["De l’hypothermie", "Du choc respiratoire", "Des crampes", "Des poissons"], a: 1, x: "Le choc thermique fait hyperventiler : risque d’inhaler de l’eau." },
  { env: "nature", aud: "jgp", q: "Contre le froid de nuit, l’élément le plus important est :", o: ["Un toit étanche", "L’isolation sous soi", "Un feu", "Un chapeau"], a: 1, x: "Le sol froid vole la chaleur par conduction." },
  { env: "nature", aud: "gp", q: "L’alcool contre le froid :", o: ["Réchauffe vraiment", "Augmente la perte de chaleur", "Est neutre", "Prévient les gelures"], a: 1, x: "Vasodilatation cutanée : sensation de chaleur trompeuse." },
  { env: "nature", aud: "jgp", q: "Une gelure se réchauffe :", o: ["En frictionnant", "Dans l’eau tiède, sans frotter", "Près d’un feu", "Avec de la neige"], a: 1, x: "Eau tiède à 38 °C ou moins, sans friction ni massage." },
  { env: "nature", aud: "gp", q: "Peau chaude, confusion après effort sous la chaleur : il faut d’abord :", o: ["Faire boire", "Refroidir et appeler le 15", "Attendre", "Donner du sel"], a: 1, x: "Coup de chaleur : urgence vitale, refroidissement immédiat." },
  { env: "crise", aud: "jgp", q: "Quelle quantité d’eau par personne pour un kit 72 h ?", o: ["1 L", "3 L", "6 L", "20 L"], a: 2, x: "Recommandation officielle : 6 litres par personne." },
  { env: "crise", aud: "jgp", q: "Où ne faut-il pas stocker le kit d’urgence ?", o: ["Entrée", "Placard accessible", "Cave", "Chambre"], a: 2, x: "La cave est la première pièce inondée." },
  { env: "crise", aud: "jgp", q: "Une voiture peut flotter à partir de :", o: ["5 cm d’eau", "30 cm d’eau", "1 m d’eau", "2 m d’eau"], a: 1, x: "Dès 30 cm, une voiture n’est plus manœuvrable." },
  { env: "crise", aud: "jgp", q: "Le monoxyde de carbone est :", o: ["Visible", "Odorant", "Inodore et invisible", "Sans danger"], a: 2, x: "Inodore, invisible, mortel : on ne le détecte qu’avec un détecteur." },
  { env: "crise", aud: "jgp", q: "Un groupe électrogène s’utilise :", o: ["Au garage porte ouverte", "À la cave", "À l’extérieur, loin des ouvertures", "Dans la cuisine"], a: 2, x: "Jamais dans un local, même ouvert." },
  { env: "crise", aud: "jgp", q: "Pendant un séisme, en intérieur :", o: ["Courir dehors", "Se baisser, s’abriter, s’agripper", "Prendre l’ascenseur", "Se mettre à la fenêtre"], a: 1, x: "La posture protège des chutes et objets." },
  { env: "crise", aud: "jgp", q: "Sirène d’alerte et enfants à l’école :", o: ["On va les chercher", "On les laisse, l’école les met à l’abri", "On les appelle", "On attend dehors"], a: 1, x: "L’école applique son plan de mise en sûreté." },
  { env: "crise", aud: "jgp", q: "La fin d’alerte de la sirène est :", o: ["Un son continu de 30 secondes", "Trois bips", "Un son montant-descendant", "Le silence"], a: 0, x: "Son continu de 30 secondes." },
  { env: "crise", aud: "jgp", q: "La sirène est testée :", o: ["Chaque lundi", "Le premier mercredi du mois à midi", "Jamais", "Le 14 juillet"], a: 1, x: "Premier mercredi du mois, midi." },
  { env: "crise", aud: "jgp", q: "Après un séisme, pour rassurer sa famille :", o: ["Appeler", "Envoyer un SMS", "Vidéo en direct", "Rien"], a: 1, x: "Le SMS sature moins le réseau." },
  { env: "crise", aud: "jgp", q: "En canicule, le logement se protège :", o: ["Fenêtres ouvertes le jour", "Volets fermés le jour, aération la nuit", "Chauffage coupé", "Rien"], a: 1, x: "On bloque le soleil le jour, on aère la nuit." },
  { env: "crise", aud: "gp", q: "Comprimés d’iode en cas d’accident nucléaire :", o: ["Dès l’alerte", "Sur ordre du préfet", "Jamais", "Une semaine après"], a: 1, x: "La décision est préfectorale, au bon moment." },
  { env: "crise", aud: "jgp", q: "Numéro d’urgence européen :", o: ["15", "17", "112", "911"], a: 2, x: "Le 112 fonctionne partout dans l’Union européenne. Le 114 est accessible par SMS pour les personnes sourdes ou malentendantes." },
  { env: "crise", aud: "jgp", q: "Coupure de courant : le congélateur doit être :", o: ["Ouvert souvent", "Gardé fermé", "Vidé tout de suite", "Débranché"], a: 1, x: "Fermé, il garde le froid bien plus longtemps." },
  { env: "crise", aud: "gp", q: "Après une inondation, l’eau du robinet :", o: ["Est potable si claire", "Se boit après avis des autorités", "Se boit après filtrage café", "Est toujours contaminée"], a: 1, x: "On attend les consignes de la mairie." },
  { env: "crise", aud: "jgp", q: "Pour s’informer si internet tombe :", o: ["Radio à piles ou dynamo", "Télévision", "Ordinateur", "Montre connectée"], a: 0, x: "La radio est le canal le plus robuste." },
  { env: "crise", aud: "p", q: "Le plan blanc est déclenché par :", o: ["Le SAMU", "Le directeur d’établissement", "Le chef de service", "Le maire"], a: 1, x: "La direction déclenche et active la cellule de crise." },
  { env: "crise", aud: "p", q: "Outil national de dénombrement et de suivi des victimes :", o: ["SI-VIC", "e-SIN", "DMP", "ROR"], a: 0, x: "SI-VIC trace les victimes en situation sanitaire exceptionnelle." },
  { env: "crise", aud: "p", q: "Panne électrique en service : priorité absolue ?", o: ["Éclairage des couloirs", "Patients dépendants d’un appareil", "Ordinateurs", "Ascenseurs"], a: 1, x: "Ventilation, pousse-seringues, aspiration, oxygène." },
  { env: "nature", aud: "p", q: "Victime hypotherme en arrêt cardiaque :", o: ["RCP stoppée à 20 min", "RCP prolongée et orientation ECLS", "Réchauffer avant RCP", "Pas de RCP"], a: 1, x: "On ne déclare pas le décès avant réchauffement." },
  { env: "nature", aud: "p", q: "Hypotherme inconscient : mobilisation ?", o: ["Rapide", "Très douce, horizontale", "Assise", "Debout pour marcher"], a: 1, x: "Risque de fibrillation ventriculaire à la mobilisation brusque." },
  { env: "nature", aud: "p", q: "Règle 1-10-1 en eau froide, le « 10 » correspond à :", o: ["10 secondes de choc", "10 minutes de mouvements utiles", "10 heures de survie", "10 °C"], a: 1, x: "1 min de choc, 10 min de gestes utiles, 1 h avant perte de conscience." },
  { env: "crise", aud: "p", q: "Panne d’énergie prolongée : quel risque infectieux signaler à l’EOH ?", o: ["Aucun", "Traitement d’air des zones protégées et réseaux d’eau", "Seulement la cantine", "Les déchets"], a: 1, x: "Air traité, eau chaude sanitaire et chaîne du froid sont critiques." }
];
