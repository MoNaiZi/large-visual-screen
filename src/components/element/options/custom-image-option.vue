<template>
  <div>
    <el-form label-width="80px" size="mini">
      <el-form-item label="选择图片">
        <el-image
          v-if="data.url"
          @click.stop="showGallery"
          style="width: 168px; height: 160px; cursor: pointer"
          :src="data.url"
          fit="fill"
        />
        <div v-else @click.stop="showGallery" class="formItemUpload">
          <i class="el-icon-plus"></i>
        </div>
      </el-form-item>
      <el-form-item label="显示方式">
        <el-select v-model="data.fit" placeholder="请选择填充方式">
          <el-option label="fill" value="fill" />
          <el-option label="contain" value="contain" />
          <el-option label="cover" value="cover" />
          <el-option label="none" value="none" />
          <el-option label="scale-down" value="scale-down" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="点击放大">
        <el-radio-group v-model="data.preview">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item> -->
    </el-form>
    <!-- <gallery ref="gallery" @confirmCheck="confirmCheck"/> -->
  </div>
</template>

<script>
// import Gallery from "@/components/gallery";
const utils = require("@/utils/utils");
export default {
  name: "custom-image-option",
  // components: {Gallery},
  props: { attribute: Object },
  data() {
    return {
      data: this.attribute,
    };
  },
  methods: {
    async showGallery() {
      const img = await utils.asyncUpImg();
      if (img) {
        this.data.url = img;
      }
    },
    confirmCheck(fileUrl) {
      this.data.url = fileUrl;
    },
  },
};
</script>

<style scoped>
.formItemUpload {
  width: 120px;
  height: 120px;
  background-color: #fff;
  border-radius: 6px;
  text-align: center;
  line-height: 120px;
  font-size: 40px;
  color: #aaa;
}
</style>
