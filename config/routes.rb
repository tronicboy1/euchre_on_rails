Rails.application.routes.draw do
  root to: 'pages#index'
  get '/game', to: 'game#show'
  resources :gameupdates
  resources :users, only: [:new,:create,:index]
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
end
