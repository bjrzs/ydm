<template>
  <div class="pref-editor">
    <h4>{{ $t('editor.title') }}</h4>
    <compound>
      <template #head>
        <h6 class="title">{{ $t('editor.textEditorSettings') }}</h6>
      </template>
      <template #children>
        <range
          :description="$t('editor.fontSize')"
          :value="fontSize"
          :min="12"
          :max="32"
          unit="px"
          :step="1"
          :onChange="value => onSelectChange('fontSize', value)"
        ></range>
        <range
          :description="$t('editor.lineHeight')"
          :value="lineHeight"
          :min="1.2"
          :max="2.0"
          :step="0.1"
          :onChange="value => onSelectChange('lineHeight', value)"
        ></range>
        <font-text-box
          :description="$t('editor.fontFamily')"
          :value="editorFontFamily"
          :onChange="value => onSelectChange('editorFontFamily', value)"
        ></font-text-box>
        <text-box
          :description="$t('editor.maxWidth')"
          :notes="$t('editor.maxWidthNote')"
          :input="editorLineWidth"
          :regexValidator="/^(?:$|[0-9]+(?:ch|px|%)$)/"
          :onChange="value => onSelectChange('editorLineWidth', value)"
        ></text-box>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">{{ $t('editor.codeBlockSettings') }}</h6>
      </template>
      <template #children>
        <range
          :description="$t('editor.codeFontSize')"
          :value="codeFontSize"
          :min="12"
          :max="28"
          unit="px"
          :step="1"
          :onChange="value => onSelectChange('codeFontSize', value)"
        ></range>
        <font-text-box
          :description="$t('editor.codeFontFamily')"
          :onlyMonospace="true"
          :value="codeFontFamily"
          :onChange="value => onSelectChange('codeFontFamily', value)"
        ></font-text-box>
        <bool
          v-show="false"
          :description="$t('editor.showLineNumbers')"
          :bool="codeBlockLineNumbers"
          :onChange="value => onSelectChange('codeBlockLineNumbers', value)"
        ></bool>
        <bool
          :description="$t('editor.trimEmptyLines')"
          :bool="trimUnnecessaryCodeBlockEmptyLines"
          :onChange="value => onSelectChange('trimUnnecessaryCodeBlockEmptyLines', value)"
        ></bool>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">{{ $t('editor.writingBehavior') }}</h6>
      </template>
      <template #children>
        <bool
          :description="$t('editor.autoPairBracket')"
          :bool="autoPairBracket"
          :onChange="value => onSelectChange('autoPairBracket', value)"
        ></bool>
        <bool
          :description="$t('editor.autoPairMarkdown')"
          :bool="autoPairMarkdownSyntax"
          :onChange="value => onSelectChange('autoPairMarkdownSyntax', value)"
        ></bool>
        <bool
          :description="$t('editor.autoPairQuote')"
          :bool="autoPairQuote"
          :onChange="value => onSelectChange('autoPairQuote', value)"
        ></bool>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">{{ $t('editor.fileRepresentation') }}</h6>
      </template>
      <template #children>
        <cur-select
          :description="$t('editor.tabWidth')"
          :value="tabSize"
          :options="tabSizeOptions"
          :onChange="value => onSelectChange('tabSize', value)"
        ></cur-select>
        <cur-select
          :description="$t('editor.lineSeparator')"
          :value="endOfLine"
          :options="endOfLineOptions"
          :onChange="value => onSelectChange('endOfLine', value)"
        ></cur-select>
        <cur-select
          :description="$t('editor.defaultEncoding')"
          :value="defaultEncoding"
          :options="defaultEncodingOptions"
          :onChange="value => onSelectChange('defaultEncoding', value)"
        ></cur-select>
        <bool
          :description="$t('editor.autoDetectEncoding')"
          :bool="autoGuessEncoding"
          :onChange="value => onSelectChange('autoGuessEncoding', value)"
        ></bool>
        <cur-select
          :description="$t('editor.newlineHandling')"
          :value="trimTrailingNewline"
          :options="trimTrailingNewlineOptions"
          :onChange="value => onSelectChange('trimTrailingNewline', value)"
        ></cur-select>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">{{ $t('editor.misc') }}</h6>
      </template>
      <template #children>
        <cur-select
          :description="$t('editor.textDirection')"
          :value="textDirection"
          :options="textDirectionOptions"
          :onChange="value => onSelectChange('textDirection', value)"
        ></cur-select>
        <bool
          :description="$t('editor.hideQuickInsert')"
          :bool="hideQuickInsertHint"
          :onChange="value => onSelectChange('hideQuickInsertHint', value)"
        ></bool>
        <bool
          :description="$t('editor.hideLinkPopup')"
          :bool="hideLinkPopup"
          :onChange="value => onSelectChange('hideLinkPopup', value)"
        ></bool>
        <bool
          :description="$t('editor.autoCheckTasks')"
          :bool="autoCheck"
          :onChange="value => onSelectChange('autoCheck', value)"
        ></bool>
      </template>
    </compound>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import i18n from '@/i18n'
import Compound from '../common/compound'
import FontTextBox from '../common/fontTextBox'
import Range from '../common/range'
import CurSelect from '../common/select'
import Bool from '../common/bool'
import Separator from '../common/separator'
import TextBox from '../common/textBox'
import {
  tabSizeOptions,
  endOfLineOptions,
  textDirectionOptions,
  trimTrailingNewlineOptions,
  getDefaultEncodingOptions
} from './config'

export default {
  name: 'EditorPreferences',
  i18n,
  components: {
    Compound,
    FontTextBox,
    Range,
    CurSelect,
    Bool,
    Separator,
    TextBox
  },
  data () {
    this.tabSizeOptions = tabSizeOptions
    this.endOfLineOptions = endOfLineOptions
    this.textDirectionOptions = textDirectionOptions
    this.trimTrailingNewlineOptions = trimTrailingNewlineOptions
    this.defaultEncodingOptions = getDefaultEncodingOptions()
    return {}
  },
  computed: {
    ...mapState({
      fontSize: state => state.preferences.fontSize,
      editorFontFamily: state => state.preferences.editorFontFamily,
      lineHeight: state => state.preferences.lineHeight,
      autoPairBracket: state => state.preferences.autoPairBracket,
      autoPairMarkdownSyntax: state => state.preferences.autoPairMarkdownSyntax,
      autoPairQuote: state => state.preferences.autoPairQuote,
      tabSize: state => state.preferences.tabSize,
      endOfLine: state => state.preferences.endOfLine,
      textDirection: state => state.preferences.textDirection,
      codeFontSize: state => state.preferences.codeFontSize,
      codeFontFamily: state => state.preferences.codeFontFamily,
      codeBlockLineNumbers: state => state.preferences.codeBlockLineNumbers,
      trimUnnecessaryCodeBlockEmptyLines: state => state.preferences.trimUnnecessaryCodeBlockEmptyLines,
      hideQuickInsertHint: state => state.preferences.hideQuickInsertHint,
      hideLinkPopup: state => state.preferences.hideLinkPopup,
      autoCheck: state => state.preferences.autoCheck,
      editorLineWidth: state => state.preferences.editorLineWidth,
      defaultEncoding: state => state.preferences.defaultEncoding,
      autoGuessEncoding: state => state.preferences.autoGuessEncoding,
      trimTrailingNewline: state => state.preferences.trimTrailingNewline
    })
  },
  methods: {
    onSelectChange (type, value) {
      this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
    }
  }
}
</script>

<style scoped>
  .pref-editor {
    & .image-ctrl {
      font-size: 14px;
      user-select: none;
      margin: 20px 0;
      color: var(--editorColor);
      & label {
        display: block;
        margin: 20px 0;
      }
    }
  }
</style>
