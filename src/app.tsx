import { App, ConfigProvider } from 'antd';
import { ApplyPluginsType, plugin } from 'umi';
import antThemes from '@/shared/styles/antThemes';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

export function rootContainer(container: any) {
  const runtimeAntd = plugin.applyPlugins({
    key: 'antd',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });

  ConfigProvider.config({
    // prefixCls: PREFIX_CLS,
  });

  // const validateMessages = {
  //   required: formatMessage(messages.required, {
  //     // eslint-disable-next-line no-template-curly-in-string
  //     value: '${label}',
  //   }),
  // };

  const finalConfig = {
    ...{
      // prefixCls: PREFIX_CLS,
      ...runtimeAntd,
      autoInsertSpaceInButton: false,
      theme: { token: antThemes },
      // form: { validateMessages },
    },
  };

  console.log(finalConfig);

  return (
    <ConfigProvider {...finalConfig} locale={zhCN}>
      <App>{container}</App>
    </ConfigProvider>
  );
}

/**
 * @see  https://v3.umijs.org/zh-CN/plugins/plugin-initial-state
 * */

// export async function getInitialState() {
//   window.__ENV = {
//     // eslint-disable-next-line object-shorthand
//     VERSION: VERSION,
//   };
//   if (location.pathname.includes(signPath) && !localStorage.get('token')) {
//     return {
//       userInfo: initUserInfo,
//     };
//   }
//   // const { userTimeZone } = getUserTimeZone();
//   // let params = {};
//   // if (userTimeZone) {
//   //   params = {
//   //     offset: userTimeZone.offset,
//   //     timezone: userTimeZone.name,
//   //   };
//   // }
//   try {
//     const { body } = await adminCurrentUserInfoUsingGET(params, {
//       timeout: 6000,
//       timeoutMessage: '请求超时',
//     });
//     // if (isNumber(body.offset)) {
//     //   dateUtils.timeZoneOffset = body.offset;
//     //   moment.tz.setDefault(body.timezone);
//     // }
//     return {
//       userInfo: body,
//     };
//   } catch (error) {
//     console.log('error', error);
//   }
//   return {
//     userInfo: initUserInfo,
//   };
// }
