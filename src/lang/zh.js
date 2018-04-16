export default {
  route: {
    system: '控制面板',
    account_list: '账户列表',
    my_account: '我的账户',
    account_resource: '资源管理',
    role: '权限设置',
    customer_account_child: '员工管理',
    account_resource_group: '资源分组',
    common: '基础信息',
    common_website: '网站管理',
    common_channel: '渠道管理',
    common_marketgroup: '营销小组',
    advertise_generate: '生成广告',
    advertise_mutilgenerate: '批量生成广告',
    advertise_generatemlink: '多链接广告',
    advertise_list: '生成广告查看',
    advertise: '广告管理',
    base_statistics: '全部流量统计',
    basestics_initdata: '初始数据',
    basestics_userdata: '用户',
    basestics_allsite: '全部站点',
    basestics_site: '站点',
    basestics_refer: '来源',
    basestics_sku: 'Sku',
    basestics_skurefer: 'Sku Refer',
    basestics_search: '搜索',
    basestics_searchlang: '搜索语言',
    basestics_firsturl: '着陆URL',
    basestics_url: 'Url',
    basestics_category: '分类',
    basestics_device: '设备',
    basestics_country: '国家',
    basestics_browser: '浏览器',

    user_statistics: '用户统计',
    userstics_userdata: '用户数据',

    advertics_all_statics: '广告总量统计',
    adsallstics_site: '站点',
    adsallstics_refer: '来源',
    adsallstics_sku: 'Sku',
    adsallstics_skurefer: 'Sku Refer',
    adsallstics_search: '搜索',
    adsallstics_searchlang: '搜索语言',
    adsallstics_firsturl: '着陆URL',
    adsallstics_url: 'Url',
    adsallstics_category: '分类',
    adsallstics_devide: '设备',
    adsallstics_country: '国家',
    adsallstics_browser: '浏览器',
    advertics_detail_statics: '广告维度统计',
    adsdetailstics_ads: '广告',
    adsdetailstics_person: '广告员',
    adsdetailstics_group: '广告小组',
    adsdetailstics_imager: '广告美工',
    adsdetailstics_campaign: '活动',
    adsdetailstics_childchannel: '子渠道',
    adsdetailstics_channel: '渠道',
    adsdetailstics_edm: 'EDM',
    dashboard: '首页',
    introduction: '简述',
    documentation: '文档',
    permission: '权限测试页',
    icons: '图标',
    components: '组件',
    componentIndex: '介绍',
    tinymce: '富文本编辑器',
    markdown: 'Markdown',
    jsonEditor: 'JSON编辑器',
    dndList: '列表拖拽',
    splitPane: 'Splitpane',
    avatarUpload: '头像上传',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: '小组件',
    backToTop: '返回顶部',
    charts: '图表',
    keyboardChart: '键盘图表',
    lineChart: '折线图',
    mixChart: '混合图表',
    example: '综合实例',
    Table: 'Table',
    dynamicTable: '动态Table',
    dragTable: '拖拽Table',
    inlineEditTable: 'Table内编辑',
    complexTable: '综合Table',
    treeTable: '树形表格',
    customTreeTable: '自定义树表',
    tab: 'Tab',
    form: '表单',
    createForm: '创建表单',
    editForm: '编辑表单',
    errorPages: '错误页面',
    page401: '401',
    page404: '404',
    errorLog: '错误日志',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    exportZip: 'Export Zip',
    theme: '换肤',
    clipboardDemo: 'Clipboard',
    i18n: '国际化'
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    github: '项目地址',
    screenfull: '全屏',
    theme: '换肤'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    roles: '你的权限',
    switchRoles: '切换权限'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    site_name: '网站名称',
    payment: '付费',
    site_js_info: 'Js 代码',
    payment_end_time: '付费到期时间',
    website_count: '最大网站数',
    website_day_max_count: '单站数据最大数',
    edit_payment_info: '编辑付费信息',
    trace_js_url: '追踪Js Url',
    trace_api_url: '追踪Api Url',
    access_token: '验证 Token',
    site_uid: '站点唯一标示',
    common_js: '通用 Js',
    category_js: '分类 Js',
    product_js: '产品 Js',
    cart_js: '购物车 Js',
    order_js: '订单 Js',
    success_order_js: '成功订单 Js',
    login_js: '登录 Js',
    register_js: '注册 Js',
    search_js: '搜索 Js',
    currency_js: '货币 Js',
    example_cart_js: '变量 $cart 示例',
    example_order_js: '变量 $order 示例',
    example_success_order_js: '变量 $order 示例',
    example_search_js: '变量 $search 示例',

    domain: '域名',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    market_group_name: '小组名称',
    job_type_name: '工作岗位',
    channel_name: '渠道',
    channel_child_name: '子渠道',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定',
    username: '用户名',
    password: '密码',
    email: '邮箱',
    created_at: '创建时间',
    updated_at: '更新时间',
    birth_date: '生日',
    batch_delete: '批量删除',
    created_begin: '创建开始时间',
    created_end: '创建结束时间',
    age: '年龄',
    telephone: '电话',
    name: '姓名',
    new_password: '新密码',
    confirm_password: '确认密码',
    resource_group_name: '资源分组',
    resource_name: '资源名称',
    url_key: 'Url Key',
    request_method: '请求方式',
    created_customer: '创建人',
    role_name: '权限名称',
    own_name: '拥有者',
    update_role_resource: '资源',
    account_type: '账户类型',
    account_parent_id: '主账户',
    update_customer_role: '权限',
    sex: '性别'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  }
}
