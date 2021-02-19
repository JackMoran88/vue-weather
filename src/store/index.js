import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'


export default new Vuex.Store({
    state: {
        // https://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&appid=4804898096d6c129e0a04ff8caa8eca8
        api_key: '4804898096d6c129e0a04ff8caa8eca8',
        server_url: 'https://api.openweathermap.org/data/2.5',

        selected: getCookie('selected') || [],

        weather: [],

        alerts: [],
    },
    modules: {},
    actions: {
        GET_WEATHER({commit}, query) {
            console.log("QUERY")
            console.log(query)
            return new Promise((resolve, reject) => {
                return axios(`${this.state.server_url}/weather?id=${query}&appid=${this.state.api_key}&units=metric&lang=ru`,
                    {
                        method: 'POST',
                    }
                )
                    .then((resp) => {
                        commit('SET_WEATHER', resp.data)
                        resolve(resp)
                    })
                    .catch((error) => {
                        if (error.response.data.message) {
                            commit('ADD_ALERT', {type: 'error', text: error.response.data.message})
                        }
                        reject(error)
                    })
            })
        },
        SEARCH_CITY_BY_NAME({commit}, query) {
            return new Promise((resolve, reject) => {
                return axios(`${this.state.server_url}/weather?q=${query}&appid=${this.state.api_key}&units=metric&lang=ru`,
                    {
                        method: 'POST',
                    }
                )
                    .then((resp) => {
                        commit('SET_WEATHER', resp.data)
                        resolve(resp)
                    })
                    .catch((error) => {
                        if (error.response.data.message) {
                            commit('ADD_ALERT', {type: 'error', text: error.response.data.message})
                        }
                        reject(error)
                    })
            })
        },
    },
    getters: {
        SERVER_URL: state => {
            return state.server_url
        },
        WEATHER: state => {
            return state.weather
        },
        SELECTED: state => {
            return state.selected
        },

        ALERTS: state => {
            return state.alerts
        },
    },
    mutations: {
        SET_WEATHER: (state, data) => {

            if (state.weather.find(v => v.id === data.id)) {
                console.log('Update city')
                state.weather.find(v => v.id === data.id).data = data
            } else {
                console.log('New city')
                state.weather.push(data)

                if (!state.selected.includes(data.id.toString())) {
                    state.selected.push(data.id.toString())
                }

            }


            if (state.selected.length) {
                console.log('New Cookie')

                document.cookie = `selected=${state.selected}`
            }
        },
        REMOVE_CITY: (state, data) => {
            let index = state.selected.indexOf(data.toString());
            if (index !== -1) {
                state.selected.splice(index, 1);

                state.weather = state.weather.filter(function (obj) {
                    return obj.id !== data;
                });

            }
        },


        ADD_ALERT: (state, data) => {
            console.log(data)
            state.alerts.push(data)
            setTimeout(function () {
                state.alerts = state.alerts.filter(function (obj) {
                    return obj !== data;
                });
            }, 5000)

        },
        REMOVE_ALERT: (state, data) => {
            state.alerts = state.alerts.filter(function (obj) {
                return obj !== data;
            });
        }
    },


})

function getCookie(cookiename) {
    // Get name followed by anything except a semicolon
    var cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    let result = decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
    if (result.length) {
        result = result.split(',')
    }
    return result
}



