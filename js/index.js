/**
 * Created by 80474 on 2016/9/27.
 */
//页面加载
window.onload =function(){
search();
    lunbo();
    killsecon();
}
//搜索框效果
function search(){
    //1.操作dom元素
    var search =document.querySelector(".h_search");
    var banner =document.querySelector(".banner");
    var bannerHeight =banner.offsetHeight;
    var opacity=0;
    //2.页面滚动事件触发
    window.onscroll =function(){
        //3不断获取scolltop值
        var scrollTop =document.body.scrollTop || document.documentElement.scrollTop;
        if(scrollTop>=bannerHeight)
        {
            opacity =0.85;
        }
        else{
            opacity =0.85*(scrollTop/bannerHeight);
        }
        search.style.backgroundColor ="rgba(231,23,1,"+opacity+")";
    }
}
//轮播部分
function lunbo(){
    //要操作的dom元素
    var banner =document.querySelector(".banner");
    var bannerWidth =banner.offsetWidth;
    var ulchild =banner.querySelector("ul:first-child");
    var ulsecon =banner.querySelector("ul:nth-child(2)");
    var ulis=ulsecon.children;
    var index =1;
    //1.封装动画是否设置过渡。
    var setTransition =function(){
        ulchild.style.transition ="all 0.3s";
    }
    var clearTransition =function(){
        ulchild.style.transition ="none";
    }
    //2.实现自动轮播
    var timer =null;
    timer =setInterval(auto,3000);
    function auto(){
        index++;
        setTransition();
        ulchild.style.transform ="translateX("+(-index*bannerWidth)+"px)";
        setCircle(index-1);
    }
    ulchild.transitionEnd(function(){
        if(index>=9)
            {
                index=1;
                clearTransition();
                setCircle(0);
                ulchild.style.transform ="translateX("+(-(index)*bannerWidth)+"px)";

           }
        else if(index<=0)
        {
            index =8;
            clearTransition();
            setCircle(7);
            ulchild.style.transform ="translateX("+(-(index)*bannerWidth)+"px)";

        }
    });
//3.小圆点自动跟随
    var setCircle =function(index)
    {
        for(var i=0;i<ulis.length;i++)
        {
            ulis[i].classList.remove("now");
        }
        ulis[index].classList.add("now")
    }
    var startX=0;
    var moveX=0;
    var distance=0;
//4.滑动效果
    ulchild.addEventListener("touchstart",function(e){
        clearInterval(timer);
      startX= e.targetTouches[0].clientX;
    });
    ulchild.addEventListener("touchmove",function(e){
        moveX = e.targetTouches[0].clientX;
        distance =moveX-startX;
        clearTransition();
        this.style.transform ="translateX("+((-index)*bannerWidth+distance)+"px)";
    });
    ulchild.addEventListener("touchend",function(){

       if(Math.abs(distance)<(bannerWidth/2))
       {
           setTransition();
           this.style.transform="translateX("+(-index)*bannerWidth+"px)";
       }
        else if(distance>0){
           index--;
           setTransition();
           this.style.transform="translateX("+(-index)*bannerWidth+"px)";
           setCircle(index-1);
       }
        else{
           index++;
           setTransition();
           this.style.transform="translateX("+(-index)*bannerWidth+"px)";
           setCircle(index-1);
       }
       clearInterval(timer);
      timer=setInterval(auto,3000);
    });
}
//掌上秒杀
function killsecon(){
    var all =document.querySelector(".pro_time");
    var spans =all.children;
    var time =3*60*60;
    var timer =null;
    timer =setInterval(function(){
        time--;
        if(time<0)
        {
            clearInterval(timer);
         return;
        }
        //获得当前的时分秒并添加到dom元素上。
        var h=Math.floor(time/3600);
        var m=Math.floor(time/60%60);
        var s=time%60;
        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML= h%10;
        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=m%10;
        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=s%10;
    },1000)
}