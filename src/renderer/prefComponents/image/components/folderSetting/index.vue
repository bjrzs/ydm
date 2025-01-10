<template>
  <section class="image-folder">
    <h5>{{ $t('image.folderSetting.title') }}</h5>
    <text-box :description="$t('image.folderSetting.location')" :input="imageFolderPath"
      :regexValidator="/^(?:$|([a-zA-Z]:)?[\/\\].*$)/" :defaultValue="folderPathPlaceholder"
      :onChange="value => modifyImageFolderPath(value)"></text-box>
    <div>
      <el-button size="mini" @click="modifyImageFolderPath(undefined)">{{ $t('image.folderSetting.browse') }}</el-button>
      <el-button size="mini" @click="openImageFolder">{{ $t('common.showInFolder') }}</el-button>
    </div>
    <compound>
      <template #head>
        <bool :description="$t('image.folderSetting.relative')"
          more="https://github.com/marktext/marktext/blob/develop/docs/IMAGES.md"
          :bool="imagePreferRelativeDirectory"
          :onChange="value => onSelectChange('imagePreferRelativeDirectory', value)"></bool>
      </template>
      <template #children>
        <text-box :description="$t('image.folderSetting.format')" :input="imageRelativeDirectoryName"
          :regexValidator="/^(?:$|(?![a-zA-Z]:)[^\/\\].*$)/"
          :defaultValue="relativeDirectoryNamePlaceholder"
          :onChange="value => onSelectChange('imageRelativeDirectoryName', value)"></text-box>
        <div class="footnote">
          {{ $t('image.folderSetting.formatNote') }}
        </div>
      </template>
    </compound>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { shell } from 'electron'
import i18n from '@/i18n'
import Bool from '@/prefComponents/common/bool'
import Compound from '@/prefComponents/common/compound'
import TextBox from '@/prefComponents/common/textBox'

export default {
  name: 'FolderSetting',
  i18n,
  components: {
    Bool,
    Compound,
    TextBox
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      imageFolderPath: state => state.preferences.imageFolderPath,
      imagePreferRelativeDirectory: state => state.preferences.imagePreferRelativeDirectory,
      imageRelativeDirectoryName: state => state.preferences.imageRelativeDirectoryName
    }),
    imageInsertAction: {
      get: function () {
        return this.$store.state.preferences.imageInsertAction
      }
    },
    folderPathPlaceholder: {
      get: function () {
        return this.$store.state.preferences.imageFolderPath || ''
      }
    },
    relativeDirectoryNamePlaceholder: {
      get: function () {
        return this.$store.state.preferences.imageRelativeDirectoryName || 'assets'
      }
    }
  },
  methods: {
    openImageFolder () {
      shell.openPath(this.imageFolderPath)
    },
    modifyImageFolderPath (value) {
      return this.$store.dispatch('SET_IMAGE_FOLDER_PATH', value)
    },
    onSelectChange (type, value) {
      this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
    }
  }
}
</script>

<style scoped>
.image-folder .footnote {
  font-size: 13px;
  & code {
    font-size: 13px;
  }
}
</style>
