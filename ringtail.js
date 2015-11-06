
		var po = org.polymaps;

		var map = po.map()
			.container(document.getElementById("map").appendChild(po.svg("svg")))
			.center({lon: -122.4193, lat: 37.7756})
			.zoomRange([3,15])
			.add(po.interact());
			
		var tileSet = po.image()
			.url(po.url("http://{S}tile.cloudmade.com"
			+ "/1a1b06b230af4efdbb989ea99e9841af" // http://cloudmade.com/register
			+ "/998/256/{Z}/{X}/{Y}.png")
			.hosts(["a.", "b.", "c.", ""]));
			
		/*var points = po.kml()
			.url("sfCrimeData10k.kml")
			.tile(false);
			.on("load", load);*/
		
		var personal = po.kml()
			.url("sfCrimeData10k.kml")
			.tile(false)
			.on("load", function(e) {
				aBool = true;
				aButton = document.getElementById('aBut').style;
				aButton.background = "#1CB2BD";
				compressButton(aButton);
				for (var i = 0; i < e.features.length; i++) {
				var f = e.features[i], p = f.data.properties, c = f.element;
				var T = p.time.indexOf("T");
				var web = p.type.indexOf(":");
				var pType = p.type.substring(0,web-4);
				var pWeb = p.type.substring(web+3, p.type.length);
				var pDate = p.time.substring(0,T);
				var pTime = p.time.substring(T+1, p.time.length);
				c.appendChild(po.svg("title").appendChild(document.createTextNode("Description: " + p.description + 
																				  "\n\nClassified As: " + pType + 
																				  "\nCase Number: " + p.name + 
																				  "\n\nDate: " + pDate + 
																				  "\n\nTime: " + pTime + 
																				  "\n\nWeblink: " + pWeb)).parentNode);
					if (p.type.contains("Narcotics") || p.type.contains("Alcohol") || 
						p.type.contains("Disturbing the Peace") || p.type.contains("Vandalism") || 
						p.type.contains("Prostitution")){
							c.setAttribute("fill", "#1CB2BD");
							c.setAttribute("stroke", "#1CB2BD");
					} else {
						c.remove();
					}
				}
			});
			
		var theft = po.kml()
			.url("sfCrimeData10k.kml")
			.tile(false)
			.on("load", function(e) {
				tBool = false;
				tButton = document.getElementById('tBut').style;
				releaseButton(tButton);
				for (var i = 0; i < e.features.length; i++) {
				var f = e.features[i], p = f.data.properties, c = f.element;
				var T = p.time.indexOf("T");
				var web = p.type.indexOf(":");
				var pType = p.type.substring(0,web-4);
				var pWeb = p.type.substring(web+3, p.type.length);
				var pDate = p.time.substring(0,T);
				var pTime = p.time.substring(T+1, p.time.length);
				c.appendChild(po.svg("title").appendChild(document.createTextNode("Description: " + p.description + 
																				  "\n\nClassified As: " + pType + 
																				  "\nCase Number: " + p.name + 
																				  "\n\nDate: " + pDate + 
																				  "\n\nTime: " + pTime + 
																				  "\n\nWeblink: " + pWeb)).parentNode);
					if (p.type.contains("Theft")){
						c.setAttribute("fill", "#f1c40f"); //preferred: #EDB81D
						c.setAttribute("stroke", "#f1c40f");
						c.setAttribute("fill-opacity", .5);
					} else {
						c.remove();
					}
				}
			});
			
		var dangerousTheft = po.kml()
			.url("sfCrimeData10k.kml")
			.tile(false)
			.on("load", function(e) {
				dtBool = false;
				dtButton = document.getElementById('dtBut').style;
				releaseButton(dtButton);
				for (var i = 0; i < e.features.length; i++) {
				var f = e.features[i], p = f.data.properties, c = f.element;
				var T = p.time.indexOf("T");
				var web = p.type.indexOf(":");
				var pType = p.type.substring(0,web-4);
				var pWeb = p.type.substring(web+3, p.type.length);
				var pDate = p.time.substring(0,T);
				var pTime = p.time.substring(T+1, p.time.length);
				c.appendChild(po.svg("title").appendChild(document.createTextNode("Description: " + p.description + 
																				  "\n\nClassified As: " + pType + 
																				  "\nCase Number: " + p.name + 
																				  "\n\nDate: " + pDate + 
																				  "\n\nTime: " + pTime + 
																				  "\n\nWeblink: " + pWeb)).parentNode);
					if (p.type.contains("Robbery") || p.type.contains("Burglary")){
						c.setAttribute("fill", "#ED694F");
						c.setAttribute("stroke", "#ED694F");
					} else {
						c.remove();
					}
				}
			});
		
		var peopleHarm = po.kml()
			.url("sfCrimeData10k.kml")
			.tile(false)
			.on("load", function(e) {
				phBool = false;
				phButton = document.getElementById('phBut').style;
				releaseButton(phButton);
				for (var i = 0; i < e.features.length; i++) {
				var f = e.features[i], p = f.data.properties, c = f.element;
				var T = p.time.indexOf("T");
				var web = p.type.indexOf(":");
				var pType = p.type.substring(0,web-4);
				var pWeb = p.type.substring(web+3, p.type.length);
				var pDate = p.time.substring(0,T);
				var pTime = p.time.substring(T+1, p.time.length);
				c.appendChild(po.svg("title").appendChild(document.createTextNode("Description: " + p.description + 
																				  "\n\nClassified As: " + pType + 
																				  "\nCase Number: " + p.name + 
																				  "\n\nDate: " + pDate + 
																				  "\n\nTime: " + pTime + 
																				  "\n\nWeblink: " + pWeb)).parentNode);
					if (p.type.contains("Murder") || p.type.contains("Assault") || p.type.contains("Arson")){
						c.setAttribute("fill", "#c51b8a");
						c.setAttribute("stroke", "#c51b8a");
					} else {
						c.remove();
					}
				}
			});

		var kMeans = po.kml()
			.url("sfCrimeData10k.kml")
			.tile(false)
			.on("load", kMeansGenerator);
				
		map.add(tileSet);
		map.add(personal);
		
		map.add(theft);
		map.remove(theft);
		map.add(dangerousTheft);
		map.remove(dangerousTheft);
		map.add(peopleHarm);
		map.remove(peopleHarm);
		map.add(kMeans);
		map.remove(kMeans);
		
		//map.add(points);
		
		map.add(po.compass()
			.pan("none"));
			
		function kMeansGenerator(e) {
			kmBool = false
			kmButton = document.getElementById('kmBut').style;
			releaseButton(kmButton);
			
			var cluster = e.tile.cluster || (e.tile.cluster = kmeans()
				.iterations(16)
				.size(64));
			
			for (var i = 0; i < e.features.length; i++) {
				cluster.add(e.features[i].data.geometry.coordinates);
			}

			var tile = e.tile, g = tile.element;
			while (g.lastChild) g.removeChild(g.lastChild);

			var means = cluster.means();
			means.sort(function(a, b) { return b.size - a.size; });
			for (var i = 0; i < means.length; i++) {
				var mean = means[i], point = g.appendChild(po.svg("circle"));
				point.setAttribute("cx", mean.x);
				point.setAttribute("cy", mean.y);
				point.setAttribute("r", Math.pow(2, tile.zoom - 11) * Math.sqrt(mean.size));
			}
		};
		
		function releaseButton(e){
			e.background = "#95a5a6";
			e.top = "0px";
			e.left = "0px";
			e.boxShadow = "9px 1px 0px #777";
		}
		
		function compressButton(e){
			e.top = "1px";
			e.left = "9px";
			e.boxShadow = "";
		}
	
		function aClick(e){
			if(aBool === true){
				map.remove(personal);
				aBool = false;
				releaseButton(aButton);
			} else {
				map.add(personal);
				aBool = true;
				aButton.background = "#1CB2BD";
				compressButton(aButton);
			}
		}
		
		function tClick(e){
			if(tBool === true){
				map.remove(theft);
				tBool = false;
				releaseButton(tButton);
			} else {
				map.add(theft);
				tBool = true;
				tButton.background = "#f1c40f";
				compressButton(tButton);
			}
		}
		
		function dtClick(e){
			if(dtBool === true){
				map.remove(dangerousTheft);
				dtBool = false;
				releaseButton(dtButton);
			} else {
				map.add(dangerousTheft);
				dtBool = true;
				dtButton.background = "#ED694F";
				compressButton(dtButton);
			}
		}
		
		function phClick(e){
			if(phBool === true){
				map.remove(peopleHarm);
				phBool = false;
				releaseButton(phButton);
			} else {
				map.add(peopleHarm);
				phBool = true;
				phButton.background = "#c51b8a";
				compressButton(phButton);
			}
		}
		
		function kmClick(e){
			if(kmBool === true){
				map.remove(kMeans);
				kmBool = false;
				releaseButton(kmButton);
			} else {
				map.add(kMeans);
				kmBool = true;
				kmButton.background = "#363A35";
				compressButton(kmButton);
			}
		}
