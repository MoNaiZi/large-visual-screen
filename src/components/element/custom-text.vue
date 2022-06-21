<template>
  <div class="custo_text">
    <div class="v-text" @keydown="handleKeydown" @keyup="handleKeyup">
      <!-- tabindex >= 0 使得双击时聚焦该元素 -->
      <div
        ref="text"
        :class="{ canEdit }"
        @paste="clearStyle"
        :contenteditable="canEdit"
        @mousedown="handleMousedown"
        v-html="cptData.cptDataForm.dataText"
        :style="[main_style]"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "custom-text",
  title: "文字框",
  icon: "ChatLineSquare",
  minIcon: "Edit",
  initWidth: 150,
  initHeight: 40,
  group: "basic",
  props: {
    option: Object,
  },
  data() {
    return {
      cptData: {},
      id: this.$createId(),
      canEdit: false,
      ctrlKey: 17,
      isCtrlDown: false,
    };
  },
  computed: {
    main_style: function () {
      const option = this.option;
      let result = {
        textAlign: option.attribute.textAlign,
        color: option.attribute.textColor,
        fontSize: option.attribute.textSize + "px",
        fontStyle: option.attribute.fontStyle,
        fontWeight: option.attribute.fontWeight,
        lineHeight: option.attribute.textLineHeight + "px",
        backgroundColor: option.attribute.bgColor,
        fontFamily: option.attribute.textFamily,
        textDecoration: option.attribute.textDecoration,
        background: option.attribute.bgColor,
      };
      return result;
    },
  },
  watch: {
    "option.edite": {
      deep: true,
      handler: function (val) {
        this.canEdit = val || false;
        let elemntText = this.$refs.text;
        if (val === false) {
          let txt = elemntText.innerText;
          txt = txt.replace(/[\r\n]/g, "<br>");
          this.cptData.cptDataForm.dataText = txt;
        }
        this.selectText(elemntText);
      },
    },
  },
  created() {
    this.cptData = this.option;
    this.init();
  },
  methods: {
    clearStyle(e) {
      e.preventDefault();
      const clp = e.clipboardData;
      const text = clp.getData("text/plain") || "";
      if (text !== "") {
        document.execCommand("insertText", false, text);
      }
    },
    handleMousedown(e) {
      if (this.canEdit) {
        e.stopPropagation();
      }
    },
    selectText(element) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(element);
      selection.addRange(range);
    },
    handleKeyup(e) {
      this.canEdit && e.stopPropagation();
      if (e.keyCode == this.ctrlkey) {
        this.isCtrlDown = false;
      }
    },
    handleKeydown(e) {
      console.log("按下", e.keyCode, e.target.innerText);
      const keyCodes = [66, 67, 68, 69, 71, 76, 80, 83, 85, 86, 88, 89, 90];
      this.canEdit && e.stopPropagation();
      if (e.keyCode == this.ctrlkey) {
        this.isCtrlDown = true;
      } else if (
        this.isCtrlDown &&
        this.canEdit &&
        keyCodes.includes(e.keyCode)
      ) {
        e.stopPropagation();
      } else if (e.keyCode == 46) {
        e.stopPropagation();
      }
    },
    init() {
      // pollingRefresh(this.uuid, this.option.cptDataForm, this.loadData)
    },
    loadData() {
      // getDataStr(this.option.cptDataForm).then(res => {
      //   this.cptData = res;
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.custo_text {
  width: 100%;
  height: 100%;
  overflow: hidden;
  //   caret-color: #000;
}

.v-text {
  width: 100%;
  height: 100%;
  display: table;

  div {
    display: table-cell;
    width: 100%;
    height: 100%;
    outline: none;
  }

  .canEdit {
    cursor: text;
    height: 100%;
  }
}
</style>
