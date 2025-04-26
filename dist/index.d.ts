import { ButtonOnGetphonenumberEvent, ButtonOnErrorEvent, ButtonOnOpensettingEvent, ButtonOnLaunchappEvent, ButtonOnChooseavatarEvent, ButtonOnAgreeprivacyauthorizationEvent, ButtonOnAddgroupappEvent, ButtonOnChooseaddressEvent, ButtonOnChooseinvoicetitleEvent, ButtonOnSubscribeEvent, ButtonOnLoginEvent, ScrollViewProps, ScrollViewOnRefresherrefresh, ScrollViewOnScrolltolower, ScrollViewOnRefresherpulling } from '@uni-helper/uni-app-types';
import { ExtractPropTypes, PropType } from 'vue';
import { ComponentResolver } from '@uni-helper/vite-plugin-uni-components';

declare const buttonProps: {
    /**
     * @description 打开公众号资料卡时，传递的号码 openType="openPublicProfile"时有效
     */
    readonly publicId: StringConstructor;
    /**
     * @description 客服的抖音号,openType="im"时有效
     */
    readonly dataImId: StringConstructor;
    /**
     * @description IM卡片类型,openType="im"时有效
     */
    readonly dataImType: StringConstructor;
    /**
     * @description 商品的id，仅支持泛知识课程库和生活服务商品库中的商品,openType="im"时有效
     */
    readonly dataGoodsId: StringConstructor;
    /**
     * @description 订单的id，仅支持交易2.0订单, openType="im"时有效
     */
    readonly dataOrderId: StringConstructor;
    /**
     * @description 商品类型，“1”代表生活服务，“2”代表泛知识。openType="im"时有效
     */
    readonly dataBizLine: StringConstructor;
};
type ButtonProps = ExtractPropTypes<typeof buttonProps>;
declare const buttonEmits: {
    getphonenumber: (evt: ButtonOnGetphonenumberEvent) => boolean;
    getuserinfo: (evt: any) => boolean;
    error: (evt: ButtonOnErrorEvent) => boolean;
    opensetting: (evt: ButtonOnOpensettingEvent) => boolean;
    launchapp: (evt: ButtonOnLaunchappEvent) => boolean;
    contact: (evt: any) => boolean;
    chooseavatar: (evt: ButtonOnChooseavatarEvent) => boolean;
    agreeprivacyauthorization: (evt: ButtonOnAgreeprivacyauthorizationEvent) => boolean;
    addgroupapp: (evt: ButtonOnAddgroupappEvent) => boolean;
    chooseaddress: (evt: ButtonOnChooseaddressEvent) => boolean;
    chooseinvoicetitle: (evt: ButtonOnChooseinvoicetitleEvent) => boolean;
    subscribe: (evt: ButtonOnSubscribeEvent) => boolean;
    login: (evt: ButtonOnLoginEvent) => boolean;
    im: (evt: any) => boolean;
};
type ButtonEmits = typeof buttonEmits;

interface ListObj<T> {
    loading: boolean;
    finished: boolean;
    refreshing: boolean;
    list: T[];
    total?: number;
}
interface SkeletonObj {
    num?: number;
    rows?: number;
    gridCol?: number;
}
declare const listProps: {
    /**
     * @description 表单类型，可选值为 `ListType` 类型中定义的值，默认值为 'default'
     */
    readonly formType: {
        type: PropType<"default" | "primary" | "info" | "success" | "warning" | "danger">;
        default: "default" | "primary" | "info" | "success" | "warning" | "danger";
    };
    /**
     * @description 是否禁用刷新功能
     * @default false
     */
    readonly isDisabledRefresh: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 是否需要设置高度为全屏
     * @default false
     */
    readonly isNeedHFull: {
        readonly type: BooleanConstructor;
        readonly default: false;
    };
    /**
     * @description 是否需要显示空状态
     * @default true
     */
    readonly isNeedEmpty: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * @description 空状态是否需要居中显示
     * @default true
     */
    readonly isNeedEmptyCenter: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * @description 空状态是否需要底部内边距
     * @default true
     */
    readonly isNeedEmptyPb: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    /**
     * @description 空状态的顶部内边距
     * @default undefined
     */
    readonly emptyTop: {
        readonly type: StringConstructor;
        readonly default: undefined;
    };
    /**
     * @description 空状态对象
     * @default undefined
     */
    readonly emptyObj: {
        readonly type: PropType<any>;
        readonly default: undefined;
    };
    /**
     * @description 列表数据对象，包含加载状态、完成状态、刷新状态、列表数据和总数等信息
     * @required
     */
    readonly listObj: {
        readonly type: PropType<ListObj<any>>;
        readonly required: true;
    };
    /**
     * @description 骨架屏配置对象，包含骨架屏数量、行数和网格列数等信息
     * @default { num: 1, rows: 3, gridCol: 1 }
     */
    readonly skeletonObj: {
        readonly type: PropType<SkeletonObj>;
        readonly default: () => {
            num: number;
            rows: number;
            gridCol: number;
        };
    };
    /**
     * @description 滚动视图的属性配置，排除了 'loading'、'finished' 和 'onLoad' 属性
     * @default { scrollY: true, scrollX: false, refresherEnabled: true, refresherThreshold: 100, refresherBackground: "transparent" }
     */
    readonly scrollViewProps: {
        readonly type: PropType<Partial<Omit<ScrollViewProps, "loading" | "finished" | "onLoad">>>;
        readonly default: () => {
            scrollY: boolean;
            scrollX: boolean;
            refresherEnabled: boolean;
            refresherThreshold: number;
            refresherBackground: string;
        };
    };
};
type ListProps = ExtractPropTypes<typeof listProps>;
type ListEmits = {
    (e: "update:listObj", data: ListObj<any>): void;
    (e: "onRefresh"): ScrollViewOnRefresherrefresh;
    (e: "onLoad"): ScrollViewOnScrolltolower;
    (e: "onPulling"): ScrollViewOnRefresherpulling;
};

declare function UpResolver(): ComponentResolver;

export { UpResolver, buttonEmits, buttonProps, listProps };
export type { ButtonEmits, ButtonProps, ListEmits, ListProps };
