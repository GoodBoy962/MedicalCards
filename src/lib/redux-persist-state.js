export default function (paths = [], key = 'redux', actions = '*') {

  const load = () => {
    try {
      const string = localStorage.getItem(key);
      if (string === null) {
        return {};
      }
      return JSON.parse(string) || {};
    } catch (err) {
      console.error(err);
      return {};
    }
  };

  const save = (state) => {
    try {
      const string = JSON.stringify(state);
      return localStorage.setItem(key, string);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const middleware = ({getState}) => next => action => {
    let state = next(action);
    if (actions === '*' || (actions instanceof Array && !~actions.indexOf(action.type))) {
      let state = getState();
      let data = paths.reduce((data, path) => {
        data[path] = state[path];
        return data;
      }, {});
      save(data);
    }
    return state;
  };

  return {
    preloadedState: load(),
    persistState: middleware
  }
}