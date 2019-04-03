const initialState = {
  isTest: true,
  isQR: false,
  isBroadsheet: false,
  isLoading: true,
  venueurl: '',
  venue: '',
  sections: [],
  definitions: [],
  lang: 'en', // can use common reducer for this to access it from all pages
  showModal: false,
  showMenuLink: false,
  showBroadsheetLink: false,
  menuUrl: '',
  broadsheetLink: ''
}

function menuReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default menuReducer;
