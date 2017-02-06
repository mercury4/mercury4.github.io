Data = new Date();
var Arr = {
	'ActivePromoCode': 0,
	'BasePrice' : {
		'good1' : 10000,
		'good2' : 5000,
		'good3' : 3333,
	},
	'ActionPrice' : {
		'good1' : 10000,
		'good2' : 5000,
		'good3' : 3333,
	}
};
var CodeAlertObj = $('#code-alert');
//Показываем алерт
function CodeAlert(argument) {
	CodeAlertObj.text(argument);
	CodeAlertObj.show('slow');
	setTimeout(function () {
		CodeAlertObj.hide('slow');
	}, 4000);
}

//Обнуляем акционные цены
function ResetActionPrices() {
	Arr.ActionPrice.good1 =  Arr.BasePrice.good1;
	Arr.ActionPrice.good2 =  Arr.BasePrice.good2;
	Arr.ActionPrice.good3 =  Arr.BasePrice.good3;
}

//Обновляем видимые цены
function ReloadScreenPrices() {
	$('#price4product1').text( Arr.ActionPrice.good1.toLocaleString() + ' Р');
	$('#price4product2').text( Arr.ActionPrice.good2.toLocaleString() + ' Р');
	$('#price4product3').text( Arr.ActionPrice.good3.toLocaleString() + ' Р');
	$('#PriceGood1').val(Arr.ActionPrice.good1);
	$('#PriceGood2').val(Arr.ActionPrice.good2);
	$('#PriceGood3').val(Arr.ActionPrice.good3);
	$('#InputCode').val('Использовался промокод ' + Arr.ActivePromoCode);
}

$(function () {

	$('#ButtonPromo').click(function () {
		switch ($('select#SelectPromoCode').val()) {
			case 'code1':
				if ( Arr.ActivePromoCode == "1" ) 
					{
						CodeAlert('Промокод уже активирован');
					} else if ( $('.goodscheckbox:checked').length != 1 ) {
						CodeAlert('Для использования этого промокода должен быть выбран только один товар');
					} else {
						ResetActionPrices();
						Arr.ActionPrice[$('.goodscheckbox:checked').val()] =  Arr.BasePrice[$('.goodscheckbox:checked').val()] * 0.9;
						 Arr.ActivePromoCode = "1";	
						 ReloadScreenPrices();
						CodeAlert('Промокод1 применен');
					}
				break;
			case 'code2':
				if ( Arr.ActivePromoCode == "2" ) 
					{
						CodeAlert('Промокод уже активирован');
					} else if ( $('.goodscheckbox:checked').length != 2 ) {
						CodeAlert('Для использования этого промокода должны быть выбраны два товара');
					} else {
						ResetActionPrices();
						$.each($('.goodscheckbox:checked'), function(){
							Arr.ActionPrice[$(this).val()] =  Arr.BasePrice[$(this).val()] * 0.8;
						});
						Arr.ActivePromoCode = "2";	
						ReloadScreenPrices();
						CodeAlert('Промокод2 применен');
					}
				break;
			case 'code3':
				if (Arr.ActivePromoCode == "3")
					{
						CodeAlert('Промокод уже активирован');
					} else {
						ResetActionPrices();
					 	if ( Data.getHours() % 2 == 0 ) {
							//час чётный
							Arr.ActionPrice.good1 =  Arr.BasePrice.good1 * 0.7;
						} else {
							//час нечётный
							Arr.ActionPrice.good2 =  Arr.BasePrice.good2 * 0.7;
							Arr.ActionPrice.good3 =  Arr.BasePrice.good3 * 0.7;
						}
						Arr.ActivePromoCode = "3";
						ReloadScreenPrices();
						CodeAlert('Промокод3 применен');
					}
				break;
		}
	}); //$('#ButtonPromo').click(function () {

	$('#ButtonSubmit').click(function() {
		var FormValid = true;

		if (!($('#InputName')[0].checkValidity())) {
			FormValid = false;
			$('#InputNameGroup').addClass('has-error').removeClass('has-success');
		} else {
			$('#InputNameGroup').addClass('has-success').removeClass('has-error');
		}

		if (!($('#InputEmail')[0].checkValidity())) {
			FormValid = false;
			$('#InputEmailGroup').addClass('has-error').removeClass('has-success');
		} else {
			$('#InputEmailGroup').addClass('has-success').removeClass('has-error');
		}

		if ($('.goodscheckbox:checked').length < 1) {
			FormValid = false;
			CodeAlert('Ошибка: выберите хотя бы один товар!');
		} else {
			$('.goodscheckbox').addClass('has-success').removeClass('has-error');
		}

		if (FormValid == 1) {
			$('#form').submit();
			CodeAlert('Форма отправлена');	
 		}

	}); //$('#ButtonSubmit').click(function() {

});