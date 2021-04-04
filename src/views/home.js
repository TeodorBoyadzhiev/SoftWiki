import { html } from '../../node_modules/lit-html/lit-html.js';

import { category } from '../api/data.js';



const homeTemplate = (articles) => html`<section id="home-page" class="content">
    <h1>Recent Articles</h1>

    ${articles.length == 0 ? html` <section class="recent python">
        <h2>Python</h2>
        <h3 class="no-articles">No articles yet</h3>
    </section>` : articles.map(singleTemplate)}

</section>`;

const singleTemplate = (article) => html`
<section class="recent ${article.category}">
    <h2>${article.category}</h2>
    <article>
        <h3>${article.title}</h3>
        <p>${article.content}</p>
        <a href="/details/${article._id}" class="btn details-btn">Details</a>
    </article>
</section>`;



export async function homePage(ctx) {
    const articles = await category();
    ctx.render(homeTemplate(articles));
}