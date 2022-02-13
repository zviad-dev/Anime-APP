let search = document.getElementById("search");
let result = document.getElementById("result");
let poster = document.getElementById("poster");
let description = document.getElementById("description");
let recentSearch = document.getElementById("recent-search");
let information = document.getElementById("information");
search.oninput = function() {
    let anime = this.value;
    result.innerHTML = '';
    if (anime.length > 1) fetch(`https://api.anilibria.tv/v2/searchTitles?search=${anime}&filter=id,names.ru,posters.original.url,description&limit=10`).then(function(response) {
        return response.json();
    }).then(function(data) {
        let list = "";
        var suggest = '';
        let temp3 = 0;
        if (data.length != 0) {
            if (JSON.parse(localStorage.getItem("searchStory"))) {
                let temp = JSON.parse(localStorage.getItem("searchStory"));
                let temp2 = 0;
                if (temp.length - 1 <= 4) {
                    temp2 = 0;
                    temp3 = temp.length;
                } else {
                    temp2 = temp.length - 5;
                    temp3 = temp.length;
                }
                for(i = temp.length - 1; i >= temp2; i--)suggest += '<li class="search__li" id = "' + JSON.parse(localStorage.getItem(temp[i])).id + '"><a class="search__link2" data-id= "' + JSON.parse(localStorage.getItem(temp[i])).id + '" href="#">' + '<img class="search__image" src=https://www.anilibria.tv' + JSON.parse(localStorage.getItem(temp[i])).posters.original.url + ' alt="постер" />' + JSON.parse(localStorage.getItem(temp[i])).names.ru + '</a></li>';
            }
            let temp4 = 0;
            if (data.length + temp3 > 10) temp4 = 10 - temp3;
            else temp4 = data.length;
            for(i = 0; i < temp4; i++)list += '<li class="search__li" id = "' + data[i].id + '"><a class="search__link" data-id= "' + data[i].id + '" href="#">' + '<img class="search__image" src=https://www.anilibria.tv' + data[i].posters.original.url + ' alt="постер" />' + data[i].names.ru + '</a></li>';
            result.innerHTML = '<ul class="search__ul">' + suggest + list + '</ul>';
        } else result.innerHTML = "<ul class=\"search__ul\"><li class=\"search__li\">Сожалеем, но ничего не найдено</li></ul>";
    }).catch(function(err) {
        console.warn('Что-то пошло не так.', err);
    });
};
result.onclick = function(data1) {
    let choice = data1.target.dataset.id;
    if (data1.target.dataset.id != undefined) {
        information.style.display = 'block';
        fetch(`https://api.anilibria.tv/v2/getTitle?id=${choice}&filter=id,names.ru,posters.original.url,description`).then(function(response) {
            return response.json();
        }).then(function(data) {
            let searches = JSON.parse(localStorage.getItem("searchStory"));
            if (!searches) searches = [];
            searches.push(data.id);
            localStorage.setItem("searchStory", JSON.stringify(searches));
            localStorage.setItem(data.id, JSON.stringify(data));
            let info = JSON.parse(localStorage.getItem(data.id));
            poster.innerHTML = '<img class="product-card__image" id ="poster" src="https://www.anilibria.tv' + info.posters.original.url + '" alt="Постер" />';
            description.innerHTML = '<h4 class="heading heading_level-4">' + info.names.ru + '<br>' + info.description + '</h4>';
            let listRecentSearch = "";
            let keys = [];
            let temp = JSON.parse(localStorage.getItem("searchStory"));
            let temp2 = 0;
            if (temp.length - 1 <= 2) temp2 = 0;
            else temp2 = temp.length - 3;
            for(i = temp.length - 1; i >= temp2; i--)// keys.push(temp[i]);
            listRecentSearch += '<a class="product-card product-card__pc3" href="#"><div class="product-card__image-container2"><img class="product-card__image product-card__image2" src="https://www.anilibria.tv' + JSON.parse(localStorage.getItem(temp[i])).posters.original.url + '" alt="Постер" /></div><h4 class="heading heading_level-5">' + JSON.parse(localStorage.getItem(temp[i])).names.ru + '</h4></a>';
            recentSearch.innerHTML = listRecentSearch;
        }).catch(function(err) {
            console.warn('Что-то пошло не так.', err);
        });
    }
};
document.addEventListener('click', function(e) {
    if (e.target.id != 'search') result.style.display = 'none';
    else result.style.display = 'block';
});

//# sourceMappingURL=index.80d7b36c.js.map
