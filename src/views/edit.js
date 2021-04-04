import { html } from '../../node_modules/lit-html/lit-html.js';
import { editCategory, getDetails } from '../api/data.js';


const editTemplate = (category,onSubmit) => html`
<section id="edit-page" class="content">
    <h1>Edit Article</h1>

    <form @submit=${onSubmit}id="edit" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Enter article title" .value=${category.title}>
            </p>

            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder="Enter article category" .value=${category.category}>
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content" .value=${category.content}></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes">
            </p>

        </fieldset>
    </form>
</section>
`;


export async function editPage(ctx) {
    const categoryId = ctx.params.id;
    const category = await getDetails(categoryId);
    ctx.render(editTemplate(category, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title').trim();
        const category = formData.get('category').trim();
        const content = formData.get('content').trim();

        if (title == '' || category == '' || content == '') {
            return alert('All fields shoul\'d be filled');
        }

        if (category == "JavaScript" || category == "C#" || category == "Java" || category == "Python") {
            await editCategory(categoryId, {
                title,
                category,
                content
            });
    
            ctx.page.redirect(`/details/${ categoryId }`);
        } else {
            return alert('Category is not avaible');

        }
    }
    
       
}