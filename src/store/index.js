import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'


export default new Vuex.Store({
    state: {
        api_key: '4804898096d6c129e0a04ff8caa8eca8',
        server_url: 'https://api.openweathermap.org/data/2.5',

        selected: getCookie('selected') || [],

        weather: [],

        detailed_weather: [],

        alerts: [],
    },
    modules: {},
    actions: {
        GET_WEATHER({commit}, query) {
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
                        if (error.response && error.response.data.message) {
                            commit('ADD_ALERT', {type: 'error', text: error.response.data.message})
                        }
                        reject(error)
                    })
            })
        },

        GET_WEATHER_BY_GEO({commit}) {
            if (getCookie('geolocation')) {
                return
            }
            //Объект для заполнение кукыов
            let cookie = {
                name: 'geolocation',
                value: null,
            }
            //Опредение геопозиции
            let geo = new Promise((resolve) => {
                navigator.geolocation.getCurrentPosition(pos => {
                    cookie.value = 1
                    resolve(pos.coords)
                })
            })
            //Отправка запроса
            geo.then((query)=>{
                return new Promise((resolve, reject) => {
                    return axios(`${this.state.server_url}/weather?lat=${query.latitude}&lon=${query.longitude}&appid=${this.state.api_key}&units=metric&lang=ru`,
                        {
                            method: 'POST',
                        }
                    )
                        .then((resp) => {
                            commit('SET_WEATHER', resp.data)
                            resolve(resp)
                        })
                        .catch((error) => {
                            if (error.response && error.response.data.message) {
                                commit('ADD_ALERT', {type: 'error', text: error.response.data.message})
                            }
                            reject(error)
                        })
                })
            })
            //Назначение куков
            geo.finally(() => {
                if (cookie.value !== '') {
                    setCookie(cookie.name, cookie.value)
                }
            })
        },

        GET_DETAILED_WEATHER({commit}, query) {
            return new Promise((resolve, reject) => {
                return axios(`${this.state.server_url}/forecast?id=${query}&appid=${this.state.api_key}&units=metric&lang=ru`,
                    {
                        method: 'POST',
                    }
                )
                    .then((resp) => {
                        commit('SET_DETAILED_WEATHER', resp.data)
                        resolve(resp)
                    })
                    .catch((error) => {
                        if (error.response && error.response.data.message) {
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
                        // reject(error)
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
        DETAILED_WEATHER: state => {
            return state.detailed_weather
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
                let index = state.weather.indexOf(state.weather.find(v => v.id === data.id));
                Vue.set(state.weather, index, data)
            } else {
                state.weather.push(data)

                if (!state.selected.includes(data.id.toString())) {
                    state.selected.push(data.id.toString())
                    setCookie('selected', state.selected.sort())
                }
            }

            //Сортировка массива городов, по id
            state.weather = state.weather.sort(dynamicSort('id'))

        },

        SET_DETAILED_WEATHER: (state, data) => {
            Vue.set(state, 'detailed_weather', data)
        },


        REMOVE_CITY: (state, data) => {
            let index = state.selected.indexOf(data.toString());
            if (index !== -1) {
                state.selected.splice(index, 1);

                Vue.set(state, 'weather', state.weather.filter(function (obj) {
                    return obj.id !== data;
                }))

            }

            setCookie('selected', state.selected.sort())
        },

        ADD_ALERT: (state, data) => {
            state.alerts.push(data)
            setTimeout(function () {
                state.alerts = state.alerts.filter(function (obj) {
                    return obj !== data;
                });
            }, 5000)

        },
        REMOVE_ALERT: (state, data) => {
            Vue.set(state, 'alerts', state.alerts.filter(function (obj) {
                return obj !== data;
            }))
        }
    },


})


//Получение печенья по названию
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

//Назначение печенья
function setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/`
    document.cookie = `${name}=${value}; path=/detail`
}

//Сортирует массив объектов по ключу
function dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

