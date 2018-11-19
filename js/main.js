(function( $ ){



var kropki = ['','jedynka', 'dwojka', 'trojka', 'czworka', 'piatka', 'szostka'];

var wielkoscKostki = 100;
var border = 1;
var czasPokazaniaKostki = 993000;
var iloscKostek = 3;
var maxIloscKostek = 10;
var maxIloscCzasu = 10;
var wylosowaneKostki = [];

var komunikaty = [
	'Podaj sumę oczek',
	'<input type="text" placeholder="Suma oczek" class="suma_oczek">\
	<input value="Sprawdź" class="sprawdz sprawdz_click" type="submit"><div class="answer"></div><div class="graj-dalej">Graj dalej</div>',
	'Podałeś błędną ilość oczek',
	'Bardzo dobrze! Podałeś prawidłową ilość oczek'
	];


function ustawWielkosc(wielkoscKostki, border) {
	var fixedWidth3 = wielkoscKostki-border*2;

	var fixedWidth2 = wielkoscKostki*0.5;

	var naTrzy = wielkoscKostki/3;

	var padding = naTrzy-2*border;

	console.log(fixedWidth3);

	var style = '\
	<style>\
	.cube {width: '+wielkoscKostki+'px; height:'+wielkoscKostki+'px;  \
	-webkit-transform: rotateX(720deg) rotateY(360deg) rotateZ(25deg) translateZ(-'+fixedWidth2+'px);}\
	.cube div { \
    width: '+fixedWidth3+'px; \
    height: '+naTrzy*2+'px; \
    padding-top: '+padding+'px; } \
    .front {\
-webkit-transform: translateZ('+fixedWidth2+'px);\
}\
.left {\
    -webkit-transform: rotateY(-90deg) translateZ('+fixedWidth2+'px);\
}\
.right {\
    -webkit-transform: rotateY(90deg) translateZ('+fixedWidth2+'px);\
}\
.top {\
    -webkit-transform: rotateX(90deg) translateZ('+fixedWidth2+'px);\
}\
.bottom {\
    -webkit-transform: rotateX(-90deg) translateZ('+fixedWidth2+'px);\
}\
.back {\
    -webkit-transform: rotateY(180deg) translateZ('+fixedWidth2+'px);\
}\
.cube.start {\
-webkit-transform: rotateX(7deg) rotateY(11deg) rotateZ(-8deg) translateZ('+fixedWidth2+'px);\
}\
	</style>\
	';

	$('body').append(style);

	console.log('1. Style ustawione');
}



function createPostion() {

	var pozycje = [];

	var width = $('.app').width();
	var height = $('.app').height();
	var kostkaWidth = wielkoscKostki+20;

	iloscKostekwDokumencie = Math.floor( (height/kostkaWidth) ) * Math.floor( (width/kostkaWidth) );



	for (i=1; i < iloscKostekwDokumencie; i++) {
		$('<div class="fake_kostka" style="width:'+kostkaWidth+'px; height: '+kostkaWidth+'px"></div>').appendTo('.app');
	}

	$('body').find('.fake_kostka').each(function(){

		var pozycja = $(this).position();
		var pozycja = pozycja.left+'|'+pozycja.top;
		pozycje.push(pozycja);
	});

	$('body').find('.fake_kostka').remove();
	return pozycje;

	console.log('2. Pozycje ustawione');
}



function doSetTimeout(i,cube,one,two) {
		  setTimeout(function() { 
		  	var number = Math.floor(Math.random() * 84) + 1 ;
		  	cube.css({
      					'left': one+'px',
      					'top' : two+'px',
      					'-webkit-transform': 'rotateX(7deg) rotateY(11deg) rotateZ(-'+number+'deg) translateZ('+wielkoscKostki*0.5+'px)'
      				}).addClass('start');

		   }, 1000);

		   setTimeout(function() { 

		   	cube.find('> div ').addClass('niewidzialna');


		   }, czasPokazaniaKostki);
		}

function opoznienie(title, content) {
	setTimeout(function() { 
    	komunikat(title, content);
    }, czasPokazaniaKostki);
}

function usunKostki() {

		doUsuniecia = $('body').find('.cube');
		doUsuniecia.css({
      					'left': '120%',
      					'top' : '120%',
      				});
		setTimeout(function() {
		       doUsuniecia.remove();
		   }, 800);
}


  
$('.rzucaj').click(function() {

		var i,doUsuniecia, posX, posY;

		wylosowaneKostki = []

		usunKostki();


		var dajPozycje = createPostion();

		for (i = 1; i < iloscKostek; i++ ) {

			var item = dajPozycje[Math.floor(Math.random()*dajPozycje.length)]+'';
			var usunPozycje = dajPozycje.indexOf(item);
			dajPozycje.splice(usunPozycje, 1);

			console.log(dajPozycje);

			var pozycjeKoniec = item.split('|');

				var nums = [1,2,3,4,5,6],
				    ranNums = [],
				    a = nums.length,
				    j = 0;

				while (a--) {
				    j = Math.floor(Math.random() * (a+1));
				    ranNums.push(nums[j]);
				    nums.splice(j,1);
				}



				var kostka = $('<figure liczba="'+ranNums[0]+'" class="cube cube'+i+'">\
						        <div class="front liczba'+ranNums[0]+' '+kropki[ranNums[0]]+'"></div>\
						        <div class="left liczba'+ranNums[1]+' '+kropki[ranNums[1]]+' "></div>\
						        <div class="right liczba'+ranNums[2]+' '+kropki[ranNums[2]]+'"></div>\
						        <div class="top liczba'+ranNums[3]+' '+kropki[ranNums[3]]+'"></div>\
						        <div class="bottom liczba'+ranNums[4]+' '+kropki[ranNums[3]]+'"></div>\
						        <div class="back liczba'+ranNums[5]+' '+kropki[ranNums[5]]+'"></div>\
      					</figure>');

      			kostka.appendTo('.app');

      			posX = pozycjeKoniec[0];
      			posY = pozycjeKoniec[1]

      			doSetTimeout(i,kostka,posX,posY);

      			wylosowaneKostki.push(ranNums[0]);
		}

		console.log(wylosowaneKostki);

		opoznienie(komunikaty[0],komunikaty[1]);

		//opoznienie();

});

$('body').on('click', '.sprawdz_click', function(e){

	$('body').find('.sprawdz_click').removeClass('sprawdz_click').css('opacity', '0.2');
	checkWynik();

	$('body').find('.graj-dalej').show();


});


function checkWynik() {
	var wpisane = $('body').find('.suma_oczek').val();
	var suma = wylosowaneKostki;

	var sum = suma.reduce(add, 0);

	function add(a, b) {
	    return a + b;
	}

	console.log(wpisane+' '+sum);

	fixedIlosc = iloscKostek-1;

	if (wpisane == sum) {
		$('.statystyki').append('<div class="good">Dobra odpowiedź - '+fixedIlosc+' kostek</div>');
		$('body').find('.answer').html('<div class="good ans">'+komunikaty[3]+'</div>');


	} else {
		$('.statystyki').append('<div class="bad">Zła odpowiedź - '+fixedIlosc+' kostek -> Wynik: '+sum+' | Ty-> '+wpisane+'</div>');
		$('body').find('.answer').html('<div class="bad ans">'+komunikaty[2]+'</div>');
	}

}


function komunikat(title, content) {

	$('body').find('.popup-overlay').remove();

	var popup = $('<div class="popup-overlay">\
                <div class="popup"><h3>'+title+'</h3>\
                    <i class="fa fa-times pop-up-close" aria-hidden="true"></i>\
                    <div class="content">'+content+'</div>                    \
               </div>\
	</div>');

	$('body').append(popup);

	setTimeout(function() {
		       popup.addClass('on');
	}, 100);

}

$('body').on('click', '.pop-up-close, .graj-dalej', function(e){
	if (e.target !== this)
		return;
	$('.popup-overlay').removeClass('on');
	$('.popup-overlay .content, .popup-overlay .title').delay(500).queue(function(n) 
	{
		n();
	});

	usunKostki();
});

$('.menu-indicator').click(function(){
		$('.menu').addClass('on');
});

$('.menu-close').click(function(){
		$('.menu').removeClass('on');
});

$('.iloscKostek').change(function() {
	var ustawIlosc = $(this).val();

	if (ustawIlosc < maxIloscKostek) {
		iloscKostek = parseInt(ustawIlosc)+1;
	} else {
		console.log('Za dużo');
	}

	console.log(iloscKostek);
});

$('.iloscCzasu').change(function() {
	var ustawCzas = $(this).val();

	if (ustawCzas < maxIloscCzasu) {
		czasPokazaniaKostki = parseInt(ustawCzas)*1000;
	} else {
		console.log('Za dużo');
	}

	console.log(czasPokazaniaKostki);
});


ustawWielkosc(wielkoscKostki, border);


})( jQuery );