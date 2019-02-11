getAPI = async () => {

    const api = "https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init"
    const data = await fetch(api);
    const dataJson = await data.json();
    const itemList = dataJson.list;

    const ipAddress = await fetch("https://api.ipify.org?format=json");
    const ipAddressJson = await ipAddress.json();


    // create divs dynamically rather than hard coding HTML
    for (let i = 0; i < itemList.length; i++) {
        let itemContainer = document.querySelector(".item-container");

        //container: item is created and appended to item-container
        let item = document.createElement("a");
        item.setAttribute("href", `${dataJson.list[i].url}`);
        item.setAttribute("target", "_blank");
        item.classList.add("item");
        item.id = `item${i}`;
        itemContainer.appendChild(item);

        //create content where it is appended to item
        let thumbnail = document.createElement("div");
        thumbnail.innerHTML=`<img class="thumbnail" src="${dataJson.list[i].thumbnail[0].url}">`;
        thumbnail.classList.add("thumbnail-container");
        thumbnail.id = `item${i}-thumbnail`;
        item.appendChild(thumbnail);

        let descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add("description-container")
        item.appendChild(descriptionContainer)

        let title = document.createElement("div");
        title.innerHTML=dataJson.list[i].name;
        title.classList.add("title");
        title.id = `item${i}-title`;
        descriptionContainer.appendChild(title);

        let branding = document.createElement("div");
        branding.innerHTML=dataJson.list[i].branding;
        branding.classList.add("branding");
        branding.id = `item${i}-branding`;
        descriptionContainer.appendChild(branding);

        //create a div for category which exist otherwise the loop will continue.
        if (!dataJson.list[i].categories) {
            continue
        } else {
            let category = document.createElement("div");
            category.innerHTML=dataJson.list[i].categories[0]
            category.classList.add("category");
            descriptionContainer.appendChild(category);
        }
    }
}

getAPI()

