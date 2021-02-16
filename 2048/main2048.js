var board=new Array();
var score=0;
$(document).ready(function(){
    newgame();
})
function newgame(){
    //初始化棋盘
    init();
    //随机数字
    generateOneNumber();
    generateOneNumber();
    
    updateScore(score);

}
function init(){
    
    
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            let gridCell=$("#grid-cell-"+i+"-"+j);
            gridCell.css("top",(i*120+20)+"px");
            gridCell.css("left",(j*120+20)+"px")
        }
    }
    //初始化数字
    for(let i=0;i<4;i++)
    {
        board[i]=Array.from({length:4},(v,i)=>0);
        
    }
    //更新数据
    updateBoardView();
    score=0;
}
function updateBoardView(){
    $(".number-cell").remove();
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            let numberCell=$('#number-cell-'+i+'-'+j);
            if(board[i][j]===0){
                numberCell.css("width","0px");
                numberCell.css("height","0px");
    
            }else{
                numberCell.css("top",(i*120+20)+"px");
                numberCell.css("left",(j*120+20)+"px");
                numberCell.text(board[i][j]);
                numberCell.css("width","100px");
                numberCell.css("height","100px");
                numberCell.css('color', getNumberColor(board[i][j]));
                numberCell.css("background-color",getNumberBackgroudColor(board[i][j]));
            }
        }
    }
}
function generateOneNumber(){
    do{
        var randx=parseInt(Math.floor(Math.random()*4));
        var randy=parseInt(Math.floor(Math.random()*4));
    }while (board[randx][randy]!==0)
    let randNumber=Math.random()>0.5?2:4;
    board[randx][randy]=randNumber;
    
    showNumberWithAnimation(randx,randy,randNumber);
    return true;
}
$(document).keydown(function(event){
    
    switch(event.keyCode){
        case 37:
            if(moveLeft()){
            setTimeout(generateOneNumber,200);
            setTimeout(isGameOver,300);
            }
            break;
            
        // case 38:
        //     if(moveUp()){
        //         generateOneNumber();
        //         isGameOver();
        //     }
        // case 39:
        //     if(moveRight()){
        //         generateOneNumber();
        //         isGameOver();
        //     }
        // case 40:
        //     if(moveDown()){
        //         generateOneNumber();
        //         isGameOver();
        //     }
        //     break;
        default:
            break;

    }
    
})

function isGameOver(){
    if(canLeft()){
        return ;
    }
    alert("游戏结束");
    
}
//----------Left--------------
function moveLeft(){
    if(!canLeft()){
        
        return false;
        
    }
    
    //moveLeft
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(board[i][j]!=0){
                for(let k=0;k<j;k++){
                    if((board[i][k]===0||board[i][k]===board[i][j])&&noBlockHorizontal(i,k,j,board) ){
                        
                        showMoveAnimation(i,j,i,k);
                        score+=(board[i][k]>0)?board[i][k]*2:0;
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        
                        updateScore(score);
                        break;
                    }
                }
            }
            
        }
    }
    setTimeout(updateBoardView,200);
    return true;
    
}
function canLeft(){
    for(let i=0;i<4;i++){
        for(let j=3;j>0;j--){
            if(board[i][j]!==0){
                if(board[i][j-1]===0 || board[i][j-1]===board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

