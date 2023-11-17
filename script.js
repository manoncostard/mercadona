function displayProduct(product) {
    let productHtml = `
        <div class="product"><div class="product-image-div">`
    if(product.image) {
        productHtml += `<img class="product_image" src="${product.image}">`
    } else {
        productHtml += `<img class="product_image" src="https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg">`
    }
    productHtml += `</div><div class="product_info">
                <h3 class="product_title">${product.title}</h3>
                <p class="product_description">${product.description}</p>
                </div>
                <div class="product_priceSection">`
    
                    
    if(product.finalPrice != product.price) {
        productHtml += `
                    <p class="product-initPrice">${product.price.toFixed(2)} €</p>
                    <p class="product-finalPrice">${product.finalPrice.toFixed(2)} €</p>`;
    } else {
        productHtml += `
                    <p class="product-price">${product.price.toFixed(2)} €</p>`
    }
    productHtml +=
                    
                `</div>
        </div>
        `;
    return productHtml;
}

function getProducts() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', URL_DEV +'api/v1/client/products');
    xhr.addEventListener('readystatechange', function() {
        if(xhr.readyState === 4) {
            if(xhr.status !== 200) {
                switch(xhr.status) {
                    case 0:
                        alert('The server is momentarily unreachable, please try again in a few moments.');
                        break;
                    default:
                        alert('An error has occured. Code ' + xhr.status + ', Message: ' + xhr.statusText);
                }
            } else {
                let products = JSON.parse(xhr.response);
                let myhtml = "";
            
                products.forEach(product => {
                    myhtml += displayProduct(product);
                })
                document.getElementById("allProducts").innerHTML = myhtml;
            }  
        }
    });
    xhr.send();
}

function getProductsByCategory(category) {
    if(document.getElementById("asideCategories").classList.contains("mobile")) {
        document.getElementById("asideCategories").classList.add("hide")
        document.getElementById("asideCategories").classList.remove("show", "mobile")
        document.getElementById("filterBtn").classList.add("show")
        document.getElementById("filterBtn").classList.remove("hide")
    }
    const xhr = new XMLHttpRequest();
    xhr.open('GET', URL_DEV + `api/v1/client/products/${category}`);
    xhr.addEventListener('readystatechange', function() {
        if(xhr.readyState === 4) {
            if(xhr.status !== 200) {
                switch(xhr.status) {
                    case 0:
                        alert('The server is momentarily unreachable, please try again in a few moments.');
                        break;
                    default:
                        alert('An error has occured. Code ' + xhr.status + ', Message: ' + xhr.statusText);
                }
            } else {
                let products = JSON.parse(xhr.response);
                let myhtml = "";

                products.forEach(product => {
                    myhtml += displayProduct(product);
                })
                document.getElementById("allProducts").innerHTML = myhtml;
            }  
        }
    });
    xhr.send();
}



// CATEGORIES

function getCategories() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', URL_DEV + 'api/v1/client/categories');
    xhr.addEventListener('readystatechange', function() {
        if(xhr.readyState === 4) {
            if(xhr.status !== 200) {
                switch(xhr.status) {
                    case 0:
                        alert('The server is momentarily unreachable, please try again in a few moments.');
                        break;
                    default:
                        alert('An error has occured. Code ' + xhr.status + ', Message: ' + xhr.statusText);
                }
            } else {
                let myHtml = `<button class="category-button active" onclick="getProducts()">ALL PRODUCTS</button>`;
                let categories = JSON.parse(xhr.response);
                categories.forEach(category => {
                    myHtml += `<button class="category-button" onclick="getProductsByCategory('${category}')">${category}</button>`
                })
                document.getElementById("categoryFilterDiv").innerHTML = myHtml;
            }  
        }
    });
    xhr.send();
}


// To Products
function toProducts() {
    let y = document.getElementById("productSearchSection").offsetTop
    window.scrollTo({
        top: y-120,
        behavior: "smooth",
    });

}

// ON READY

document.addEventListener('DOMContentLoaded', function() {
    getCategories();
    getProducts();
    
    let topOfDiv = document.getElementById("categoryFilterDiv").offsetTop
    window.onscroll = function() {
        let y = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if(y + 120  >= topOfDiv) {
            document.getElementById("categoryFilterDiv").classList.add("sticky")
        } else {
            document.getElementById("categoryFilterDiv").classList.remove("sticky")
        }
    }
    
    let mobileFilter = document.getElementById("filterBtn")
    mobileFilter.addEventListener("click", function() {
        document.getElementById("asideCategories").classList.add("mobile")
        document.getElementById("asideCategories").classList.add("show")
        document.getElementById("asideCategories").classList.remove("hide")
        mobileFilter.classList.add("hide")
    })
})

