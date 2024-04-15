import { USER_INFO } from '../const';

export type AuthorityType = Record<string, boolean>;

export interface UserInfo
  extends Omit<Gz.AdminLoginVO, 'authorityValues' | 'token'> {
  authority: Record<string, boolean>;
}

const initUserInfo: Gz.AdminLoginVO = {
  /** 账户编号 */
  accountId: 0,
  /** 用户名 */
  username: '',
  /** 角色列表 */
  roleNames: [],
  /** token */
  token: '',
  /** 刷新token */
  refreshToken: '',
  /** 权限列表 */
  authorityValues: [],
  /** 公司id */
  companyId: 0,
  /** 公司名称 */
  companyName: '',
};

const useUserInfo = (): UserInfo => {
  const userInfoJSON =
    localStorage.getItem(USER_INFO) ?? JSON.stringify(initUserInfo);
  const { authorityValues, token, ...otherUserInfo }: Gz.AdminLoginVO =
    JSON.parse(userInfoJSON);
  const authority: AuthorityType = {};
  authorityValues.reduce((previousValue, currentValue) => {
    previousValue[currentValue] = true;
    return previousValue;
  }, authority);
  return { authority, ...otherUserInfo };
};

export default useUserInfo;
