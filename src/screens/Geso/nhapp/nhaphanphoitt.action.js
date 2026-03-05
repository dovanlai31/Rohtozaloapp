

import { post, } from './../../../utils/netwworking';



export function ChuphinhNPP(payload) {
  return () => {
    return  post('ChuphinhNPP', payload)
      .then(({ data, error, }) => {
      
        if (!error) {
          return data;
        } else {
         
          return false;
        }
      })
      .catch((e) => {
      
        return false;
      });
  };
}
export function updateNNP(payload) {
  return () => {
    return post('NhaPhanPhoi_XacDinhToaDo', payload)
      .then(({ data, error, }) => {
      
        if (!error) {
          return data;
        } else {
         
          return false;
        }
      })
      .catch((e) => {
        
        return false;
      });
  };
}

export function visitNNP(payload) {
  return () => {
    return post('NhaPhanPhoi_ViengTham', payload)
      .then(({ data, error, }) => {
       
        if (!error) {
          return data;
        } else {
         
          return false;
        }
      })
      .catch((e) => {
        
        return false;
      });
  };
}

export function ExitNNP(payload) {
  return () => {
    return post('NhaPhanPhoi_RoiKhoi', payload)
      .then(({ data, error, }) => {
        
        if (!error) {
          return data;
        } else {
         
          return false;
        }
      })
      .catch((e) => {
       
        return false;
      });
  };
}