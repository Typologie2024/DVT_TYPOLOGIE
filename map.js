require([
  "esri/config", 
  "esri/Map", 
  "esri/views/MapView", 
  "esri/layers/FeatureLayer",
  "esri/PopupTemplate",
  "esri/widgets/Search",
  "esri/widgets/Legend",
  "esri/widgets/Expand",
  "esri/widgets/LayerList"
], function(esriConfig, Map, MapView, FeatureLayer,PopupTemplate, Search, Legend, Expand,LayerList ) {
  
  esriConfig.apiK="AAPT3NKHt6i2urmWtqOuugvr9VoYLZPbrnfn1fzdlnSt7HJaCs7HeZh9d0OsJpUrbxOPK-lgO2rZhiwxRLjRHp18CteCAJi3qYknVVeFSWGlrLJ7QckCKBYIuUYmjpyEnKMfjNDLOXhO8Jhj-TH-6mhd1ZtbyTJ4oHnX_XPOlk2OSC8IxMou_K3kUf37TtCBT2z9UYNiLs6O0C23ubcDmvnF9YBk2sAd1YTk4G9l2YOI-VeGoAmTGazDZ6jzmrDC8yOS"; 
  


    // Créer la carte avec un fond de carte satellite
    const map = new Map({
      basemap: "satellite"
    });
  
    // Créer la vue de la carte
    const view = new MapView({
      map: map,
      center: [-8.7772, 29.8746], 
      zoom: 5,
      container: "viewDiv"
    });
    const barragepachalikPopup = new PopupTemplate({
        title:"Barrages par Caidats",
        content:`
        <ul>
        <li>Nom: {nom_barrag}</li>
        <li>Coordonnées: {Longitude},{Latitude}</li>
        <li>Pachalik: {NOM_PACHAL}</li>
        <li>Parent: {PARENT_PAC}</li> 
        </ul>`
      });
      var barragepachalikRenderer = {
        type: "simple", // Utilise un simple renderer pour tous les objets
        symbol: {
          type: "simple-marker",  // Utilise un symbole de marqueur simple pour représenter les points
          color: [0, 0, 255],     // Bleu pour les points
          size: 8,                // Taille des points
          outline: {
            color: [255, 255, 255],  // Bordure blanche autour des points
            width: 1             // Épaisseur de la bordure
          }
        }
      };
      const barragescaidatPopup = new PopupTemplate({
        title:"Barrages par Pachaliks",
        content:`
        <ul>
        <li>Nom: {nom_barrag}</li>
        <li>Coordonnées: {Longitude},{Latitude}</li>
        <li>Caidat: {NOM_CAIDAT}</li>
        <li>Parent: {PARENT_CAI}</li>
        <li>Province: {PROVINCE_C}</li>
        </ul>`
      });
      var barragecaidatRenderer = {
        type: "simple", // Utilise un simple renderer pour tous les objets
        symbol: {
          type: "simple-marker",  // Utilise un symbole de marqueur simple pour représenter les points
          color: [0, 0, 255],     // Bleu pour les points
          size: 8,                // Taille des points
          outline: {
            color: [255, 255, 255],  // Bordure blanche autour des points
            width: 1             // Épaisseur de la bordure
          }
        }
      };
      const douarscaidatPopup = new PopupTemplate({
        title:"Douars Par Caidats",
        content:`
        <ul>
        <li>Nom:{NOM}</li>
        <li>Coordonnées: {Latitude},{Longitude}</li>
        <li>Caidats: {Nom_Caidat}</li> 
        <li>Cercle: {Nom_Cercle}</li>
        <li>Province: {Nom_Provin}</li>
       </ul>`
       });
      const provincialPopup = new PopupTemplate({
        title:"Routes Provinciales",
        content:`
        <ul>
        <li>Nom : {Nom}</li>
        <li>Longueur : {Longueur}Km</li>  
       </ul> `
      });
      var provincialRenderer = {
        type: "simple", // Utilise un simple renderer pour tous les objets
        symbol: {
          type: "simple-line",  // Utilisation d'une ligne simple pour représenter les autoroutes
          color: [255,255, 0,],   // Bleu pour les lignes d'autoroute
          width: 1,             // Épaisseur des lignes
          style: "solid"        // Style de ligne plein (solid, dash, dot, etc.)
        }
      };
      const regionalPopup = new PopupTemplate({
        title:"Routes Régionales",
        content:`
        <ul>
        <li>Nom : {Nom}</li>
        <li>Longueur : {Longueur}Km</li>  
       </ul>`
      });
      var regionalRenderer = {
        type: "simple", // Utilise un simple renderer pour tous les objets
        symbol: {
          type: "simple-line",  // Utilisation d'une ligne simple pour représenter les autoroutes
          color: [0,255, 0,],   // Bleu pour les lignes d'autoroute
          width: 1,             // Épaisseur des lignes
          style: "solid"        // Style de ligne plein (solid, dash, dot, etc.)
        }
      };
      const natianalePopup = new PopupTemplate({
        title:"Routes Nationales",
        content:`
        <ul>
        <li>Nom : {Nom}</li>
        <li>Longueur : {Longueur}Km</li>  
       </ul> `
      });
      var natianaleRenderer = {
        type: "simple", // Utilise un simple renderer pour tous les objets
        symbol: {
          type: "simple-line",  // Utilisation d'une ligne simple pour représenter les autoroutes
          color: [255, 0, 0],   // Bleu pour les lignes d'autoroute
          width: 1.5,             // Épaisseur des lignes
          style: "solid"        // Style de ligne plein (solid, dash, dot, etc.)
        }
      };
      const autoroutePopup = new PopupTemplate({
        title: "Autoroutes",
        content:`
        <ul>
        <li>Nom : {Nom}</li>
        <li>Longueur : {Longueur}Km</li> 
       </ul> `
      });
      var autorouteRenderer = {
        type: "simple", // Utilise un simple renderer pour tous les objets
        symbol: {
          type: "simple-line",  // Utilisation d'une ligne simple pour représenter les autoroutes
          color: [0, 0, 255],   // Bleu pour les lignes d'autoroute
          width: 1.5,             // Épaisseur des lignes
          style: "solid"        // Style de ligne plein (solid, dash, dot, etc.)
        }
      };
      const caidatsPopup = new PopupTemplate({
        title:"CAIDATS",
        content:`
        <ul>
        <li>Nom:{NOM_CAIDAT}</li>
        <li>Parent: Cercle {PARENT_CAI}</li>
        <li>Province:{PROVINCE_C}</li>
        <li>Nombre Communes:{Nb_Commun}</li>
        <li>Population:{Pop_Caidat}</li>
        <li>Superficie:{Sup_Caidat}Km²</li>
       </ul> `
    
              });
              const cerclesPopup = new PopupTemplate({
                title:"CERCLES",
                content:`
                <ul>
                <li>Nom:{NOM_CERCLE}</li>
                <li>Nombre Caidat: {Nb_Caidats}</li>
                <li>Nombre Communes: {Nb_Commu}</li>
                <li>Population: {Population}</li>
                <li>Superficie: {Sup}Km²</li>
            
                </ul>`
              });
              const pachalikPopup = new PopupTemplate({
                title: "PACHALIKS",
                content: function (feature) {
                    let contentHtml = "<ul>";
            
                    // Ajout des champs toujours affichés
                    contentHtml += `<li>Nom: ${feature.graphic.attributes.NOM_PACHAL}, ${feature.graphic.attributes.Nom_Pach}</li>`;
                    contentHtml += `<li>Type: ${feature.graphic.attributes.TYPE_PACHA}</li>`;
                    contentHtml += `<li>Parent: ${feature.graphic.attributes.PARENT_PAC}</li>`;
                    contentHtml += `<li>Population: ${feature.graphic.attributes.Population}</li>`;
                    contentHtml += `<li>Superficie: ${Math.round(feature.graphic.attributes.	sup * 100) / 100} Km²</li>`;
                    contentHtml += `<li>Densité: ${Math.round(feature.graphic.attributes.densité * 100) / 100} h/Km²</li>`;
            
                    // Condition pour n'afficher les districts que s'ils sont supérieurs à 0
                    if (feature.graphic.attributes.Nb_Distric > 0) {
                        contentHtml += `<li>Districts: ${feature.graphic.attributes.Nb_Distric}</li>`;
                    }
            
                    // Condition pour n'afficher les annexes que si elles sont supérieures à 0
                    if (feature.graphic.attributes.Nb_ANNEXE > 0) {
                        contentHtml += `<li>Annexes: ${feature.graphic.attributes.Nb_ANNEXE}</li>`;
                    }
            
                    contentHtml += "</ul>";
                    return contentHtml;
                }
            });
  
            const provincesPopup = new PopupTemplate({
              title: "PROVINCES/PREFECTURES",
              content: function (feature) {
                  let contentHtml = "<ul>";
          
                  contentHtml += `<li>Nom: ${feature.graphic.attributes.NOM_PROV_P}</li>`;
                  contentHtml += `<li>Type: ${feature.graphic.attributes.TYPE_PROV_}</li>`;
                  contentHtml += `<li>Parent: ${feature.graphic.attributes.PARENT__PR}</li>`;
          
                  if (feature.graphic.attributes.Nb_Distric > 0) {
                      contentHtml += `<li>Districts: ${feature.graphic.attributes.Nb_Distric}</li>`;
                  }
          
                  contentHtml += `<li>Pachaliks: ${feature.graphic.attributes.Nb_Pacha}</li>`;
                  contentHtml += `<li>Cercles: ${feature.graphic.attributes.Nb_Cercles}</li>`;
                  contentHtml += `<li>Caidats: ${feature.graphic.attributes.Nb_Caidats}</li>`;
                  contentHtml += `<li>Communes: ${feature.graphic.attributes.Nb_Commu}</li>`;
                  contentHtml += `<li>Population: ${feature.graphic.attributes.Population}</li>`;
          
                  let superficie = feature.graphic.attributes.Superficie;
                  if (superficie !== undefined && !isNaN(superficie)) {
                      contentHtml += `<li>Superficie: ${Math.round(superficie /100)} Km²</li>`;
                  } else {
                      contentHtml += `<li>Superficie: Non disponible</li>`;
                  }
          
                  contentHtml += "</ul>";
                  return contentHtml;
              }
          });
          const regionsPopup = new PopupTemplate({
            title: "REGIONS",
            content: function (feature) {
                let contentHtml = "<ul>";
        
                // Ajout des champs toujours affichés
                contentHtml += `<li>Nom: ${feature.graphic.attributes.Nom_Régio}</li>`;
                contentHtml += `<li>Chef Lieu: ${feature.graphic.attributes.Chef_Lieu}</li>`;
                contentHtml += `<li>Nombre Provinces: ${feature.graphic.attributes.Nb_Provin}</li>`;
        
                // Condition pour n'afficher Nb_Préfec que s'il est supérieur à 0
                if (feature.graphic.attributes.Nb_Préfec > 0) {
                    contentHtml += `<li>Nombre Préfectures: ${feature.graphic.attributes.Nb_Préfec}</li>`;
                }
        
                // Condition pour n'afficher Préf_Arro que s'il est supérieur à 0
                if (feature.graphic.attributes.Préf_Arro > 0) {
                    contentHtml += `<li>Nombre Préfectures d'Arrondissements: ${feature.graphic.attributes.Préf_Arro}</li>`;
                }
        
                // Affichage des autres champs toujours présents
                contentHtml += `<li>Population: ${feature.graphic.attributes.Population}</li>`;
                let Superficie = feature.graphic.attributes.Superficie;
                  if (Superficie !== undefined && !isNaN(Superficie)) {
                      contentHtml += `<li>Superficie: ${Math.round(Superficie)} Km²</li>`;
                  } else {
                      contentHtml += `<li>Superficie: Non disponible</li>`;
                  }
          
                
                contentHtml += "</ul>";
                return contentHtml;
            }
        });
        
   
      const barragespachaliklayer = new FeatureLayer({
        url:"https://services7.arcgis.com/BgnCyRFEAZmAeDib/arcgis/rest/services/Barrages/FeatureServer/72",
        title:"Barrages par Pachaliks",
        popupTemplate:barragepachalikPopup,
        renderer:barragepachalikRenderer
         });
      const barragecaidatlayer = new FeatureLayer({
        url:"https://services7.arcgis.com/BgnCyRFEAZmAeDib/arcgis/rest/services/Barrages/FeatureServer/71",
        title:"Barrages par Caidats",
        popupTemplate:barragescaidatPopup,
        renderer:barragecaidatRenderer
         });
      
      const  douarslayer = new FeatureLayer({
        url:"https://services7.arcgis.com/BgnCyRFEAZmAeDib/arcgis/rest/services/DOUARS_DU_MAROC/FeatureServer/7",
        title:"Douars",
        popupTemplate:douarscaidatPopup
         });
        const provincialayer = new FeatureLayer({
          url:"https://services7.arcgis.com/BgnCyRFEAZmAeDib/arcgis/rest/services/Infrastructures_Routières/FeatureServer/45",
          title:"Routes Provinciales",
          popupTemplate:provincialPopup,
          renderer: provincialRenderer
        });
        const rregionallayer = new FeatureLayer({
          url:"https://services7.arcgis.com/BgnCyRFEAZmAeDib/arcgis/rest/services/Infrastructures_Routières/FeatureServer/69",
          title:"Routes Régionales",
          popupTemplate:regionalPopup,
          renderer:regionalRenderer
        });
        const rnationallayer = new FeatureLayer({
          url:"https://services7.arcgis.com/BgnCyRFEAZmAeDib/arcgis/rest/services/Infrastructures_Routières/FeatureServer/60",
          title:"Routes Nationales",
          popupTemplate:natianalePopup,
          renderer: natianaleRenderer
        });
      
        const autoroutelayer = new FeatureLayer({
          url: "https://services7.arcgis.com/BgnCyRFEAZmAeDib/arcgis/rest/services/Infrastructures_Routières/FeatureServer/51",
          title:"Autoroutes",
          popupTemplate:autoroutePopup,
          renderer: autorouteRenderer
        });
        const caidatslayer = new FeatureLayer({
          url:"https://services7.arcgis.com/BgnCyRFEAZmAeDib/arcgis/rest/services/Découpage_administratif/FeatureServer/1",
          title:"Caidats",
          id:"caidatslayerId",
          popupTemplate:caidatsPopup
        });
        const cercleslayer = new FeatureLayer({
          url:"https://services7.arcgis.com/BgnCyRFEAZmAeDib/arcgis/rest/services/Découpage_administratif/FeatureServer/81",
          title:"Cercles",
          id:"cercleslayerId",
          popupTemplate:cerclesPopup
        });
        const pachalikslayer = new FeatureLayer({
          url:"https://services7.arcgis.com/BgnCyRFEAZmAeDib/arcgis/rest/services/Découpage_administratif/FeatureServer/80",
          title:"Pachaliks",
          id:"pachalikslayerId",
          popupTemplate:pachalikPopup
        });
        const provincelayer = new FeatureLayer({
          url: "https://services7.arcgis.com/BgnCyRFEAZmAeDib/arcgis/rest/services/Découpage_administratif/FeatureServer/11",
          title: "Provinces",
          id:"provincelayerId",
          popupTemplate:provincesPopup
        });
      
        const regionslayer = new FeatureLayer({
          url: "https://services7.arcgis.com/BgnCyRFEAZmAeDib/arcgis/rest/services/Découpage_administratif/FeatureServer/3",
          title: "Régions",
          id:"regionslayerId",
          popupTemplate:regionsPopup
        });
        map.add(barragespachaliklayer);
        map.add(barragecaidatlayer);
        map.add(douarslayer);
        map.add(provincialayer);
        map.add(rregionallayer);
        map.add(rnationallayer);
        map.add(autoroutelayer);
        map.add(caidatslayer);
        map.add(cercleslayer);
        map.add(pachalikslayer);
        map.add(provincelayer);
        map.add(regionslayer);

       

        var searchWidget = new Search({
          view: view,  // Attacher le widget de recherche à la vue
          allPlaceholder: "Rechercher des lieux ou des entités", // Placeholder pour le champ de recherche
          includeDefaultSources: false, // Désactiver les sources par défaut, y compris ArcGIS World Geocoding Service
          sources: [] // Tu peux ajouter ici des sources spécifiques si tu as des données dans les FeatureLayers
        });
      
        // Ajouter le widget de recherche à l'interface utilisateur en haut à droite
        view.ui.add(searchWidget, {
          position: "top-right"
        });
      
           searchWidget.sources.push({
            layer: barragespachaliklayer,              // FeatureLayer des Douars
            searchFields: ["nom_barrag"],           // Champ utilisé pour la recherche dans les Douars
            displayField: "nom_barrag",             // Champ affiché dans les résultats pour les Douars
            exactMatch: false,               
            outFields: ["*"],                // Tous les champs retournés dans les résultats
            name: "Barrages par Pachalik",                  // Nom affiché dans les résultats de recherche
            placeholder: "Rechercher Barrage ",  // Texte d'aide dans la barre de recherche
            maxResults: 6,                   // Limite des résultats affichés
            maxSuggestions: 6,               // Limite des suggestions automatiques
            suggestionsEnabled: true,        // Suggestions automatiques activées
            minSuggestCharacters: 1          // Nombre minimum de caractères avant les suggestions
          });

    
             // Ajouter une source pour le FeatureLayer des Douars
          searchWidget.sources.push({
            layer: barragecaidatlayer,              // FeatureLayer des Douars
            searchFields: ["nom_barrag"],           // Champ utilisé pour la recherche dans les Douars
            displayField: "nom_barrag",             // Champ affiché dans les résultats pour les Douars
            exactMatch: false,               
            outFields: ["*"],                // Tous les champs retournés dans les résultats
            name: "Barrages par Caidat",                  // Nom affiché dans les résultats de recherche
            placeholder: "Rechercher Barrage ",  // Texte d'aide dans la barre de recherche
            maxResults: 6,                   // Limite des résultats affichés
            maxSuggestions: 6,               // Limite des suggestions automatiques
            suggestionsEnabled: true,        // Suggestions automatiques activées
            minSuggestCharacters: 1          // Nombre minimum de caractères avant les suggestions
           }); 

          searchWidget.sources.push({
            layer: douarslayer,              // FeatureLayer des Douars
            searchFields: ["NOM"],           // Champ utilisé pour la recherche dans les Douars
            displayField: "NOM",             // Champ affiché dans les résultats pour les Douars
            exactMatch: false,               
            outFields: ["*"],                // Tous les champs retournés dans les résultats
            name: "Douars",                  // Nom affiché dans les résultats de recherche
            placeholder: "Rechercher un Douar",  // Texte d'aide dans la barre de recherche
            maxResults: 6,                   // Limite des résultats affichés
            maxSuggestions: 6,               // Limite des suggestions automatiques
            suggestionsEnabled: true,        // Suggestions automatiques activées
            minSuggestCharacters: 1          // Nombre minimum de caractères avant les suggestions
          });

          searchWidget.sources.push({
            layer: provincialayer,              // FeatureLayer des Douars
            searchFields: ["Nom"],           // Champ utilisé pour la recherche dans les Douars
            displayField: "Nom",             // Champ affiché dans les résultats pour les Douars
            exactMatch: false,               
            outFields: ["*"],                // Tous les champs retournés dans les résultats
            name: "Routes Provinciales",                  // Nom affiché dans les résultats de recherche
            placeholder: "Rechercher Routes Provinciales ",  // Texte d'aide dans la barre de recherche
            maxResults: 6,                   // Limite des résultats affichés
            maxSuggestions: 6,               // Limite des suggestions automatiques
            suggestionsEnabled: true,        // Suggestions automatiques activées
            minSuggestCharacters: 1          // Nombre minimum de caractères avant les suggestions
          });
               // Ajouter une source pour le FeatureLayer des Douars
          searchWidget.sources.push({
            layer: rregionallayer,              // FeatureLayer des Douars
            searchFields: ["Nom"],           // Champ utilisé pour la recherche dans les Douars
            displayField: "Nom",             // Champ affiché dans les résultats pour les Douars
            exactMatch: false,               
            outFields: ["*"],                // Tous les champs retournés dans les résultats
            name: "Routes Régionales",                  // Nom affiché dans les résultats de recherche
            placeholder: "Rechercher Routes Régionales ",  // Texte d'aide dans la barre de recherche
            maxResults: 6,                   // Limite des résultats affichés
            maxSuggestions: 6,               // Limite des suggestions automatiques
            suggestionsEnabled: true,        // Suggestions automatiques activées
            minSuggestCharacters: 1          // Nombre minimum de caractères avant les suggestions
          });
               // Ajouter une source pour le FeatureLayer des Douars
          searchWidget.sources.push({
            layer: rnationallayer,              // FeatureLayer des Douars
            searchFields: ["Nom"],           // Champ utilisé pour la recherche dans les Douars
            displayField: "Nom",             // Champ affiché dans les résultats pour les Douars
            exactMatch: false,               
            outFields: ["*"],                // Tous les champs retournés dans les résultats
            name: "Routes Nationales",                  // Nom affiché dans les résultats de recherche
            placeholder: "Rechercher Routes Nationales",  // Texte d'aide dans la barre de recherche
            maxResults: 6,                   // Limite des résultats affichés
            maxSuggestions: 6,               // Limite des suggestions automatiques
            suggestionsEnabled: true,        // Suggestions automatiques activées
            minSuggestCharacters: 1          // Nombre minimum de caractères avant les suggestions
          });
             // Ajouter une source pour le FeatureLayer des Douars
          searchWidget.sources.push({
            layer: autoroutelayer,              // FeatureLayer des Douars
            searchFields: ["Nom"],           // Champ utilisé pour la recherche dans les Douars
            displayField: "Nom",             // Champ affiché dans les résultats pour les Douars
            exactMatch: false,               
            outFields: ["*"],                // Tous les champs retournés dans les résultats
            name: "Autoroutes",                  // Nom affiché dans les résultats de recherche
            placeholder: "Rechercher Autoroute",  // Texte d'aide dans la barre de recherche
            maxResults: 6,                   // Limite des résultats affichés
            maxSuggestions: 6,               // Limite des suggestions automatiques
            suggestionsEnabled: true,        // Suggestions automatiques activées
            minSuggestCharacters: 1          // Nombre minimum de caractères avant les suggestions
          });
          
          searchWidget.sources.push({
            layer: caidatslayer,             // FeatureLayer des Caidats
            searchFields: ["NOM_CAIDAT"],    // Champ utilisé pour la recherche dans les Caidats
            displayField: "NOM_CAIDAT",      // Champ affiché dans les résultats pour les Caidats
            exactMatch: false,
            outFields: ["*"],
            name: "Caidats",
            placeholder: "Rechercher un Caidat",
            maxResults: 6,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 1
          });

        searchWidget.sources.push({
            layer: cercleslayer,             // FeatureLayer des Cercles
            searchFields: ["NOM_CERCLE"],    // Champ utilisé pour la recherche dans les Cercles
            displayField: "NOM_CERCLE",      // Champ affiché dans les résultats pour les Cercles
            exactMatch: false,
            outFields: ["*"],
            name: "Cercles",
            placeholder: "Rechercher un Cercle",
            maxResults: 6,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 1
          });

        searchWidget.sources.push({
            layer: pachalikslayer,            // FeatureLayer des Provinces
            searchFields: ["NOM_PACHAL"],    // Champ utilisé pour la recherche dans les Provinces
            displayField: "NOM_PACHAL",      // Champ affiché dans les résultats pour les Provinces
            exactMatch: false,
            outFields: ["*"],
            name: "Pachaliks",
            placeholder: "Rechercher un Pachalik",
            maxResults: 6,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 1
          });

        searchWidget.sources.push({
            layer: provincelayer,            // FeatureLayer des Provinces
            searchFields: ["NOM_PROV_P"],    // Champ utilisé pour la recherche dans les Provinces
            displayField: "NOM_PROV_P",      // Champ affiché dans les résultats pour les Provinces
            exactMatch: false,
            outFields: ["*"],
            name: "Provinces",
            placeholder: "Rechercher une Province",
            maxResults: 6,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 1
          });

          searchWidget.sources.push({
            layer: regionslayer,             // FeatureLayer des Régions
            searchFields: ["Nom_Régio"],     // Champ utilisé pour la recherche dans les Régions
            displayField: "Nom_Régio",       // Champ affiché dans les résultats pour les Régions
            exactMatch: false,
            outFields: ["*"],
            name: "Régions",
            placeholder: "Rechercher une Région",
            maxResults: 6,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 1
          });

          var legend = new Legend({
            view: view,
            layerInfos: [
               
              {
                layer: barragespachaliklayer,
                title: "Barrage par Pachaliks"
              },
              {
                layer: barragecaidatlayer,
                title:"Barrage par Caidats"
              },
              {   
                layer: douarslayer,
                title:"Douars"
              },
              {
                layer: provincialayer,
                title: "Routes Provinciales"
              },
              {
                layer: rregionallayer,
              title: "Routes Régionales"
              },
              {
                layer: rnationallayer,
                title: "Route Nationales"
              },
              {
                layer: autoroutelayer,
                title:"Autoroutes"
              },
              
              {
                layer: caidatslayer,
                title:"Caidats"
              },
              {
                layer: cercleslayer,
                title:"Cercles"
              },
              {
                 layer: pachalikslayer,
                 title:"Pachaliks"
        
              },
              {
                layer: provincelayer,
                title: "Province"
              },
              {
                layer: regionslayer,
                title: "Régions"
              }
              
            ]
            });
        
            var expandLegend = new Expand({
             view: view,
             content: legend,
             expanded: true,
             containerStyle: {
              width: "250px",  // Ajuster la largeur
              height: "300px"  // Ajuster la hauteur
             }
            });
        
            view.ui.add(expandLegend, "bottom-left");

            const layerList = new LayerList({
              view: view,
              container: "layerListDiv"  // Ajouter dans le div créé plus tôt
            });
            // --- Basculement de la LayerList ---
            const toggleBtn = document.getElementById("toggleLayerListBtn");
            const layerListDiv = document.getElementById("layerListDiv");
    
            toggleBtn.addEventListener("click", function() {
              if (layerListDiv.style.display === "none") {
                layerListDiv.style.display = "block";  // Afficher la LayerList
                toggleBtn.innerHTML = "▲";  // Modifier le symbole du bouton
              } else {
                layerListDiv.style.display = "none";  // Masquer la LayerList
                toggleBtn.innerHTML = "▼";  // Modifier le symbole du bouton
              }
               });
              
              const caidatSqlQuery = [
                "--Choisir la requête SQL--",
                "Pop_Caidat > 30000",
                "Nb_Commun = 1",
                "Nb_Commun = 2",
                "Nb_Commun = 3",
                "Nb_Commun = 4",
                "Nb_Commun = 5",
                "Nb_Commun = 6",
                "Sup_Caidat > 500"
              ];
            
              let whereClause = caidatSqlQuery[0];
              const select = document.createElement("select");
            
              caidatSqlQuery.forEach(function (query) {
                let option = document.createElement("option");
                option.innerHTML = query;
                option.value = query;
                select.appendChild(option);
              });
            
              view.ui.add(select, "top-right");
            
              // Fonction pour exécuter la requête sur le FeatureLayer
              function queryFeatureLayer(extent) {
                // Effacer les graphiques existants avant d'exécuter une nouvelle requête
                view.graphics.removeAll();
            
                const parcelQuery = {
                  where: whereClause, // Clause WHERE
                  geometry: extent, // Géométrie pour la requête spatiale
                  outFields: ["NOM_CAIDAT", "PROVINCE_C", "Pop_Caidat", "Nb_Commun", "Sup_Caidat"], // Champs à retourner
                  returnGeometry: true // Retourner la géométrie des entités
                };
            
                caidatslayer.queryFeatures(parcelQuery).then((results) => {
                  console.log("Feature count: " + results.features.length);
                  
                  if (results.features.length > 0) {
                    displayResults(results); // Afficher les résultats s'il y en a
                    zoomToFeatures(results); // Zoomer sur les entités trouvées
                  }
                }).catch((error) => {
                  console.log(error.message); // Affichage de l'erreur
                });
              }
            
              // Gestion de l'événement de sélection pour mettre à jour la clause WHERE et relancer la requête
              select.addEventListener('change', (event) => {
                whereClause = event.target.value; // Mise à jour de la clause WHERE
                queryFeatureLayer(view.extent); // Exécuter la requête avec l'étendue actuelle
              });
            
              // Fonction pour afficher les résultats sur la carte avec les popups
              function displayResults(results) {
                const symbol = {
                  type: "simple-fill",
                  color: [0, 0, 255, 0.5], // Remplissage bleu semi-transparent
                  outline: {
                    color: [0, 0, 255, 1], // Contour bleu opaque
                    width: 2 // Épaisseur du contour
                  }
                };
            
                const popupTemplate = {
                  title : "Caidats : {NOM_CAIDAT}",
                  content: "Nom : {NOM_CAIDAT} <br> Province : {PROVINCE_C} <br> Population : {Pop_Caidat} <br> Nombre Communes : {Nb_Commun} <br> Superficie : {Sup_Caidat} Km²"
                };
            
                // Appliquer les symboles et popupTemplate à chaque entité retournée
                const featuresWithSymbol = results.features.map((feature) => {
                  feature.symbol = symbol;
                  feature.popupTemplate = popupTemplate;
                  return feature;
                });
            
                view.popup.close(); // Fermer les popups précédents
                view.graphics.removeAll(); // Supprimer les graphiques précédents
                view.graphics.addMany(featuresWithSymbol); // Ajouter les nouveaux graphiques
              }
            
              // Fonction pour zoomer sur les entités trouvées
              function zoomToFeatures(results) {
                const geometries = results.features.map(feature => feature.geometry);
                view.goTo(geometries); // Zoomer sur l'ensemble des géométries retournées
              }


            });
          



            
            