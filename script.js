let newsApi = 'http://api.mediastack.com/v1/news?countries=us,in&access_key=5909933bec649681a08c622fbd997962&sources=';
let errorImage = 'error.png';

let app = document.querySelector(".app")

let screen = {
 main:app.querySelector(".main-screen"),
  news:app.querySelector(".news-screen")
};
let categories = ["CNN", "Business","BBC","Entertainment","Health","Science","Sports"];
for(let i=0;i<categories.length;i++){
 let div = document.createElement("div");
 div.innerText = categories[i];
 div.addEventListener("click",function(){
    screen.main.querySelector(".categories .active").classList.remove("active");
    div.classList.add("active");
    fetchCategoryNews(categories[i]);
  });
  if(i == 0){
    div.classList.add("active");
    fetchCategoryNews(categories[i]);
 }
 screen.main.querySelector(".categories").appendChild(div);
}

async function fetchCategoryNews (category){
  screen.main.querySelector(".news-list").innerHTML= "";
  try {
     let res = await fetch(newsApi + category.toLowerCase());
     let data = await res.json();
     let news = data.data;
     console.log(news)
    for (let i=0;i<news.length;i++){
       let div = document.createElement("div");
       div.classList.add("item");
       div.addEventListener("click", function(){
	 window.open(news[i].url, '_blank');
	 news[i].url;
       });
       div.innerHTML = `
         <div class="thumbnail">
           <img src="${news[i].image || errorImage}">
         </div>
         <div class="details">
            <h2>${news[i].title}</h2>
            <p>${news[i].description}</p>
         </div>
	`;
      screen.main.querySelector(".news-list").appendChild(div);
    }
  } catch(msg){
    console.log(msg)
  }
}

function showFullNews(news){
  screen.main.classList.add("hidden");
  screen.news.classList.remove("hidden");

  screen.news.querySelector (".header .title").innerText = news.title;
  screen.news.querySelector (".header .back-btn").addEventListener("click", function(){
    screen.news.classList.add ("hidden");
    screen.main.classList.remove ("hidden");
});
  screen.news.querySelector ("#news-frame").src = news.url;
}
