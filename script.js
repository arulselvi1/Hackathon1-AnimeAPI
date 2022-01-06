//Navbar
const nav = document.createElement("nav");
nav.classList.add("navbar");
const a = document.createElement("a");
a.setAttribute("class", "col-md-3 col-lg-2 navbar-brand font-weight-bolder");
const span_1 = document.createElement("span");
span_1.classList.add("anime");
span_1.innerText = "Anime";
const span_2 = document.createElement("span");
span_2.classList.add("studio");
span_2.innerText = "Studios";
a.append(span_1, span_2);
const div = document.createElement("div");
div.setAttribute("class", "search-bar col-md-8 col-lg-8");
const form = document.createElement("form");
form.setAttribute("class", "form-inline");
const searchInput = document.createElement("input");
searchInput.setAttribute("class", "search-form");
searchInput.setAttribute("type", "text");
searchInput.setAttribute("placeholder", "Search Anime (eg. naruto)");
searchInput.setAttribute("aria-label", "search");
searchInput.setAttribute("id", "search");
const searchIcon = document.createElement("button");
searchIcon.classList.add("btn");
searchIcon.setAttribute("type", "button");
searchIcon.setAttribute("onclick", "searchResults()");
const iconImg = document.createElement("img");
iconImg.setAttribute("src", "./search_white.svg");
iconImg.setAttribute("title", "search");
iconImg.setAttribute("alt", "search");
searchIcon.append(iconImg);
form.append(searchInput, searchIcon);
div.append(form);
nav.append(a, div);

//Search Results Container

const container = document.createElement("div");
container.classList.add("container");
document.body.append(nav, container);
const row = document.createElement("div");
row.setAttribute("class", "row main");
container.append(row);

function createCard(data) {
  try {
    let url = data.image_url;
    let startdate = data.start_date;
    let endDate = data.end_date;
    let type = data.type;
    let IMDb = data.score;
    let Episodes = data.episodes;
    let rated = data.rated;
    let Title = data.title;
    let startyear = Year(startdate);
    let endyear = Year(endDate);
    let mal_id = data.mal_id;
    const col = document.createElement("div");
    col.setAttribute("class", "col-md-4 col-lg-3 mb-2 mt-2");
    row.append(col);

    //poster
    let poster_div = document.createElement("div");
    poster_div.setAttribute("class", "poster");
    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.setAttribute("alt", "poster");
    img.classList.add("img-fluid");
    const info = document.createElement("button");
    info.classList.add("info");
    info.setAttribute("onclick", "displayContents(id)");
    info.setAttribute("id", "c" + mal_id);
    info.innerText = "View more";
    poster_div.append(img, info);

    //content
    const content_div = document.createElement("div");
    content_div.classList.add("content");
    content_div.classList.add("c" + mal_id);
    const episodeInfo = document.createElement("p");
    episodeInfo.innerText = "Episodes : " + Episodes;
    const typeInfo = document.createElement("p");
    typeInfo.innerText = type + " | " + rated;
    const IMDbInfo = document.createElement("p");
    IMDbInfo.innerText = "IMDb rating : " + IMDb + " / 10";
    const StartDateInfo = document.createElement("p");
    StartDateInfo.innerText = "Start-Date : " + startyear;
    const EndDateInfo = document.createElement("p");
    EndDateInfo.innerText = "End-Date : " + endyear;
    content_div.append(
      episodeInfo,
      typeInfo,
      IMDbInfo,
      StartDateInfo,
      EndDateInfo
    );

    //Title
    const title_div = document.createElement("div");
    title_div.classList.add("title");
    title_div.innerText = Title;
    col.append(poster_div, content_div, title_div);
  } catch (error) {
    console.log("error in creating cards data " + error);
  }
}

let count = 0;

async function searchResults() {
  try {
    var current = 1;
    let searchstring = document.getElementById("search").value;
    let tosearch = searchstring.replace(/[ ]/g, "%20");
    let jsondata = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${tosearch}`
    );
    let data = await jsondata.json();
    let purl = `https://api.jikan.moe/v3/search/anime?q=${tosearch}`;
    displayData(data.results);
    pagenation(data, purl, current);
    count++;
  } catch (error) {
    console.log("error in SearchResults data " + error);
  }
}

function displayData(data) {
  try {
    row.innerText = "";
    data.forEach((element) => {
      createCard(element);
    });
  } catch (error) {
    console.log("error in displayData data " + error);
  }
}

function Year(date) {
  try {
    let DATE = new Date(date);
    const year = DATE.getFullYear();
    const month = DATE.getMonth() + 1;
    const day = DATE.getDate();
    return day + " / " + month + " / " + year;
  } catch (error) {
    console.log("error in converting year data " + error);
  }
}

//displayContents

function displayContents(value) {
  try {
    const button_con = document.getElementById(value);
    const dcontent = document.getElementsByClassName(value);
    for (i = 0; i < dcontent.length; i++) {
      if (dcontent[i].style.display == "block") {
        dcontent[i].style.display = "none";
        button_con.innerText = "View more";
      } else {
        button_con.innerText = "View less";
        dcontent[i].style.display = "block";
      }
    }
  } catch (error) {
    console.log("error in displayContents function " + error);
  }
}

//Pagenation
async function pagenation(data, purl, current) {
  try {
    if (count > 0) {
      removePagenation();
    }
    const lastpage = data.last_page;
    const pcontainer = document.createElement("div");
    pcontainer.classList.add("container");
    pcontainer.setAttribute("id", "pcontainer");
    const prow = document.createElement("div");
    prow.classList.add("row");
    const pcol = document.createElement("div");
    pcol.setAttribute("class", "col-md-6 pcol");
    pcontainer.append(prow, pcol);
    document.body.append(pcontainer);
    const previous = document.createElement("div");
    previous.classList.add("previous");
    const pbutton = document.createElement("button");
    pbutton.setAttribute("class", "btn btn-outline-primary previousbtn");
    pbutton.setAttribute("data-url", purl);
    pbutton.setAttribute("data-current", current);
    pbutton.setAttribute("onclick", "previouspage(this)");
    pbutton.innerText = "Previous";
    previous.append(pbutton);
    const pspan = document.createElement("span");
    pspan.classList.add("number");
    pspan.innerText = current + " / " + lastpage;
    const next = document.createElement("div");
    next.classList.add("Next");
    const nbutton = document.createElement("button");
    nbutton.setAttribute("class", "btn btn-outline-secondary Nextbtn");
    nbutton.innerText = "Next";
    nbutton.setAttribute("data-url", purl);
    nbutton.setAttribute("data-current", current);
    nbutton.setAttribute("data-lastpage", lastpage);
    nbutton.setAttribute("onclick", "nextpage(this)");
    next.append(nbutton);
    pcol.append(previous, pspan, next);
  } catch (error) {
    console.log("error in pagination data " + error);
  }
}

async function nextpage(values) {
  try {
    let ncurrent = values.getAttribute("data-current");
    let pagurl = values.getAttribute("data-url");
    let lastPage = values.getAttribute("data-lastpage");
    let ncount = +ncurrent + 1;
    if (ncount < lastPage) {
      let nextdata = await fetch(pagurl + "&page=" + +ncount);
      let ndata = await nextdata.json();
      displayData(ndata.results);
      pagenation(ndata, pagurl, ncount);
    }
  } catch (error) {
    console.log("error in next page data " + error);
  }
}
async function previouspage(values) {
  try {
    let pcurrent = values.getAttribute("data-current");
    let pagurl = values.getAttribute("data-url");
    let pcount = +pcurrent - 1;
    if (pcount > 0) {
      let previousdata = await fetch(pagurl + "&page=" + +pcount);
      let pdata = await previousdata.json();
      displayData(pdata.results);
      pagenation(pdata, pagurl, pcount);
    }
  } catch (error) {
    console.log("error in previous page data " + error);
  }
}

function removePagenation() {
  const pcontainer = document.getElementById("pcontainer");
  pcontainer.remove();
}
