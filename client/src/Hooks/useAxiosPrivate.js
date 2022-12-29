import { axiosPrivate } from "../axios/axios";
import { useEffect } from "react";
import { login, logout , editdata } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Axios from '../axios/axios'

const useAxiosPrivate = () => {
    const token = useSelector((state) => state.user.value.accessToken);
    const dispatch = useDispatch()

    useEffect(() => {
        axiosPrivate.interceptors.request.use(
            config => {
                console.log('request');
                console.log(token);
                
                if (!config.headers['authorization']) {
                    config.headers['authorization']= token
                }
                return config
            }, (error) => {
                console.log('reached error');
                
                Promise.reject(error)
            }
        )
      
        axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                console.log('refresh token');
                const prevRequest = error?.config;
                console.log(prevRequest);
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const response = await Axios.get('/refresh', {
                        withCredentials: true
                    });
                  
                    dispatch(editdata( response.data.accessToken)) 
                    prevRequest.headers['authorization'] = response.data.accessToken
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error);
            }
        )

   },[])


    return axiosPrivate
}


export default useAxiosPrivate