
// import _ from 'lodash'
import _ from '~/other/lodash.custom.min.js'
import limit from 'simple-rate-limiter'


export default {
  // async loadCytosis ({ commit, state }, {env, tableQuery, options, caller}) {
  // async loadCytosis ({ commit }, {routeName, env, tableQuery, options, payloads, config, _key, _base}) {
  async loadCytosis ({ commit }, {routeName, tableQuery, options, payloads, config, _key, _base}) {

    // async loadCytosis ({ commit }, {env, tableQuery, options, payloads, caller, _key, _base}) {
    const airKey = _key || process.env.airtable_api
    const airBase = _base || process.env.airtable_base

    const cytosisLimit = process.env.cytosisLimit
    const cytosisTime = process.env.cytosisTime

    // if(!process.server)
      // console.log(`[actions/loadCytosis loading from:${routeName}]: query/options:`, tableQuery, options)
      // console.log(`[actions/loadCytosis loading from:${routeName}]: isServer:`, process.server)
    
    // if generated, not server, and static is true
    // we DON'T want to pull data to the client
    // if(env.mode == 'universal' && !process.server && env.site_static) 
    //   return Promise.reject(undefined) // static set to true / don't pull data
    // console.log(`[action/loadCytosis] !!!!!!!!! Spinning up another Cytosis object (${routeName}/${tableQuery})`, )

    const _this = this

    const data = {
      airKey, 
      airBase, 
      tableQuery, 
      options,
      config,
      payloads,
    }

    const cytosisRequest = limit(function(data, callback) {
      // console.log('cytosisRequest', data)
      // console.log('requesting :: <><><<BANANAAANA>><><><', airKey, tableQuery)
      let cytosis = new _this.$cytosis({
        airKey, 
        airBase, 
        tableQuery, 
        options,
        config,
        payloads,
      })
      callback(cytosis)
    }).to(cytosisLimit).per(cytosisTime)

    const cytosis = await new Promise(function(resolve, reject) {
      cytosisRequest(data, function(cytosisPromise) {
        cytosisPromise.then((_cytosis, err) => {
          if (err) {
            reject(err)
          }
          resolve(_cytosis)
        })
      })
    })

    commit('setCytosis', cytosis)
    return cytosis

  },


  // initializes the store
  setElement ({ commit }, el) { // replaces entire object
    commit('setElement', el)
  },
  update ({ commit }, object) {
    // generic mutator action
    // object is: {name: 'stateName', payload: {data} }

    // special rules
    // if updating settings, must clear the data
    // if(object.name == 'settings')
    //   commit('clear', {name: 'data'})

    commit('update', object)
  },
  debouncedUpdate ({ commit }, object) {
    debouncedUpdate(commit, object)
  },
  updateCreate ({ commit }, object) {
    commit('updateCreate', object)
  },
  clear ({ commit }, object) {
    // generic mutator action to clear something
    // console.log('trying to clear', object)
    commit('clear', object)
  },

}

// const emit = function (evtName, data) { // replaces entire dance object
//   window.dispatchEvent( new CustomEvent(evtName, {detail: data}))
// }

const debouncedUpdate = _.debounce(function(commit, object){
  // console.log('update debounced!')
  commit('update', object)
}, 1800)


