const camunda = 'user-arm';
class ApiAlert {
  static getUserAlerts() {
    return ApiConnector.getAxios(`${camunda}/user-alerts`);
  }
  static userAlertsCount() {
    return ApiConnector.getAxios(`${camunda}/user-alerts-count`);
  }
  static userAlertsUnread() {
    return ApiConnector.getAxios(`${camunda}/user-alerts-unread`);
  }
  static userAlertsMarkAsRead() {
    return ApiConnector.getAxios(`${camunda}/user-alerts-mark-as-read`);
  }
}
export default ApiAlert;

genApiClass = (name, arr) => {
  `
    import ApiConnector from './restClient';
    class ${name} {
      ${arr.map((el) => generateController(el))}

    }
    export default ${name};
    `;
};

generateController = (name, method, url, params) => {
  `static ${name}() {
      return ApiConnector.${method}(${url}${params});
    }
    `;
};
