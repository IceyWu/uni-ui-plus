import type {
  ButtonLang,
  ButtonOnAddgroupappEvent,
  ButtonOnAgreeprivacyauthorizationEvent,
  ButtonOnChooseaddressEvent,
  ButtonOnChooseavatarEvent,
  ButtonOnChooseinvoicetitleEvent,
  ButtonOnErrorEvent,
  ButtonOnGetphonenumberEvent,
  ButtonOnLaunchappEvent,
  ButtonOnLoginEvent,
  ButtonOnOpensettingEvent,
  ButtonOnSubscribeEvent,
  ButtonOpenType,
} from "@uni-helper/uni-app-types";
import type { ExtractPropTypes, PropType } from "vue";

export const buttonProps = {
  /**
   * @description 打开公众号资料卡时，传递的号码 openType="openPublicProfile"时有效
   */
  publicId: String,
  /**
   * @description 客服的抖音号,openType="im"时有效
   */
  dataImId: String,
  /**
   * @description IM卡片类型,openType="im"时有效
   */
  dataImType: String,
  /**
   * @description 商品的id，仅支持泛知识课程库和生活服务商品库中的商品,openType="im"时有效
   */
  dataGoodsId: String,
  /**
   * @description 订单的id，仅支持交易2.0订单, openType="im"时有效
   */
  dataOrderId: String,
  /**
   * @description 商品类型，“1”代表生活服务，“2”代表泛知识。openType="im"时有效
   */
  dataBizLine: String,
} as const;

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export const buttonEmits = {
  getphonenumber: (evt: ButtonOnGetphonenumberEvent) => evt instanceof Object,
  getuserinfo: (evt: any) => evt instanceof Object,
  error: (evt: ButtonOnErrorEvent) => evt instanceof Object,
  opensetting: (evt: ButtonOnOpensettingEvent) => evt instanceof Object,
  launchapp: (evt: ButtonOnLaunchappEvent) => evt instanceof Object,
  contact: (evt: any) => evt instanceof Object,
  chooseavatar: (evt: ButtonOnChooseavatarEvent) => evt instanceof Object,
  agreeprivacyauthorization: (evt: ButtonOnAgreeprivacyauthorizationEvent) =>
    evt instanceof Object,
  addgroupapp: (evt: ButtonOnAddgroupappEvent) => evt instanceof Object,
  chooseaddress: (evt: ButtonOnChooseaddressEvent) => evt instanceof Object,
  chooseinvoicetitle: (evt: ButtonOnChooseinvoicetitleEvent) =>
    evt instanceof Object,
  subscribe: (evt: ButtonOnSubscribeEvent) => evt instanceof Object,
  login: (evt: ButtonOnLoginEvent) => evt instanceof Object,
  im: (evt: any) => evt instanceof Object,
};

export type ButtonEmits = typeof buttonEmits;
