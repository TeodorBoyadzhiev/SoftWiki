import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { logout } from './api/data.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';


setUserNav();
const main = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', logoutBtn);

page('/login',decorateContext,loginPage );
page('/register',decorateContext,registerPage );
page('/catalog',decorateContext,catalogPage );
page('/', decorateContext, homePage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/create', decorateContext, createPage);


page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav; 

    next();
}

function setUserNav() {

    const email = sessionStorage.getItem('email');

    if (email != null) {
        document.getElementById('user').style.display = '';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = '';
    }

}

async function logoutBtn() {
    await logout();
    setUserNav();
    page.redirect('/');
}