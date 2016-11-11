/**
 * Created by 80474 on 2016/9/27.
 */
//封装函数
Object.prototype.transitionEnd =function(callback){
    this.addEventListener("transitionEnd",function(){
        if(callback)
        {
            callback();
        }
    })
    this.addEventListener("webkitTransitionEnd",function(){
        if(callback)
        {
            callback();
        }
    })
}
Object.prototype.tap =function(callback){
    var starTime=0;
    var isMove=false;
    this.addEventListener("touchstart",function(){
        starTime =Date.now();
    })
    this.addEventListener("touchmove",function(){
        isMove =true;
    })
    this.addEventListener("touchend",function(e){
        if(!isMove && (Date.now()-starTime)<300)
        {
            if(callback)
            {
                callback(e);
            }
        }
        isMove =false;
    })
}