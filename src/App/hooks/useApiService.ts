import { useMemo } from 'react';
import { useConfigStore } from '../store/config';
import { ApiService } from '../services/ApiService';

export const useApiService = () => {
  const { config } = useConfigStore(); 

  const apiService = useMemo(
    () => {

      if(ApiService.client){
        return ApiService
      }
      ApiService.init(config.endpoint)
      return ApiService
    },
    [config.endpoint]
  );

  return {apiService}
}