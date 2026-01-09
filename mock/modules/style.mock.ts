/**
 * 样式配置模块
 * 包含整个应用的UI样式配置，用于统一管理各组件的外观样式
 */
export default {
  /** 返回按钮背景图 */
  backImage: 'https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_back.png',
  /** 返回图片大小 */
  backImageSize: {
    width: '40px',
    height: '40px'
  },
  /** 顶部右侧举报图片 */
  reportImage: 'https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_report.png',
  /** 举报图标大小 */
  reportImageSize: {
    width: '40px', // 图标宽度
    height: '40px' // 图标高度
  },
  /** 点赞图标 */
  likeIcon: 'https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_like.png',

  /** 点赞图标大小 */
  unlikeImageSize: {
    width: '24px', // 图标宽度
    height: '24px' // 图标高度
  },
  /** 点赞数量文本样式 */
  likeNumTextStyle: { fontSize: '14px', fontWeight: '400', color: 'rgba(255, 255, 255, 1)' },
  /** 用户名文本样式 */
  userNameStyle: {
    fontSize: '16px',
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)'
  },
  /** 头像样式（页面通用头像，小型的） */
  avatarStyle: { width: '32px', height: '32px' },
  /** 作品文本样式(内容，备注项) */
  proseTextStyle: {
    fontSize: '14px',
    fontWeight: '400',
    color: 'rgb(255, 255, 255)',
    sort: 'left'
  },
  /** 标签样式（如：描述下面的标签） */
  tagStyle: {
    backgroundColor: 'linear-gradient(135deg, rgba(25, 251, 193, 1) 0%, rgba(107, 208, 255, 1) 100%)',
    borderRadius: '20px',
    width: '65px',
    height: '26px',
    fontSize: '12px',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 1)'
  },
  /** 文本输入框（发送内容）样式 */
  inputStyle: {
    backgroundColor: 'rgba(25, 251, 193, 1)',
    borderRadius: '30px',
    width: '100%',
    height: '54px',
    fontSize: '14px',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 1)',
    placeholderCorlor: 'rgba(153, 153, 153, 1)',
    /** 右侧发送图标 */
    sendIcon: 'https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_send_icon.png',
    sendIconWidth: '30px',
    sendIconHeight: '30px'
  },
  /** 表单标题样式 */
  formTitleStyle: {
    fontSize: '20px',
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
    marginBottom: '20px'
  },
  /** 表单富文本样式 */
  formRichTextStyle: {
    fontSize: '14px',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 1)',
    backgroundColor: '#ffffff',
    placeholderCorlor: 'rgba(87, 96, 115, 1)'
  },
  /** 表单按钮样式 */
  formBtnStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)'
  },
  /** 输入文本样式 */
  inputTextStyle: {
    borderRadius: '16px',
    placeholderCorlor: 'rgba(255, 255, 255, 0.4)',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '14px',
    fontWeight: '400',
    backgroundColor: '#231e24'
  },
  /** 高亮按钮样式 */
  highlightBtnStyle: {
    color: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'linear-gradient(135deg, rgba(25, 251, 193, 1) 0%, rgba(107, 208, 255, 1) 100%)'
  },
  /** 确认按钮样式 */
  confirmBtnStyle: {
    borderRadius: '29px',
    width: '264px',
    height: '58px',
    fontSize: '20px',
    fontWeight: '700'
  },
  /** 聊天列表样式 */
  chatListStyle: {
    avatarWidth: '44px',
    avatarHeight: '44px',
    borderRadius: '22px',
    /** 发送背景色 */
    sendBgColor: 'rgba(107, 208, 255, 1)',
    /** 接收背景色 */
    receiveBgColor: 'rgba(25, 251, 193, 1)'
  },
  /** 举报按钮 */
  reportBtnStyle: {
    /** 选择项按钮 */
    selectBtnStyle: {
      width: '240px',
      height: '46px'
    },
    /** 取消按钮 */
    cancelBtnStyle: {
      width: '240px',
      height: '46px'
    }
  },
  /** 动态详情页 */
  articleDetailStyle: {
    backgroundColor: '#101213'
  },
  /** 发布动态 */
  sendDynamicStyle: {
    background: 'url(https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_tbhmrklmdofibjpocixvjbermglfs.png) center center / cover no-repeat'
  },
  /** 聊天机器人 */
  chatViewStyle: {
    /** 描述文本颜色 */
    textCorlor: 'rgba(255, 255, 255, 0.8)',
    background: 'url(https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_tbhmrklmdofibjpocixvjbermglfs.png) center center / cover no-repeat',
    btnStyle: {
      width: '264px',
      height: '58px',
      color: 'rgba(255, 255, 255, 1)',
      rightIcon: 'https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_ai_chat_arr.png',
      rightIconWidth: '21px',
      rightIconHeight: '21px'
    },
    /** 弹框样式 */
    popupStyle: {
      /** 标题文本 */
      titleTextStyle: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#0E1C42'
      },
      /** 描述文本样式 */
      descTextStyle: {
        fontSize: '16px',
        fontWeight: '400',
        color: '#576073'
      },
      /** 背景样式 */
      bgImageStyle: {
        width: '278px',
        height: '632px',
        bgImg: 'https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_ai_pay_bg.png'
      }
    }
  },
  /** 聊天详情样式 */
  chatDetailsStyle: {
    background: 'url(https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_tbhmrklmdofibjpocixvjbermglfs.png) center center / cover no-repeat',
    /** 顶部文本样式 */
    topTextStyle: {
      borderRadius: '20px',
      width: '190px',
      height: '36px',
      fontSize: '14px',
      fontWeight: '400',
      color: '#fff',
      backgroundColor: '#0d080d33'
    }
  },
  /** 短视频 */
  shortVideoStyle: {
    backgroundColor: '#0e080f',
    /** 添加图标 */
    addIcon: 'https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_follow.png',
    addIconWidth: '20px',
    addIconHeight: '20px',
    /** 留言图标 */
    messageIcon: 'https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_video_comments.png',
    messageIconWidth: '24px',
    messageIconHeight: '24px',
    /** 点赞图标 */
    likeIcon: 'https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_like_post.png',
    likeIconWidth: '24px',
    likeIconHeight: '24px',
    avatarWidth: '48px',
    avatarHeight: '48px',
    /** 按钮样式 */
    btnStyle: {
      width: '162px',
      height: '53px',
      borderRadius: '20px',
      backgroundColor: 'rgb(0, 0, 0)'
    }
  },
  /** 发布视频样式 */
  publishVideoStyle: {
    background: 'url(https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_tbhmrklmdofibjpocixvjbermglfs.png) center center / cover no-repeat'
  },
  /** 其他用户主页样式 */
  otherHomeStyle: {
    backgroundColor: 'rgb(14, 8, 15)',
    /** 关注他人图标 */
    addIcon: 'https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_follow.png',
    addIconWidth: '20px',
    addIconHeight: '20px',
    /** 留言图标 */
    messageIcon: 'https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_video_comments.png',
    messageIconWidth: '30px',
    messageIconHeight: '30px',
    /** 点赞图标 */
    likeIcon: 'https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_like_post.png',
    likeIconWidth: '16px',
    likeIconHeight: '16px',
    /** 顶部数据样式 */
    topDataStyle: {
      /** 说明 */
      descTextStyle: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#fff'
      },
      /** 描述 */
      textTextStyle: {
        fontSize: '14px',
        fontWeight: '400',
        color: 'rgb(255, 255, 255)'
      }
    },
    /** 左侧描述样式 */
    leftDescStyle: {
      fontSize: '14px',
      fontWeight: '400',
      color: '#fff'
    },
    /** 右侧按钮样式 */
    rightBtnStyle: {
      width: '120px',
      height: '53px',
      borderRadius: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    /** 卡片说明 */
    cardDescStyle: {
      fontSize: '14px',
      fontWeight: '400',
      color: '#fff',
      sort: 'left'
    }
  },
  /** 举报样式 */
  reportIndexStyle: {
    background: 'url(https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_tbhmrklmdofibjpocixvjbermglfs.png) center center / cover no-repeat',
    /** 选项样式 */
    selectBtnStyle: {
      width: '164px',
      height: '115px',
      borderRadius: '20px',
      backgroundColor: 'rgb(255, 255, 255)',
      fontSize: '16px',
      fontWeight: '400',
      color: 'rgb(14, 28, 66)'
    }
  },
  /** 私聊样式 */
  privateChatStyle: {
    backgroundColor: '#EBECED'
  },
  /** 设置页样式 */
  settingStyle: {
    background: 'url(https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_tbhmrklmdofibjpocixvjbermglfs.png) center center / cover no-repeat',
    /** 按钮文本样式 */
    btnTextStyle: {
      backgroundColor: 'linear-gradient(136deg, rgba(25, 251, 193, 1) 0%, rgba(107, 208, 255, 1) 100%)',
      fontSize: '20px',
      fontWeight: '700',
      color: '#fff'
    },
    /** 选择项样式 */
    selectBtnStyle: {
      width: '100%',
      height: '52px',
      borderRadius: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: '#fff',
      fontSize: '16px',
      fontWeight: '400'
    }
  },
  /** 关注页样式 */
  followStyle: {
    background: 'url(https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_tbhmrklmdofibjpocixvjbermglfs.png) center center / cover no-repeat'
  },
  /** 粉丝页样式 */
  fansStyle: {
    background: 'url(https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_tbhmrklmdofibjpocixvjbermglfs.png) center center / cover no-repeat'
  },
  /** 黑名单页样式 */
  blackListStyle: {
    background: 'url(https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_tbhmrklmdofibjpocixvjbermglfs.png) center center / cover no-repeat'
  },
  /** 编辑页样式 */
  editStyle: {
    background: 'url(https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_tbhmrklmdofibjpocixvjbermglfs.png) center center / cover no-repeat'
  },
  /** 金币充值 */
  coinStyle: {
    background: 'url(https://huanniuchat.oss-accelerate.aliyuncs.com/template_development/soeva_tbhmrklmdofibjpocixvjbermglfs.png) center center / cover no-repeat',
    /** 选项设置 */
    selectBtnStyle: {
      width: '100%',
      height: '64px',
      borderRadius: '20px',
      backgroundColor: 'rgb(255, 255, 255)',
      selectedColor: 'rgb(51, 51, 51)'
    }
  }
} satisfies Window['styleJson']
