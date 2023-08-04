<template>
  <el-col>
    <el-input @change="StartSearch" v-model="keyword" placeholder="请输入内容" style="width: 40%; min-width: 300px"></el-input>
    <el-button circle @click="StartSearch">
      <el-icon>
        <Search />
      </el-icon>
    </el-button>
  </el-col>
</template>

<script>
export default {
  name: "Search_start",

  data() {
    return {
      keyword: "",
      old_keyworld: String,
    };
  },

  mounted() { },

  methods: {
    StartSearch() {
      if (this.keyword != this.old_keyworld && this.keyword != "") {
        this.old_keyworld = this.keyword;
        this.$emit("StartSearch", this.keyword);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>