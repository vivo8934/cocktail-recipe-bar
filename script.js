let baseUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

fetch(baseUrl)
    .then(res => {
        if(res.ok){
            return res.json();
        }else{
            throw new Error("RESPONSE ERROR")
        }
    }).then(data => {
        console.log(data);
        displayCocktail(data);
    }).catch((err) => {
        console.error("FETCH ERROR" + err);
    })


function displayCocktail(data){

    const cocktail = data.drinks[0];
    const cocktailDiv = document.getElementById('cocktail');

    const cocktailName = cocktail.strDrink;
    const heading = document.createElement('h1');
    heading.innerHTML = cocktailName;
    cocktailDiv.appendChild(heading);

    const cocktailImg = document.createElement("img");
    cocktailImg.src = cocktail.strDrinkThumb;
    cocktailDiv.appendChild(cocktailImg);

    const cocktailIngridients = document.createElement("ul");
    cocktailDiv.appendChild(cocktailIngridients);

    const getIngridients = Object.keys(cocktail)
        .filter(function(ingredient){
            return ingredient.indexOf("strIngredient") == 0;
        })
        .reduce(function(ingredients, ingredient){
            if (cocktail[ingredient] != null) {
                ingredients[ingredient] = cocktail[ingredient];
            }
            return ingredients
        }, {});

        for (let key in getIngridients){
            let value = getIngridients[key];
            listItem = document.createElement("li");
            listItem.innerHTML = value;
            cocktailIngridients.appendChild(listItem);
        }

        
}