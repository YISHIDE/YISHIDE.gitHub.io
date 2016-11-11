/**
 * Created by 80474 on 2016/9/28.
 */
var swipe ={};
swipe.slide =function(options){
    var parentNode =options.ele;
    var childNode =parentNode.children[0];
    var direction =options.directionType;
    var distance =options.distance;
    var setTransition =function(){
        childNode.style.transition ="all .4s";
        childNode.style.webkitTransition ="all .4s";
    }
    var clearTransition =function(){
        childNode.style.transition ="none";
        childNode.style.webkitTransition ="none";
    }
    var setTranslate =function(x,y){
        childNode.style.transform ="translate("+x+"px,"+y+"px)";
        childNode.style.webkitTransform ="translate("+x+"px,"+y+"px)";
    }
    if(direction =="y"){
        var startY=0;
        var moveY=0;
        var distanceY=0;
        var curr=0;
        var isMove =false;
        var parentNodeHeight =parentNode.offsetHeight;
        var childNodeHeight =childNode.offsetHeight;
        var max =0;
        var min =parentNodeHeight-childNodeHeight;
        var maxSlide=max+distance;
        var minSlide =min-distance;
        childNode.addEventListener("touchstart",function(e){
            startY = e.touches[0].clientY;
        })
        childNode.addEventListener("touchmove",function(e){
           isMove =true;
            moveY = e.touches[0].clientY;
            distanceY =moveY -startY;
             if(curr+distanceY>=maxSlide)
             {
               clearTransition();
                 curr=maxSlide;
                 setTranslate(0,curr);
             }
            else if(curr+distanceY<=minSlide){
                 clearTransition();
                 curr=minSlide;
                 setTranslate(0,curr);
             }
            else{
                 clearTransition();
                 setTranslate(0,curr+distanceY);
             }
        })
        childNode.addEventListener("touchend",function(){
            if(isMove)
            {
                if(curr+distanceY>=max)
                {
                    setTransition();
                    curr =max;
                    setTranslate(0,curr);
                }
                else if(curr+distanceY<=min)
                {
                    setTransition();
                    curr =min;
                    setTranslate(0,curr);
                }
                else{
                    clearTransition();
                    curr=curr+distanceY;
                    setTranslate(0,curr);
                }
            }
            startY=0;
            moveY=0;
            distanceY=0;
            isMove=false;
        })
    }
    else if(direction=="x"){
        var startX=0;
        var moveX=0;
        var distanceX=0;
        var curr=0;
        var isMove =false;
        var parentNodeWidth =parentNode.offsetWidth;
        var childNodeWidth =childNode.offsetWidth;
        var max =0;
        var min =parentNodeWidth-childNodeWidth;
        var maxSlide=max+distance;
        var minSlide =min-distance;
        childNode.addEventListener("touchstart",function(e){
            startX = e.touches[0].clientX;
        })
        childNode.addEventListener("touchmove",function(e){
            isMove =true;
            moveX = e.touches[0].clientX;
            distanceX =moveX -startX;
            if(curr+distanceX>=maxSlide)
            {
                clearTransition();
                curr=maxSlide;
                setTranslate(curr,0);
            }
            else if(curr+distanceX<=minSlide){
                clearTransition();
                curr=minSlide;
                setTranslate(curr,0);
            }
            else{
                clearTransition();
                setTranslate(curr+distanceX,0);
            }
        })
        childNode.addEventListener("touchend",function(){
            if(isMove)
            {
                if(curr+distanceX>=max)
                {
                    setTransition();
                    curr =max;
                    setTranslate(curr,0);
                }
                else if(curr+distanceX<=min)
                {
                    setTransition();
                    curr =min;
                    setTranslate(curr,0);
                }
                else{
                    clearTransition();
                    curr=curr+distanceX;
                    setTranslate(curr,0);
                }
            }
            startX=0;
            moveX=0;
            distanceX=0;
            isMove=false;
        })
    }

}