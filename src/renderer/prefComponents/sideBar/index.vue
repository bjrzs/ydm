<template>
  <div class="pref-sidebar">
    <h3 class="title">{{ $t('preferences.title') }}</h3>
    <section class="search-wrapper">
      <el-autocomplete
        popper-class="pref-autocomplete"
        v-model="state"
        :fetch-suggestions="querySearch"
        :placeholder="$t('preferences.searchPlaceholder')"
        :trigger-on-focus="false"
        @select="handleSelect">
        <i
          class="el-icon-search el-input__icon"
          slot="suffix"
        >
        </i>
        <template slot-scope="{ item }">
          <div class="name">{{ $t(`preferences.${item.category}`) }}</div>
          <span class="addr">{{ $t(`preferences.${item.preference}`) }}</span>
        </template>
      </el-autocomplete>
    </section>
    <section class="category">
      <div v-for="c of category" :key="c.name" class="item"
        @click="handleCategoryItemClick(c)"
        :class="{active: c.label === currentCategory}"
      >
        <svg :viewBox="c.icon.viewBox">
          <use :xlink:href="c.icon.url"></use>
        </svg>
        <span>{{ $t(`preferences.${c.name.toLowerCase()}`) }}</span>
      </div>
    </section>
  </div>
</template>
<script>
import { ipcRenderer } from 'electron'
import { category, searchContent } from './config'

export default {
  data () {
    this.category = category
    return {
      currentCategory: 'general',
      restaurants: [],
      state: ''
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name !== from.name) {
        this.currentCategory = to.name
      }
    }
  },
  methods: {
    querySearch (queryString, cb) {
      const restaurants = this.restaurants
      const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // call callback return this results
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.preference.toLowerCase().indexOf(queryString.toLowerCase()) >= 0) ||
            (restaurant.category.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
      }
    },
    loadAll () {
      return searchContent
    },
    handleSelect (item) {
      this.$router.push({
        path: `/preference/${item.category.toLowerCase()}`
      })
    },
    handleCategoryItemClick (item) {
      const { currentCategory } = this
      if (item.name.toLowerCase() !== currentCategory) {
        this.$router.push({
          path: item.path
        })
      }
    },
    onIpcCategoryChange (event, category) {
      const validRoute = category && this.$router.getRoutes().findIndex(route => route.path.endsWith(`/${category}`)) !== -1
      if (validRoute) {
        this.$router.push({
          path: `/preference/${category}`
        })
      }
    }
  },

  mounted () {
    this.restaurants = this.loadAll()
    if (this.$route && this.$route.name) {
      this.currentCategory = this.$route.name
    }
    ipcRenderer.on('settings::change-tab', this.onIpcCategoryChange)
  },
  unmounted () {
    ipcRenderer.removeAllListener('settings::change-tab', this.onIpcCategoryChange)
  }
}
</script>

<style>
  .pref-sidebar {
    -webkit-app-region: drag;
    display: flex;
    flex-direction: column;
    background: var(--sideBarBgColor);
    width: var(--prefSideBarWidth);
    height: 100vh;
    padding-top: 30px;
    box-sizing: border-box;
    & h3 {
      margin: 0;
      font-weight: normal;
      text-align: center;
      color: var(--sideBarColor);
    }
  }
  .search-wrapper {
    -webkit-app-region: no-drag;
    padding: 0 20px;
    margin: 30px 0;
  }
  .el-autocomplete {
    width: 100%;
    & .el-input__inner {
      background: transparent;
      height: 35px;
      line-height: 35px;
    }
  }
  .pref-autocomplete.el-autocomplete-suggestion {
    background: var(--floatBgColor);
    border-color: var(--floatBorderColor);
    & .el-autocomplete-suggestion__wrap li:hover {
      background: var(--floatHoverColor);
    }
    & .popper__arrow {
      display: none;
    }
    & li {
      line-height: normal;
      padding: 7px;
      opacity: .8;

      & .name {
        text-overflow: ellipsis;
        overflow: hidden;
        color: var(--editorColor80);
      }
      & .addr {
        font-size: 12px;
        color: var(--editorColor);
      }

      & .highlighted .addr {
        color: var(--editorColor);
      }
    }
  }
  .category {
    -webkit-app-region: no-drag;
    overflow-y: auto;
    & .item {
      width: 100%;
      height: 50px;
      font-size: 18px;
      color: var(--sideBarColor);
      padding-left: 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      position: relative;
      user-select: none;
      & > svg {
        width: 28px;
        height: 28px;
        fill: var(--iconColor);
        margin-right: 15px;
      }
      &:hover {
        background: var(--sideBarItemHoverBgColor);
      }
      &::before {
        content: '';
        width: 4px;
        height: 0;
        background: var(--highlightThemeColor);
        position: absolute;
        left: 0;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        transition: height .25s ease-in-out;
        top: 50%;
        transform: translateY(-50%);
      }
      &.active {
        color: var(--sideBarTitleColor);
      }
      &.active::before {
        height: 100%;
      }
    }
  }
</style>
