//let newsApi = 'http://api.mediastack.com/v1/news?countries=us,in&access_key=5909933bec649681a08c622fbd997962&sources=';
let errorImage = 'error.png';
let newKey = `4896b21c214044cc82624a3730e0465d`

document.getElementById("app").innerHTML = `
<div class="screen main-screen">
  <div class="logo">NewsApp</div>
  <div class="categories"></div>
  <div class="news-list"></div>
`;

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
    let catego = category.toLowerCase();
     let res = await fetch(`https://free-news.p.rapidapi.com/v1/search?q=${catego}&lang=en`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "free-news.p.rapidapi.com",
		"x-rapidapi-key": "a29a65b0b3mshc3a8407fe7723fcp18b02fjsn34eba5e5d19b"
		}});
     let data = await res.json();
     let news = data.articles;
    for (let i=0;i<news.length;i++){
       let div = document.createElement("div");
       div.classList.add("item");
       div.addEventListener("click", function(){
	 window.open(news[i].link, '_blank');
	 news[i].url;
       });
       div.innerHTML = `
         <div class="thumbnail">
           <img src="${news[i].media || errorImage}">
         </div>
         <div class="details">
            <h2>${news[i].title}</h2>
            <p>${news[i].summary}</p>
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
