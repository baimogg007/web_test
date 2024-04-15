import { GlobalModelState } from './global';
import { DashboardState } from './dashboard';
import type { AccountState } from './account';
import { CountryState } from './country';
import { AuthState } from './auth';
import { MT4ServiceState } from './mt4Service';
import { RegisterCustomerState } from './registerCustomer';
import { PushTemplateState } from './pushTemplate';
import { CoinConfigState } from './coinConfig';
import { SubAccountState } from './subAccountRoles';
import { RebateSettingState } from './agentSetting/rebateSetting';
import { UserState } from './user';
import { AgentAccountState } from './agentSetting/accountSetting';
import { SubAccountSettingState } from './agentSetting/subAccountSetting';
import { DownloadState } from './download';
import type { CommonState } from './common';

export {
  GlobalModelState,
  DashboardState,
  CountryState,
  AuthState,
  MT4ServiceState,
  RegisterCustomerState,
  PushTemplateState,
  CoinConfigState,
  SubAccountState,
  Mt4GroupState,
  RebateSettingState,
  UserState,
  AgentAccountState,
  SubAccountSettingState,
  DownloadState,
  CommonState,
};
export interface Loading {
  global: boolean;
  effects: Record<string, boolean | undefined>;
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

type RouterData = {
  location: {
    pathname: string;
    search: string;
    hash: string;
    query: Record<string, number | string>;
  };
};

export interface ConnectState {
  router: RouterData;
  global: GlobalModelState;
  common: CommonState;
  loading: Loading;
  account: AccountState;
  dashboard: DashboardState;
  country: CountryState;
  auth: AuthState;
  mt4Service: MT4ServiceState;
  registerCustomer: RegisterCustomerState;
  pushTemplate: PushTemplateState;
  coinConfig: CoinConfigState;
  subAccountRoles: SubAccountState;
  mt4Group: Mt4GroupState;
  rebateSetting: RebateSettingState;
  agentAccount: AgentAccountState;
  user: UserState;
  subAccountSetting: SubAccountSettingState;
  download: DownloadState;
}
