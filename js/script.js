document.addEventListener("DOMContentLoaded", function (){


    console.log("ARSES JavaScript is working.");

    } );

    /* ==============================
       LOADER
    ============================== */

     const  loader = document.getElementById("page-loader");

    if (loader) {
        setTimeout(function () {
            loader.classList.add("hidden");

            setTimeout(function () {
                loader.style.display = "none";
            }, 500);
        }, 300);
    }


    /* ==============================
       MOBILE MENU
    ============================== */

    const menuButton =
        document.getElementById("mobile-menu-toggle");

    const mobileNavigation =
        document.getElementById("mobile-navigation");

    if (menuButton && mobileNavigation) {

        menuButton.addEventListener("click", function () {

            mobileNavigation.classList.toggle("open");

            const isOpen =
                mobileNavigation.classList.contains("open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });

        const mobileLinks =
            mobileNavigation.querySelectorAll("a");

        mobileLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mobileNavigation.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });
        });
    }


  /* =========================================
   ARSES — SAFE PRODUCT SEARCH
========================================= */

(function () {
    function initArsesSearch() {
        const searchButton = document.getElementById("search-toggle");
        const searchOverlay = document.getElementById("search-overlay");
        const searchClose = document.getElementById("search-close");
        const searchInput = document.getElementById("search-input");
        const searchForm = document.getElementById("search-form");
        const searchResults = document.getElementById("search-results");

if (!searchButton ||!searchOverlay || !searchInput||!searchResults){
    return;
}
        // Product catalog from the Home and Shop pages
        const products = [
            { name: "Classic Blazer", price: "$159", image: "images/product-01.jpg", page: "index.html" },
            { name: "Essential Shirt", price: "$89", image: "images/product-02.jpg", page: "index.html" },
            { name: "Minimal Handbag", price: "$129", image: "images/product-03.jpg", page: "index.html" },
            { name: "Trench Coat", price: "$199", image: "images/product-04.jpg", page: "index.html" },
            { name: "Mini Scarves", price: "$159", image: "images/product-05.jpg", page: "shop.html" },
            { name: "Womens T-shirt", price: "$89", image: "images/product-06.jpg", page: "shop.html" },
            { name: "Signature Pleated Skirt", price: "$129", image: "images/product-07.jpg", page: "shop.html" },
            { name: "Womens Blouse", price: "$199", image: "images/product-08.jpg", page: "shop.html" },
            { name: "Arabic Dress", price: "$95", image: "images/product-09.jpg", page: "shop.html" },
            { name: "Womens Cap", price: "$179", image: "images/product-10.jpg", page: "shop.html" },
            { name: "Signature Bandana", price: "$149", image: "images/product-11.jpg", page: "shop.html" },
            { name: "Modern Tailored Trousers", price: "$119", image: "images/product-12.jpg", page: "shop.html" }
        ];

        function openSearch() {
            searchOverlay.classList.add("active");
            searchInput.focus();
            showResults();
        }

        function closeSearch() {
            searchOverlay.classList.remove("active");
        }

        function showResults() {
            const query = searchInput.value.trim().toLowerCase();
            searchResults.replaceChildren();

            if (!query) {
                searchResults.textContent = "Start typing to search products.";
                return;
            }

            const matches = products.filter(function (product) {
                return product.name.toLowerCase().includes(query);
            });

            if (matches.length === 0) {
                searchResults.textContent = "No products found. Try another name.";
                return;
            }

            matches.forEach(function (product) {
                const link = document.createElement("a");
                link.className = "search-result-item";
                link.href = product.page + "?search=" +
                    encodeURIComponent(product.name);

                const image = document.createElement("img");
                image.src = product.image;
                image.alt = product.name;
                image.loading = "lazy";

                const details = document.createElement("div");
                details.className = "search-result-details";

                const name = document.createElement("h3");
                name.textContent = product.name;

                const price = document.createElement("p");
                price.textContent = product.price;

                details.appendChild(name);
                details.appendChild(price);
                link.appendChild(image);
                link.appendChild(details);
                searchResults.appendChild(link);
            });
        }
        searchButton.addEventListener("click", openSearch);
        searchInput.addEventListener("input", showResults);

        if (searchClose) {
            searchClose.addEventListener("click", closeSearch);
        }

        searchOverlay.addEventListener("click", function (event) {
            if (event.target === searchOverlay) {
                closeSearch();
            }
        });

        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeSearch();
            }
        });

        if (searchForm) {
            searchForm.addEventListener("submit", function (event) {
                event.preventDefault();
                showResults();
            });
        }

        // Filter products on the destination page
        const requestedProduct =
            new URLSearchParams(window.location.search).get("search");

        if (requestedProduct) {
            const cards = document.querySelectorAll(".product-card");
            let found = null;

            cards.forEach(function (card) {
                const title = card.querySelector(".product-info h3");
                const isMatch = title &&
                    title.textContent.trim().toLowerCase() ===
                    requestedProduct.trim().toLowerCase();

                card.style.display = isMatch ? "" : "none";

                if (isMatch) {
                    found = card;
                }
            });

            if (found) {
                setTimeout(function () {
                    found.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }, 300);
            }
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initArsesSearch);
    } else {
        initArsesSearch();
    }
})();

// ARSES - ADD TO CART

const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.querySelector(".cart-count");
let cartNumber = 0;

if (cartCount) {
    cartCount.textContent = 0;
}

localStorage.setItem("arsesCart", 0);
addToCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        cartNumber++;
    
        const price = parseFloat(
    button.closest(".product-card")
    .querySelector(".product-price")
    .textContent.replace("$", "")
);
const productName = button.closest(".product-card")
    .querySelector("h3").textContent;
    const productItem=document.createElement("div");
    productItem.textContent=productName+"-$"+price;
totalPrice += price;
if (cartTotal) {
    cartTotal.textContent = "$" + totalPrice;
    cartItems.appendChild(productItem);
    
}
        localStorage.setItem("arsesCart", cartNumber);

        if (cartCount) {
            cartCount.textContent = cartNumber;
        }

    });

});

// ARSES - CART TOAST

addToCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        let oldToast = document.querySelector(".arses-toast");

        if (oldToast) {
            oldToast.remove();
        }

        const toast = document.createElement("div");

        toast.className = "arses-toast";
        toast.textContent = "Added to cart ✓";

        document.body.appendChild(toast);

        setTimeout(function () {
            toast.classList.add("show");
        }, 10);

        setTimeout(function () {
            toast.classList.remove("show");

            setTimeout(function () {
                toast.remove();
            }, 300);

        }, 2000);

    });

});
const quickViewButtons = document.querySelectorAll(".quick-view-button");

quickViewButtons.forEach(function (button) {

    button.addEventListener("click", function () {
        const card = button.closest(".product-card");
const productName = card.querySelector("h3").textContent;
const productPrice = card.querySelector(".product-price").textContent;
const productImage = card.querySelector(".product-image img");
const productImageSrc = productImage ? productImage.src : "";


        const modal = document.createElement("div");

        modal.className = "arses-quick-view";

       modal.innerHTML =
    '<div class="quick-view-box">' +
    '<button class="quick-view-close">×</button>' +
    '<img src="' + productImageSrc + '" alt="' + productName + '">' +
    '<h2>' + productName + '</h2>' +
    '<p>' + productPrice + '</p>' +
    '<button class="quick-view-cart">ADD TO CART</button>' +
    '</div>';

        document.body.appendChild(modal);
        document.body.style.overflow = "hidden";
        const quickViewCartButton =
    modal.querySelector(".quick-view-cart");
    quickViewCartButton.addEventListener("click", function () {

    cartNumber++;

    if (cartCount) {
        cartCount.textContent = cartNumber;
    }
let oldToast = document.querySelector(".arses-toast");

if (oldToast) {
    oldToast.remove();
}

const toast = document.createElement("div");

toast.className = "arses-toast";
toast.textContent = "Added to cart ✓";

document.body.appendChild(toast);

setTimeout(function () {
    toast.classList.add("show");
}, 10);

setTimeout(function () {
    toast.classList.remove("show");

    setTimeout(function () {
        toast.remove();
    }, 300);

}, 2000);
modal.remove();
document.body.style.overflow = "";

});
        document.addEventListener("keydown", function (event) {

    if (event.key === "Escape")
       { document.body.style.overflow = ""; 
        modal.remove();
    }

});

        const closeButton =
            modal.querySelector(".quick-view-close");

        closeButton.addEventListener("click", function () {
            modal.remove();
modal.addEventListener("click", function (event) {

    if (event.target.classList.contains("arses-quick-view")) {
    modal.remove();
    document.body.style.overflow = "";
}

});

        });

    });

});
const cartTotal = document.getElementById("cart-total");
let totalPrice=0;
const cartOverlay = document.getElementById("cart-overlay");
const cartClose = document.getElementById("cart-close");
const cartItems = document.getElementById("cart-items");
const emptyCartMessage = document.getElementById("empty-cart-message");
const cartToggle = document.getElementById("cart-toggle");
cartToggle.addEventListener("click", function () {
    cartOverlay.classList.add("active");
});
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    function updateThemeIcon() {
        if (document.body.classList.contains("dark-mode")) {
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem("arsesTheme", "dark");
        } else {
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            localStorage.setItem("arsesTheme", "light");
        }
    }

    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        updateThemeIcon();
    });

    if (localStorage.getItem("arsesTheme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    updateThemeIcon();
}
const wishlistToggle = document.getElementById("wishlist-toggle");
const wishlistCount = document.querySelector(".wishlist-count");

let wishlistNumber = Number(localStorage.getItem("arsesWishlist")) || 0;

if (wishlistCount) {
    wishlistCount.textContent = wishlistNumber;
}

if (wishlistToggle) {
    wishlistToggle.addEventListener("click", function (event) {
        event.preventDefault();

        wishlistNumber++;

        if (wishlistCount) {
            wishlistCount.textContent = wishlistNumber;
        }

        localStorage.setItem("arsesWishlist", wishlistNumber);
    });
}

/* ARSES — Close Shopping Cart */
document.addEventListener("DOMContentLoaded", function () {
    const cartClose = document.getElementById("cart-close");
    const cartOverlay = document.getElementById("cart-overlay");
    const cartSidebar = document.getElementById("cart-sidebar");

    if (cartClose && cartOverlay) {
        cartClose.addEventListener("click", function () {
            cartOverlay.classList.remove("active");

            if (cartSidebar) {
                cartSidebar.classList.remove("active");
            }

            document.body.classList.remove("cart-open");
        });
    }
});

/* ARSES — Wishlist System */
document.addEventListener("DOMContentLoaded", function () {
    const wishlistToggle = document.getElementById("wishlist-toggle");
    const wishlistCount = document.querySelector(".wishlist-count");
    const wishlistOverlay = document.getElementById("wishlist-overlay");
    const wishlistClose = document.getElementById("wishlist-close");
    const wishlistItems = document.getElementById("wishlist-items");
    const wishlistEmpty = document.getElementById("wishlist-empty");

    let wishlist = [];

    try {
      wishlist = JSON.parse(
    localStorage.getItem("arsesWishlistItems") || "[]"
);
    } catch (error) {
        wishlist = [];
    }

    function saveWishlist() {
        localStorage.setItem("arsesWishlistItems", JSON.stringify(wishlist));

        if (wishlistCount) {
            wishlistCount.textContent = wishlist.length;
        }
    }

    function renderWishlist() {
        if (!wishlistItems) return;

        wishlistItems.innerHTML = "";

        if (wishlistEmpty) {
            wishlistEmpty.style.display = wishlist.length ? "none" : "block";
        }

        wishlist.forEach(function (product) {
            const item = document.createElement("div");
            item.className = "wishlist-item";

            const name = document.createElement("span");
            name.textContent = product.name;

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.textContent = "Remove";

            removeButton.addEventListener("click", function () {
                wishlist = wishlist.filter(function (savedProduct) {
                    return savedProduct.id !== product.id;
                });

                updateHeartButtons();
                saveWishlist();
                renderWishlist();
            });

            item.append(name, removeButton);
            wishlistItems.appendChild(item);
        });
    }

    function updateHeartButtons() {
        document.querySelectorAll(".product-card").forEach(function (card) {
            const button = card.querySelector(".wishlist-button");
            if (!button) return;

            const id = card.dataset.productId;
            const isSaved = wishlist.some(function (product) {
                return product.id === id;
            });

            button.textContent = isSaved ? "♥" : "♡";
            button.setAttribute(
                "aria-pressed",
                String(isSaved)
            );
        });
    }

    document.querySelectorAll(".product-card").forEach(function (card) {
        const button = card.querySelector(".wishlist-button");
        if (!button) return;

        button.addEventListener("click", function () {
            const id = card.dataset.productId;
            const image = card.querySelector(".product-image img");
            const title = card.querySelector(".product-info h3");

            if (!id || !title) return;

            const exists = wishlist.some(function (product) {
                return product.id === id;
            });

            if (exists) {
                wishlist = wishlist.filter(function (product) {
                    return product.id !== id;
                });
            } else {
                wishlist.push({
                    id: id,
                    name: title.textContent.trim(),
                    image: image ? image.getAttribute("src") : ""
                });
            }
if (wishlistCount) {
    wishlistCount.textContent = wishlist.length;
}
            saveWishlist();
            updateHeartButtons();
            renderWishlist();
        });
    });

    if (wishlistToggle && wishlistOverlay) {
        wishlistToggle.addEventListener("click", function (event) {
            event.preventDefault();
            renderWishlist();
            wishlistOverlay.classList.add("active");
        });
    }

    if (wishlistClose && wishlistOverlay) {
        wishlistClose.addEventListener("click", function () {
            wishlistOverlay.classList.remove("active");
        });
    }if (wishlistOverlay) {
        wishlistOverlay.addEventListener("click", function (event) {
            if (event.target === wishlistOverlay) {
                wishlistOverlay.classList.remove("active");
            }
        });
    }

    saveWishlist();
    updateHeartButtons();


});
