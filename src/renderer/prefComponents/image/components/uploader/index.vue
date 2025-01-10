<template>
  <div class="pref-image-uploader">
    <h5>{{ $t('image.uploader.title') }}</h5>
    <section class="current-uploader">
      <div v-if="isValidUploaderService(currentUploader)">
        {{ $t('image.uploader.currentService', { service: getServiceNameById(currentUploader) }) }}
      </div>
      <span v-else>{{ $t('image.uploader.noService') }}</span>
    </section>
    <section class="configration">
      <cur-select :value="currentUploader" :options="uploaderOptions"
        :onChange="value => setCurrentUploader(value)"></cur-select>
      <div class="picgo" v-if="currentUploader === 'picgo'">
        <div v-if="!picgoExists" class="warning">
          {{ $t('image.uploader.picgo.notInstalled') }}
          <span class="link" @click="open('https://github.com/PicGo/PicGo-Core')">picgo</span>
          {{ $t('image.uploader.picgo.installFirst') }}
        </div>
      </div>
      <div class="github" v-if="currentUploader === 'github'">
        <div class="warning">{{ $t('image.uploader.github.deprecated') }}</div>
        <div class="form-group">
          <div class="label">
            {{ $t('image.uploader.github.token') }}:
            <el-tooltip class="item" effect="dark"
              :content="$t('image.uploader.github.tokenNote')"
              placement="top-start">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </div>
          <el-input v-model="githubToken" :placeholder="$t('image.uploader.github.tokenPlaceholder')" size="mini"></el-input>
        </div>
        <div class="form-group">
          <div class="label">{{ $t('image.uploader.github.owner') }}:</div>
          <el-input v-model="github.owner" :placeholder="$t('image.uploader.github.ownerPlaceholder')" size="mini"></el-input>
        </div>
        <div class="form-group">
          <div class="label">{{ $t('image.uploader.github.repo') }}:</div>
          <el-input v-model="github.repo" :placeholder="$t('image.uploader.github.repoPlaceholder')" size="mini"></el-input>
        </div>
        <div class="form-group">
          <div class="label">{{ $t('image.uploader.github.branch') }}:</div>
          <el-input v-model="github.branch" :placeholder="$t('image.uploader.github.branchPlaceholder')" size="mini"></el-input>
        </div>
        <legal-notices-checkbox class="github"
          :class="[{ 'error': legalNoticesErrorStates.github }]"
          :uploaderService="uploadServices.github"></legal-notices-checkbox>
        <div class="form-group">
          <el-button size="mini" :disabled="githubDisable" @click="save('github')">{{ $t('common.save') }}</el-button>
        </div>
      </div>
      <div class="script" v-else-if="currentUploader === 'cliScript'">
        <div class="description">{{ $t('image.uploader.script.description') }}</div>
        <div class="form-group">
          <div class="label">{{ $t('image.uploader.script.location') }}:</div>
          <el-input v-model="cliScript" :placeholder="$t('image.uploader.script.locationPlaceholder')" size="mini"></el-input>
        </div>
        <div class="form-group">
          <el-button size="mini" :disabled="cliScriptDisable" @click="save('cliScript')">{{ $t('common.save') }}</el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { shell } from 'electron'
import i18n from '@/i18n'
import services, { isValidService } from './services.js'
import legalNoticesCheckbox from './legalNoticesCheckbox'
import { isFileExecutableSync } from '@/util/fileSystem'
import CurSelect from '@/prefComponents/common/select'
import commandExists from 'command-exists'
import notice from '@/services/notification'

export default {
  name: 'ImageUploader',
  i18n,
  components: {
    legalNoticesCheckbox,
    CurSelect
  },
  data () {
    this.uploaderOptions = Object.keys(services).map(name => ({
      label: this.$t(`image.uploader.services.${name}`),
      value: name
    }))
    return {
      githubToken: '',
      github: {
        owner: '',
        repo: '',
        branch: ''
      },
      cliScript: '',
      picgoExists: true,
      uploadServices: services,
      legalNoticesErrorStates: {
        github: false
      }
    }
  },
  computed: {
    currentUploader: {
      get: function () {
        return this.$store.state.preferences.currentUploader
      }
    },
    imageBed: {
      get: function () {
        return this.$store.state.preferences.imageBed
      }
    },
    prefGithubToken: {
      get: function () {
        return this.$store.state.preferences.githubToken
      }
    },
    prefCliScript: {
      get: function () {
        return this.$store.state.preferences.cliScript
      }
    },
    githubDisable () {
      return !this.githubToken || !this.github.owner || !this.github.repo
    },
    cliScriptDisable () {
      if (!this.cliScript) {
        return true
      }
      return !isFileExecutableSync(this.cliScript)
    }
  },
  watch: {
    imageBed: function (value, oldValue) {
      if (value !== oldValue) {
        this.github = value.github
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.github = this.imageBed.github
      this.githubToken = this.prefGithubToken
      this.cliScript = this.prefCliScript
      this.testPicgo()

      if (services.hasOwnProperty(this.currentUploader)) {
        services[this.currentUploader].agreedToLegalNotices = true
      }
    })
  },
  methods: {
    isValidUploaderService (name) {
      return isValidService(name)
    },

    getServiceNameById (id) {
      const service = services[id]
      return service ? service.name : id
    },

    open (link) {
      shell.openExternal(link)
    },

    save (type) {
      if (!this.validate(type)) {
        return
      }
      const newImageBedConfig = Object.assign({}, this.imageBed, { [type]: this[type] })
      this.$store.dispatch('SET_USER_DATA', {
        type: 'imageBed',
        value: newImageBedConfig
      })
      if (type === 'github') {
        this.$store.dispatch('SET_USER_DATA', {
          type: 'githubToken',
          value: this.githubToken
        })
      }
      if (type === 'cliScript') {
        this.$store.dispatch('SET_USER_DATA', {
          type: 'cliScript',
          value: this.cliScript
        })
      }
      notice.notify({
        title: this.$t('common.saveConfig'),
        message: type === 'github' ? this.$t('image.uploader.github.saveSuccess') : this.$t('image.uploader.script.saveSuccess'),
        type: 'primary'
      })
    },

    setCurrentUploader (value) {
      const type = 'currentUploader'
      this.$store.dispatch('SET_USER_DATA', { type, value })
    },

    testPicgo () {
      this.picgoExists = commandExists.sync('picgo')
    },

    validate (value) {
      const service = services[value]
      const { agreedToLegalNotices } = service
      if (!agreedToLegalNotices) {
        this.legalNoticesErrorStates[value] = true
        return false
      }
      if (this.legalNoticesErrorStates[value] !== undefined) {
        this.legalNoticesErrorStates[value] = false
      }

      return true
    }
  }
}
</script>

<style>
.pref-image-uploader {
  color: var(--editorColor);
  font-size: 14px;

  & .current-uploader {
    margin: 20px 0;
  }
  & .warning {
    color: var(--deleteColor);
  }
  & .link {
    color: var(--themeColor);
    cursor: pointer;
  }
  & .description {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  & .form-group {
    margin: 20px 0 0 0;
  }
  & .label {
    margin-bottom: 10px;
  }
  & .el-input__inner {
    background: transparent;
  }
  & .el-button.btn-reset,
  & .button-group {
    margin-top: 30px;
  }
  & .pref-cb-legal-notices {
    &.github {
      margin-top: 30px;
    }
    &.error {
      border: 1px solid var(--deleteColor);
    }
  }
}
</style>
