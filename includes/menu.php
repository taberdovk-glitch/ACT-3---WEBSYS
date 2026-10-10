<section id="menu" class="menu-section" aria-labelledby="menuTitle">
    <div class="container">
        <div class="section-title">
            <span>OUR MENU</span>
            <h2 id="menuTitle">Coffee made for every mood.</h2>
            <p>Choose your favorite and enjoy the moment.</p>
        </div>

        <div class="menu-categories" id="menuCategories" aria-label="Product categories">
            <button class="menu-category-card" type="button" data-category="coffee" aria-controls="menuProductView">
                <span class="menu-category-icon" aria-hidden="true">☕</span>
                <span class="menu-category-name">Coffee</span>
                <span class="menu-category-description">Espresso favorites, lattes, and more.</span>
            </button>
            <button class="menu-category-card" type="button" data-category="cold" aria-controls="menuProductView">
                <span class="menu-category-icon" aria-hidden="true">🧊</span>
                <span class="menu-category-name">Cold Drinks</span>
                <span class="menu-category-description">Chilled coffee for a slower moment.</span>
            </button>
            <button class="menu-category-card" type="button" data-category="tea" aria-controls="menuProductView">
                <span class="menu-category-icon" aria-hidden="true">🍵</span>
                <span class="menu-category-name">Tea &amp; Matcha</span>
                <span class="menu-category-description">Gentle spice and earthy tea blends.</span>
            </button>
            <button class="menu-category-card" type="button" data-category="bakery" aria-controls="menuProductView">
                <span class="menu-category-icon" aria-hidden="true">🥐</span>
                <span class="menu-category-name">Bakery</span>
                <span class="menu-category-description">Fresh pastries and something sweet.</span>
            </button>
        </div>

        <div id="menuProductView" hidden>
            <div class="menu-products-header">
                <div>
                    <span class="section-label">CATEGORY MENU</span>
                    <h3 id="selectedCategoryTitle"></h3>
                    <p id="selectedCategoryDescription"></p>
                </div>
                <button class="menu-back-button" id="menuBackButton" type="button">Browse categories</button>
            </div>

            <div id="menuProducts" aria-live="polite"></div>
        </div>
    </div>
</section>
