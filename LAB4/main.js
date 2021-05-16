let datalist, tmpdatalist, alldata, category, keyword, curdisnum;
document.addEventListener("DOMContentLoaded", initialize);
function initialize(){
    document.getElementsByClassName("searchbox").innerHTML = "s";
    fetch("https://2020147569.github.io/HomeworkRepository/LAB4/product.json")
    .then(response=>response.json())
    .then(function(json) {
        alldata = json;
        category = document.getElementById("type");
        keyword = document.getElementById("stext");
        search();
        document.getElementById("searchbutton").onclick = search;
        window.onscroll = () => {moredisplay()};
    })
}
function search() {
    let mycategory = category.value;
    let mykeyword = keyword.value.trim().toLowerCase();
    if(mycategory == "all"){
        tmpdatalist = alldata;
    }
    else{
        tmpdatalist = [];
        for(i in alldata){
            if(alldata[i].type == mycategory){
                tmpdatalist.push(alldata[i]);
            }
        }
    }
    datalist = [];
    for(i in tmpdatalist){
        if(tmpdatalist[i].name.toLowerCase().search(mykeyword) != -1){
            datalist.push(tmpdatalist[i]);
        }
    }
    initialdisplay();
}
function initialdisplay(){
    let box = document.getElementById("container");
    while (box.firstChild != null){
        box.removeChild(box.firstChild);
    }
    for(curdisnum = 0; curdisnum < 4 && curdisnum < datalist.length; curdisnum++){
        display(box);
    }
}
function moredisplay(){
    let box = document.getElementById("container");
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
        for(let i = 0; i < 2 && curdisnum < datalist.length; curdisnum++, i++){
            display(box);
        }
    }
}
function display(box){
    let newpbox = document.createElement("span");
    newpbox.setAttribute("class", "productbox");
    let newproduct = document.createElement("img");
    newproduct.setAttribute("class", "productimage");
    newproduct.setAttribute("alt", datalist[curdisnum].name);
    newproduct.setAttribute("src", datalist[curdisnum].source);
    newproduct.setAttribute("id", curdisnum);
    newproduct.addEventListener("click", function(){
        let curid = this.id;
        let newdescription = document.createElement("span");
        newdescription.setAttribute("class", "desc");
        newdescription.appendChild(document.createTextNode("이름: " + datalist[curid].name + ", 가격: " + datalist[curid].price + "원"))
        newpbox.appendChild(newdescription);
    });
    newpbox.appendChild(newproduct);
    box.appendChild(newpbox);
}
