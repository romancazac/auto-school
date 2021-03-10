var swiper3 = new Swiper('.feauters__slider', {
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
   
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    keyboard: true,
  });


  const headerParent = document.querySelector('.header__parent');
  headerParent.addEventListener("click", function(e){
    this.classList.toggle('active');
  });

  (function($) {
    $(function() {
      $("ul.catalog__list").on("click", "li:not(.active)", function() {
        $(this)
          .addClass("active")
          .siblings()
          .removeClass("active")
          .closest("div.catalog__body")
          .find("div.catalog__content")
          .removeClass("active")
          .eq($(this).index())
          .addClass("active");
      });
    });
  })(jQuery);


  
  function countdown(dateEnd) {
    var timer, days, hours, minutes, seconds;
  
    dateEnd = new Date(dateEnd);
    dateEnd = dateEnd.getTime();
  
    if (isNaN(dateEnd)) {
      return;
    }
  
    timer = setInterval(calculate, 1000);
  
    function calculate() {
      var dateStart = new Date();
      var dateStart = new Date(dateStart.getUTCFullYear(),
        dateStart.getUTCMonth(),
        dateStart.getUTCDate(),
        dateStart.getUTCHours(),
        dateStart.getUTCMinutes(),
        dateStart.getUTCSeconds());
      var timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000)
  
      if (timeRemaining >= 0) {
        days = parseInt(timeRemaining / 86400);
        timeRemaining = (timeRemaining % 86400);
        hours = parseInt(timeRemaining / 3600);
        timeRemaining = (timeRemaining % 3600);
        minutes = parseInt(timeRemaining / 60);
        timeRemaining = (timeRemaining % 60);
        seconds = parseInt(timeRemaining);
  
  
        document.getElementById("days").innerHTML = ("0" + days).slice(-2);
        document.getElementById("hours").innerHTML = ("0" + hours).slice(-2);
        document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
        document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);
      } else {
        return;
      }
    }
  
    function display(days, hours, minutes, seconds) {}
  }
  countdown ('03/04/2022 01:21:00 pm');
  

  var swiper3 = new Swiper('.quetion__slider', {
    slidesPerView: 1,
      spaceBetween: 0,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
   
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    keyboard: true,
    1180: {
    
      
    },
    breakpoints: {
      900: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
     
    }
  });

  $('[data-fancybox="images"]').fancybox({
    afterLoad : function(instance, current) {
      var pixelRatio = window.devicePixelRatio || 1;
  
      if ( pixelRatio > 1.5 ) {
        current.width  = current.width  / pixelRatio;
        current.height = current.height / pixelRatio;
      }
    }
  });

  $('.quetion-frequent__name ').click(function(event) {
    if($('quetion-frequent__item').hasClass('one')){
      $('.quetion-frequent__name,').not($(this)).removeClass('active');
      $('.quetion-frequent__content').not($(this).next()).slideUp(300);
    }
    $(this).toggleClass('active').next().slideToggle(300);
  });


  const burgerOpen = document.querySelector('.btn_black');
  const menuClose = document.querySelector('.header__close');
  const menuHeader = document.querySelector('.header__nav');
  burgerOpen.addEventListener("click", function(e){
    menuHeader.classList.add('active');
  });
  menuClose.addEventListener("click", function(e){
    menuHeader.classList.remove('active');
  }); 
  // Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());;