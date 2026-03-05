
const prefixType = '@@APP_';
export const SHOW_APP = prefixType + 'SHOW_APP';
export function showApp(payload) {
  return {
    type: SHOW_APP,
    payload,
  };
}

export const SHOW_LOADING = prefixType + 'SHOW_LOADING';
export function showLoading(payload) {
  return {
    type: SHOW_LOADING,
    payload,
  };
}

export const SAVE_CURRENT_NPP = prefixType + 'SAVE_CURRENT_NPP';

export function saveCurrentNPP(payload) {
  return {
    type: SAVE_CURRENT_NPP,
    payload,
  };
}

export const SAVE_LIST_BRANCH = prefixType + 'SAVE_LIST_BRANCH';

export function saveListBranch(payload) {
  return {
    type: SAVE_LIST_BRANCH,
    payload,
  };
}

