import { createApp } from 'vue';

import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import App from '/@/App.vue';
import router from '/@/router';

import './index.css';

// Create a new store instance.
const store = createStore({
    state() {
        return {
            repository_url: null,
            github_personnal_token: null,
        };
    },
    mutations: {
        setRepositoryUrl(state, repository_url) {
            state.repository_url = repository_url;
        },
        setGithubPersonnalToken(state, github_personnal_token) {
            state.github_personnal_token = github_personnal_token;
        },
    },
    plugins: [createPersistedState()],

});

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');
