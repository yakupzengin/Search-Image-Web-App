const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imagelist-wrapper");


function runEventListeners(){
    form.addEventListener("submit" , search);
    clearButton.addEventListener("click", clear);
}

runEventListeners();

function clear(){
    searchInput.value = "";
    // imageListWrapper.innerHTML="" This is on of the other solution.
    Array.from(imageListWrapper.children).forEach((child)=>child.remove())    
}


function search(e){
    const value = searchInput.value.trim();
    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
    method : "GET",
    headers : {
    Authorization : "Client-ID C-ZwMdVfZLUqf2EUV6lJeOB9k0_1CVGHsXaUfwJRamU"
    }
    })
    .then((res)=> res.json())
    .then((data)=>{
       Array.from(data.results).forEach((image)=>{

        const div = document.createElement("div");
        div.className="card";

        const img = document.createElement("img");
        img.setAttribute("src",image.urls.small);
        img.height='300';

        const a = document.createElement("a")
        a.href=image.urls.small_s3
        a.textContent="Dowloand"

        div.appendChild(a); 
        div.appendChild(img);
        imageListWrapper.appendChild(div);
        console.log(imageListWrapper)
       })

    })
    .catch((err)=> console.log(err));
    e.preventDefault();
}


function addImageToUI(url){
    const div = document.createElement("div");
    div.className="card";

    const img = document.createElement("img");
    img.setAttribute("src",url);
    img.height='300';


    div.appendChild(img);
    imageListWrapper.appendChild(div);
}

