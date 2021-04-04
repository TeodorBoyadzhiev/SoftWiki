import { html } from '../../node_modules/lit-html/lit-html.js';
import { getDetails, deleteCategory } from '../api/data.js';

const detailsTemplate = (category, isOwner, onClick) => html`
<section id="details-page" class="content details">
    <h1>Arrays</h1>

    <div class="details-content">
        <strong>Published in category ${category.category}</strong>
        <p>${category.content}</p>

        ${isOwner ? html`<div class="buttons">
            <a @click=${onClick} class="btn delete">Delete</a>
            <a href="/edit/${category._id}" class="btn edit">Edit</a>
            <a href="/" class="btn back">Back</a>
                         </div>`  : html `<a href="/" class="btn back">Back</a>`}

    </div>
</section>
`;


export async function detailsPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const categoryId = ctx.params.id;
    
    const category = await getDetails(categoryId);
    const isOwner = userId === category._ownerId;
    ctx.render(detailsTemplate(category, isOwner, onClick));

    async function onClick(event) {
        event.preventDefault();
        const confirmed = confirm('Are you sure to delete this category?');
        if (confirmed) {
            await deleteCategory(categoryId);
            ctx.page.redirect('/');
        }
    }

}

