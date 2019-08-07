$(document).ready(function(){

	var s = Snap("#mymap");	
	arr = new Array();      	// хранит идентификаторы регионов
	var selected_rayon; 		// Пометка для выбранного района

	// Проходимся в цикле по всем регионам
	for (var region in paths) {			

		// Контур региона
		var region_kontur = s.path(paths[region].path);

		// Создаём группу для контура района, значака райцентра и названия
		// и добавляем в неё контур (остальные добавим позже)
		var region_group = s.g(region_kontur);
		region_group.addClass(region);

		// Круг - столица:
		var region_center; 		
		if (paths[region].cx) {
			region_center = s.circle(paths[region].cx, paths[region].cy, 2.2);
			region_center.attr({ fill: 'orange' });
			region_group.add(region_center); // добавляем в группу
		} 

		// Текст - название региона:
		var region_name;
		if (paths[region].text) {
			region_name = s.text(paths[region].textx, paths[region].texty, paths[region].text);			
			region_name.attr({	fontSize: '7px' });
			region_group.add(region_name); // добавляем в группу
		} 

		// Добавляем в массив arr идентификатор
		arr[region_group.id] = region;		

		// Обработчик кликов
		region_group.click(function(){
			var opisanie = $('#'+arr[this.id]).html();			
			$('#opisanie').html(opisanie);

			// Убираем подсветку ранее выбранного района, если он есть
			if (selected_rayon) {
				selected_rayon.removeClass('selected');
			};
			// Подсвечиваем новый выбранный район	
			this.addClass('selected');
			selected_rayon = this;
		});  // завершение обработчика кликов .click


	}  // завершение цикла for (var region in paths)

});