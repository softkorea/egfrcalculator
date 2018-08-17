var myApp = new Framework7({
    pushState: true,
    // ... other parameters
});
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

var CreGFRgenderkvalue = [0.9,0.7];
var CreGFRgenderavalue = [-0.411, -0.329];
var CreGFRgenderfvalue = [1.0,1.018];
var CreGFRracevalue = [1.0, 1.159]; // other - Black

var MDRDgenderfvalue = [1,0.742];
var MDRDracevalue = [1,1.210];

var keyarray = [46,8,9,27,13,110,190];
function CheckNumericKey(keyCode, ctrlKey) {
    if(keyarray.indexOf(keyCode) != -1 ||
    	(keyCode == 65 && ctrlKey === true) ||
         // Allow: Ctrl+C
        (keyCode == 67 && ctrlKey === true) ||
         // Allow: Ctrl+X
        (keyCode == 88 && ctrlKey === true) ||
         // Allow: home, end, left, right
        (keyCode >= 35 && keyCode <= 39) ||
        (keyCode >= 48 && keyCode <= 57) ) {
             // let it happen, don't do anything
             return true;
    }
    else {
    	return false;
    }	
}

$$('input[type="number"]').on('keydown', function (e) {
    if(CheckNumericKey(e.keyCode,e.ctrlKey)){
		checkPossibleCalculation();
             return;
    }
    else {
    	e.preventDefault();
    	return false;
    }    
});

$$('input[type="number"]').on('keyup', function (e) { 
	checkPossibleCalculation();
});


$$('select').on('change', function () {
    checkPossibleCalculation(); // nothing
});


function checkPossibleCalculation (){
    if($$('#SCr').val() != undefined && $$('#SCr').val() != "" && $$('#Age').val() != undefined && $$('#Age').val() != "") {
        gendertype = $$('#Gender').val();
        racetype = $$('#Race').val();
        scr = Number($$('#SCr').val());
        age = Number($$('#Age').val());

        ckdepionlycr(scr,age,gendertype,racetype);
        MDRD(scr,age,gendertype,racetype);
    }
    else
    {
        $$('#eGFRCr').text("");
        $$('#MDRD').text("");
    }
}

function ckdepionlycr(scr,age,gendertype,racetype){
    gk = Number(CreGFRgenderkvalue[gendertype]);
    ga = Number(CreGFRgenderavalue[gendertype]);
    fv = Number(CreGFRgenderfvalue[gendertype]);
    rv = Number(CreGFRracevalue[racetype]);
    eGFRCr = 141 * Math.pow(Math.min(scr/gk,1),ga) * Math.pow(Math.max(scr/gk,1),-1.209) * Math.pow(0.993,age) * fv * rv;
    $$('#eGFRCr').text(topoint(eGFRCr,1));
}

function MDRD(scr,age,gendertype,racetype){
    fv = Number(MDRDgenderfvalue[gendertype]);
    rv = Number(MDRDracevalue[racetype]);
    MDRDcr = 175 * Math.pow(scr,-1.154) * Math.pow(age,-0.203)*fv*rv;
    $$('#MDRD').text(topoint(MDRDcr,1));
}

function topoint(value, precision) {
    var power = Math.pow(10, precision || 0);
    return String(Math.round(value * power) / power);
}