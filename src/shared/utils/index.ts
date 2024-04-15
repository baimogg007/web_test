import { TOKEN_KEY } from '../const';

export const urlToList = (url: string): string[] => {
  const urlList = url.split('/').filter((i) => i);
  return urlList.map((_, index) => `/${urlList.slice(0, index + 1).join('/')}`);
};

type ResTypes = Record<string, string>;

export const addPrefixToEumValue = <U extends ResTypes>(
  types: U,
  namespace: string,
): U => {
  const resultActionTypes: ResTypes = {};

  Object.keys(types).forEach((key: string) => {
    resultActionTypes[key] = `${namespace}/${types[key]}`;
  });

  return resultActionTypes as U;
};

export const downloadFile = (url: string, options: any) => {
  const { onProgress } = options;
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.setRequestHeader(
      'Authorization',
      localStorage.getItem(TOKEN_KEY) || '',
    );
    xhr.responseType = 'blob';
    xhr.onload = () => {
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(xhr.response);
      const contentDisposition = xhr.getResponseHeader('content-disposition');

      const resultFileName = contentDisposition
        ?.split("filename*=utf-8''")
        .pop();

      a.download = decodeURIComponent(resultFileName as string);
      a.click();
      window.URL.revokeObjectURL(a.href);

      resolve(xhr.response);
    };

    xhr.onprogress = (e) => {
      const resultEvent = e as any;
      if (e.total > 0) {
        resultEvent.percent = (e.loaded / e.total) * 100;
      }
      onProgress?.(resultEvent);
    };

    xhr.onerror = (e) => {
      reject(e);
    };

    xhr.send();
  });
};
