// @ts-ignore
/* eslint-disable */

declare namespace Gz {
  type PileSpecificationsParam = {
    /** 代号 */
    code: string;
    /** 预应力 */
    prestress: string;
    /** 直径 */
    diameter: number;
    /** 壁厚 */
    wallThickness: number;
    /** 桩规格 */
    fullName: string;
    /** 桩规格简写 */
    abbreviation: string;
  };

  type ResultInteger = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    /** 响应数据 */
    data?: number;
  };

  type RoleParam = {
    /** 角色名称 */
    name: string;
    /** 权限 */
    permissionIds: number[];
  };

  type MouldParam = {
    /** 管模号 */
    code: number;
    /** 直径 */
    diameter: number;
    /** 长度 */
    length: number;
  };

  type BatchOperateParam = {
    /** 编号集合 */
    ids: number[];
  };

  type PasswordParam = {
    /** 密码 */
    password: string;
  };

  type ResultLong = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    /** 响应数据 */
    data?: number;
  };

  type AccountParam = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
    /** 公司编号 */
    companyId: number;
    /** 角色编号 */
    roleId: number;
  };

  type LoginParam = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
  };

  type AdminLoginVO = {
    /** 账户编号 */
    accountId: number;
    /** 用户名 */
    username: string;
    /** 角色列表 */
    roleNames: string[];
    /** token */
    token: string;
    /** 刷新token */
    refreshToken: string;
    /** 权限列表 */
    authorityValues: string[];
    /** 公司id */
    companyId: number;
    /** 公司名称 */
    companyName: string;
  };

  type ResultAdminLoginVO = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    data?: AdminLoginVO;
  };

  type ProductionPlanningRecordVO = {
    /** 桩规格 */
    pileSpecificationsName?: string;
    /** 长度 */
    length?: string;
    /** 数量 */
    quantity?: number;
    /** 米数 */
    meters?: number;
    /** 备注 */
    remark?: string;
    /** 汇总标志：0->普通数据，1->汇总数据 */
    summaryFlag?: 0 | 1;
  };

  type ResultListProductionPlanningRecordVO = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    /** 响应数据 */
    data?: ProductionPlanningRecordVO[];
  };

  type ResultListYieldVO = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    /** 响应数据 */
    data?: YieldVO[];
  };

  type YieldVO = {
    /** 班组 ID */
    classGroupId: number;
    /** 班组名称 */
    classGroupName: string;
    /** 当日数量 */
    dayQuantity: number;
    /** 当日米数 */
    dayMeters: number;
    /** 完成率 */
    dayCompleteRate: string;
    /** 当月数量 */
    monthQuantity: number;
    /** 当月米数 */
    motherMeter: number;
    /** 当月完成率 */
    motherCompleteRate: string;
  };

  type PileSpecificationsVO = {
    /** 编号 */
    id: number;
    /** 代号 */
    code: string;
    /** 预应力 */
    prestress: string;
    /** 直径 */
    diameter: number;
    /** 壁厚 */
    wallThickness: number;
    /** 全称 */
    fullName: string;
    /** 简写 */
    abbreviation: string;
  };

  type ResultPileSpecificationsVO = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    data?: PileSpecificationsVO;
  };

  type PageQuery = {
    /** 第几页 */
    pageNum?: number;
    /** 一页条数 */
    pageSize?: number;
    /** 排序字段 */
    field?: string;
    /** 排序方式 */
    order?: 'ASC' | 'DESC';
  };

  type PageVOStirringCoefficientVO = {
    /** 页码 */
    pageNum: number;
    /** 每页条数 */
    pageSize: number;
    /** 总页数 */
    totalPage: number;
    /** 总条数 */
    total: number;
    /** 数据列表 */
    list: StirringCoefficientVO[];
  };

  type ResultPageVOStirringCoefficientVO = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    data?: PageVOStirringCoefficientVO;
  };

  type StirringCoefficientVO = {
    /** 编号 */
    id: number;
    /** 搅拌系数 */
    stirringCoefficient: string;
    /** 全称 */
    fullName: string;
  };

  type PageVOPileSpecificationsVO = {
    /** 页码 */
    pageNum: number;
    /** 每页条数 */
    pageSize: number;
    /** 总页数 */
    totalPage: number;
    /** 总条数 */
    total: number;
    /** 数据列表 */
    list: PileSpecificationsVO[];
  };

  type ResultPageVOPileSpecificationsVO = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    data?: PageVOPileSpecificationsVO;
  };

  type ResultListRoleVO = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    /** 响应数据 */
    data?: RoleVO[];
  };

  type RoleVO = {
    /** 编号 */
    id: number;
    /** 角色名称 */
    name: string;
  };

  type PermissionVO = {
    /** 权限id */
    id: number;
    /** 权限名称 */
    name: string;
    /** 权限值 */
    value: string;
    /** 权限类表:1->菜单,2->按钮 */
    authType: 1 | 2;
  };

  type ResultRolePermissionVO = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    data?: RolePermissionVO;
  };

  type RolePermissionVO = {
    /** 编号 */
    id: number;
    /** 角色名称 */
    name: string;
    /** 权限列表 */
    permissions: PermissionVO[];
  };

  type PageVORolePermissionVO = {
    /** 页码 */
    pageNum: number;
    /** 每页条数 */
    pageSize: number;
    /** 总页数 */
    totalPage: number;
    /** 总条数 */
    total: number;
    /** 数据列表 */
    list: RolePermissionVO[];
  };

  type ResultPageVORolePermissionVO = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    data?: PageVORolePermissionVO;
  };

  type ReportVO = {
    /** ID */
    id?: number;
    /** 布料线号 */
    lineNumber: number;
    /** 序号 */
    serialNumber?: number;
    /** 桩规格编号 */
    pileSpecificationsId?: number;
    /** 桩规格名称 */
    pileSpecificationsName?: string;
    /** 桩规格简称 */
    pileSpecificationsAbbreviation?: string;
    /** 桩长度 */
    pileSpecificationsLength?: string;
    /** 模具编号 */
    mouldId?: number;
    /** 模具号 */
    mouldCode?: string;
    /** 模具长度 */
    mouldLength?: number;
    /** 编号 */
    uniqueNumber?: number[];
  };

  type ResultListReportVO = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    /** 响应数据 */
    data?: ReportVO[];
  };

  type ProductHistoryQuery = {
    /** 第几页 */
    pageNum?: number;
    /** 一页条数 */
    pageSize?: number;
    /** 排序字段 */
    field?: string;
    /** 排序方式 */
    order?: 'ASC' | 'DESC';
    /** 班级组ID */
    classGroupId?: number;
    /** 开始时间 */
    startTime?: number;
    /** 结束时间 */
    endTime?: number;
    /** 唯一编号 */
    uniqueNumber?: number;
  };

  type PageVOProductionHistoryVO = {
    /** 页码 */
    pageNum: number;
    /** 每页条数 */
    pageSize: number;
    /** 总页数 */
    totalPage: number;
    /** 总条数 */
    total: number;
    /** 数据列表 */
    list: ProductionHistoryVO[];
  };

  type ProductionHistoryVO = {
    /** ID */
    id: number;
    /** 布料线号 */
    lineNumber: number;
    /** 桩规格编号 */
    pileSpecificationsId: number;
    /** 桩规格名称 */
    pileSpecificationsName: string;
    /** 桩长度 */
    pileSpecificationsLength: string;
    /** 模具编号 */
    mouldId: number;
    /** 模具号 */
    mouldCode: string;
    /** 模具长度 */
    mouldLength: number;
    /** 编号 */
    uniqueNumber: number[];
    /** 报料时间 */
    reportDateTime: number;
  };

  type ResultPageVOProductionHistoryVO = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    data?: PageVOProductionHistoryVO;
  };

  type ResultListPermissionVO = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    /** 响应数据 */
    data?: PermissionVO[];
  };

  type MouldVO = {
    /** 编号 */
    id: number;
    /** 管模号 */
    code: number;
    /** 直径 */
    diameter: number;
    /** 长度 */
    length: number;
    /** 所属公司 */
    affiliatedCompany: string;
    /** 使用公司 */
    useCompany: string;
    /** 启用状态:0->未启用,1->启用 */
    enabled: 0 | 1;
    /** 借用状态:0->未借用,1->借用 */
    borrowedState: 0 | 1;
  };

  type ResultMouldVO = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    data?: MouldVO;
  };

  type MouldQuery = {
    /** 第几页 */
    pageNum?: number;
    /** 一页条数 */
    pageSize?: number;
    /** 排序字段 */
    field?: string;
    /** 排序方式 */
    order?: 'ASC' | 'DESC';
    /** 管模号 */
    code?: number;
  };

  type PageVOMouldVO = {
    /** 页码 */
    pageNum: number;
    /** 每页条数 */
    pageSize: number;
    /** 总页数 */
    totalPage: number;
    /** 总条数 */
    total: number;
    /** 数据列表 */
    list: MouldVO[];
  };

  type ResultPageVOMouldVO = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    data?: PageVOMouldVO;
  };

  type CompanyVO = {
    /** 编号 */
    id: number;
    /** 公司名称 */
    name: string;
  };

  type ResultListCompanyVO = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    /** 响应数据 */
    data?: CompanyVO[];
  };

  type AccountVO = {
    /** 编号 */
    id: number;
    /** 用户名 */
    username: string;
    /** 公司 ID */
    companyId: number;
    /** 公司 */
    companyName?: string;
    /** 角色 ID */
    roleId: number;
    /** 角色名称 */
    roleName?: string;
  };

  type ResultAccountVO = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    data?: AccountVO;
  };

  type PageVOAccountVO = {
    /** 页码 */
    pageNum: number;
    /** 每页条数 */
    pageSize: number;
    /** 总页数 */
    totalPage: number;
    /** 总条数 */
    total: number;
    /** 数据列表 */
    list: AccountVO[];
  };

  type ResultPageVOAccountVO = {
    /** 响应码 */
    code: string;
    /** 消息 */
    message: string;
    /** 请求ID */
    requestId: string;
    data?: PageVOAccountVO;
  };
}
