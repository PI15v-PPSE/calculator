/**
*@var object $OperationEnum объект-перечисление всех операций
* в калькуляторе $openum
*/
var OperationEnum = {
	NONE: 0,
	DIV: 1,
	MUL: 2,
	SUB: 3,
	ADD: 4,
	SQRT: 5,
	SIN: 6,
	COS: 7,
	LOG: 8,
	EXP: 9,
	SQR: 10
}
/**
*@var float $f первое число для вычислений
*/
var f = 0.;
/**
*@var float $s второе число для вычислений
*/
var s = 0.;
/**
*@var float $res результат вычислений
*/
var res = 0.;
/**
*@var bool $input флаг, показывающий,
* что начался ввод следующего числа
*/
var input = false;
/**
*@var bool $dotInput флаг, показывающий,
* можно ли использовать точку при вводе.
*/
var dotInput = true;
/**
*@var int $CurrentOp текущая операция.
* Задается из перечисления OperationEnum @link $openum
*/
var CurrentOp = OperationEnum.NONE;
/**
*@var object $numButtons содержит блоки кнопок с цифрами
*/
var numButtons = document.getElementsByClassName('numButton');
/**
*@var object $Led div для записи числа
*/
var Led = document.getElementById('led');

/**
* Устанавливает обработчик нажатия
*/
for(i = 0; i < numButtons.length; i++){
	var t = numButtons[i];
	/**
	* Если {@link $input} == false, начинаем вводить новое число
	*/
	t.onclick = function(){
		if(input === false){
			Led.innerText = this.innerText;
			input = true;
			dotInput = true;
		}
		else
			Led.innerText += this.innerText;
	}
}

/**
* Выполняет общие операции для бинарных операторов
* Если уже была установлена операция, ее выполнят
* и начнется ожидание ввода числа.
* Иначе нужно заполнить оба числа {@link $f} {@link $s}
*@return none
*/
function binaryOP(){
	if(CurrentOp !== OperationEnum.NONE){
		s = +Led.innerText;
		exec();
	}
	else{
		f = s = +Led.innerText;
	}
	input = false;
}

/**
* В зависимости от текущей операции {@link $CurrentOp}
* выполняется та, или иная ветка, сбрасывается ввод.
*@return none
*/
function exec(){
	switch(CurrentOp){
		case OperationEnum.SQRT:
			res = Math.sqrt(f);
			break;
		case OperationEnum.SIN:
			res = Math.sin(f);
			break;
		case OperationEnum.COS:
			res = Math.cos(f);
			break;
		case OperationEnum.LOG:
			res = Math.log(f);
			break;
		case OperationEnum.EXP:
			res = Math.exp(f);
			break;
		case OperationEnum.ADD:
			res = f+s;
			break;
		case OperationEnum.DIV:
			res = f/s;
			break;
		case OperationEnum.MUL:
			res = f*s;
			break;
		case OperationEnum.SQR:
			res = f*f;
			break;
		case OperationEnum.SUB:
			res = f - s;
			break;
	}
	Led.innerText = res;
	f = res;
	CurrentOp = OperationEnum.NONE;
	input = false;
}
/**
* набор управляющих кнопок
@var object $opButtons
*/
var sqrtButton = document.getElementById('sqrt');
var sinButton = document.getElementById('sin');
var cosButton = document.getElementById('cos');
var logButton = document.getElementById('log');
var expButton = document.getElementById('exp');
var addButton = document.getElementById('add');
var divButton = document.getElementById('div');
var mulButton = document.getElementById('mul');
var sqrButton = document.getElementById('sqr');
var subButton = document.getElementById('sub');
var equallyButton = document.getElementById('equally');
var CButton = document.getElementById("c");
var CEButton = document.getElementById("ce");
var dotButton = document.getElementById("dot");

/**
* обработчики нажатия на управляющие кнопки.
*@return none
*/
sqrtButton.onclick = function(){
	CurrentOp = OperationEnum.SQRT;
	f = +Led.innerText;
	exec();
}

sinButton.onclick = function(){
	CurrentOp = OperationEnum.SIN;
	f = +Led.innerText;
	exec();
}
cosButton.onclick = function(){
	CurrentOp = OperationEnum.COS;
	f = +Led.innerText;
	exec();
}
logButton.onclick = function(){
	CurrentOp = OperationEnum.LOG;
	f = +Led.innerText;
	exec();
}
expButton.onclick = function(){
	CurrentOp = OperationEnum.EXP;
	f = +Led.innerText;
	exec();
}
addButton.onclick = function(){
	binaryOP();
	CurrentOp = OperationEnum.ADD;
}
divButton.onclick = function(){
	binaryOP();
	CurrentOp = OperationEnum.DIV;
}
mulButton.onclick = function(){
	binaryOP();
	CurrentOp = OperationEnum.MUL;
}
sqrButton.onclick = function(){
	CurrentOp = OperationEnum.SQR;
	f = +Led.innerText;
	exec();
}
subButton.onclick = function(){
	
	CurrentOp = OperationEnum.SUB;
}

equallyButton.onclick = function(){
	if(CurrentOp == OperationEnum.NONE) return;
	s = + Led.innerText;
	exec();
}
CButton.onclick = function(){
	Led.innerText = 0;
	input = false;
}
CEButton.onclick = function(){
	Led.innerText = 0;
	input = false;
	CurrentOp = OperationEnum.NONE;
	f = s = 0.;
}

/**
* Кнопка точки похожа на цифровую кнопку
* но она должна вводиться один раз
* во время ввода числа
*@return none
*/
dotButton.onclick = function(){
	if(!dotInput) return;
	if(input === false){
			Led.innerText = "0.";
			input = true;
			dotInput = true;
		}
		else
			Led.innerText += ".";
	dotInput = false;
}