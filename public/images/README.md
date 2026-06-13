# Foto's plaatsen

Plaats hier de aangeleverde foto's. Zolang een bestand ontbreekt, toont de site
automatisch een nette placeholder — niets crasht.

## Verwachte bestandsnamen

| Bestand            | Waar het verschijnt                     | Aanbevolen verhouding | Min. breedte |
|--------------------|-----------------------------------------|-----------------------|--------------|
| `hero.jpg`         | Homepage — groot sfeerbeeld rechts      | staand 3 : 4          | 1200 px      |
| `aannemers.jpg`    | Pagina "Voor aannemers"                 | liggend 4 : 3         | 1400 px      |
| `schade.jpg`       | Pagina "Schadeherstel"                  | liggend 4 : 3         | 1400 px      |
| `over.jpg`         | Pagina "Over ons" (portret/aan het werk)| staand 4 : 5          | 1000 px      |
| `project-01.jpg` … `project-06.jpg` | Projecten + uitgelicht op home | liggend 4 : 3 | 1200 px |

## Tips
- Liefst **JPG** of **WebP**, geoptimaliseerd (< ~400 KB per beeld).
- Landscape-foto's op ~1600 px breed zien er op grote schermen scherp uit.
- Koppeling van extra/andere foto's loopt via `src/data/site.js` (veld `image`).
