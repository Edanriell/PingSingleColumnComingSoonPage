import "./home-page.less";

import { Component } from "solid-js";

import { MainLayout } from "@widgets/layouts/main/ui";

export const HomePage: Component = () => {
	return (
		<MainLayout>
			<main class="home-page">
				<section class="coming-soon">
					<div class="coming-soon__text-content">
						<h1 class="coming-soon__title">
							We are launching <strong>soon!</strong>
						</h1>
						<p class="coming-soon__text">Subscribe and get notified</p>
					</div>
					<form class="coming-soon__notify-form notify-form" method="post">
						<div class="notify-form__field">
							<label class="visually-hidden" for="email">
								Email address
							</label>
							<input
								class="notify-form__input"
								type="email"
								name="email"
								id="email"
								placeholder="Your email address…"
							/>
						</div>
						<button class="notify-form__submit-button button" type="submit">
							Notify Me
						</button>
					</form>
					<div class="coming-soon__dashboard-image dashboard-image">
						<picture>
							<source
								type="image/svg+xml"
								media="(min-width: 1440px)"
								srcset="/images/vector/dashboard-image-lg.svg"
							/>
							<source
								type="image/svg+xml"
								media="(min-width: 375px)"
								srcset="/images/vector/dashboard-image-sm.svg"
							/>
							<img
								class="dashboard-image__main-image"
								src="/images/vector/dashboard-image-sm.svg"
								alt="Ping dashboard demo image"
							/>
						</picture>
						<div class="dashboard-image__slack-logotype-wrapper">
							<picture>
								<source
									type="image/jpg"
									media="(min-width: 1440px)"
									srcset="/images/raster/slack-logotype-lg@1x.png 1x, /images/raster/slack-logotype-lg@2x.png 2x"
								/>
								<source
									type="image/jpg"
									media="(min-width: 375px)"
									srcset="/images/raster/slack-logotype-sm@1x.png 1x, /images/raster/slack-logotype-sm@2x.png 2x"
								/>
								<img
									class="dashboard-image__slack-logotype"
									src="/images/raster/slack-logotype-sm@1x.png"
									srcSet="/images/raster/slack-logotype-sm@2x.png"
									alt="Slack compay logotype"
								/>
							</picture>
						</div>
						<div class="dashboard-image__decorative-green-rectangle"></div>
						<picture>
							<source
								type="image/svg+xml"
								media="(min-width: 1440px)"
								srcset="/images/vector/cross-rectangle-lg.svg"
							/>
							<source
								type="image/svg+xml"
								media="(min-width: 375px)"
								srcset="/images/vector/cross-rectangle-sm.svg"
							/>
							<img
								class="dashboard-image__decorative-cross-rectangle dashboard-image__decorative-cross-rectangle--position--left"
								src="/images/vector/cross-rectangle-sm.svg"
								srcSet="/images/vector/cross-rectangle-sm.svg"
								alt=""
							/>
						</picture>
						<picture>
							<source
								type="image/svg+xml"
								media="(min-width: 1440px)"
								srcset="/images/vector/cross-rectangle-lg.svg"
							/>
							<source
								type="image/svg+xml"
								media="(min-width: 375px)"
								srcset="/images/vector/cross-rectangle-sm.svg"
							/>
							<img
								class="dashboard-image__decorative-cross-rectangle dashboard-image__decorative-cross-rectangle--position--right"
								src="/images/vector/cross-rectangle-sm.svg"
								srcSet="/images/vector/cross-rectangle-sm.svg"
								alt=""
							/>
						</picture>
					</div>
				</section>
			</main>
		</MainLayout>
	);
};
