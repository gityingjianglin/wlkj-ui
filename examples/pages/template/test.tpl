<style scoped lang="scss">
  .red {
    color: red
  }
  .test {
    width: 200px;
    height: 100px;
  }
  .test-content {
    font-size: 100px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
  .test-container {
    .wl-header {
      background-color: azure;
    }
    .wl-footer {
      background-color: aquamarine;
    }
    .wl-aside {
      background-color: blue;
    }
    .wl-main {
      background-color: burlywood;
    }
  }
</style>
<template>
  <div class="">
    <div>
      <wl-pagination
        background
        small
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </wl-pagination>
    </div>
    <div>
      <wl-transfer
        v-model="value"
        :data="data"
        :left-default-checked="[2, 3]"
        :right-default-checked="[1]"
        :titles="['Source', 'Target']"
        :button-texts="['到左边', '到右边']"
        @change="transferHandleChange"
        target-order="unshift"
        :props="{
          key: 'value',
          label: 'desc'
        }"></wl-transfer>
    </div>
    <div>
      <wl-date-picker v-model='dateValue' :pickerOptions='pickerOptions'></wl-date-picker>
    </div>
    <div class="dialog-test">
      <wl-button type="text" @click="dialogVisible = true">点击打开 Dialog</wl-button>
      <wl-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <wl-button @click="dialogVisible = false">取 消</wl-button>
          <wl-button type="primary" @click="dialogVisible = false">确 定</wl-button>
        </span>
      </wl-dialog>
    </div>
    <div class="test-container">
      <wl-container>
        <wl-header>Header</wl-header>
        <wl-container>
          <wl-aside width="200px">Aside</wl-aside>
          <wl-container>
            <wl-main>Main</wl-main>
            <wl-footer>Footer</wl-footer>
          </wl-container>
        </wl-container>
      </wl-container>
    </div>
    <wl-card class="box-card">
      <div slot="header">头部</div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </wl-card>
    <wl-skeleton></wl-skeleton>
    <div style="height:500px; overflow:scroll;font-size:100px; width:50px" class="test-backtop">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <wl-backtop target=".test-backtop"></wl-backtop>
    <div >
      
      <wl-collapse v-model="activeNames" @change="handleChange">
        <wl-collapse-item title="一致性 Consistency" name="1">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </wl-collapse-item>
        <wl-collapse-item title="反馈 Feedback" name="2">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </wl-collapse-item>
        <wl-collapse-item title="效率 Efficiency" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </wl-collapse-item>
        <wl-collapse-item title="可控 Controllability" name="4">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </wl-collapse-item>
      </wl-collapse>
    </div>
    <div style="margin-bottom:300px;margin-top: 50px; margin-left: 50px;">
      <wl-select v-model="svalue" @input="showResult" clearable placeholder="请选择">
        <wl-option
          v-for="item, $index in soptions"
          :key="$index"
          :label="item.label"
          :value="item.value">
        </wl-option>
        <div slot="empty">111111</div>
      </wl-select>
    </div>
    <div>
      <wl-radio-group v-model="radio1">
        <wl-radio :label="3" border>备选项</wl-radio>
        <wl-radio :label="6">备选项</wl-radio>
        <wl-radio :label="9">备选项</wl-radio>
      </wl-radio-group>
      <div>{{ radio1 }}</div>
    </div>
    <div>
      <label><input type="radio" value="male" v-model="radio" />男</label>
      <label><input type="radio" value="female" v-model="radio" />女</label>
      <div>{{radio}}</div>
    </div>
    <div>
      <wl-radio v-model="gender" label="male" @change="change">男</wl-radio>
      <wl-radio v-model="gender" label="female" @change="change">女</wl-radio>
      <div>{{ gender }}</div>
    </div>
    <div>
      <wl-checkbox v-model="checked">备选项</wl-checkbox>
      <wl-checkbox-group v-model="checkList">
        <wl-checkbox label="复选框 A"></wl-checkbox>
        <wl-checkbox label="复选框 B"></wl-checkbox>
        <wl-checkbox label="复选框 C"></wl-checkbox>
        <wl-checkbox label="禁用" disabled></wl-checkbox>
        <wl-checkbox label="选中且禁用" disabled></wl-checkbox>
      </wl-checkbox-group>
    </div>
    <wl-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <wl-form-item label="活动名称" prop="name">
        <wl-input
            ref="limitSize"
            type="textarea"
            :autosize="{minRows: 3, maxRows: 5}"
            v-model="textareaValue"
          >
          </wl-input>
      </wl-form-item>
      <wl-form-item>
        <wl-button type="primary" @click="submitForm('ruleForm')">立即创建</wl-button>
        <wl-button @click="resetForm('ruleForm')">重置</wl-button>
      </wl-form-item>
    </wl-form>
    <WlAlert></WlAlert>
    <div @click="showMessage">show message</div>
    <wl-icon name="revenue" @my-test-handler="myTestHandler" test-attr="testAttr">
      <div>1111</div>
      <wl-progress :percentage="30" :show-text="false"></wl-progress>
      <wl-progress :percentage="60" :show-text="false"></wl-progress>
    </wl-icon>
    <div v-loading="false">123</div>
    <div>
      <wl-date-picker :readonly='false' :editable='true'></wl-date-picker>
    </div>
    <div v-if="show" v-loading.body="loading" style="height:100px; background:#eee">hahah</div>
    <wl-link></wl-link>
    <wl-tag></wl-tag>
     <wl-tabs value="first" ref="tabs" >
      <wl-tab-pane label="用户" name="first" disabled>用户</wl-tab-pane>
      <wl-tab-pane label="配置管理" name="second">配置管理</wl-tab-pane>
      <wl-tab-pane label="角色管理" name="third">角色管理</wl-tab-pane>
      <wl-tab-pane label="定时任务补偿"  name="fourth">定时任务补偿</wl-tab-pane>
    </wl-tabs>
    <wl-tree :data="treeData" :props="defaultProps" ></wl-tree>
    <wl-switch>2323232323</wl-switch>
    <wl-cascader></wl-cascader>
    <wl-row type="flex" :gutter="20" justify="center"><div>hello world</div></wl-row>
    <wl-progress :percentage="0"></wl-progress>
    <wl-progress :percentage="30" :show-text="false"></wl-progress>
    <wl-progress :percentage="20" :text-inside="true" :stroke-width="28"></wl-progress>
    <wl-progress :percentage="50" status="success"></wl-progress>
    <wl-progress :percentage="50" status="exception"></wl-progress>
    <wl-progress type="circle" :percentage="25" ></wl-progress>
    <wl-progress type="circle" :percentage="25" status="success"></wl-progress>
    <wl-progress type="circle" ref="circleException" :percentage="80" status="exception"></wl-progress>
    <wl-progress type="dashboard" :percentage="10" color="#e6a23c"></wl-progress>
    <wl-progress :percentage="70" ></wl-progress>
    <wl-row :gutter="10">
      <wl-col :span="12">哈哈哈哈</wl-col>
    </wl-row>
    <wl-row :gutter="10">
      <wl-col :md="6" ref="col" :xs="{ span: 2, offset: 1 }" :lg="{ span: 4, offset: 3}"></wl-col>
    </wl-row>
    <h1 class="red">wlkj-ui介绍</h1>
    <wl-scrollbar class="test">
      <div class="test-content">收到了开发技术的垃圾水电费递四方速递分类第三方</div>
    </wl-scrollbar>
  </div>
</template>
<script>
  // import throttle from 'throttle-debounce/throttle';
  export default {
    created() {
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      change(val) {
        console.log('val', val);
      },
      myTestHandler() {},
      showMessage() {
        this.$message.success({
          message: 'haha',
          duration: 0
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      showResult(val) {
        console.log('aaaaaaaaaaaaaaaaa:', val);
        console.log(this.value);
      },
      handleChange(val) {
        console.log(val);
      },
      transferHandleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      }
    },
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            value: i,
            desc: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        dialogVisible: false,
        gender: '',
        radio: '',
        radio1: 3,
        checkList: ['选中且禁用', '复选框 A'],
        checked: true,
        show: false,
        loading: false,
        ruleForm: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        textareaValue: 'sda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasd',
        soptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        svalue: '',
        activeNames: ['1'],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() || time.getTime() < new Date('2023-01-01');
          }
        },
        dateValue: new Date(),
        data: generateData(),
        value: [1, 4],
        currentPage: 1,
        treeData: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    beforeDestroy() {
    },
    mounted() {
      console.log('aaaaaaaaaaaaaaaaaaaaaaa');
      console.log(this);
      /* setTimeout(() => {
        this.show = true;
        this.loading = true;
      }, 2000);
      setTimeout(() => {
        this.loading = false;
      }, 3000);
      let loading1 = this.$loading();
      setTimeout(() => {
        loading1.close();
      }, 2000); */
      setTimeout(() => {
        this.$notify({
          title: '提示',
          message: '这是一条不会自动关闭的消息',
          duration: 0
        });
      }, 2000);
      this.$notify({
        title: '成功',
        message: '这是一条成功的提示消息',
        type: 'success'
      });

      this.$message.success({
        message: 'haha',
        duration: 0
      });
      this.$nextTick(() => {
        this.$message.error({
          message: 'haha',
          duration: 0
        });
      });
      this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
        dangerouslyUseHTMLString: true
      });
    }
  };
</script>
