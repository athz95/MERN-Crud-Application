import axios from 'axios'
import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants"



export const register = (name, email, country, gender, mobileNumber) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      'http://localhost:5000/api/users',
      { name, email, country, gender, mobileNumber },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      })
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`http://localhost:5000/api/users/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    })
  }
}

  export const listUsers = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      })
  
      const config = {
        headers: {
            'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.get(`http://localhost:5000/api/users`, config)
  
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      })

    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
     
      dispatch({
        type: USER_LIST_FAIL,
        payload: message,
      })
    }
  }


  export const deleteUser = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DELETE_REQUEST,
      })
  
     await axios.delete(`http://localhost:5000/api/users/${id}`)
  
      dispatch({
        type: USER_DELETE_SUCCESS,
      })

    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: USER_DELETE_FAIL,
        payload: message,
      })
    }
  }


  export const updateUser = (user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
    const { data } = await axios.put(`http://localhost:5000/api/users/${user._id}`,user,  config)
  
      dispatch({
        type: USER_UPDATE_SUCCESS,
      })

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data
      })

    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: message,
      })
    }
  }