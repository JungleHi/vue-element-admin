<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.site_name')" v-model="listQuery.site_name">
      </el-input>
      <el-date-picker clearable @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" v-model="listQuery.created_begin" type="date" format="yyyy-MM-dd" :placeholder="$t('table.created_begin')">
      </el-date-picker>
      <el-date-picker clearable @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" v-model="listQuery.created_end" type="date" format="yyyy-MM-dd" :placeholder="$t('table.created_end')">
      </el-date-picker>

      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.status" :placeholder="$t('table.status')">
        <el-option v-for="item in  statusOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>

      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <br>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
      <el-button class="filter-item" type="primary"  v-waves icon="el-icon-delete" @click="handleBatchDelete">{{$t('table.batch_delete')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%"  @selection-change="changeFun" >

      <el-table-column type="selection" width="55" class="selection" prop='uuid' @selection-change="changeFun">
      </el-table-column>

      <el-table-column align="left" :label="$t('table.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
     
      <el-table-column width="100px" align="left" :label="$t('table.site_name')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.site_name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="left" :label="$t('table.domain')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.domain}}</span>
        </template>
      </el-table-column>
     
      <el-table-column min-width="100px" align="left" :label="$t('table.status')">
        <template slot-scope="scope">
          <span>{{scope.row.status | parseStatus()}}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="left" :label="$t('table.created_customer')">
        <template slot-scope="scope">
          <span>{{scope.row.created_customer_id | parseCreatedCustomer(createdCustomerOptions)}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="left" :label="$t('table.created_at')">
        <template slot-scope="scope">
          <span>{{scope.row.created_at  | parseTime('{y}-{m}-{d}') | dateFilter() }}</span>
        </template>
      </el-table-column>
      
      <el-table-column width="110px" align="left" :label="$t('table.updated_at')">
        <template slot-scope="scope">
          <span>{{scope.row.updated_at  | parseTime('{y}-{m}-{d}') | dateFilter() }}</span>
        </template>
      </el-table-column>
     
      <el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdateJsInfo(scope.row)">{{$t('table.site_js_info')}}</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button  size="mini" type="danger" @click="handleModifyStatus(scope.row,scope.$index)">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog  :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="140px" style='width: 800px; margin-left:50px; margin-top:10px'>
        
        <el-form-item :label="$t('table.site_uid')" prop="site_uid">
          <el-input  placeholder="系统生成，不需要填写" v-model="temp.site_uid"></el-input>
        </el-form-item>

        <el-form-item :label="$t('table.site_name')" prop="site_name">
          <el-input v-model="temp.site_name"></el-input>
        </el-form-item>

        <el-form-item :label="$t('table.domain')" prop="domain">
          <el-input placeholder="" v-model="temp.domain">
            <template slot="prepend">Http://</template>
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('table.sku_image_api_url')" prop="sku_image_api_url">
          <el-input placeholder="" v-model="temp.sku_image_api_url">
            <template slot="prepend">Http://</template>
          </el-input>
        </el-form-item>

       
        <el-form-item :label="$t('table.access_token')" prop="access_token">
          <el-input placeholder="系统生成，不需要填写" v-model="temp.access_token"></el-input>
        </el-form-item>

        <el-form-item :label="$t('table.status')" prop="status">
          <el-select clearable class="filter-item" v-model="temp.status" placeholder="Please select">
            <el-option v-for="item in  statusOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog  :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible2">
      <el-form :rules="rules" ref="dataForm2" :model="temp" label-position="left" label-width="140px" style='width: 800px; margin-left:50px; margin-top:10px'>
        
        <el-form-item :label="$t('table.common_js')" >
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="Please input" v-model="temp.common_js">
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('table.category_js')">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="Please input" v-model="temp.category_js">
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('table.product_js')">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="Please input" v-model="temp.product_js">
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('table.cart_js')">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="Please input" v-model="temp.cart_js">
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('table.example_cart_js')">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="Please input" v-model="temp.example_cart_js">
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('table.search_js')">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="Please input" v-model="temp.search_js">
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('table.example_search_js')">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="Please input" v-model="temp.example_search_js">
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('table.login_js')">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="Please input" v-model="temp.login_js">
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('table.register_js')">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="Please input" v-model="temp.register_js">
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('table.order_js')">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="Please input" v-model="temp.order_js">
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('table.example_order_js')">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="Please input" v-model="temp.example_order_js">
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('table.success_order_js')">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="Please input" v-model="temp.success_order_js">
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('table.example_success_order_js')">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="Please input" v-model="temp.example_success_order_js">
          </el-input>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 从api包中导入用于ajax的函数
import { fetchList, createOne, updateOne, deleteOne, batchDelete, fetchJsCode } from '@/api/common/website'
import waves from '@/directive/waves' // 水波纹指令
// import { parseTime } from '@/utils' // 时间格式处理
// import Tinymce from '@/components/Tinymce' // 富文本编辑框
/*
const sexOptions = [ // 性别数组，用于生成sex select，在搜索部分和弹框的dialog部分使用到
  { key: 1, display_name: 'Man' },
  { key: 2, display_name: 'Women' }
]
*/
const statusOptions = [ // 性别数组，用于生成sex select，在搜索部分和弹框的dialog部分使用到
  { key: 1, display_name: 'Enable' },
  { key: 2, display_name: 'Disable' }
]
export default {
  name: 'websiteComplexTable',
  // components: { Tinymce }, // 引入的组件
  directives: { // 自定义组件directives , 详细参看：http://blog.csdn.net/hant1991/article/details/74626002
    waves // 点击按钮出现水波纹
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      multipleSelection: [],
      total: null,
      listLoading: true,
      // filter-container 部分的搜索，以及分页部分
      listQuery: { // 当前的查询参数值
        page: 1, // 页数
        limit: 20, // 每页的默认显示数据行数
        // id: undefined
        site_name: undefined, // 按照username搜索
        own_id: undefined,
        // type: undefined,
        created_begin: undefined, // 搜索开始时间
        created_end: undefined, // 搜索结束时间
        created_begin_timestamps: undefined, // 搜索开始时间戳
        created_end_timestamps: undefined, // 搜索结束时间戳
        sort: '+id' // 排序的字段，默认为id升序排序
      },
      ownNameOptions: {},
      statusOptions,
      customerType: 0,
      createdCustomerOptions: {},
      sortOptions: [ // 排序部分定义
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' },
        { label: 'CreatedAt Ascending', key: '+created_at' },
        { label: 'CreatedAt Descending', key: '-created_at' }
      ],
      temp: { // update , create 数据的时候，会把数据放到该变量中。
        id: undefined,
        site_name: '',
        domain: '',
        own_id: '',
        created_customer_id: ''
      },
      dialogFormVisible: false, // 编辑数据的弹框，false代表关闭
      dialogFormVisible2: false, // 编辑数据的弹框，false代表关闭
      dialogStatus: '', // 用来记录当前的弹出的编辑框是create，还是update，进而显示不同的按钮，按钮触发不同的方法。
      textMap: { // dialog， el-dialog 用于显示title
        update: 'Edit',
        create: 'Create'
      },
      rules: { // dialog弹框create update数据的时候，填写的数据进行规则验证，采用下面的rules，不知道为什么number不好用，擦！
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // email: [{ type: 'email', required: true, message: 'Please input the correct email address', trigger: 'blur,change' }],
        // birth_date: [{ type: 'date', message: 'birth_date is required', trigger: 'change' }],
        // username: [{ required: true, message: 'title is required', trigger: 'blur' }]
        // password: [{ type: 'password', message: 'birth_date is required', trigger: 'change' }],
        // age: [{ type: 'number', message: 'Please enter number', trigger: 'blur' }]
      }
      // downloadLoading: false // 下载部分
    }
  },
  // 过滤器，譬如下面的dateFilter，在上面代码可以看到应用：
  // {{scope.row.created_at  | parseTime('{y}-{m}-{d}') | dateFilter() }}
  // 上面中的 | 类似linux的管道，将上面的结果作为下面函数的输入的第一个参数
  // 因此 scope.row.created_at 的值将作为过滤器 parseTime(value,'{y}-{m}-{d}') 函数的value参数传入
  // 得到的结果，将作为 dateFilter(value) 函数的第一个参数value，传入
  filters: {
    /* 废弃
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return sexValue[type]
    },
    */
    parseStatus(value) {
      for (var x in statusOptions) {
        if (statusOptions[x]['key'] === value) {
          return statusOptions[x]['display_name']
        }
      }
    },
    parseOwnName(value, ownNameOptions) {
      for (var x in ownNameOptions) {
        if (ownNameOptions[x]['key'] === value) {
          return ownNameOptions[x]['display_name']
        }
      }
      return value
    },
    parseCreatedCustomer(value, createdCustomerOptions) {
      for (var x in createdCustomerOptions) {
        if (createdCustomerOptions[x]['key'] === value) {
          return createdCustomerOptions[x]['display_name']
        }
      }
      return value
    },
    dateFilter(value) {
      if (value === '1970-01-01') {
        return ''
      } else {
        return value
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    changeFun(val) { // table列表部分，点击左侧的checkbox的时候，就会把勾选的行的数据赋值给 this.multipleSelection
      this.multipleSelection = val
      // console.log(val)
    },
    // 是否是数字，通过正则
    isNumber(val) {
      var regPos = /^\d+(\.\d+)?$/ // 非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
      if (regPos.test(val) || regNeg.test(val)) {
        return true
      } else {
        return false
      }
    },
    // 得到数据的函数，当操作分页，搜索，排序，切换每页产品数等操作，都会执行该函数
    // 该函数前面将数据进行了一部分处理，后面通过ajax进行服务器请求，
    // 通过这个代码，import { fetchList, createOne, updateOne } from '@/api/customer' 可以知道 fetchList 是 @/api/customer.vue文件，我们打开这个文件
    // 可以在 @/api/customer.vue 中找到函数 fetchList() , 该函数进行的ajax请求，获取数据。
    getList() {
      this.listLoading = true
      if (this.listQuery.created_begin) {
        this.listQuery.created_begin_timestamps = Date.parse(this.listQuery.created_begin) / 1000
      } else {
        this.listQuery.created_begin_timestamps = null
      }
      if (this.listQuery.created_end) {
        this.listQuery.created_end_timestamps = Date.parse(this.listQuery.created_end) / 1000
      } else {
        this.listQuery.created_end_timestamps = null
      }
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.ownNameOptions = response.data.ownNameOps
        this.createdCustomerOptions = response.data.createdCustomerOps
        this.customerType = response.data.customerType
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
        this.$message({
          message: '获取列表失败',
          type: 'error'
        })
      })
    },
    // 点击搜索，排序部分功能 执行的函数
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // toolbar - 切换每页页数，执行的函数
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    // toolbar - 点击分页页数，执行的函数
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    // 列表中点击delete按钮，进行数据删除的函数
    handleModifyStatus(row, index) {
      // 弹框提示，是否继续删除操作，关于element ui 弹框组件参看：http://element.eleme.io/#/zh-CN/component/message-box
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // const tempData = Object.assign({}, row) // copy obj
        // 进行删除操作
        deleteOne(row.id).then(response => {
          var code = response.code
          var data = response.data
          console.log(data)
          if (code === 20000) {
            console.log(code)
            var affected = data.affected
            if (affected > 0) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '该数据不存在于数据库',
                type: 'warning'
              })
            }
            this.list.splice(index, 1) // 在table中删除改行数据
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            })
          }
          this.dialogFormVisible = false
        }).catch(() => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      // row.status = status
      // 关于 element ui message  参看 http://element.eleme.io/#/zh-CN/component/message
    },
    // 在 handleCreate 函数中被调动，用来清空或初始化相应的项
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        url_key: '',
        request_method: '',
        group_id: ''
      }
    },
    // 点击add按钮，弹出的数据层，初始化数据的函数。
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // add 创建新数据的函数
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          var payment_end_time = Date.parse(new Date(tempData.payment_end_time)) / 1000 // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          tempData.payment_end_time = payment_end_time
          tempData.website_day_max_count = parseInt(tempData.website_day_max_count)
          createOne(tempData).then(() => {
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.dialogFormVisible = false
            this.getList()
          }).catch(() => {
            this.listLoading = false
            // this.$message({
            // message: '创建失败',
            // type: 'error'
            // })
          })
        }
      })
    },
    // 此函数为：点击edit 弹出更新form窗口的时候，可以对传递的数据，在此函数中进行处理
    // 譬如下面的birth_date,从数据库里面取出来的是秒时间戳，而element ui中使用的是毫秒时间戳，因此转换成了毫秒时间戳
    // 下面的sex ，在go语言中，如果从数据库取出来为null，那么在go里面会被初始化成0，但是在element中，需要改成undefined 来对应数据库的null
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      // if (!this.temp.request_method) {
      // this.temp.request_method = undefined
      // }
      if (!this.temp.status) {
        this.temp.status = undefined
      }
      if (this.temp.payment_end_time && this.isNumber(this.temp.payment_end_time)) {
        this.temp.payment_end_time = new Date(this.temp.payment_end_time * 1000)
      }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdateJsInfo(row) {
      // this.temp = Object.assign({}, row) // copy obj
      fetchJsCode({ 'site_id': row.id }).then(response => {
        this.temp.common_js = response.data.common_js
        this.temp.category_js = response.data.category_js
        this.temp.product_js = response.data.product_js
        this.temp.cart_js = response.data.cart_js
        this.temp.example_cart_js = response.data.example_cart_js
        this.temp.order_js = response.data.order_js
        this.temp.example_order_js = response.data.example_order_js
        this.temp.success_order_js = response.data.success_order_js
        this.temp.example_success_order_js = response.data.example_success_order_js
        this.temp.login_js = response.data.login_js
        this.temp.register_js = response.data.register_js
        this.temp.search_js = response.data.search_js
        this.temp.example_search_js = response.data.example_search_js
        /*
        this.resourcesArr = Object.assign({}, response.data.allResource)
        // this.checkedResourceArr = response.data.resourceChecked
        this.dialogStatus = 'updateResource'
        this.currentRoleId = row.id
        this.currentOwnId = row.own_id
        this.$nextTick(() => {
          this.$refs['dataForm2'].clearValidate()
        })
        */
        this.dialogFormVisible2 = true
      }).catch(() => {
        this.listLoading = false
        this.$message({
          message: '获取Js Code信息失败',
          type: 'error'
        })
      })
    },
    // 更新提交的函数
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          // var birth_date = Date.parse(new Date(tempData.birth_date)) / 1000 // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // tempData.birth_date = birth_date
          // tempData.age = parseInt(tempData.age)
          var payment_end_time = Date.parse(new Date(tempData.payment_end_time)) / 1000 // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          tempData.payment_end_time = payment_end_time
          tempData.website_day_max_count = parseInt(tempData.website_day_max_count)
          updateOne(tempData).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.listLoading = false
            // this.$message({
            // message: '更新失败',
            // type: 'error'
            // })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleBatchDelete() {
      // 弹框提示，是否继续删除操作，关于element ui 弹框组件参看：http://element.eleme.io/#/zh-CN/component/message-box
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var multipleSelection = this.multipleSelection
        var ids = []
        for (var x in multipleSelection) {
          ids.push(multipleSelection[x].id)
        }
        // 进行删除操作
        batchDelete(ids).then(response => {
          var code = response.code
          var data = response.data
          console.log(data)
          if (code === 20000) {
            console.log(code)
            var affected = data.affected
            if (affected > 0) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '该数据不存在于数据库',
                type: 'warning'
              })
            }
            this.getList()
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            })
          }
          this.dialogFormVisible = false
        }).catch(() => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
    /*
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['birth_date', 'username', 'type', 'id', 'status']
        const filterVal = ['birth_date', 'username', 'type', 'id', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel(tHeader, data, 'table-list')
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'birth_date') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
    */
  }
}
</script>
