<template>
  <div>
    <label
      for="repository_url"
      class="block text-sm font-medium text-gray-700"
    >Repository URL</label>
    <div class="flex mt-1 rounded-md shadow-sm">
      <span
        class="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300  bg-gray-50 rounded-l-md sm:text-sm"
      >
        github.com/
      </span>
      <input
        id="repository_url"
        type="text"
        :value="repository_url"
        placeholder="you/your-notebook/repository"
        class="flex-grow block w-full min-w-0 border-gray-300 rounded-none  focus:ring-sky-500 focus:border-sky-500 rounded-r-md sm:text-sm"
        @input="setRepositoryUrl"
      >
    </div>
    <p
      id="email-description"
      class="mt-2 text-sm text-gray-500"
    >
      We'll only use this for spam.
    </p>
  </div>

  <div>
    <label
      for="github_personnal_token"
      class="block text-sm font-medium text-gray-700"
    >GitHub Personnal Token</label>
    <div class="mt-1">
      <input
        id="github_personnal_token"
        type="text"
        :value="github_personnal_token"
        class="block w-full border-gray-300 rounded-md shadow-sm  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="https://github.com/you/your-notebook/repository"
        aria-describedby="github_personnal_token"
        @input="setGithubPersonnalToken"
      >
    </div>
    <p
      id="email-description"
      class="mt-2 text-sm text-gray-500"
    >
      <a
        class="text-blue-500"
        href="https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token"
        target="_blank"
      >Creating a personal access token</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Settings',
  setup() {
    const store = useStore();
    return {
      repository_url: computed(() => store.state.repository_url),
      github_personnal_token: computed(
        () => store.state.github_personnal_token,
      ),
      setRepositoryUrl: (e) => store.commit('setRepositoryUrl', e.target.value),
      setGithubPersonnalToken: (e) =>
        store.commit('setGithubPersonnalToken', e.target.value),
    };
  },
});
</script>
