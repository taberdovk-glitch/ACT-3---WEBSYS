(function () {
    "use strict";

    const categoryCards = document.querySelectorAll(".menu-category-card");
    const categoriesView = document.getElementById("menuCategories");
    const productView = document.getElementById("menuProductView");
    const selectedTitle = document.getElementById("selectedCategoryTitle");
    const selectedDescription = document.getElementById("selectedCategoryDescription");
    const backButton = document.getElementById("menuBackButton");
    const menuProducts = document.getElementById("menuProducts");
    const menuCatalog = {
        coffee: {
            title: "Coffee",
            description: "Espresso favorites, lattes, and more.",
            groups: [
                {
                    title: "Milk-Based Coffee",
                    products: [
                        { icon: "☕", title: "Classic Latte", description: "Rich espresso blended with smooth steamed milk.", price: "₱145" },
                        { icon: "🍫", title: "Mocha Cloud", description: "Chocolate, espresso, and creamy milk.", price: "₱160" },
                        { icon: "🥛", title: "Cappuccino", description: "Espresso topped with steamed milk and airy foam.", price: "₱135" },
                        { icon: "☕", title: "Flat White", description: "Double espresso softened with silky microfoam.", price: "₱145" },
                        { icon: "🍯", title: "Caramel Macchiato", description: "Vanilla milk marked with espresso and caramel.", price: "₱170" },
                        { icon: "☕", title: "Spanish Latte", description: "A smooth espresso latte sweetened with condensed milk.", price: "₱165" },
                        { icon: "🌼", title: "Vanilla Latte", description: "Espresso and steamed milk with fragrant vanilla.", price: "₱155" },
                        { icon: "🌾", title: "Honey Oat Latte", description: "Espresso with oat milk and a touch of honey.", price: "₱175" },
                        { icon: "🍯", title: "Brown Sugar Latte", description: "Espresso and milk sweetened with mellow brown sugar.", price: "₱170" },
                        { icon: "🌰", title: "Hazelnut Latte", description: "A nutty hazelnut aroma folded into a smooth latte.", price: "₱165" },
                        { icon: "🌿", title: "Pistachio Latte", description: "Creamy espresso latte with a delicate pistachio finish.", price: "₱185" },
                        { icon: "🍫", title: "White Mocha", description: "Espresso and steamed milk with sweet white chocolate.", price: "₱175" },
                        { icon: "🥛", title: "Cafe Bombon", description: "A rich espresso layered over sweet condensed milk.", price: "₱155" },
                        { icon: "🧂", title: "Salted Caramel Latte", description: "Espresso, milk, and caramel balanced with sea salt.", price: "₱175" },
                        { icon: "🌹", title: "Rose Latte", description: "Floral rose adds a gentle note to espresso and milk.", price: "₱170" },
                        { icon: "🍁", title: "Maple Latte", description: "Espresso and steamed milk sweetened with pure maple.", price: "₱175" },
                        { icon: "🌾", title: "Oat Milk Cappuccino", description: "Espresso and airy foam made with creamy oat milk.", price: "₱165" },
                        { icon: "🥜", title: "Almond Latte", description: "Espresso and steamed milk with a toasted almond note.", price: "₱170" },
                        { icon: "🍚", title: "Dirty Horchata Latte", description: "Espresso meets cinnamon rice milk in a silky latte.", price: "₱180" },
                        { icon: "🍬", title: "Toffee Nut Latte", description: "Espresso and milk with buttery toffee and toasted nut.", price: "₱175" }
                    ]
                },
                {
                    title: "Black Coffee",
                    products: [
                        { icon: "☕", title: "Double Espresso", description: "A bold, balanced double shot with a rich crema.", price: "₱95" },
                        { icon: "☕", title: "Americano", description: "Espresso lengthened with hot water for a clean finish.", price: "₱115" },
                        { icon: "☕", title: "Long Black", description: "Hot water poured over espresso to keep its crema.", price: "₱120" },
                        { icon: "🫘", title: "House Pour Over", description: "Single-origin beans brewed slowly to bring out their notes.", price: "₱150" },
                        { icon: "☕", title: "Cafe Cubano", description: "A concentrated espresso sweetened with raw sugar.", price: "₱145" },
                        { icon: "🫘", title: "Single Origin Espresso", description: "A rotating origin with bright, distinct tasting notes.", price: "₱115" },
                        { icon: "☕", title: "Ristretto", description: "A short espresso pull with an intense, sweet finish.", price: "₱105" },
                        { icon: "☕", title: "Lungo", description: "A longer espresso extraction with a mellow body.", price: "₱110" },
                        { icon: "🫖", title: "French Press", description: "Full-bodied coffee steeped and pressed to order.", price: "₱155" },
                        { icon: "🫘", title: "Ethiopian Pour Over", description: "Floral single-origin coffee with a citrus lift.", price: "₱170" },
                        { icon: "🫘", title: "Brazilian Pour Over", description: "A smooth cup with chocolate and roasted nut notes.", price: "₱160" },
                        { icon: "☕", title: "Decaf Americano", description: "A mellow espresso-style cup without the caffeine.", price: "₱120" },
                        { icon: "🫖", title: "Siphon Coffee", description: "Clean, aromatic coffee brewed in a glass siphon.", price: "₱180" },
                        { icon: "⚡", title: "Red Eye", description: "House drip coffee strengthened with a shot of espresso.", price: "₱145" },
                        { icon: "🫘", title: "Guatemala Drip", description: "A daily drip with cocoa sweetness and soft citrus.", price: "₱135" },
                        { icon: "🫘", title: "Sumatra French Press", description: "Earthy, full-bodied beans pressed fresh for your cup.", price: "₱165" },
                        { icon: "🍋", title: "Espresso Romano", description: "A rich espresso served with a bright twist of lemon.", price: "₱125" },
                        { icon: "🫘", title: "Barrel Aged Black", description: "A rotating black coffee with a deep, smooth aroma.", price: "₱175" },
                        { icon: "☕", title: "Turkish Coffee", description: "Finely ground coffee simmered slowly for a rich cup.", price: "₱150" },
                        { icon: "🫘", title: "Decaf Pour Over", description: "Carefully brewed decaf with a gentle, rounded finish.", price: "₱155" }
                    ]
                }
            ]
        },
        cold: {
            title: "Cold Drinks",
            description: "Chilled coffee and refreshing house-made drinks.",
            groups: [
                {
                    title: "Iced Coffee",
                    products: [
                        { icon: "🧊", title: "Cold Brew", description: "Slow-steeped coffee with a smooth, refreshing finish.", price: "₱150" },
                        { icon: "🥤", title: "Iced Vanilla Latte", description: "Chilled espresso, milk, and a hint of vanilla.", price: "₱170" },
                        { icon: "🥤", title: "Iced Caramel Latte", description: "Espresso and cold milk finished with caramel.", price: "₱175" },
                        { icon: "🥤", title: "Iced Mocha", description: "Chocolate and espresso poured over ice with milk.", price: "₱170" },
                        { icon: "🧊", title: "Iced Americano", description: "A bright espresso served over chilled water and ice.", price: "₱125" },
                        { icon: "🥤", title: "Iced Spanish Latte", description: "Chilled espresso, milk, and a touch of condensed milk.", price: "₱175" },
                        { icon: "🍫", title: "Iced White Mocha", description: "White chocolate and espresso over cold milk and ice.", price: "₱180" },
                        { icon: "🌰", title: "Iced Hazelnut Latte", description: "Chilled espresso and milk with toasted hazelnut.", price: "₱175" },
                        { icon: "🌾", title: "Iced Oat Latte", description: "Espresso poured over ice with smooth oat milk.", price: "₱170" },
                        { icon: "🍯", title: "Iced Honey Latte", description: "Cold milk and espresso gently sweetened with honey.", price: "₱175" },
                        { icon: "⚡", title: "Nitro Cold Brew", description: "Velvety cold brew infused with nitrogen for a creamy head.", price: "₱185" },
                        { icon: "☁️", title: "Vanilla Cream Cold Brew", description: "Slow-steeped coffee topped with vanilla cream.", price: "₱180" },
                        { icon: "🧂", title: "Salted Caramel Cold Brew", description: "Smooth cold brew with salted caramel cold foam.", price: "₱185" },
                        { icon: "🍊", title: "Orange Cold Brew", description: "Bright orange over cold brew for a citrusy coffee twist.", price: "₱175" },
                        { icon: "🥥", title: "Coconut Cold Brew", description: "Cold brew softened with creamy coconut milk.", price: "₱175" },
                        { icon: "🫘", title: "Iced Pour Over", description: "Freshly brewed single-origin coffee chilled over ice.", price: "₱165" },
                        { icon: "🥤", title: "Iced Flat White", description: "Double espresso and cold milk with a silky finish.", price: "₱165" },
                        { icon: "🍫", title: "Iced Cafe Mocha", description: "Dark chocolate and espresso shaken with cold milk.", price: "₱175" },
                        { icon: "🍬", title: "Brown Sugar Shaken Espresso", description: "Shaken espresso with brown sugar and a splash of milk.", price: "₱175" },
                        { icon: "🥛", title: "Iced Cortado", description: "A concentrated espresso balanced with chilled milk.", price: "₱155" }
                    ]
                },
                {
                    title: "Refreshers",
                    products: [
                        { icon: "🍓", title: "Strawberry Lemonade", description: "Fresh lemon and ripe strawberry over ice.", price: "₱125" },
                        { icon: "🍊", title: "Citrus Sparkler", description: "Orange and calamansi with a sparkling finish.", price: "₱130" },
                        { icon: "🍑", title: "Peach Iced Tea", description: "Black tea chilled with sweet peach.", price: "₱120" },
                        { icon: "🌺", title: "Hibiscus Cooler", description: "Tart hibiscus tea with citrus, served cold.", price: "₱130" },
                        { icon: "🥭", title: "Mango Passionfruit", description: "Tropical mango and passionfruit over sparkling ice.", price: "₱145" },
                        { icon: "🍉", title: "Watermelon Lime", description: "Juicy watermelon brightened with fresh lime.", price: "₱135" },
                        { icon: "🫐", title: "Blueberry Lemon Fizz", description: "Blueberry and lemon topped with sparkling water.", price: "₱145" },
                        { icon: "🍍", title: "Pineapple Mint Cooler", description: "Sweet pineapple muddled with cool garden mint.", price: "₱140" },
                        { icon: "🥒", title: "Cucumber Lime Refresher", description: "Cucumber and lime make a crisp, light cooler.", price: "₱135" },
                        { icon: "🌸", title: "Lychee Rose Spritz", description: "Lychee and rose with a delicate sparkling finish.", price: "₱150" },
                        { icon: "🍏", title: "Green Apple Fizz", description: "Tart green apple topped with lively bubbles.", price: "₱140" },
                        { icon: "🍇", title: "Raspberry Hibiscus", description: "Raspberry folded into tangy hibiscus over ice.", price: "₱145" },
                        { icon: "🍷", title: "Pomegranate Cooler", description: "Tart pomegranate with citrus and crushed ice.", price: "₱150" },
                        { icon: "🌅", title: "Tropical Sunrise", description: "A layered blend of orange, pineapple, and grenadine.", price: "₱150" },
                        { icon: "🫚", title: "Ginger Lemon Fizz", description: "Zesty lemon and ginger lifted with sparkling water.", price: "₱140" },
                        { icon: "🍊", title: "Grapefruit Spritz", description: "Bittersweet grapefruit with a crisp soda finish.", price: "₱145" },
                        { icon: "🍹", title: "Passionfruit Iced Tea", description: "Black tea shaken with fragrant passionfruit.", price: "₱135" },
                        { icon: "🥭", title: "Mango Green Tea", description: "Green tea and ripe mango served over ice.", price: "₱135" },
                        { icon: "🌿", title: "Lemon Mint Cooler", description: "Fresh lemon, mint, and cool sparkling water.", price: "₱130" },
                        { icon: "🍑", title: "Sparkling Peach", description: "Ripe peach and bright citrus topped with sparkling water.", price: "₱145" }
                    ]
                }
            ]
        },
        tea: {
            title: "Tea & Matcha",
            description: "Earthy matcha, fragrant tea, and warming chai.",
            groups: [
                {
                    title: "Matcha",
                    products: [
                        { icon: "🍵", title: "Classic Matcha Latte", description: "Earthy matcha whisked smooth with creamy milk.", price: "₱155" },
                        { icon: "🍓", title: "Strawberry Matcha", description: "Fresh strawberry layered with matcha and cold milk.", price: "₱175" },
                        { icon: "🌼", title: "Vanilla Matcha", description: "Ceremonial-style matcha balanced with soft vanilla.", price: "₱165" },
                        { icon: "🥥", title: "Coconut Matcha", description: "Bright matcha blended with creamy coconut milk.", price: "₱170" },
                        { icon: "🍯", title: "Honey Matcha", description: "Matcha and milk gently sweetened with honey.", price: "₱165" },
                        { icon: "🧊", title: "Iced Matcha Latte", description: "A cool, smooth matcha latte poured over ice.", price: "₱155" },
                        { icon: "🍋", title: "Matcha Lemonade", description: "Citrusy lemonade balanced with vibrant matcha.", price: "₱145" },
                        { icon: "🫐", title: "Blueberry Matcha", description: "Blueberry compote layered beneath smooth matcha milk.", price: "₱175" },
                        { icon: "🥭", title: "Mango Matcha", description: "Sweet mango and earthy matcha in a chilled layered drink.", price: "₱175" },
                        { icon: "🍑", title: "Peach Matcha", description: "Juicy peach meets bright matcha and creamy milk.", price: "₱175" },
                        { icon: "🍇", title: "Raspberry Matcha", description: "Tart raspberry and matcha in a fresh, fruity latte.", price: "₱175" },
                        { icon: "🍬", title: "Brown Sugar Matcha", description: "Matcha latte sweetened with a ribbon of brown sugar.", price: "₱170" },
                        { icon: "☁️", title: "Matcha Cream Top", description: "Iced matcha finished with a soft vanilla cream cap.", price: "₱180" },
                        { icon: "🍨", title: "Matcha Affogato", description: "A scoop of vanilla gelato crowned with warm matcha.", price: "₱185" },
                        { icon: "🥤", title: "Matcha Frappe", description: "Blended matcha and milk finished with whipped cream.", price: "₱185" },
                        { icon: "⚡", title: "Dirty Matcha", description: "Earthy matcha layered with a shot of espresso.", price: "₱180" },
                        { icon: "🌹", title: "Rose Matcha Latte", description: "Floral rose and green matcha whisked into cold milk.", price: "₱175" },
                        { icon: "🌾", title: "Oat Matcha Latte", description: "Ceremonial matcha paired with smooth oat milk.", price: "₱170" },
                        { icon: "🍫", title: "White Chocolate Matcha", description: "Matcha balanced with creamy white chocolate.", price: "₱180" },
                        { icon: "🍋", title: "Yuzu Matcha", description: "Japanese citrus brightens a smooth iced matcha.", price: "₱175" }
                    ]
                },
                {
                    title: "Tea & Chai",
                    products: [
                        { icon: "🫖", title: "Spiced Chai", description: "Black tea steeped with warming spices and steamed milk.", price: "₱140" },
                        { icon: "🫖", title: "Earl Grey", description: "Fragrant black tea with a light bergamot aroma.", price: "₱125" },
                        { icon: "🍃", title: "Jasmine Green Tea", description: "Delicate green tea scented with jasmine blossoms.", price: "₱120" },
                        { icon: "🫖", title: "English Breakfast", description: "A full-bodied black tea, lovely with or without milk.", price: "₱120" },
                        { icon: "☁️", title: "London Fog", description: "Earl Grey, steamed milk, and a hint of vanilla.", price: "₱150" },
                        { icon: "🫖", title: "Masala Chai", description: "Strong black tea simmered with ginger and warming spices.", price: "₱145" },
                        { icon: "⚡", title: "Dirty Chai", description: "Spiced chai and steamed milk with a shot of espresso.", price: "₱165" },
                        { icon: "🍦", title: "Vanilla Chai", description: "A gently spiced chai latte sweetened with vanilla.", price: "₱150" },
                        { icon: "🧊", title: "Iced Chai Latte", description: "Chilled spiced tea and milk poured over ice.", price: "₱150" },
                        { icon: "🌿", title: "Rooibos Tea", description: "Naturally caffeine-free red tea with a mellow sweetness.", price: "₱125" },
                        { icon: "🌱", title: "Peppermint Tea", description: "A cool, fragrant herbal infusion served hot.", price: "₱120" },
                        { icon: "🌼", title: "Chamomile Tea", description: "Soft floral chamomile for a calm cup.", price: "₱120" },
                        { icon: "🍃", title: "Japanese Sencha", description: "Fresh green tea with a clean, gently grassy character.", price: "₱135" },
                        { icon: "🍚", title: "Genmaicha", description: "Japanese green tea blended with toasted rice.", price: "₱135" },
                        { icon: "🫖", title: "Roasted Oolong", description: "A fragrant oolong with a smooth toasted finish.", price: "₱140" },
                        { icon: "🫚", title: "Lemon Ginger Tea", description: "Bright lemon and warming ginger steeped together.", price: "₱130" },
                        { icon: "✨", title: "Golden Turmeric Tea", description: "Turmeric, ginger, and citrus in a warming herbal cup.", price: "₱140" },
                        { icon: "🧋", title: "Thai Milk Tea", description: "Bold tea with creamy milk and a hint of spice.", price: "₱150" },
                        { icon: "🫖", title: "Royal Milk Tea", description: "Full-bodied black tea simmered gently with milk.", price: "₱145" },
                        { icon: "🍇", title: "Lychee Black Tea", description: "Fragrant black tea with a delicate lychee sweetness.", price: "₱140" }
                    ]
                }
            ]
        },
        bakery: {
            title: "Bakery",
            description: "Fresh pastries, cakes, and little sweet treats.",
            groups: [
                {
                    title: "Pastries",
                    products: [
                        { icon: "🥐", title: "Butter Croissant", description: "Flaky, buttery pastry baked fresh every morning.", price: "₱95" },
                        { icon: "🥐", title: "Almond Croissant", description: "A crisp croissant filled with almond cream.", price: "₱140" },
                        { icon: "🥐", title: "Pain au Chocolat", description: "Buttery pastry wrapped around dark chocolate.", price: "₱125" },
                        { icon: "🍥", title: "Cinnamon Roll", description: "Soft spiral pastry with cinnamon sugar and glaze.", price: "₱115" },
                        { icon: "🧀", title: "Cheese Danish", description: "Golden pastry filled with lightly sweetened cream cheese.", price: "₱120" },
                        { icon: "🧄", title: "Garlic Cream Cheese Bun", description: "Soft savory bun with garlic butter and cream cheese.", price: "₱110" },
                        { icon: "🍇", title: "Raisin Swirl", description: "Laminated pastry rolled with cinnamon and plump raisins.", price: "₱115" },
                        { icon: "🥮", title: "Kouign-Amann", description: "Caramelized Breton pastry with crisp, buttery layers.", price: "₱145" },
                        { icon: "🥐", title: "Chocolate Hazelnut Croissant", description: "A flaky croissant filled with chocolate hazelnut spread.", price: "₱145" },
                        { icon: "🍎", title: "Apple Turnover", description: "Golden puff pastry filled with cinnamon apple.", price: "₱125" },
                        { icon: "🫐", title: "Blueberry Danish", description: "Buttery Danish topped with blueberry and vanilla cream.", price: "₱130" },
                        { icon: "🥬", title: "Spinach Feta Puff", description: "Savory flaky pastry filled with spinach and feta.", price: "₱135" },
                        { icon: "🌭", title: "Sausage Roll", description: "Seasoned sausage wrapped in crisp golden pastry.", price: "₱130" },
                        { icon: "🧀", title: "Cheddar Scone", description: "Tender savory scone with sharp cheddar cheese.", price: "₱105" },
                        { icon: "🍫", title: "Chocolate Brioche", description: "Soft enriched brioche with chocolate folded through.", price: "₱125" },
                        { icon: "🍵", title: "Matcha Croissant", description: "Buttery croissant filled with smooth matcha cream.", price: "₱150" },
                        { icon: "☁️", title: "Vanilla Cream Puff", description: "Light choux pastry filled with vanilla bean cream.", price: "₱110" },
                        { icon: "🍌", title: "Banana Cream Danish", description: "Flaky pastry with banana and pastry cream.", price: "₱130" },
                        { icon: "🧀", title: "Ensaymada", description: "Soft Filipino brioche topped with butter, sugar, and cheese.", price: "₱105" },
                        { icon: "🫒", title: "Rosemary Focaccia", description: "Olive oil focaccia with fragrant rosemary and sea salt.", price: "₱120" }
                    ]
                },
                {
                    title: "Cakes & Cookies",
                    products: [
                        { icon: "🍰", title: "Basque Cheesecake", description: "Creamy cheesecake finished with a caramelized top.", price: "₱175" },
                        { icon: "🧁", title: "Blueberry Muffin", description: "Soft, golden muffin filled with juicy blueberries.", price: "₱85" },
                        { icon: "🍪", title: "Chocolate Chip Cookie", description: "Warm, buttery cookie with generous chocolate pieces.", price: "₱75" },
                        { icon: "🍌", title: "Banana Bread", description: "Moist banana loaf with a gently toasted crust.", price: "₱95" },
                        { icon: "🍰", title: "Carrot Cake", description: "Spiced carrot cake with a smooth cream cheese finish.", price: "₱165" },
                        { icon: "🍫", title: "Fudge Brownie", description: "Deep chocolate brownie with a soft, fudgy center.", price: "₱90" },
                        { icon: "❤️", title: "Red Velvet Cupcake", description: "Cocoa-red sponge finished with cream cheese frosting.", price: "₱110" },
                        { icon: "🍋", title: "Lemon Loaf", description: "Tender lemon cake with a light citrus glaze.", price: "₱105" },
                        { icon: "☕", title: "Tiramisu Cup", description: "Espresso-soaked sponge layered with mascarpone cream.", price: "₱180" },
                        { icon: "🍵", title: "Matcha Roll Cake", description: "Soft matcha sponge rolled around delicate cream.", price: "₱155" },
                        { icon: "🥭", title: "Mango Cheesecake", description: "Creamy cheesecake with a bright mango topping.", price: "₱180" },
                        { icon: "🍓", title: "Strawberry Shortcake", description: "Vanilla sponge, fresh strawberries, and whipped cream.", price: "₱175" },
                        { icon: "🍮", title: "Caramel Flan", description: "Silky baked custard with a glossy caramel top.", price: "₱110" },
                        { icon: "🌋", title: "Chocolate Lava Cake", description: "Warm chocolate cake with a soft molten center.", price: "₱185" },
                        { icon: "🍪", title: "Oatmeal Raisin Cookie", description: "Chewy oats, raisins, and a hint of cinnamon.", price: "₱80" },
                        { icon: "🍪", title: "Double Chocolate Cookie", description: "Rich cocoa cookie packed with dark chocolate chunks.", price: "₱85" },
                        { icon: "🥜", title: "Peanut Butter Cookie", description: "Soft, nutty cookie with a lightly crisp edge.", price: "₱80" },
                        { icon: "🍯", title: "Salted Blondie", description: "Chewy brown-sugar bar finished with flaky sea salt.", price: "₱95" },
                        { icon: "🍰", title: "Marble Loaf Cake", description: "Vanilla and chocolate batters swirled into a tender loaf.", price: "₱110" },
                        { icon: "🌿", title: "Pandan Chiffon Slice", description: "Airy pandan sponge with a delicate coconut aroma.", price: "₱125" }
                    ]
                }
            ]
        }
    };
    let lastCategoryCard = null;

    function createProductCard(product) {
        const article = document.createElement("article");
        article.className = "col-md-6 col-lg-4 menu-product";

        const card = document.createElement("div");
        card.className = "coffee-menu-card";

        const title = document.createElement("h5");
        title.textContent = product.title;

        const description = document.createElement("p");
        description.textContent = product.description;

        const price = document.createElement("strong");
        price.textContent = product.price;

        card.append(title, description, price);
        article.append(card);
        return article;
    }

    function renderCategory(category) {
        const fragment = document.createDocumentFragment();

        menuCatalog[category].groups.forEach(function (group) {
            const section = document.createElement("section");
            section.className = "menu-product-group";

            const heading = document.createElement("h4");
            heading.className = "menu-product-group-title";
            heading.textContent = group.title;

            const grid = document.createElement("div");
            grid.className = "row g-4";

            group.products.forEach(function (product) {
                grid.append(createProductCard(product));
            });

            section.append(heading, grid);
            fragment.append(section);
        });

        menuProducts.replaceChildren(fragment);
    }

    categoryCards.forEach(function (categoryCard) {
        categoryCard.addEventListener("click", function () {
            const category = categoryCard.dataset.category;
            const details = menuCatalog[category];

            lastCategoryCard = categoryCard;
            categoriesView.hidden = true;
            productView.hidden = false;
            selectedTitle.textContent = details.title;
            selectedDescription.textContent = details.description;
            renderCategory(category);
            productView.setAttribute("aria-labelledby", selectedTitle.id);
            selectedTitle.focus();
        });
    });

    backButton.addEventListener("click", function () {
        productView.hidden = true;
        categoriesView.hidden = false;
        if (lastCategoryCard) {
            lastCategoryCard.focus();
        }
    });
}());