Rails.application.routes.draw do
  root to: 'pages#index'
  get '/game', to: 'game#show'
  resources :gameupdates, only: [:show,:index,:new,:create,:edit,:update]
end
