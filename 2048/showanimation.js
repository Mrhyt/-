function showNumberWithAnimation(i,j,num){
    let numberCell=$('#number-cell-'+i+'-'+j);
    numberCell.css("background-color",getNumberBackgroudColor(num));
    numberCell.css('color', getNumberColor(num));
    numberCell.text(num);
    numberCell.animate({
        width:"100px",
        height:"100px",
        top:(i*120+20)+"px",
        left:(j*120+20)+"px",
    },50)
}
function showMoveAnimation(fromx,fromy,tox,toy){
    let numberCell=$('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:(tox*120+20)+"px",
        left:(toy*120+20)+"px",
    },200);
    
}