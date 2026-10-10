<main>
    <section id="home" class="coffee-hero">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 hero-copy">
                    <span class="hero-small-title">CALLE HIRAYA CAFÉ</span>
                    <h1>
                        Welcome to
                        <br>
                        <span>Calle Hiraya Café</span>
                    </h1>

                    <p class="hero-description">
                        Welcome,
                        <strong id="welcomeUser"><?= htmlspecialchars($_SESSION['user_name'] ?? 'coffee lover', ENT_QUOTES, 'UTF-8'); ?></strong>!
                        Discover freshly brewed coffee, handcrafted drinks, and warm moments made just for you.
                    </p>

                    <div class="hero-buttons">
                        <a href="#menu" class="hero-primary-button">Explore Menu</a>
                        <a href="#about" class="hero-secondary-button">Our Story</a>
                    </div>
                </div>

                <div class="col-lg-6 hero-visual-column">
                    <div class="coffee-hero-art">
                        <div class="coffee-glow"></div>
                        <div class="main-coffee-cup" aria-label="Coffee cup illustration">☕</div>
                        <div class="coffee-bean bean-one" aria-hidden="true">●</div>
                        <div class="coffee-bean bean-two" aria-hidden="true">●</div>
                        <div class="coffee-bean bean-three" aria-hidden="true">●</div>

                        <div class="coffee-art-label">
                            <span>FRESHLY BREWED</span>
                            <strong>EVERY DAY</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
