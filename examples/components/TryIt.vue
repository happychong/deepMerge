<template>
<div>
  <h1>Try It</h1>
  <el-row>
    <el-col :span="10">
      <h2>原对象</h2></el-col>
    <el-col :span="4">&nbsp;</el-col>
    <el-col :span="10">
      <h2>生成对象</h2></el-col>
    <el-col :span="10">
      <div>
        <el-input type="textarea" ref="old" :rows="10" class="width100p" v-model="old"></el-input>
      </div>
    </el-col>
    <el-col :span="4">
      <el-button type="text" @click="doCopy()">拷贝</el-button>
      </br>
      deepClone(old)
    </el-col>
    <el-col :span="10">
      <div>
        <el-input type="textarea" ref="created" :rows="10" class="width100p" v-model="created"></el-input>
      </div>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="7">
      <h2>原对象old2</h2></el-col>
    <el-col :span="7">
      <h2>目标对象target</h2></el-col>
    <el-col :span="3">&nbsp;</el-col>
    <el-col :span="7">
      <h2>最终的target对象</h2></el-col>

    <el-col :span="7">
      <div>
        <el-input type="textarea" ref="old2" :rows="10" class="width100p" v-model="old2"></el-input>
      </div>
    </el-col>
    <el-col :span="7">
      <div>
        <el-input type="textarea" ref="target" :rows="10" class="width100p" v-model="target"></el-input>
      </div>
    </el-col>
    <el-col :span="3">
      <el-button type="text" @click="doCopyTo()">原对象拷贝到目标对象上</el-button>
      </br>
      deepClone(old2, target)
    </el-col>
    <el-col :span="7">
      <div>
        <el-input type="textarea" ref="created" :rows="10" class="width100p" v-model="created2"></el-input>
        <p>注意：这里对于值为undefined的情况是有效额，只是在这里显示的时候，JSON.stringify方法给过滤掉了</p>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import deepMerge from 'deepMerge';
export default {
  components: {},
  name: 'TryIt',
  data() {
    return {
      old: '',
      created: '',
      old2: '',
      target: '',
      created2: ''
    }
  },
  methods: {
    doCopy() {
      var old = null;
      old = eval("(" + this.old + ")");
      /*
      {
          a: 1,
          b: '2',
          c: [4,5],
          d: {
              e: null,
              f: [6, 7]
          },
          g: undefined
      }
      */
      this.created = JSON.stringify(deepMerge(old));
    },
    doCopyTo() {
      var old2 = null;
      old2 = eval("(" + this.old2 + ")");
      var target = eval("(" + this.target + ")");
      /*
      {
          z: '123456789',
      }
      */
      this.created2 = JSON.stringify(deepMerge(old2, target));
      // console.log(deepMerge(old2, target, {ooo: 'dfjsjfodsj', c: [888], d: [1]}));
    }
  },
  mounted() {
    this.old = JSON.stringify({
        a: 1,
        b: '2',
        c: [4,5],
        d: {
            e: null,
            f: [6, 7]
        },
        g: undefined
    });
    this.doCopy();
    this.old2 = JSON.stringify({
        a: 1,
        b: '2',
        c: [4,5],
        d: {
            e: null,
            f: [6, 7]
        },
        g: undefined
    });
    this.target = JSON.stringify({
        z: '123456789',
    });

    this.doCopyTo();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.width100p {
  width: 100%
}
</style>
