import qs from 'qs';
import { history } from 'umi';
import { startsWith } from 'lodash';

export interface Options {
  pathParams?: Record<string, string | number>;
  query?: Record<string, string | number>;
  hash?: string;
}

class Location {
  buildURL = (url: string, options: Options = {}) => {
    const { pathParams = {}, query = {}, hash } = options;
    // let serializedUrl = qsHelp.toPath(url, pathParams);
    let serializedUrl = url;
    const queryStr = qs.stringify(query, { indices: false });
    if (queryStr) {
      serializedUrl = `${serializedUrl}?${queryStr}`;
    }
    if (hash) {
      serializedUrl = `${serializedUrl}#${hash}`;
    }
    // if (!startsWith(serializedUrl, `/${lang}`)) {
    //   serializedUrl = `/${lang}${serializedUrl}`;
    // }
    return serializedUrl;
  };

  open(url: string, options: Options = {}) {
    const { pathParams, query } = options;
    let serializedUrl = '';
    if (startsWith(url, 'http') || startsWith(url, 'https')) {
      serializedUrl = url;
    } else {
      serializedUrl = this.buildURL(url, { pathParams, query });
    }
    window.open(serializedUrl);
    return serializedUrl;
  }

  replace(url: string, options: Options = {}) {
    const { pathParams, query } = options;
    const serializedUrl = this.buildURL(url, { pathParams, query });

    history.replace(serializedUrl);
    return serializedUrl;
  }

  push(url: string, options: Options = {}) {
    const { pathParams, query } = options;
    const serializedUrl = this.buildURL(url, { pathParams, query });

    history.push(serializedUrl);

    return serializedUrl;
  }
}

export default new Location();
