/**
 * `XMLHttpRequest` 的 uni-app 实现
 */
export default function () {
    this.withCredentials = false;

    this.readyState = 0;
    this.onreadystatechange = () => {};

    const readystatechange = readyState => {
        this.readyState = readyState;
        this.onreadystatechange();
    };

    this.open = (method, url) => {
        this.method = method;
        this.url = url;

        readystatechange(1);
    };

    this.send = data => {
        const options = {
            url: this.url,
            header: requestHeaders,
            method: this.method,
            withCredentials: this.withCredentials,
            complete: res => {
                this.status = res.statusCode;
                this.statusText = res.errMsg;
                this.response = res.data;
                this.responseText = res.data;

                this.getAllResponseHeaders = () => res.header;

                readystatechange(2);
                readystatechange(3);
                readystatechange(4);
            },
        };

        if (data) {
            options.data = data;
        }

        if (this.timeout) {
            options.timeout = this.timeout;
        }

        uni.request(options);
    };

    const requestHeaders = {};
    this.setRequestHeader = (header, value) => {
        requestHeaders[header] = value;
    };
};
