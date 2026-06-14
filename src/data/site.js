// Centrale bron voor bedrijfsgegevens, diensten, doelgroepen en projecten.
// Pas teksten/projecten hier aan — alle pagina's lezen uit dit bestand.

export const company = {
  name: 'Gouw Gesmeerd',
  tagline: 'Stukadoorsbedrijf',
  fullName: 'Stukadoor Gouw Gesmeerd',
  founded: 2018,
  experienceYears: '10+',
  warranty: '3–5 jaar',
  phone: '+31 6 19683095',
  phoneHref: 'tel:+31619683095',
  email: 'Gouwgesmeerd@gmail.com',
  emailHref: 'mailto:Gouwgesmeerd@gmail.com',
  address: {
    street: 'Vlamingstraat 22',
    postal: '2801 VW',
    city: 'Gouda',
    country: 'Nederland',
  },
  region: 'Gouda, Rotterdam en omstreken',
  regionWide: 'Gouda · Rotterdam · Den Haag · Utrecht · Randstad',
  legalForm: 'Eenmanszaak',
};

// num → telt op bij in beeld komen; value → statisch. unit = mono-eenheid.
export const stats = [
  { num: 10, suffix: '+', label: 'Jaar vakervaring', sub: 'binnen- én buitenstucwerk' },
  { value: '2018', label: 'Onderneming sinds', sub: 'opgebouwd op vakmanschap' },
  { value: '3–5', unit: 'jaar', label: 'Garantie op het werk', sub: 'kwaliteit die blijft staan' },
  { num: 100, suffix: '%', label: 'Eigen uitvoering', sub: 'één vast aanspreekpunt' },
];

// Doelgroepen — zakelijke focus
export const audiences = [
  {
    id: 'aannemers',
    slug: '/aannemers',
    num: '01',
    title: 'Aannemers & bouwbedrijven',
    excerpt:
      'Een vaste stucpartner die meedenkt over planning, fasering en oplevering. Strak werk, op tijd, zonder dat u erachteraan hoeft.',
    points: ['Planning-betrouwbaar', 'Volume & meerdere units', 'Onderaanneming'],
  },
  {
    id: 'ontwikkelaars',
    slug: '/aannemers',
    num: '02',
    title: 'Projectontwikkelaars',
    excerpt:
      'Grootschalige nieuwbouw en transformatie. Consistente afwerking over tientallen woningen of units, opgeleverd op schema.',
    points: ['Schaalbaar', 'Consistente kwaliteit', 'Oplevering op datum'],
  },
  {
    id: 'verzekeraars',
    slug: '/schadeherstel',
    num: '03',
    title: 'Verzekeraars & schadeherstel',
    excerpt:
      'Herstel na water-, brand- en lekkageschade. Snel schakelen, heldere rapportage en beeldmateriaal — de bewoner snel weer thuis.',
    points: ['Snelle respons', 'Rapportage & foto’s', 'Volledige ontzorging'],
  },
];

// Diensten
export const services = [
  {
    id: 'binnenstucwerk',
    num: '01',
    title: 'Binnenstucwerk',
    short: 'Strakke wanden en plafonds, klaar voor sausen of behangen.',
    body:
      'Glad pleisterwerk op wanden en plafonds — nieuwbouw én renovatie. Van behangklaar tot spuitklaar en sausklaar, met scherpe hoeken en vlakke vlakken die er ook bij strijklicht onberispelijk uitzien.',
    tags: ['Behangklaar', 'Sausklaar', 'Plafonds', 'Renovatie'],
  },
  {
    id: 'buitengevel',
    num: '02',
    title: 'Buitengevelstucwerk',
    short: 'Weerbestendige gevelafwerking met karakter en bescherming.',
    body:
      'Buitengevels die jaren mooi blijven: duurzame sierpleisters en gevelsystemen die de gevel beschermen tegen weer en wind. Ook in combinatie met gevelisolatie voor een hoogwaardig eindresultaat.',
    tags: ['Gevelpleister', 'Isolatie-afwerking', 'Renovatie', 'Onderhoudsarm'],
  },
  {
    id: 'spuitwerk',
    num: '03',
    title: 'Spuitwerk',
    short: 'Efficiënt en gelijkmatig — ideaal voor grote oppervlakken.',
    body:
      'Machinaal spuitwerk voor wanden en plafonds. Een gelijkmatige korrelstructuur, snel aangebracht over grote oppervlakken — efficiënt voor projecten met meerdere ruimtes of units.',
    tags: ['Machinaal', 'Plafonds', 'Grote oppervlakken', 'Snelheid'],
  },
  {
    id: 'sierpleister',
    num: '04',
    title: 'Sierpleister & spachtelputz',
    short: 'Decoratieve korrelstructuur, binnen en buiten toepasbaar.',
    body:
      'Spachtelputz en sierpleisters geven wand of gevel een levendige, robuuste korrelstructuur. Slijtvast, kleurvast en in talloze structuren — een afwerking die net even meer karakter geeft.',
    tags: ['Spachtelputz', 'Structuur', 'Binnen & buiten', 'Kleurvast'],
  },
  {
    id: 'exclusief',
    num: '05',
    title: 'Exclusieve afwerking',
    short: 'Betonlook, kalk- en designstuc voor een verfijnd eindbeeld.',
    body:
      'Voor opdrachtgevers die zich willen onderscheiden: betonlook, kalkstuc en gladde designafwerkingen. Naadloos, tactiel en zonder spack — een wand die zelf het statement maakt.',
    tags: ['Betonlook', 'Kalkstuc', 'Naadloos', 'Design'],
  },
  {
    id: 'schadeherstel',
    num: '06',
    title: 'Schadeherstel',
    short: 'Vakkundig herstel na water-, brand- en lekkageschade.',
    body:
      'Herstel van stucwerk na waterschade, brand of lekkage. Beschadigde delen weg, ondergrond gezond gemaakt en strak opnieuw opgebouwd — met heldere rapportage richting verzekeraar.',
    tags: ['Waterschade', 'Brandschade', 'Rapportage', 'Snel'],
  },
];

// Werkwijze
export const process = [
  {
    num: '01',
    title: 'Kennismaking & opname',
    body: 'We bekijken het project op locatie of aan de hand van tekeningen. Omvang, planning en gewenste afwerking helder op tafel.',
  },
  {
    num: '02',
    title: 'Heldere offerte',
    body: 'Een transparante offerte met duidelijke posten en fasering. Geen verrassingen — u weet precies waar u aan toe bent.',
  },
  {
    num: '03',
    title: 'Strakke uitvoering',
    body: 'Vakkundig werk volgens planning, schoon en georganiseerd op de bouwplaats. Korte lijnen, één aanspreekpunt.',
  },
  {
    num: '04',
    title: 'Oplevering & garantie',
    body: 'Samen nalopen, netjes opgeleverd. Met 3–5 jaar garantie op het geleverde werk — kwaliteit die blijft staan.',
  },
];

// Projecten — voorbeelden tot echte cases/foto's geleverd zijn
export const projects = [
  {
    id: 'p1',
    title: 'Nieuwbouw appartementen',
    client: 'Aannemer',
    location: 'Regio Rotterdam',
    scope: 'Binnenstucwerk · meerdere units',
    image: '/images/project-01.jpg',
    description:
      'Sausklaar stucwerk over wanden en plafonds van een appartementencomplex, gefaseerd opgeleverd op de planning van de hoofdaannemer.',
  },
  {
    id: 'p2',
    title: 'Gevelrenovatie woonblok',
    client: 'Woningeigenaar / VvE',
    location: 'Gouda',
    scope: 'Buitengevel · sierpleister',
    image: '/images/project-02.jpg',
    description:
      'Volledige gevelafwerking met weerbestendige sierpleister, inclusief herstel van de ondergrond voor een onderhoudsarm eindresultaat.',
  },
  {
    id: 'p3',
    title: 'Herstel na waterschade',
    client: 'Verzekeraar',
    location: 'Regio Den Haag',
    scope: 'Schadeherstel · rapportage',
    image: '/images/project-03.jpg',
    description:
      'Herstel van plafond- en wandstucwerk na een lekkage, met fotorapportage richting de verzekeraar en snelle doorlooptijd voor de bewoner.',
  },
  {
    id: 'p4',
    title: 'Betonlook in nieuwbouwvilla',
    client: 'Particulier opdrachtgever',
    location: 'Regio Utrecht',
    scope: 'Exclusief · betonlook',
    image: '/images/project-04.jpg',
    description:
      'Naadloze betonlook-afwerking in woonkamer en hal, voor een strak en tactiel eindbeeld zonder zichtbare overgangen.',
  },
  {
    id: 'p5',
    title: 'Transformatie kantoor naar wonen',
    client: 'Projectontwikkelaar',
    location: 'Randstad',
    scope: 'Spuitwerk · grote oppervlakken',
    image: '/images/project-05.jpg',
    description:
      'Machinaal spuitwerk over alle plafonds en wanden van een getransformeerd kantoorpand naar woonunits, efficiënt over grote oppervlakken.',
  },
  {
    id: 'p6',
    title: 'Buitengevelisolatie',
    client: 'Aannemer',
    location: 'Regio Gouda',
    scope: 'Gevel · isolatie-afwerking',
    image: '/images/project-06.jpg',
    description:
      'Hoogwaardige afwerking op een buitengevelisolatiesysteem, voor een gevel die isoleert én er strak en duurzaam uitziet.',
  },
];

export const usps = [
  'Eén vast aanspreekpunt per project',
  'Planning-betrouwbaar, opgeleverd op datum',
  'Schaalbaar voor grote volumes',
  'Heldere offertes, geen verrassingen',
  '3–5 jaar garantie op het werk',
  'Schoon en georganiseerd op de bouwplaats',
];

export const nav = [
  { label: 'Diensten', to: '/diensten' },
  { label: 'Projecten', to: '/projecten' },
  { label: 'Voor aannemers', to: '/aannemers' },
  { label: 'Schadeherstel', to: '/schadeherstel' },
  { label: 'Over ons', to: '/over-ons' },
];
