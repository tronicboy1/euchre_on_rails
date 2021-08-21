Rails.application.routes.draw do
  root to: 'pages#index'
  get '/game', to: 'game#show'
  resources :gameupdates
  resources :users, only: [:new,:create]
end
