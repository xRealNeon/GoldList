<style>
/* I'm too dumb to do this in bootstrap. */
#content {
    grid-column: 2;
}

.card {
    width: 60vw !important;
    position: relative;
    display: block;
}

@media (pointer: none),
(pointer: coarse) {
    .card {
        width: 90vw !important;
    }
}

#wrapper {
    display: grid;
    grid-template-columns: auto max-content auto;
}

#toTop {
    display: none;
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 99;
}
</style>

<template>
<div>
    <ais-instant-search :search-client="searchClient" index-name="repos">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
            <a class="navbar-brand">NeoCode`s Gold List aka ⭐`s</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="https://github.com/xRealNeon" target="_blank">My Profile</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://github.com/xRealNeon?tab=stars" target="_blank">My Stars</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://github.com/xRealNeon/GoldList" target="_blank">This Project</a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <ais-search-box>
                        <div slot-scope="{ currentRefinement, refine }">
                            <input class="form-control mr-sm-2" type="search" :value="currentRefinement" @input="refine($event.currentTarget.value)" placeholder="Search" aria-label="Search" />
                        </div>
                    </ais-search-box>
                </form>
            </div>
        </nav>
        <div id="wrapper">
            <div id="content">
                <ais-infinite-hits>
                    <div slot-scope="{ items, refineNext }">
                        <div v-for="item in items" :key="item.objectID">
                            <div class="card mb-2" data-aos="fade-up" data-aos-duration="300">
                                <div class="card-body">
                                    <h5 class="card-title"><img :src="item.owner.avatar_url" width="55px" class="rounded mr-2">{{ item.full_name }} <span class="badge badge-success">{{ item.stargazers_count }} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg></span></h5>
                                    <p class="card-text">
                                        {{ item.description }}
                                    </p>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <a :href="item.html_url" class="btn btn-primary" target="_blank">Open</a>
                                        <a :href="item.homepage" v-if="item.homepage" class="btn btn-secondary" target="_blank">Open Homepage</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button @click="refineNext" id="loadMore" class="d-none">
                            Show more results
                        </button>
                    </div>
                </ais-infinite-hits>
            </div>
        </div>
        <a onclick="window.scrollTo({top: 0, behavior: 'smooth'});" id="toTop" title="Go to top" class="btn btn-primary">Top</a>
    </ais-instant-search>
</div>
</template>

<script>
import instantMeiliSearch from "@meilisearch/instant-meilisearch";

export default {
    data() {
        return {
            searchClient: instantMeiliSearch(
                "https://goldsearch.neocde.me/",
                "97a89c28e09c363f63356179664e207af4fc6d834a7b1e596770da2b7e57fa1d"
            ),
        };
    },
};
</script>
