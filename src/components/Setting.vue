<template >
  <el-row id="setting">
    <el-col :span="10">
      <transition-group name="el-fade-in-linear">
        <el-card :body-style="{ padding: '0px' }" :key="0">
          <el-col v-for="(item, index) in acg_type" :key="index">
            <el-switch v-model="type_sw[index]" @change="save_data">
            </el-switch>
            <span>隐藏</span>
            <span :style="{ color: acg_colos[index] }">{{ item }}</span>
          </el-col>
        </el-card>
        <el-card :body-style="{ padding: '0px' }" :key="3">
          <el-button type="danger" @click="deleteAll">
            <el-icon>
              <Delete />
            </el-icon>
            清除所有</el-button>
        </el-card>
        <el-card :key="4">
          <el-collapse>
            <el-collapse-item name="1">
              <template #title>
                <h4>可以请作者喝咖啡</h4>
                <el-icon>
                  <CoffeeCup />
                </el-icon>
              </template>
              <img src="../assets/py.jpg" style="margin-top: 15px;width: 100%;" />
            </el-collapse-item>
          </el-collapse>
          <Chat v-if="false"></Chat>
        </el-card>


      </transition-group>
    </el-col>
    <el-col :span="10">
      <!-- <el-card :body-style="{ padding: '0px' }" :key="0">
        <one-drive></one-drive>
      </el-card> -->
      <el-card :body-style="{ padding: '0px' }" :key="1">
        <el-upload class="upload-demo" action="#" :on-exceed="handleExceed" :on-error="handlesuccess"
          :on-success="handlesuccess" multiple :limit="1">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">上传json文件</div>
        </el-upload>
      </el-card>
      <el-card :body-style="{ padding: '0px' }" :key="2">
        <el-button type="primary" @click="put_outJson">
          <el-icon>
            <Download />
          </el-icon>
          导出数据</el-button></el-card>
      <el-card :body-style="{ padding: '0px' }" :key="4">
        <h2>公告</h2>

        <div v-for="item in Notice.data">
          <br />
          <h5>--{{ item.updatetime }}--</h5>
          <h5>版本:{{ item.version }}</h5>
          <h5 v-for="deleteit in item.info_delete">移除:{{ deleteit }}</h5>
          <h5 v-for="fixit in item.info_fix">修复:{{ fixit }}</h5>
          <h5 v-for="addit in item.info_add">新增:{{ addit }}</h5>
        </div>

      </el-card>
      <el-card :body-style="{ padding: '0px' }" :key="5" v-if="false">
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

import FileSaver from "file-saver";
import DefaultData from "./DefaultData.vue";
import Chat from "./Chat.vue";
import OneDrive from './OneDrive.vue';

export default {
  name: "Setting_page",

  data() {
    return {
      Logintab: "login",
      uploadData: [],
      fileList: [],
      reload: true,
      acg_colos: DefaultData.acg_colos,
      acg_type: DefaultData.acg_type,
      type_sw: DefaultData.type_sw,
      Notice: DefaultData.loading_Notice
    };
  },
  components: {
    Chat,
    OneDrive,
  },
  mounted() {
    if (window.localStorage.getItem("type_sw") != null)
      this.type_sw = JSON.parse(window.localStorage.getItem("type_sw"));
  },

  methods: {
    reload_() {
      this.reload = false;
      this.$nextTick(() => {
        this.reload = true;
      });
    },
    save_data() {
      window.localStorage.setItem("type_sw", JSON.stringify(this.type_sw));
    },
    deleteAll() {
      this.$confirm("此操作将永久清除所有内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.localStorage.clear();
          location.reload();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    put_outJson() {
      let max_length = window.localStorage.length;
      var data = [];

      for (let index = 0; index < max_length; index++) {
        let key = window.localStorage.key(index);
        // if (key == "type_sw" || key == "bg" || key == "setting") continue;

        var numReg = /^[0-9]*$/;
        var numRe = new RegExp(numReg)
        if (!numRe.test(key)) continue;

        data = data.concat(JSON.parse(window.localStorage.getItem(key)));
      }
      data = JSON.stringify(data);
      var blob = new Blob([data], { type: "application/json" });
      FileSaver.saveAs(blob, `备份.json`);
    },
    handlesuccess(res, file) {
      let reader = new FileReader();
      reader.readAsText(file.raw);
      reader.onload = (e) => {
        this.uploadData = [];
        this.uploadData = JSON.parse(e.target.result);
        this.$nextTick(() => {
          window.localStorage.clear();
          for (let index = 0; index < this.uploadData.length; index++) {
            window.localStorage.setItem(
              this.uploadData[index].name,
              JSON.stringify(this.uploadData[index])
            );
          }
          this.$message({
            message: "数据导入成功",
            type: "success",
          });
        });
      };
    },
    handleExceed() {
      this.$message.warning(`只能选择 1 个文件`);
    },
  },
};
</script>

<style lang="scss" scoped>
#setting {
  text-align: left;
  line-height: 30px;
}

.el-card {
  padding: 25px;
}
</style>