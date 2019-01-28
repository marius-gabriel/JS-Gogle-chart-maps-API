//Verifies if the target word is empty than generates a chart with the target word occurrences in each paragraph

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(generateChart);

function generateChart(){
	jQuery("#btnswitch").click( function(event) {
			event.preventDefault();
			drawChart();
	});
}

function drawChart() {
    var the_word = jQuery("#word_to_search").val();
	if (the_word.length == 0 || the_word.length > 9){
		alert("The length of the word shoul be greater than 0 or less than 10 characters");
	}else {
			var paragraph1 = jQuery("#first").text();
			var paragraph2 = jQuery("#second").text();
			var paragraph3 = jQuery("#third").text();
			var paragraph4 = jQuery("#fourth").text();
			var paragraph5 = jQuery("#fifth").text();
			var paragraph6 = jQuery("#location").text();
			var condition = paragraph1.indexOf(the_word) == -1 && paragraph2.indexOf(the_word) == -1 
						&& paragraph3.indexOf(the_word) == -1 && paragraph4.indexOf(the_word) == -1
						&& paragraph5.indexOf(the_word) == -1 && paragraph6.indexOf(the_word) == -1;
			if (condition){
				alert("Word not found in any paragrpah!");
			}
			else {
				var occ = new Array(
					(paragraph1.match(new RegExp(the_word, "g")) || []).length,
					(paragraph2.match(new RegExp(the_word, "g")) || []).length,
					(paragraph3.match(new RegExp(the_word, "g")) || []).length,
					(paragraph4.match(new RegExp(the_word, "g")) || []).length,
					(paragraph5.match(new RegExp(the_word, "g")) || []).length,
					(paragraph6.match(new RegExp(the_word, "g")) || []).length
				)
				var pie_data = google.visualization.arrayToDataTable([
					['Paragraph nr', 'Number of occurrences'],
					['Paragraph 1', occ[0]],
					['Paragraph 2', occ[1]],
					['Paragraph 3', occ[2]],
					['Paragraph 4', occ[3]],
					['Paragraph 5', occ[4]],
					['Paragraph 6', occ[5]]
				]);
				var bars_data = google.visualization.arrayToDataTable([
					["Paragraph nr", "Number of occurrences", { role: "style" } ],
					['Paragraph 1', occ[0], "red"],
					['Paragraph 2', occ[1], "blue"],
					['Paragraph 3', occ[2], "green"],
					['Paragraph 4', occ[3], "gold"],
					['Paragraph 5', occ[4], "silver"],
					['Paragraph 6', occ[5], "brown"]
				]);

				var pie_options = {
				  title: 'Number of occurrences of the target word in each paragraph',
				  pieHole: 0.5,
				};
				
				var bars_options = {
					title: 'Number of occurrences of the target word in each paragraph',
					width: 900,
					height: 500,
					bar: {groupWidth: "90%"},
					legend: { position: "none" },
				};
				
				var view = new google.visualization.DataView(bars_data);
				view.setColumns([0, 1,
								   { calc: "stringify",
									 sourceColumn: 1,
									 type: "string",
									 role: "annotation" },
								   2]);
				var opt = jQuery("#selectlist option:selected").val();
				if (opt === "Donut chart") {
				// the following chart instructions does not allow jQuery. Google charts works only with standard JS code 
					var pie_chart = new google.visualization.PieChart(document.getElementById('donutchart'));
					pie_chart.draw(pie_data, pie_options);
				}else 
					if (opt === "Bars chart"){					
					var bars_chart = new google.visualization.ColumnChart(document.getElementById("donutchart"));
					bars_chart.draw(view, bars_options);
				}
			}
	}
}


jQuery.ajax({
	
		type: 'GET',
		url: 'http://localhost/file.php?optnr=' + opt_nr,
		
		success: function(data) {
			if (data == "yes") {
				jQuery('#btnswitch').show();
			}
		}
	});
}