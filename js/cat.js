/**
 * Created by 80474 on 2016/9/28.
 */
window.onload =function(){
    deletebox();
}
function deletebox(){
    var deletebtn =document.querySelectorAll(".pro_detail .trash");
    var mask =document.querySelector(".mask");
    var model =mask.querySelector(".model");
    var cancel =model.querySelector("button:first-child");
    var curr=null;
    for(var i=0;i<deletebtn.length;i++)
    {
        deletebtn[i].onclick =function(){
            mask.style.display ="block";
            model.classList.add("animate");
            curr =this;
            this.children[0].style.transform ="rotate(-20deg) translateY(2px)";
        }
    }
cancel.addEventListener("click",function(){
    mask.style.display ="none";
    curr.children[0].style.transform ="rotate(0deg) translateY(0)";
})
}