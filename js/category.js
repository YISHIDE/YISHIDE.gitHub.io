/**
 * Created by 80474 on 2016/9/28.
 */
window.onload =function(){
swipeleft();
    swipeRight();
}
function swipeleft(){
    //1.获取要操作的dom元素
    var parentNode=document.querySelector(".menu_left");
    var ul =parentNode.querySelector("ul:first-child");
    var lis =ul.querySelectorAll("li");
    var startY=0;
    var moveY =0;
    var distanceY=0;
    var curr=0;
    var max =0;//最大定位区间
    var min =parentNode.offsetHeight -ul.offsetHeight;//最小定位区间
    var isMove=false;
    var dis =100;//缓冲距离
    var maxslide =max+dis;//最大滑动距离
    var minslide =min-dis;//最小滑动距离
    var setTransition =function(){
        ul.style.transition ="all .3s";
    }
    var clearTransition =function(){
        ul.style.transition ="none";
    }
   var setTranslateY =function(i)
   {
       ul.style.transform ="translateY("+i+"px)";
   }
    //2.对ul绑定滑动事件
    ul.addEventListener("touchstart",function(e){
        startY = e.touches[0].clientY;
        console.log(startY);
        console.log(minslide);
    })
    ul.addEventListener("touchmove",function(e){
        isMove =true;
            moveY = e.touches[0].clientY;
            distanceY =moveY-startY;
            console.log(curr+distanceY);
            if(curr+distanceY>=maxslide)
            {
                clearTransition();
                setTranslateY(maxslide);
            }
            else if(curr+distanceY<=minslide){
                clearTransition();
                setTranslateY(minslide);
            }
            else{
                clearTransition();
                setTranslateY(curr+distanceY);
            }



    })
    ul.addEventListener("touchend",function(){
        if(isMove){
            if(curr+distanceY>max)
            {
                setTransition();
                curr=max;
                setTranslateY(curr);
            }
            else if(curr+distanceY<min)
            {
                setTransition();
                curr =min;
                setTranslateY(curr);
            }
            else{clearTransition();
                curr=curr+distanceY;
                setTranslateY(curr);
            }
        }

        startY = 0;
        moveY =0;
        distanceY = 0;
        isMove =false;
      //curr =curr+distanceY;
    })
    //3.点击改变样式
    //封装tap事件
    ul.tap(function(e){
      //得到当前事件触发源li
        var currentLi = e.target.parentNode;
        for(var i=0;i<lis.length;i++)
        {
            lis[i].index =i;
            lis[i].classList.remove("now");
        }
        currentLi.classList.add("now");
        //获取当前li的索引号
        var index =currentLi.index;
        var liHeight =currentLi.offsetHeight;
        //判断定位的距离是否小于最小定位如果小于的话，就定位到最小定位的位置上。
        if(-index*liHeight<min)
        {
            setTransition();
            curr = min;
            setTranslateY(curr);
        }
        else{
            setTransition();
            curr = -index*liHeight;
            setTranslateY(curr);
        }

    })
}
function swipeRight(){
    swipe.slide({
        ele:document.querySelector(".menu_right"),
        directionType:"y",
        distance:"100"
    })
}