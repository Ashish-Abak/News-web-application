const url="https://newsapi.org/v2/everything?q=";
const APIKEY="d018aae202a3437ea40de69483c1db6f";

window.addEventListener('load',()=>{
    fetchnews('India');
})

function fetchnews(query){
    fetch(`${url}${query}&apikey=${APIKEY}`)
    .then((response)=>{
        return response.json();
    }).then((data)=>{
        sepdata(data.articles);
    })
}

function sepdata(articles){
    const mainBody=document.querySelector('.mainBody');
    const cardtemp=document.querySelector('.cardtemp');

    mainBody.innerHTML=" ";

    articles.forEach(article => {
        if(article.urlToImage==null)
        return;
        const card1=cardtemp.content.cloneNode(true);
        fillDataInCard(card1,article);
        mainBody.appendChild(card1);
    });
}

function fillDataInCard(card1,article){
    const newsImg=card1.querySelector('.newsImg');
    const newsTitle=card1.querySelector('.newsTitle');
    const newsDate=card1.querySelector('.newsDate');
    const newsDetails=card1.querySelector('.newsDetails');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDate.innerHTML=`${article.source.name} : ${article.publishedAt}`;
    newsDetails.innerHTML=article.description;

    card1.firstElementChild.addEventListener('click',()=>{
       window.open(article.url,"_blank"); 
    })
}

let selectedItem=null;
function activeNews(id){
    fetchnews(id);
    const Items=document.getElementById(id);
    selectedItem?.classList.remove('active');
    selectedItem=Items;
    selectedItem.classList.add('active');
}

const btn=document.getElementById('btn');
const srchtext=document.getElementById('srchtext');
btn.addEventListener(('click'),()=>{
    const text=srchtext.value;
    if(!text){
        return;
    }
    fetchnews(text);
    selectedItem?.classList.remove('active');
    selectedItem=null;
})